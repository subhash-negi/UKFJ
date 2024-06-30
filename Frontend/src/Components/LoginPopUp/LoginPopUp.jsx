import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import axios from "axios"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
const LoginPopUp = ({setShowLogin}) => {
    const {url,setToken,token}=useContext(StoreContext);
    const [currState,setCurrState]=useState("Sign Up")

    const [data,setData]=useState(
        {
           name:"",
           email:"",
           password:"" 
        }
    )
    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData((data)=>({...data,[name]:value}))
    } 
    const onLogin=async(e)=>{
        e.preventDefault();
        let newUrl=url;
        if(currState==="Login"){
            newUrl+="/api/user/Login"
        }
        else{
            newUrl+="/api/user/register"
        }

        const response=await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            console.log(token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }   
        else{
            alert(response.data.message)
        }
     }
  return (
    <div>
        <div className='login-popup'>
            <form onSubmit={onLogin}className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)}src={assets.cross_icon} alt=""/>
                </div>
                <div className="login-popup-inputs">
                    {
                        currState==="Sign Up" ?<input type="text" name="name" onChange={onChangeHandler} value={data.name}placeholder='your name' required /> :<></>
                    }                            
                    <input onChange={onChangeHandler} name="email" value={data.email}type="email" placeholder='Your email' required/>
                    <input onChange={onChangeHandler} name="password" value={data.password}type="password" placeholder='your password' required/> 
                </div>
                <button type="submit">{currState==="Sign Up" ? "Create Account":"Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required/>
                    <p>By continuing, i agree to the terms of use and privacy policy</p>
                </div>
                {currState=="Login"?
                  <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:
                    <p> Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    </div>
  )
}

export default LoginPopUp