import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context); 
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = async(event) => {
       event.preventDefault();
       const resp = await actions.signup(email, password);
       if(resp){
            navigate("/login");
       }else{
        setError(resp.msg || "Signup failed");
        console.error("Login failed", error);
       }
    }

    return(
        <div className="container text-center mt-5">
            <h1>Sign Up Here</h1>

            <div className="text-center mt-5">
                            <p>
                                <button><Link to="/login">Log in instead</Link></button>
                            </p>
                        </div>
                    <div className="text-center mt-5">
                        
                        
                            <div>
                                <input type="text" placeholder= "email" value={email} onChange={e=> setEmail(e.target.value)}></input>
                                <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
                                <button onClick={handleClick}>Signup!</button>
                            </div>
                        
                    </div>
        </div>
    );
};