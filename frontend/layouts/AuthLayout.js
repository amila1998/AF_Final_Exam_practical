import React, { useState } from 'react'
import Login from '../components/login/Login.js'
import Register from '../components/register/Register.js'

const AuthLayout = () => {

    const [login,setLogin]=useState(true);
    const [regiser,setRegister]=useState(false);

    const loginHandler = ()=>{
        setLogin(!login);
        setRegister(!regiser);
    }




  return (
    <div>
        {
            login&&<Login/>
        }
        {
            regiser&&<Register/>
        }
    <div>
        <button onClick={loginHandler}>{login&&"REGISTER"}{regiser&&"LOGIN"}</button>
    </div>

    </div>
  )
}

export default AuthLayout