import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link  } from 'react-router-dom';
import "../../styles/home.css";
 

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   // const token = sessionStorage.getItem("token");
    const navigate = useNavigate();


    const handleClick = async (event) => {
        event.preventDefault();
        
       const resp = await actions.login(email, password);
       if(resp){
        console.log("Login successful");
        console.log("Token! ", store.token);
        navigate("/private");
       } else {
        console.log("Login failed! ");
       }
    
    };

    return(
    <div>
        <div className="text-center mt-5">
                <p>
                    <button><Link to="/signup">Sign Up Here!</Link></button>
                </p>
            </div>
        <div className="text-center mt-5">
            <h1>Login</h1>
            {store.token && store.token!="" && store.token!=undefined ? ("you are not logged in with token" + store.token):
                (<div>
                    <input type="text" placeholder= "email" value={email} onChange={e=> setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
                    <button onClick={handleClick}>Login</button>
                </div>)
            }
        </div>

            
</div>
    );
};
