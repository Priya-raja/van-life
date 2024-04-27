import React,{useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { loginUser } from "../api"

const Login = () => {
    const [loginFormData, setLoginFormData]  = useState({email:'',password:''})
    const location = useLocation()
    function handleSubmit(e) {
        e.preventDefault()
        loginUser(loginFormData)
            .then(data => console.log(data))
        
    }

    const handleChange =(e) =>{
     const {name,  value } = e.target
     setLoginFormData(prev => ({
        ...prev,
        [name]:value
     }))
    }
  return (
    <div className="login-container">

            {
                location.state?.message &&
                <h3 className="login-first">{location.state.message}</h3>
            }
            <h1>Sign in to your account</h1>
        <form onSubmit={handleSubmit} className="login-form">
          
            <input 
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            value={loginFormData.email}
            />
            
            <input 
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={loginFormData.password}
            />
           
            <button>Log in</button>
        </form>
      
    </div>
  )
}

export default Login
