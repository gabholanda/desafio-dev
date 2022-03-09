import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie'
class AuthService {
    constructor() { }

    login = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/auth/login`;
    }

    logout = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/auth/logout`,
            method: "POST"
        }
        return axios(options)
            .then(() => {
                this.isAuthed = false;
            })
            .catch(this.errorHandler)
    }

    loggedin = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/auth/loggedin`,
            method: "GET",
            withCredentials: true
        }
        return axios(options)
            .then((res) => {
                this.isAuthed = !!res.data;
            })
            .catch(this.errorHandler)
    }

    errorHandler = (error) => {
        throw error;
    }

    isAuthenticated = () => this.isAuthed === true;
    isNotAuthenticated = () => this.isAuthed === false;
}

export default AuthService;