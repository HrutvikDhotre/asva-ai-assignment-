import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import '../styles/loader.css'
import {Spin} from 'antd'

const Loader = ({ loaderText }) => {

    const { currentColour, themeMode, setBackgroundEffect, backgroundEffect, screenSize } = useStateContext()

    return (
        <>
            {/* {toBeShown && (
                <div style={{
                    position: 'fixed',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: '101',
                    width: '100%',
                    height: '100%',
                    top: '0',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div
                        className='deleteForm p-3'
                        style={{

                            backgroundColor: 'white',
                            borderRadius: '6px',
                            width: screenSize > 576 ? '500px' : '300px',
                            pointerEvents: 'auto',
                        }}>
                        <div className="spinner"></div>
                    </div>
                </div>)} */}

            {/* {toBeShown && ( */}
            <div className="loader-container">
                <div className="loader-content"
                    style={{
                        width: screenSize > 576 ? '400px' : '250px',
                    }}>
                    <div className='content'>
                        <div className='mb-4'>{loaderText}</div>
                        {/* <div className="spinner"></div> */}
                        <Spin size="large"/>
                    </div>
                    {/* Optional: Additional content within the loader */}
                </div>
            </div>
            {/* )} */}
        </>
    )
}

export default Loader