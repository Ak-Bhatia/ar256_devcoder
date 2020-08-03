import React from 'react';
import { Line } from 'react-chartjs-2';

function ConsumptionGraph(props) {
    var data = {
        datasets:[
            {
                data: [
                    {x: 1, y: 297.28},
                    {x: 2, y: 288.91},
                    {x: 3, y: 306.29},
                    {x: 4, y: 299.50},
                    {x: 5, y: 313.00},
                ],
                fill: false,
                label: "Actual Consumption"
            },
            {
                data: [
                    {x: 1, y: NaN},
                    {x: 2, y: NaN},
                    {x: 3, y: NaN},
                    {x: 4, y: NaN},
                    {x: 5, y: 313.00},
                    {x: 6, y: 332.51},
                    {x: 7, y: 334.49},
                    {x: 9, y: 344.51},
                    {x: 10, y: 353.68},
                    {x: 11, y: 357.29},
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
            yAxisID: "Consumption in Lakh Bales"
        }
    return (
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
                        labelString: 'Cotton Consumption in India in Lakh bales',
                        fontSize:props.small?13:16,
                        fontColor: "#D08C24"
                    }
                    }],
                    xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date',
                        fontSize:18,
                        fontColor: "#D08C24"
                    }
                    }]
                }     
            }}
        /> 
    )
}



export default ConsumptionGraph

