import React,{createContext,useState} from "react";

export const CurUserContext= createContext();

const CurUserProvider = (props)=>{
    const [user,setUser] = useState({loggedIn:false});

    return (
        <CurUserContext.Provider value={{user,setUser}}>
            {props.children}
        </CurUserContext.Provider>
    )
};

export default CurUserProvider;
