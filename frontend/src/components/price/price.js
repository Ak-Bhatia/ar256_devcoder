import React, { useState } from 'react';
import Card from '../ui/card/card';
import {Line} from 'react-chartjs-2';
import Axios from 'axios';
import loaderImg from "../fluid-loader.gif";
import monthMap from "./dateMap";

function Price(props) {
    const [dailyActive,setDailyActive] = useState( true );
    const [data,setData] = useState(null);
    const [date,setDate] = useState((new Date()).toISOString().substr(0,10));

    const [predection,setPrediction] = useState(null);
    const [actual,setActual] = useState(null);
    
    //UI States
    const [loading,setLoading] = useState(false);

    function forecastingHandler(){
        setLoading(true);
        const labels = [];
        for(var i=-6;i<=7;i++){
            var today = new Date(date);
            today.setDate(today.getDate() + i); 
            labels.push(today.toISOString().substring(0,10));
        }

        const formData= new FormData();
        // console.log( date.substr(8,2) + "-" +  monthMap[date.substr(5,2)] +"-"+date.substr(2,2));
        
        formData.append("date",  date.substr(8,2) + "-" +  monthMap[date.substr(5,2)] +"-"+date.substr(2,2));
        
        Axios.post('https://cotton-price-predict.herokuapp.com/predict', formData )
        .then(res=>{
            const data1 = res.data.prediction.previous.map((el,i)=>({x:i+1,y:el[0]}));
            data1.push({x:8,y:res.data.prediction.predictions[0][0]});
            var data2 = res.data.prediction.predictions.map((el,i)=>({x:i+7+1,y:el[0]}));

            const dataPred=res.data.prediction.predictions.map((el,i)=>({price:el[0].toFixed(2) ,change:el[1].toFixed(3) ,date:labels[i+7]}));
            setPrediction(dataPred);

            
            const dataActual=res.data.prediction.previous.map((el,i)=>({price:el[0].toFixed(2) ,change:el[1].toFixed(3) ,date:labels[i]}));
            setActual(dataActual);



            var temp = []
            for(var i=1;i<=7;i++)
                temp.push({x:i,y:NaN});
            data2 = [...temp,...data2]

            setData({
                labels,
				xAxisID:"Days",
				yAxisID: "Prices in Rupees",
				datasets: [{
					label: 'Actual price',
					// backgroundColor: "#ff6384",
					// borderColor: "#ff6384",
					data: data1,
					fill: false,
				},{
					label: 'Predicted price',
					backgroundColor: "#0D8351",
					borderColor: "#0D8351",
					data: data2,
					fill: false,
				}]
			})
            setLoading(false);
        }).catch(err=>{

            console.error(err.message);
            setLoading(false);

        })


    }

    return (
        <div className="row mr-0 ml-0" >
        <div className="col-12 pl-5 pr-3 pr-lg-5 py-3" >
            <div className="d-flex justify-content-between align-items-center ">
                <h1 className="title" >Price</h1>
                <div className="custom-control custom-switch">
                    <label className="mr-5">Monthly Model</label>
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" checked={dailyActive} onChange={(e)=>setDailyActive(e.target.checked)} />
                    <label className="custom-control-label" for="customSwitch1">Daily Model</label>
                </div>
            </div>
            <hr/>
        </div>
        <div className="col-12 pl-5 px-3">
            <div className="px-3 mb-4" >
                {dailyActive?(
                    <Card title="Daily Price Forecasting" variant="green" >
                        <div className="p-3">
                            <div className="mb-3 pl-4 ">
                                <div style={{width:"220px"}} className="mb-2">
                                    <b>Date</b><br/>
                                    <div className="form-group input-group  mt-2">
                                        <div className="input-group-prepend rounded bg-green text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar" ></i></div>
                                        <input
                                            className="form-control" type="date"
                                            value={date}
                                            onChange={(e)=>setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button className="btn btn-outline-green" onClick={forecastingHandler} > FORECAST PRICE </button>
                            </div>
                            
                            {loading?
                            <div className="text-center">
                                <img style={{width:"400px"}} src={loaderImg} alt="Loader"  />
                            </div>
                            :
                            (data?
                            
                            <div style={{maxWidth:"650px"}}>
                                <Line 
                                    data={data}

                                    hover={{
                                        mode: 'nearest',
                                        intersect: true
                                    }}
                                    options={{       
                                        tooltips: {
                                            mode: 'index',
                                            intersect: false,
                                        },
                                        scales: {
                                            yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Cotton Prices in Rs per bales',
                                                fontSize:16,
                                                fontColor: "#0D8351"
                                            }
                                            }],
                                            xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Date',
                                                fontSize:16,
                                                fontColor: "#0D8351"
                                            }
                                            }]
                                        }     
                                    }}
                                          
                                
                                />

                                
                            </div>
                            :<h4 style={{color:"rgb(135, 160, 149)"}} className="ml-3 mb-3"> No Data For Forecasting Yet, <br/> Click Forecast Button To Forecast Price. </h4>
                            )}

                            {(data && !loading )?
                            <div className="row">
                                <div className="col-lg-6 p-3 px-lg-4">
                                    <h3 > Predicted Prices</h3>
                                    {predection?
                                    
                                    <table className="table table-striped mt-3">
                                        <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Price </th>
                                                <th>Change % </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {predection.map(pred=>(
                                                <tr>
                                                    <td>{pred.date}</td>
                                                    <td> <i className="fa fa-inr"></i> {pred.price}</td>
                                                    <td className={pred.change>=0?"text-success":"text-danger"} >{pred.change}% </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :null}
                                </div>
                                <div className="col-lg-6 p-3 px-lg-4">
                                    <h3> Previous Prices </h3>
                                    {actual?
                                    
                                    <table className="table table-striped mt-3">
                                        <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Price </th>
                                                <th>Change % </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actual.map(pred=>(
                                                <tr>
                                                    <td>{pred.date}</td>
                                                    <td> <i className="fa fa-inr"></i> {pred.price}</td>
                                                    <td className={pred.change>=0?"text-success":"text-danger"} >{pred.change}% </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :null}
                                </div>

                            </div>
                            :null}
                            
                        </div>
                    </Card>
                ):"Monthly Active"}
            </div>
        </div>
        <div className="col-6" >

        </div>
        <div className="col-6" >

        </div>
    </div>
    )
}



export default Price;

