import { useState } from 'react';
import FileService from '../../services/FileService';
import { Link } from 'react-router-dom';

const service = new FileService();
export const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [uploadedSuccess, setUploadedSuccess] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = async () => {
        try {
            const formData = new FormData();
            formData.append("cnab", selectedFile);
            formData.append("parser", "cnab");
            await service.uploadFile(formData);
            setUploadedSuccess(true);
            setTimeout(() => setUploadedSuccess(false), 5000);
        } catch (error) {
            setUploadedSuccess(false);
        }
    };

    return (
        <div className="file-container">
            <h2>File Uploader</h2>
            <div className="form">
                <input type="file" name="file" id="file-upload" onChange={changeHandler} />
                <button onClick={handleSubmission} id="file-submit">Submit</button>
                {uploadedSuccess && <div>File uploaded successfully!</div>}
            </div>
            <Link to="/dashboard/show" className='link'>Dashboard</Link>
        </div>
    )
}