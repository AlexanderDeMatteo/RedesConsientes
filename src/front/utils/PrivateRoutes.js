import React from "react"
import { Outlet, Navigate } from 'react-router-dom'
import { hasValidToken } from './AuthTokenUtil'

const PrivateRoutes = () => {
    let auth = hasValidToken()
    return(
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes