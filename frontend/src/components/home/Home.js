import React, { useContext } from 'react'
import Card from '../ui/card/card'
import { NavigationContext } from '../../contexts/navigation';
import ProductionGraph from '../production/graph';
import ExportGraph from '../importExport/ExportGraph';
import ConsumptionGraph from '../Consumptioin/ConsumptionGraph';
import PriceGraph from '../price/priceGraph';

function Home(props) {
    const {setActive} = useContext(NavigationContext);
    return (
        <div className="row mr-0 ml-0 " >
            <div className="col-12 px-lg-5 pl-5  py-3" >
                <h1 className="title" >Home</h1>
                <hr/>
            </div>
            <div className="col-lg-6 p-3 pl-5" >
                <Card variant="green" title="Price" detailHandler={()=>setActive("Price")} >
                    {/* Put Graph Here */}
                    <PriceGraph/>
                </Card>
            </div>
            <div className="col-lg-6 p-3 pl-5 pl-lg-3 pr-lg-5" >
                <Card variant="orange" title="Production" detailHandler={()=>setActive("Production")} >
                    {/* Put Graph Here */}
                    <ProductionGraph small={true} />
                </Card>
            </div>
            <div className="col-lg-6 p-3 pl-5" >
                <Card variant="orange" title="Consumption" detailHandler={()=>setActive("Consumption")} >
                    <ConsumptionGraph small={true} />
                </Card>
            </div>
            <div className="col-lg-6 p-3 pl-5 pl-lg-3 pr-lg-5" >
                <Card variant="green" title="Import/ Export" detailHandler={()=>setActive("importExport")} >
                    <ExportGraph/>
                </Card>
            </div>
            
            
        </div>
    )
}


export default Home;

