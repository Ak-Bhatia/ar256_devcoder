import React, { useState } from 'react';
import Card from '../ui/card/card';
import {Line} from 'react-chartjs-2';
import Axios from 'axios';
import loaderImg from "../fluid-loader.gif";

function Monthly(props) {
    const [data,setData] = useState(null);
    const [year,setYear] = useState("2020");
    //UI States
    const [loading,setLoading] = useState(false);

    function forecastingHandler(){
        setLoading(true);
        const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
        
        const formData= new FormData();
        formData.append("Year",year);

        Axios.post('https://cotton-price-predict.herokuapp.com/predict/price-dtree', formData )
        .then(res=>{
            const data1=res.data.prediction.map((el,i)=>({x:i+1,y:el}));

            setData({
                labels,
				xAxisID:"Months",
				yAxisID: "Prices in Rupees",
				datasets: [{
					label: 'Actual price',
					backgroundColor: "#0D8351",
					borderColor: "#0D8351",
					data: data1,
					fill: false,
				}]
			})
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            
            setLoading(false);
        })

    }
    return (
        <Card title="Monthly Price Forecasting" variant="green" >
                        <div className="p-3">
                            <div className="mb-3 pl-4 ">
                                <div style={{width:"220px"}} className="mb-2">
                                    <b>Year</b><br/>
                                    <div className="form-group input-group  mt-2">
                                        <div className="input-group-prepend rounded bg-green text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar" ></i></div>
                                        <input
                                            className="form-control" 
                                            type="Number"
                                            min="2001"
                                            max="2020"
                                            value={year}
                                            onChange={(e)=>setYear(e.target.value)}

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
                                                labelString: 'Cotton Prices in Rs 1000kg per bales',
                                                fontSize:16,
                                                fontColor: "#0D8351"
                                            }
                                            }],
                                            xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Month',
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
                                        <h3 > Monthly Prices</h3>
                                        <table className="table table-striped mt-3">
                                            <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                                                <tr>
                                                    <th>Month</th>
                                                    <th>Price <span style={{fontSize:"11px"}}>( per 1000kg per bales)</span> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.datasets[0].data.map((pred,i)=>(
                                                    <tr>
                                                        <td> {data.labels[i]} </td>
                                                        <td> <i className="fa fa-inr"></i> {pred.y}</td>
                                                        
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            :null}
                            
                            
                        </div>
                    </Card>
    )
}

export default Monthly

