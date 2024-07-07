import React, { useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import '../styles/summarizer.css';

const History = () => {
    const { currentColour } = useStateContext();
    const buttonRef = useRef(null);

    const handleClick = () => {
        buttonRef.current.click();
    };

    useEffect(() => {
        handleClick();
    }, []);

    return (
        <>
            <div
                className='mb-3 px-5 py-3'
                style={{
                    marginTop: '60px',
                    position: 'relative',
                }}
            >
                <div>
                    <div className='hallContainer'>
                        <NavLink
                            ref={buttonRef}
                            to={`/history/url`}
                            className='p-3 text-center'
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                borderBottom: isActive ? `2px solid ${currentColour}` : '',
                                color: 'black',
                                fontWeight: isActive ? 'bolder' : '',
                            })}
                        >
                            URL History
                        </NavLink>
                        <NavLink
                            id='first'
                            to={`/history/text`}
                            className='p-3 text-center flex align-content-center'
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                borderBottom: isActive ? `2px solid ${currentColour}` : '',
                                color: 'black',
                                fontWeight: isActive ? 'bolder' : '',
                            })}
                        >
                            Text History
                        </NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default History;
