import React, { useState, useContext } from 'react';
import Modal from "../ui/modal/modal.js";
import Axios from 'axios';
import { CurUserContext } from '../../contexts/curUser.js';

function LoginForm(props) {
    const [isLogin,setIsLogin] = useState(true);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {setUser} = useContext(CurUserContext);


    function authHandler(e){
        e.preventDefault();
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0ZH9Q8hD0BFGIhwQ6BnLC9lBmmNJJAcg";
        if(isLogin){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0ZH9Q8hD0BFGIhwQ6BnLC9lBmmNJJAcg";
        }
        Axios.post(url,{
            email:email,
            password:password,
            returnSecureToken:true
        }).then(res=>{
            localStorage.setItem("token",res.data.idToken);
            localStorage.setItem("userID",res.data.localId);
            setUser({loggedIn:true});
        }).catch(err=>{
            console.log(err);
            
            alert(err.message);
        })
    }


    return (
        <Modal title={isLogin?"Login":"Register"} >
            <form style={{marginLeft:"auto",maxWidth:"400px",marginRight:"auto"}} onSubmit={authHandler} >
                <div className={"form-group"}>
                <input type="email" className="form-control form-control-lg text-center"  id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                <input type="password" className="form-control form-control-lg text-center" id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                
                <button className="btn btn-block btn-outline-green text-center" > {isLogin?"Login":"Register"} </button>
                {isLogin?<p><b className="pointer" onClick={()=>setIsLogin(false)} >Not Logined? Click Here to Register</b></p>
                :<p><b className="pointer" onClick={()=>setIsLogin(true)} >Already Registered? Click Here to Login</b></p>}


            </form>
        </Modal>
    )
}


export default LoginForm;

