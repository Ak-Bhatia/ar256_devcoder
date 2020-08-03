import React,{createContext,useState} from "react";

export const NavigationContext= createContext();

const NavContextProvider = (props)=>{
    const [active,setActive] = useState("Home");

    return (
        <NavigationContext.Provider value={{active,setActive}}>
            {props.children}
        </NavigationContext.Provider>
    )
};

export default NavContextProvider;
