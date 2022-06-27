import React, { useState } from 'react'

const Login = () => {
    const [user,setUser]=useState({
        email:'',password:''
    })
    console.log("🚀 ~ file: login.js ~ line 7 ~ Login ~ user", user)

    const onChangeInput =(e)=>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }



    return (
        <div>
            <h1>LOGIN</h1>
            <div className='formbdy'>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Email</label>
                <input name='email' type="email" onChange={onChangeInput} defaultValue={user.email} className="form-control"  id="formGroupExampleInput" placeholder="Enter Email" />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Password</label>
                <input name='password' defaultValue={user.password} onChange={onChangeInput} type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter Password" />
            </div>
            <button  className='btn btn-outline-primary'>SUBMIT</button>
            <br/><br/><br/>
          
            </div>

        </div>
    )
}

export default Login