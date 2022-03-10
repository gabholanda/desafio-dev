import axios from 'axios';

class FileService {
    uploadFile = (file) => {
        const options = {
            url: `${process.env.REACT_APP_API_URL}/document/upload`,
            method: "POST",
            withCredentials: true,
            data: file
        }
        return axios(options)
            .then(res => res.data)
            .catch(this.errorHandler)
    }

    errorHandler = (error) => {
        throw error
    }

}

export default FileService;