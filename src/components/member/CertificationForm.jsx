import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CertificationForm({ user, accessToken, getCertification, setIsShowForm }) {
    const [datas, setDatas] = useState([])
    const [credentials, setCredentials] = useState(user);
    const [files1, setFiles1] = useState(null);

    // TOAST
    const showErrorMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
        });
    };
    const showSuccessMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files1) return showErrorMessage("Error, please upload file/image")

        const filesData = new FormData();
        filesData.append('files', files1);

        // Append other form data fields
        Object.entries(credentials).forEach(([key, value]) => {
            filesData.append(key, value);
        });

        await axios.post(`/certificate`, filesData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            showSuccessMessage(res.data.message)
            setFiles1(null)
            setTimeout(() => {
                getCertification();
                setIsShowForm(false)
            }, 1000)
        }).catch(error => {
            showErrorMessage(error.response.data.message)
        })
    }


    return (
        <>
            <div className='absolute top-0 left-0 flex w-full h-full p-10 justify-center items-center z-40'>

                <ToastContainer />
                <div className='relative flex flex-col gap-3 bg-white p-5 w-3/6 h-3/6 shadow-lg'>
                    <p className='text-lg font-bold'>Certification Form</p>
                    <p className='absolute top-3 right-5 text-lg cursor-pointer hover:text-slate-400 duration-200'
                        onClick={(e) => setIsShowForm(false)}
                    >x</p>
                    <div className='flex items-center justify-between pt-5 gap-2'>
                        <p className='ps-2'>Name</p>
                        <input
                            type="text"
                            placeholder="Taylor"
                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-5/6"
                            value={`${credentials.first_name + credentials.middle_name + " " + credentials.last_name}`}
                            disabled
                        />
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <p className='ps-2'>Application Letter</p>
                        <input
                            type="file"
                            className="px-3 py-1 rounded-md w-5/6"
                            onChange={(e) => setFiles1(e.target.files[0])}
                        />
                    </div>
                    <p className='py-2 text-white text-center bg-emerald-500 hover:bg-emerald-600 duration-200 cursor-pointer'
                        onClick={handleSubmit}>Submit</p>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-emerald-800 opacity-25 z-20'>

            </div>
        </>

    )
}
