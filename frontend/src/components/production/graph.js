import React from "react";
import {Line} from 'react-chartjs-2';


function ProductionGraph(props){
    
    var data = {
        datasets:[
            {
                data: [
                    {x: 1, y: 332},
                    {x: 2, y: 345},
                    {x: 3, y: 370},
                    {x: 4, y: 337},
                    {x: 5, y: 360},
                ],
                fill: false,
                label: "Actual Production"
            },
            {
                data: [
                    {x: 1, y: NaN},
                    {x: 2, y: NaN},
                    {x: 3, y: NaN},
                    {x: 4, y: NaN},
                    {x: 5, y: 360},
                    {x: 6, y: 395},
                    {x: 7, y: 382},
                    {x: 9, y: 389},
                    {x: 10, y: 421},
                    {x: 11, y: 423},
                ],
                backgroundColor: "#D08C24",
                borderColor: "#D08C24",
                fill: false,
                label: "Predictions"
            }],
            labels: [
                "2015-2016",
                "2016-2017",
                "2017-2018",
                "2018-2019",
                "2019-2020",
                "2020-2021",
                "2021-2022",
                "2022-2023",
                "2023-2024",
                "2024-2025"
            ],
            xAxisID: "Year",
            yAxisID: "Production in Lakh Bales"
        }
    return(
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
                        labelString: 'Cotton Production in India in Lakh bales',
                        fontSize:props.small?13:16,
                        fontColor: "#D08C24"
                    }
                    }],
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year',
                        fontSize:18,
                        fontColor: "#D08C24"
                    }
                    }]
                }     
            }}
        />
    )
}

export default ProductionGraph;