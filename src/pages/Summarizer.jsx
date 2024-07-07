import React, { useEffect, useState, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import '../styles/summarizer.css'

const Summarizer = () => {
    const { currentColour, backgroundEffect } = useStateContext()
    const [summarizerType, setSummarizerType] = useState('text')
    const buttonRef = useRef(null)
    const handleClick = () => {
        buttonRef.current.click();
    }

    useEffect(() => {
        handleClick()
    },[])


    return (
        <>
            <div className='mb-3 px-5 py-3'
                style={{
                    marginTop: '60px',
                    // borderBottom: '1px solid rgba(0, 0, 0, 0.175)',
                    position: 'relative',
                    // display : backgroundEffect ? 'none' : ''
                    pointerEvents: backgroundEffect ? 'none' : ''
                }}>
                <div>
                    <div className='hallContainer' >
                        <NavLink
                            ref={buttonRef}
                            to={`/summarize/url`}
                            className='p-3 text-center'
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                borderBottom: isActive ? `2px solid ${currentColour}` : '',
                                color: 'black',
                                fontWeight: isActive ? 'bolder' : ''
                            })}
                            onClick={() => {
                                setSummarizerType('url')
                            }}
                        >
                            Fetch URL Data & Summarize
                        </NavLink>
                        <NavLink
                            id='first'
                            to={`/summarize/text`}
                            className='p-3 text-center flex align-content-center'
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                borderBottom: isActive ? `2px solid ${currentColour}` : '',
                                color: 'black',
                                fontWeight: isActive ? 'bolder' : '',
                            })}
                            onClick={() => {
                                setSummarizerType('text')
                            }}
                        >
                            Summarize Text
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />

        </>
    )
}

export default Summarizer