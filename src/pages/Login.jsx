import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
import {message} from 'antd'


const Login = () => {


  const { currentColour,  setIsLoggedIn,setUserEmail} = useStateContext();
  const [formData, setFormData] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  async function handleLogin(e) {
    try {
      e.preventDefault()
      if((formData.password === 'abcd@123' && formData.username === "abcd@gmail.com") ||
      (formData.password === 'xyz@123' && formData.username === "xyz@gmail.com")){
        setUserEmail(formData.username)
        setIsLoggedIn(true)
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/summarize/url')
      }else{
        message.error("Invalid email or password",3)
      }

    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleFocus(e) {
    e.target.style.border = `1.5px solid ${currentColour}`
    e.target.style.outline = `1.5px solid ${currentColour}`
  }

  function handleBlur(e) {
    e.target.style.border = ``
    e.target.style.outline = `none`
  }


  return (
    <>
      <div className='formContainer pb-5' style={{}}>
        <div className='p-0 my-3 fs-1 fw-bolder'>Login</div>

        <form onSubmit={handleLogin} className='p-0 m-0'>
          <div className='inputContainer'>
            <input
              required
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder='Email'
            ></input>
          </div>
          <p className='errorMsg' id='userNotFound'>User does not exist!</p>

          <div className='inputContainer'>
            <input
              required
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder='Password'
            ></input>
          </div>
          <p className='errorMsg' id='invalidPasswordOrEmail'>Invalid Email or Password</p>


          <div className='inputContainer'>
            <button
              type='submit'
              style={{
                backgroundColor: currentColour,
                width: '100%',
                borderRadius: '5px',
                height: '43px',
                fontSize: '20px',
                color: 'white'
              }}
            >Login</button>
          </div>

        </form>
      </div >
    </>
  )
}

export default Login