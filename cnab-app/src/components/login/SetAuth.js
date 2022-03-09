import { useLocation, Navigate } from "react-router-dom";
import Cookie from 'js-cookie';

export const SetAuth = (props) => {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    Cookie.set('token', token);
    return <Navigate to="/dashboard" />
}