import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export default function AnnouncementForm({ user, accessToken, setModal, getAnnouncements, selected, setSelected }) {
    const [selectedFile, setSelectedFile] = useState();
    const [imagePreview, setImagePreview] = useState(selected?.url ? `http://localhost:3001/${selected.url}` : '');
    const [details, setDetails] = useState(selected ? selected : [])

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('user_id', user.id);
        formData.append('title', details.title);
        formData.append('content', details.content);
        formData.append('footer', details.footer);

        if (selected) {
            axios.put(`/announcement?id=${selected.id}&title=${details.title}&content=${details.content}&footer=${details.footer}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                showSuccessMessage(res.data.message);
                getAnnouncements();
                setSelected()
                setTimeout(() => {
                    setModal(false)
                }, 2000);
            }).catch(error => {
                showErrorMessage(error.response.status + ", " + error.response.data.error);
            })
        } else {
            axios.post('/announcement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                }
            }).then(res => {
                showSuccessMessage(res.data.message);
                getAnnouncements();
                setTimeout(() => {
                    setModal(false)
                }, 2000);
            }).catch(error => {
                showErrorMessage(error.response.status + ", " + error.response.data.error);
            })
        }




    }

    useEffect(() => {
        console.log(selectedFile)
    }, [selectedFile])
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 inset-0 z-50 outline-none focus:outline-none">
                <ToastContainer />
                <div className='relative bg-white w-3/6 p-8 rounded-lg flex flex-col gap-2 h-full overflow-y-auto'>
                    <p className='font-bold text-lg text-slate-600 pb-5'>{!selected ? 'Create' : 'Update'} announcement content</p>
                    <p className='absolute top-1 right-2 text-lg cursor-pointer text-red-700 font-bold hover:text-red-600 duration-200'
                        onClick={(e) => [setSelected(), setModal(false)]}>X
                    </p>
                    <div className='flex flex-col gap-2'>
                        <input type="text" placeholder='Title' className='py-1 px-2 border-2 border-neutral-500 w-full'
                            onChange={(e) => setDetails({ ...details, title: e.target.value })} value={details.title} />

                        <textarea rows={4} placeholder='Content' className='py-1 px-2 border-2 border-neutral-500 w-full'
                            onChange={(e) => setDetails({ ...details, content: e.target.value })} value={details.content} />
                    </div>
                    <div className='flex flex-col gap-2 border-2 border-slate-200 p-1'>
                        <img
                            // src={selectedFile ? imagePreview : 'http://localhost:3000/default.jpg'} 
                            src={imagePreview}
                            className='w-full' alt='Image' />
                        <input type="file" onChange={handleFileChange} className='cursor-pointer' />
                    </div>
                    <div>
                        <textarea rows={4} placeholder='Footer' className='py-1 px-2 border-2 border-neutral-500 w-full'
                            onChange={(e) => setDetails({ ...details, footer: e.target.value })} value={details.footer} />
                    </div>
                    <div>
                        <button onClick={handleSubmit}
                            className='bg-emerald-400 text-white font-bold p-2 w-full hover:bg-emerald-500 duration-200'>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
            <div className='w-full h-full fixed top-0 left-0 bg-emerald-900 z-40 opacity-40'>

            </div>
        </>

    )
}
