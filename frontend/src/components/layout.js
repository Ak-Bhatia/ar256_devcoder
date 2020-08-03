import React, { useContext, useEffect } from 'react';
import {NavigationContext} from "../contexts/navigation";
import "./layout.css";
import Home from './home/Home';
import Price from './price/price';
import Production from './production/production';
import Consumption from './Consumptioin/Consumption';
import ImportExport from './importExport/ImportExport';
import FeedbackForm from './feedbackForm/FeedbackForm';
import LoginForm from './loginForm/loginForm';
import { CurUserContext } from '../contexts/curUser';


function Layout(props) {
    const {active,setActive} = useContext(NavigationContext);
    const {user,setUser} = useContext(CurUserContext);
    

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setUser({loggedIn:true});
        }
    },[])

    function logoutHandler(){
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        setUser({loggedIn:false});
    }

    return (
        <div className="app">
            <div className="sidebar border"></div>
            <div className="main border">
                {!user.loggedIn?
                <LoginForm/>
                :
                
                

                <div style={{marginBottom:"100px"}}>
                    <div className="topbar px-4 p-2 d-flex justify-content-between">
                        <div style={{width:"220px"}} >
                            {/* <div className="form-group input-group  mb-0">
                                <div className="input-group-prepend rounded bg-green text-white pl-3 pr-3 pt-1 h2 " ><i className="fa fa-language" ></i></div>
                                <select className="form-control"  >
                                    <option> English </option>
                                    <option> Hindi </option>
                                </select>
                               
                            </div> */}
                        </div>
                        <span className=" pointer"  onClick={logoutHandler}> 
                            <b>Logout </b>
                            <span className="h4"><i className=" fa fa-power-off"></i></span>
                        </span>
                    </div>
                {active==="Home" ? <Home/>:null}
                {active==="Price" ? <Price/>:null}
                {active==="Production" ? <Production/>:null}
                {active==="Consumption" ? <Consumption/> :null}
                {active==="importExport"?<ImportExport/>:null}
                {active==="FeedbackForm"?<FeedbackForm/>:null}
                {/* {active==="MSP"?<h1>MSP</h1>:null} */}
                </div>
                }
                <footer className="p-4 text-center " style={{backgroundColor:"rgb(190, 238, 218)",position:"absolute",bottom:"0",width:"100%"}}>
                    <b> Made With <i className="fa fa-heart text-danger"></i> By Team DevCoder </b>
                </footer>
            </div>
            <div className="sider">
                <div className={active==="Home"?"item active":"item"} onClick={()=>setActive("Home")} >
                    Home
                    <span className="nav-icon">  <i className="fa fa-home"></i> </span>
                </div>
                <div className={active==="Price"?"item active":"item"} onClick={()=>setActive("Price")}>
                    Price
                    <span className="nav-icon">  <i className="fa fa-inr"></i> </span>
                </div>
                <div className={active==="Production"?"item active":"item"} onClick={()=>setActive("Production")}>
                    Production
                    <span className="nav-icon">  <i className="fas fa-seedling"></i> </span>
                </div>
                <div className={active==="Consumption"?"item active":"item"} onClick={()=>setActive("Consumption")}>
                    Consumption
                    <span className="nav-icon">  <i className="fas fa-copyright"></i> </span>
                </div>
                <div className={active==="importExport"?"item active":"item"} onClick={()=>setActive("importExport")}>
                    Import Export
                    <span className="nav-icon">  <i className="fas fa-exchange-alt"></i> </span>
                </div>
                <div className={active==="FeedbackForm"?"item active":"item"} onClick={()=>setActive("FeedbackForm")}>
                    Feedback Form
                    <span className="nav-icon">  <i className="fa fa-comments-o"></i> </span>
                </div>
                {/* <div className={active==="MSP"?"item active":"item"} onClick={()=>setActive("MSP")}>
                    MSP
                    <span className="nav-icon">  <i className="fas fa-money-bill"></i> </span>
                </div> */}
            </div>

        </div>
    )
}


export default Layout;

