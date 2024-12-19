import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = sessionStorage.getItem("token");

    const handleClick = () => {
        const opts = {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        fetch('https://fictional-yodel-r74v4v99jx93xxjr-3001.app.github.dev/api/token', opts)
            .then(resp =>{
                if(resp.status === 200) return resp.json();
                else alert("There has been and error!");
            })
            .then(data => {
                sessionStorage.setItem("token", data.access_token);
            })
            .catch(error=>{
                console.error("Error! ", error);
            })
    }

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            {(token && token!="" && token!=undefined) ? "you are not logged in with token":
                <div>
                    <input type="text" value={email} onChange={e=> setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}></input>
                    <button onClick={handleClick}>Login</button>
                </div>
            }
        </div>
    );
};
