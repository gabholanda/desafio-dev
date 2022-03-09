import { Navigate, Outlet } from 'react-router-dom';

export const UnloggedRoute = (props) => {
    if (props.service.isNotAuthenticated())
        return <Outlet />
    else
        return <Navigate to="dashboard" />
}
