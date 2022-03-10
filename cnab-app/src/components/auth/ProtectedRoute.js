import { Outlet, Navigate } from 'react-router-dom'

export const ProtectedRoute = (props) => {
    if (props.service.isAuthenticated())
        return <Outlet />
    else
        return <Navigate to="/login" />
}