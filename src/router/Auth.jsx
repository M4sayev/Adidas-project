import React from 'react'
import { Navigate } from 'react-router'

const Auth = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to='/login' />
}

export default Auth
