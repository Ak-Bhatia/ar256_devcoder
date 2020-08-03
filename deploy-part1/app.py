from flask import Flask ,render_template,request,jsonify
from flask_cors import CORS
import os
from keras.models import model_from_json
import joblib
import numpy as np
from sklearn.metrics import r2_score,mean_squared_error
import math
import pandas_datareader as web
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import datetime



modelds = joblib.load("dsmodel.pkl")
json_file = open('./model2-6040rmsprop415.json', 'r')

loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
model.load_weights("./model2-6040rmsprop415.h5")
print("Loaded model from disk")

month_no = {
    "Jan":1,
    "Feb":2,
    "Mar":3,
    "Apr":4,
    "May":5,
    "Jun":6,
    "Jul":7,
    "Aug":8,
    "Sep":9,
    "Oct":10,
    "Nov":11,
    "Dev":12
}

month_code = {
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12:"Dec"
}

def helper(model, index, scaler, scaled_data, data, df):
    print("Inside helper")
    
    results = []
    for i in range(7):
        
    
        #Test data set
        x_test = []
        x_test.append(scaled_data[index+i-60:index+i,0])

        x_test = np.array(x_test)
        
        #Reshape the data into the shape accepted by the LSTM
        x_test_shaped = np.reshape(x_test, (x_test.shape[0],x_test.shape[1],1))
        
        prediction = modelPrediction(model,x_test_shaped)
        prediction = scaler.inverse_transform(prediction)#Undo scaling
        results.append([float(prediction[0][0]),float(((prediction[0][0]-df.iloc[index+i-1]['price'])/(df.iloc[index+i-1]['price'])))*100])
    previous = []
    for i in range(6,-1,-1):
            previous.append([float(df.iloc[index-i]['price']),float(((df.iloc[index-i]['price']-df.iloc[index-i-1]['price'])/df.iloc[index-i-1]['price']))*100])
        
    return {"predictions":results,"previous":previous}
    

def modelPrediction(model,x_test_shaped):
    #Getting the models predicted price values
    prediction = model.predict(x_test_shaped) 
    return prediction

def prediction(model, date, scaler, scaled_data, data, df):
    index = np.where(data["Date"] == date)
    dateformat = date.split("-")
    initial_date = datetime.date(year=2000+int(dateformat[2]),day=int(dateformat[0]),month=month_no[dateformat[1]])
    if(len(index[0])>0 and (initial_date.year<2020 or initial_date.month<7)):
        print("index = ",index)
        index = index[0][0]
        return helper(model,index,scaler,scaled_data,data,df)
    else:
    
        date1 = datetime.date(year=2000+int(dateformat[2]),day=int(dateformat[0]),month=month_no[dateformat[1]]) - datetime.date(year=2020,day=22,month=7)
        if (date1.days<0):
            print("missing")
            while(len(index[0])<=0):
                initial_date = initial_date+ datetime.timedelta(days=1)
                if(initial_date.day<10):
                    new_date = '0'+str(initial_date.day) + '-' + month_code[initial_date.month] + '-' + str(initial_date.year-2000)
                else:
                    new_date = str(initial_date.day) +'-' + month_code[initial_date.month] + '-' + str(initial_date.year-2000)
                print(new_date)
                index = np.where(data["Date"] == new_date)
            index = index[0][0]
            print("new date",new_date)
            time = 7
        else:
            index = len(data)-1
            time = date1.days + 7
    
    #Test data set
    x_test = []
    x_test.append(scaled_data[index-60:index,0])
    
    #Convert x_test to a numpy array 
    x_test = np.array(x_test)
    
    results = []
    
    for i in range(time):
        
        #Reshape the data into the shape accepted by the LSTM
        x_test_shaped = np.reshape(x_test, (x_test.shape[0],x_test.shape[1],1))
        
        prediction = modelPrediction(model,x_test_shaped)
        arr = np.delete(x_test[0],0)
        arr = np.insert(arr,59,prediction[0][0])
        temp = []
        temp.append(arr)
        x_test = np.array(temp)
        prediction = scaler.inverse_transform(prediction)#Undo scaling
        if i==0:
            results.append([float(prediction[0][0]),float(((prediction[0][0]-df.iloc[index+i-1]['price'])/df.iloc[index+i-1]['price'])*100)])
        else:
            results.append([float(prediction[0][0]),float(((prediction[0][0]-results[len(results)-1][0])/results[len(results)-1][0])*100)])
    previous = []
    if(time==7):
        for i in range(6,-1,-1):
            previous.append([float(df.iloc[index-i]['price']),float(((df.iloc[index-i]['price']-df.iloc[index-i-1]['price'])/df.iloc[index-i-1]['price'])*100)])
    else:
        previous = results[-14:-7]
    
    return {"predictions":results[-7:],"previous":previous}
    

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
	return "Hello World!!!!"

@app.route("/predict",methods = ['POST'])
def result():
    data = pd.read_csv("./Price.csv")
    data = data[data['Total Value (Lacs)']!=0]
    data['price'] = data['Total Value (Lacs)']/data["Quantity (000's)"]

    df = pd.DataFrame(data['price'])
    dataset = df.values 

    scaler = MinMaxScaler(feature_range=(0, 1)) 
    scaled_data = scaler.fit_transform(dataset)
    

    #Scale the all of the data to be values between 0 and 1 
    scaler = MinMaxScaler(feature_range=(0, 1)) 
    scaled_data = scaler.fit_transform(dataset)

    date = request.form.get("date")
    date = str(date)
    print("date=",date)

    predictions = prediction(model,date,scaler,scaled_data,data,df)
    print("Predictions: ", predictions)

    # Check if any code is missing

    return jsonify({"status":"Passed","msg":"Form Submitted Successfully","prediction":predictions})
    
@app.route('/predict/price-dtree',methods=['POST'])
def pred():
    cot_data = pd.read_csv("Mydataset.csv")
    second = request.form.get("Year",type=int)
    prod  = cot_data.loc[cot_data['year'] == second, 'Production'].iloc[0]
    oil = cot_data.loc[cot_data['year'] == second, 'oilPrice'].iloc[0]
    final_predictions = []
    for i in range(1,13):
        mon = i   
        lis = [np.array([second,mon,prod,oil])]
        my_pred = modelds.predict(lis)
        my_pred = my_pred[0]
        final_predictions.append(my_pred)

    return jsonify({"status":"Passed","msg":"Form Submitted Successfully","prediction":final_predictions})

if __name__ == '__main__':
	app.run(debug = True)
