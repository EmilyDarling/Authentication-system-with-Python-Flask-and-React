import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/home.css";
 

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   // const token = sessionStorage.getItem("token");
    const navigate = useNavigate();


    const handleClick = () => {
        console.log("Token! ", store.token);
        actions.login(email, password)//.then(() =>{
           // navigate("/")
       // })
    };

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            {store.token && store.token!="" && store.token!=undefined ? ("you are not logged in with token" + store.token):
                (<div>
                    <input type="text" value={email} onChange={e=> setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
                    <button onClick={handleClick}>Login</button>
                </div>)
            }
        </div>
    );
};
