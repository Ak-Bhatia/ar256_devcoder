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



modelds = joblib.load("dsmodel.pkl")
json_file = open('./model2-6040rmsprop415.json', 'r')

loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
model.load_weights("./model2-6040rmsprop415.h5")
print("Loaded model from disk")


def modelPrediction(model,x_test_shaped):
    #Getting the models predicted price values
    prediction = model.predict(x_test_shaped) 
    return prediction

def prediction(model, index, scaler,scaled_data,df):
    #Test data set
    x_test = []
    x_test.append(scaled_data[index-60:index,0])
    
    #Convert x_test to a numpy array 
    x_test = np.array(x_test)
    
    results = []
    
    for i in range(7):
        
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
    for i in range(6,-1,-1):
        previous.append([float(df.iloc[index-6]['price']),float(((df.iloc[index-i]['price']-df.iloc[index-i-1]['price'])/df.iloc[index-i-1]['price'])*100)])
    
    return {"predictions":results,"previous":previous}
    

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
	return "Hello World!!!!"

@app.route("/predict",methods = ['POST'])
def result():
    df = pd.read_csv("./Price.csv")
    df = df[df['Total Value (Lacs)']!=0]
    df['price'] = df['Total Value (Lacs)']/df["Quantity (000's)"]

    df = pd.DataFrame(df['price'])
    dataset = df.values 

    scaler = MinMaxScaler(feature_range=(0, 1)) 
    scaled_data = scaler.fit_transform(dataset)
    

    #Scale the all of the data to be values between 0 and 1 
    scaler = MinMaxScaler(feature_range=(0, 1)) 
    scaled_data = scaler.fit_transform(dataset)

    predictions = prediction(model,len(df)-1,scaler,scaled_data,df)
    print("Predictions: ", predictions)

    # Check if any code is missing

    return jsonify({"status":"Passed","msg":"Form Submitted Successfully","prediction":predictions})
    
@app.route('/predict/price-dtree',methods=['POST'])
def pred():
		second = request.form.get("Year",type=int)
		third = request.form.get("Month",type=int)
		fourth = request.form.get("Production",type=int)
		fifth = request.form.get("Oil_Price",type=int)
	
		lis = [np.array([second,third,fourth,fifth])]
		my_pred = model.predict(lis)
		my_pred = my_pred[0]
		return jsonify({"status":"Passed","msg":"Form Submitted Successfully","prediction":my_pred})

if __name__ == '__main__':
		app.run(debug = True)
