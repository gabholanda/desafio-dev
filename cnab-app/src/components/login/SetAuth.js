import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Cookie from 'js-cookie';

export const SetAuth = ({ service }) => {
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    Cookie.set('token', token);
    service.loggedin();
    return <Navigate to="/dashboard/show" />
}