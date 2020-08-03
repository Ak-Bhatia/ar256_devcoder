import React from 'react';
import Card from '../ui/card/card';
import {Line} from 'react-chartjs-2';

function ImportExport(props) {

    var actualImportData = [
        {"quantity":"22.79", "date":"2015-2016"},
        {"quantity":"30.94", "date":"2016-2017"},
        {"quantity":"15.80", "date":"2017-2018"},
        {"quantity":"35.37", "date":"2018-2019"},
        {"quantity":"25.00", "date":"2019-2020"},
        {"quantity":"35.00", "date":"2020-2021"},
        {"quantity":"31.00", "date":"2021-2022"},
        {"quantity":"36.00", "date":"2022-2023"},
        {"quantity":"35.00", "date":"2023-2024"},
        {"quantity":"38.00", "date":"2024-2025"}
    ];

    var importData = {
        datasets:[
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
                backgroundColor: "#0D8351",
                borderColor: "#0D8351",
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
            yAxisID: "Import in Lakh Bales"
        }

    var actualExportData = [
        {"quantity":"69.07", "date":"2015-2016"},
        {"quantity":"58.21", "date":"2016-2017"},
        {"quantity":"67.59", "date":"2017-2018"},
        {"quantity":"43.54", "date":"2018-2019"},
        {"quantity":"50.00", "date":"2019-2020"},
        {"quantity":"33.76", "date":"2020-2021"},
        {"quantity":"48.04", "date":"2021-2022"},
        {"quantity":"35.60", "date":"2022-2023"},
        {"quantity":"47.32", "date":"2023-2024"},
        {"quantity":"31.08", "date":"2024-2025"}
    ];

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
                label: "Predictions Export"
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
            yAxisID: "Export in Lakh Bales"
        }
        return (
        <div className="row mr-0 ml-0 justify-content-center">
        <div className="col-12 px-5 py-3" >
            <h1 className="title"> Import Export </h1>
            <hr/>
        </div>
        <div className="row" style={{width:'100%'}}>
            <div className="col-6">
                <div className="col-12">
                <Card title="Import" variant="green" >
                <Line 
                    data={importData}

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
                                labelString: 'Export in Lakh bales',
                                fontSize:16,
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
                </Card>
                </div>
                <div className="col-12" >
                <table className="table table-striped table-bordered mt-3">
                    <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}
                }>
                        <tr>
                            <th>Year</th>
                            <th>Import(in Lakh Bales) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {actualImportData.map(pred=>(
                            <tr>
                                <td>{pred.date}</td>
                                <td>{pred.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div className="col-6">
                <div className="col-12">
                <Card title="Export" variant="green" >
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
                                labelString: 'Export in Lakh bales',
                                fontSize:16,
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
                </Card>
                </div>
                <div className="col-12" >
                <table className="table table-striped table-bordered mt-3">
                    <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                        <tr>
                            <th>Year</th>
                            <th>Export(in Lakh Bales) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {actualExportData.map(pred=>(
                            <tr>
                                <td>{pred.date}</td>
                                <td>{pred.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ImportExport;
