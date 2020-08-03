import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import Axios from 'axios';
import loaderImg from "../fluid-loader.gif";
import monthMap from "./dateMap";

function PriceGraph(props) {
    const [data,setData] = useState(null);
    const [date,setDate] = useState((new Date()).toISOString().substr(0,10));

    //UI States
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
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


    },[])

    return (
        <React.Fragment>
        {data && !loading?
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
        :null}

        {loading?
            <div className="text-center">
                <img style={{width:"100px"}} src={loaderImg} alt="Loader"  />
            </div>
        :null}
        </React.Fragment>
    )
}


export default PriceGraph

