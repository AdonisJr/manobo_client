import React, { useState, useEffect } from 'react'
import AnnouncementForm from './AnnouncementForm';
import axios from 'axios';
import Pagination from '../Pagination';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Announcement({ user, accessToken }) {
    const [isModalOpen, setModal] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [selected, setSelected] = useState();
    const [deleteSelected, setDeleteSelected] = useState();
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

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

    const getAnnouncements = async () => {
        await axios
            .get(`/announcement/all`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    limit: 5,
                }
            })
            .then((res) => {
                setAnnouncements(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
            });

    };

    const handleDelete = async (id, url) => {
        if (window.confirm(`Are you sure you want to delete this item (${id})?`)) {
            // Delete logic here
            await axios
                .delete(`/announcement?id=${id}&url=${url}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((res) => {
                    showSuccessMessage(res.data.data.message);
                    getAnnouncements();
                }).catch(error => {
                    showErrorMessage(error.response.status + ", " + error.response.data.error);
                })
        }
    }

    useEffect(() => {
        getAnnouncements();
    }, [currentPage])


    return (
        <div className='w-full bg-white shadow-lg p-4 rounded-lg'>
            <ToastContainer />
            {
                !isModalOpen ? "" :
                    <AnnouncementForm user={user} accessToken={accessToken} setModal={setModal} getAnnouncements={getAnnouncements} selected={selected} setSelected={setSelected} />
            }
            <div className='py-5 border-b-2 border-slate-200'>
                <p className='font-bold text-lg text-slate-500'>Family Tracer Management</p>
            </div>
            {/* <div className='py-2 flex gap-2 items-center'>
                <p className='ps-2'>Search:</p>
                <input
                    type="search"
                    placeholder="Taylor"
                    className="shadow-md px-3 py-1 w-2/6 rounded-md border-2 border-slate-400"
                value={credentials.first_name}
                onChange={(e) => setCredentials({ ...credentials, first_name: e.target.value })}
                />
            </div> */}

            <div className='flex justify-between py-4 border-b-2 border-slate-200 px-5 text-xs'>
                <p className='font-semibold p-2 text-sm'>CONTENT LIST</p>
                <button className='bg-indigo-500 text-white font-bold hover:bg-indigo-600 p-2 rounded-lg duration-200 w-20'
                    onClick={(e) => setModal(true)}>
                    ADD
                </button>
            </div>
            <div className='w-full overflow-x-scroll'>
                <table className='min-w-full table table-auto text-xs'>
                    <thead>
                        <tr className='bg-blue-50'>
                            <th className='p-2'>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Footer</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !announcements ? "" :
                                announcements.map(data => (
                                    <tr className='hover:bg-emerald-100'>
                                        <td className='p-1 text-center'>{data.id}</td>
                                        <td className='p-1 text-center font-semibold'>{data.title}</td>
                                        <td className='p-1 text-center'>{data.content}</td>
                                        <td className='p-1 text-center'>{data.footer}</td>
                                        <td className='p-1 text-center'>
                                            <img src={`http://localhost:3001/${data.url}`} alt='No Image' className='w-32' />
                                        </td>
                                        <td className='py-2 '>
                                            <div className='flex items-center cursor-pointer hover:underline'
                                                onClick={(e) => [setModal(true), setSelected(data)]}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-pencil-fill text-emerald-500 cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </svg>
                                                Edit
                                            </div>
                                            <div className='flex items-center cursor-pointer hover:underline pt-1'
                                                onClick={(e) => [handleDelete(data.id, data.url)]}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-trash2-fill text-red-500 cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                                </svg>
                                                Delete
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <div className='flex gap-5 justify-center w-full'>
                    <Pagination currentPage={currentPage} totalPages={totalPages} maxDisplay={9} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}
