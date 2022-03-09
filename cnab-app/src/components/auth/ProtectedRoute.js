import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import AuthService from '../../services/AuthService';

export const ProtectedRoute = ({ component: Component, ...rest }) =>
    <Route {...rest}
        render={props => {
            if (AuthService.isAuthenticated())
                return <Component{...props} />
            else
                return <Navigate to='/' />
        }} />