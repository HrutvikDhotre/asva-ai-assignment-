import React, { Children, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useStateContext } from '../contexts/ContextProvider'
import '../styles/layout.css'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    const { activeMenu, setActiveMenu, screenSize, setScreenSize, setCurrentColour,
        backgroundEffect } = useStateContext()

    // const [backgroundEffect, setBackgroundEffect] = useState(false)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])



    // const inputTags = document.querySelectorAll('input')
    // const selectTags = document.querySelectorAll('select')
    // // backgroundEffect ?  .style.backgroundColor = 'rgba(0, 0, 0, 0.5)' : 'transparent'

    // inputTags.forEach(function (input) {
    //     backgroundEffect ? input.style.backgroundColor = 'rgba(0, 0, 0, 0)' : 'transparent'
    // })
    // selectTags.forEach(function (input) {
    //     backgroundEffect ? input.style.backgroundColor = 'rgba(0, 0, 0, 0)' : 'transparent'
    // })

    const bodyStyles = {
        marginLeft: activeMenu && screenSize > 576 ? '20%' : '0',
        flexGrow: '2',
        flexShrink: '2',
        backgroundColor: 'white',
        height: '100vh',
        pointerEvents: backgroundEffect ? 'none' : '',
        overflow: backgroundEffect ? 'hidden' : '',
    }

    const navStyles = {
        width: activeMenu && screenSize > 576 ? '80%' : '100%',
        flexGrow: '2',
        flexShrink: '2',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        // backgroundColor: 'white',
        backgroundColor: 'white',
        // filter: backgroundEffect ? 'blur(1px)' : 'none',
        pointerEvents: backgroundEffect ? 'none' : ''
    }

    const sideBarStyles = {
        color: 'black',
        boxShadow: '0 7px 30px 0 hsla(210,7%,48%,.11)',
        backgroundColor: 'white',
        pointerEvents: backgroundEffect ? 'none' : ''
    }

    const updateBreakpoint = () => {
        if (window.innerWidth < 960) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    };

    useEffect(() => {
        updateBreakpoint()
        window.addEventListener("resize", updateBreakpoint)
        return () => {
            window.removeEventListener("resize", updateBreakpoint)
        }
    }, [])


    return (
        <div className='d-flex position-relative '>
            {activeMenu &&
                <div className='sidebar' style={sideBarStyles}>
                    <Sidebar />
                </div>
            }

            <div style={bodyStyles} className='sideBody'>
                <div
                    className='navBar'
                    style={navStyles}
                >
                    <Navbar />
                </div>
                <div className='pb-5' style={{ marginTop: '60px' }}>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Layout