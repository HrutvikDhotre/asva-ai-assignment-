import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
// import { TbRectangleFilled } from "react-icons/fa6";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TbRectangleFilled } from "react-icons/tb";
import { useStateContext } from '../contexts/ContextProvider';
import { IoIosLogOut } from "react-icons/io"
import { Navigate, useNavigate } from 'react-router-dom';
// import { useStateContext } from 'react';
import ThemeDropdown from './ThemeDropdown';

const Navbar = () => {
  const { setActiveMenu, currentColour, setColour, name } = useStateContext()
  const [themeBlock, setThemeBlock] = useState(false)
 const navigate = useNavigate()
  const handleLogout = ()=>{
      localStorage.setItem('isLoggedIn','false')
      navigate('/')
  }

  return (
    <div className='my-3 mx-4'>
      <button>
        <GiHamburgerMenu
          className='fs-4'
          style={{ color: currentColour }}
          onClick={() => setActiveMenu((prev) => !prev)}
        />
      </button>



      <button
        className='float-end ms-1 me-4'
        onClick={handleLogout}
      >
        <IoIosLogOut
          className='fs-3 fw-bolder'
          style={{
            color: 'red'
          }}
        />
      </button>

      <span className='float-end me-2 ms-0'><ThemeDropdown/></span>

      {/* <button
        className='float-end mx-2'
        onClick={() => { setThemeBlock((prev) => !prev) }}
      >
        <TbRectangleFilled
          className='fs-3'
          style={{
            color: currentColour
          }}
        />
        
        <MdOutlineArrowDropDown style={{
          color: 'black',
          fontSize: '1rem' 
        }} />
      </button> */}

      {/* <div
        className='float-end  flex-column justify-content-center align-items-center py-2'
        style={{
          position: 'absolute',
          top: '2.7rem',
          right: '5.3rem',
          width: '3rem',
          border: '.5px solid gray',
          backgroundColor: 'white',
          borderRadius: '0.2rem',
          display: themeBlock ? 'flex' : 'none'
        }}
      >
        <TbRectangleFilled
          className='fs-4'
          style={{
            color: '#72CC50'
          }}
          onClick={() => setColour('#72CC50')}
        />
        <TbRectangleFilled
          className='fs-4'
          style={{
            color: '#03C9D7'
          }}
          onClick={() => setColour('#03C9D7')}
        />
        <TbRectangleFilled
          className='fs-4'
          style={{
            color: '#1E4DB7'
          }}
          onClick={() => setColour('#1E4DB7')}
        />
        <TbRectangleFilled
          className='fs-4'
          style={{
            color: '#FB9678'
          }}
          onClick={() => setColour('#FB9678')}
        />
      </div> */}

      {/* <span className='float-end mx-3 mt-1 fw-bold'>{`Hello, User`}
      </span> */}
    </div>
  )
}

export default Navbar