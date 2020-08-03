import React from 'react';
import Card from '../ui/card/card';
import ProductionGraph from './graph';

function Production(props) {

    var actualData = [
        {"quantity":"332", "date":"2015-2016"},
        {"quantity":"345", "date":"2016-2017"},
        {"quantity":"370", "date":"2017-2018"},
        {"quantity":"337", "date":"2018-2019"},
        {"quantity":"360", "date":"2019-2020"},
        {"quantity":"395", "date":"2020-2021"},
        {"quantity":"382", "date":"2021-2022"},
        {"quantity":"389", "date":"2022-2023"},
        {"quantity":"421", "date":"2023-2024"},
        {"quantity":"423", "date":"2024-2025"}
    ];
        
        return (
        <div className="row mr-0 ml-0 justify-content-center">
        <div className="col-12 px-5 py-3" >
            <h1 className="title" >Production</h1>
            <hr/>
        </div>
        <div className="col-10">
        <Card title="Year Wise Cotton Production" variant="orange" >
            <ProductionGraph/>
        </Card>
        </div>
        <div className="col-6" >
        <table className="table table-striped table-bordered mt-3">
            <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                <tr>
                    <th>Year</th>
                    <th>Production(in Lakh Bales) </th>
                </tr>
            </thead>
            <tbody>
                {actualData.map(pred=>(
                    <tr>
                        <td>{pred.date}</td>
                        <td>{pred.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
    )
}

export default Production;
