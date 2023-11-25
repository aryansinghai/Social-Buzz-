import { useContext, useRef, useState } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import {Link} from "react-router-dom"

export default function Login() {

    const email= useRef();
    const password= useRef();
    const {isFetching,dispatch}= useContext(AuthContext);
    const [isWrongPassword,setIsWrongPass]= useState(false);

    const handleClick =(e)=>{
        e.preventDefault();
        const loginResponse= loginCall(
            {email: email.current.value, password: password.current.value},
            dispatch
            );
        
        if(!loginResponse.success){
            setIsWrongPass(true);
        }
        else{
            setIsWrongPass(false);
        }
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Social Buzz</h3>
                <p className="loginDesc">Connect with friends and the world around you on Social Buzz!</p>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
                    <input placeholder="Password" type="password" minLength="6" className="loginInput" required ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching? <CircularProgress/> : "Log In"}</button>
                    {isWrongPassword && <p className="error-message">Wrong credendials! Please try again.</p>}
                    <Link to={"/register"}>
                        <button className="loginRegisterButton">{isFetching? <CircularProgress/> : "Create a new Account"}</button>
                    </Link>
                    
                </form>
            </div>
        </div>
        
    </div>
  )
}
