import { Navigate, Outlet } from 'react-router-dom';
// import AuthService from '../../services/AuthService';

export const UnloggedRoute = (props) => {
    // if (AuthService.isNotAuthenticated())
        return <Outlet />
    // else
    //     return <Navigate to="logged" />

}
