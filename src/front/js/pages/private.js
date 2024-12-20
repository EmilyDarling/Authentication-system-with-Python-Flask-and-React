import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
    const {store, actions} = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState("Pending");

    useEffect(()=> {
        let authenticate = async () => {
            try{
                const result = await actions.isPrivate();
                setIsAuthenticated(result ? "Yes" : "No");
            }
            catch(error){
                console.error("Authentication Error!", error);
                setIsAuthenticated("No");
            }
        };
        authenticate();
         }, [actions]);

    switch(isAuthenticated){
        case "Pending":
        return(
            <div className="text-center mt-5">
                   <h2>Authentication Pending</h2>
                </div>
            )
        case "Yes":
            return(
                <div className="text-center mt-5">
                    <h2>This is YOUR private page</h2>
                </div>
            )
        case "No":
            return(
                <div className="text-center mt-5">
                    <h2>This is a private page, please login to see</h2>    
                    <Link to="/login"><p>Login</p></Link>
                </div>
            )
    }

}