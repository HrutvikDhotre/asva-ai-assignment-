import React, { useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const { isLoggedIn, setIsLoggedIn } = useStateContext()

    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'


    return loggedIn ? <Outlet /> : <Navigate to='/' />

}

export default ProtectedRoutes