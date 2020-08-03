import React from 'react';
import {Line} from 'react-chartjs-2';

function ExportGraph(props) {
    var exportData = {
        datasets:[
            {
                data: [
                    {x: 1, y: 69.07},
                    {x: 2, y: 58.21},
                    {x: 3, y: 67.59},
                    {x: 4, y: 43.54},
                    {x: 5, y: 50.00},
                ],
                fill: false,
                label: "Actual Export"
            },
            {
                data: [
                    {x: 1, y: NaN},
                    {x: 2, y: NaN},
                    {x: 3, y: NaN},
                    {x: 4, y: NaN},
                    {x: 5, y: 50.00},
                    {x: 6, y: 33.76},
                    {x: 7, y: 48.04},
                    {x: 9, y: 35.60},
                    {x: 10, y: 47.32},
                    {x: 11, y: 31.08},
                ],
                backgroundColor: "#0D8351",
                borderColor: "#0D8351",
                fill: false,
                label: "Predicted Exports"
            },
            {
                data: [
                    {x: 1, y: 22.79},
                    {x: 2, y: 30.94},
                    {x: 3, y: 15.80},
                    {x: 4, y: 35.37},
                    {x: 5, y: 25.00},
                ],
                fill: false,
                label: "Actual Import"
            },
            {
                data: [
                    {x: 1, y: NaN},
                    {x: 2, y: NaN},
                    {x: 3, y: NaN},
                    {x: 4, y: NaN},
                    {x: 5, y: 25.00},
                    {x: 6, y: 35.00},
                    {x: 7, y: 31.00},
                    {x: 9, y: 36.00},
                    {x: 10, y: 35.00},
                    {x: 11, y: 38.00},
                ],
                backgroundColor: "#24D088",
                borderColor: "#24D088",
                fill: false,
                label: "Predicted Imports"
            }
            ],
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
            yAxisID: "Import/Export in Lakh Bales"
        }
    return (
        <Line 
                    data={exportData}

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
                                labelString: 'Import/Export in Lakh bales',
                                fontSize:12,
                                fontColor: "#0D8351"
                            }
                            }],
                            xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Year',
                                fontSize:18,
                                fontColor: "#0D8351"
                            }
                            }]
                        }     
                    }}
                />
    );
}


export default ExportGraph;

