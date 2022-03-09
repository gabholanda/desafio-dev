import axios from 'axios';

class DashboardService {

    getAllDocs = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getAllDocs`,
            method: "GET",
            withCredentials: true
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    getSingleCompanyDocs = (document) => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getSingleCompanyDocs`,
            method: "GET",
            withCredentials: true,
            params: document
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    getGroupedDocs = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getGroupedDocs`,
            method: "GET",
            withCredentials: true
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    errorHandler = (error) => {
        throw error
    }

}

export default DashboardService;