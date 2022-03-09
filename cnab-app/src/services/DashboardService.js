import axios from 'axios';

class DashboardService {
    constructor() {
    }

    getAllDocs = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getAllDocs`,
            method: "GET"
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    getSingleCompanyDocs = (document) => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getSingleDoc`,
            method: "GET",
            data: {
                ...document
            }
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    getGroupedDocs = () => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/getGroupedDocs`,
            method: "GET"
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