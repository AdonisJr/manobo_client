import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Select from 'react-select';

export default function AssistanceForm({ user, accessToken, setModal, getAnnouncements, selected, setSelected, getData, type }) {
    const [details, setDetails] = useState({ id: selected.id, status: selected.status, remarks: selected.remarks, family_tree: selected.family_tree })
    const [files1, setFiles1] = useState(null)

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

    const typeOpt = [
        { label: 'Not Submitted', value: 'Not Submitted' },
        { label: 'Submitted', value: 'Submitted' },
    ]

    const familyOpt = [
        { label: 'IN REVIEW', value: 'IN REVIEW' },
        { label: 'APPROVED', value: 'APPROVED' },
    ]

    const statusOpt = type === 'schoolarship' ?
        [
            { label: 'FOR APPROVAL', value: 'FOR APPROVAL' },
            { label: 'TERMINATED', value: 'TERMINATED' },
            { label: 'GRADUATED', value: 'GRADUATED' },
            { label: 'ON GOING', value: 'ON GOING' },
        ] :
        [
            { label: 'PENDING', value: 'PENDING' },
            { label: 'ON PROCESS', value: 'ON PROCESS' },
            { label: 'COMPLETED', value: 'COMPLETED' },
            { label: 'CANCELLED', value: 'CANCELLED' },
        ]

    const handleSubmit = async () => {
        if (type === 'certificate' || type === 'recommendation') {
            const filesData = new FormData();
            filesData.append('files', files1);

            // Append other form data fields
            Object.entries(details).forEach(([key, value]) => {
                filesData.append(key, value);
            });
            axios.put(`/${type}`, filesData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                showSuccessMessage(res.data.message);
                getData();
                setTimeout(() => {
                    setModal(false)
                    setSelected({})
                }, 2000);
            }).catch(error => {
                showErrorMessage(error.response.status + ", " + error.response.data.error);
            })
        } else {
            axios.put(`/${type}`, details, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                showSuccessMessage(res.data.message);
                getData();
                setTimeout(() => {
                    setModal(false)
                    setSelected({})
                }, 2000);
            }).catch(error => {
                showErrorMessage(error.response.status + ", " + error.response.data.error);
            })
        }

    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 inset-0 z-50 outline-none focus:outline-none">
                <ToastContainer />

                <div className='relative bg-white w-3/6 p-8  rounded-lg flex flex-col gap-2 h-5/6 overflow-y-auto'>
                    <p className='font-bold text-lg text-slate-600 pb-5'> Update Assistance </p>

                    <p className='absolute top-1 right-2 text-lg cursor-pointer text-red-700 font-bold hover:text-red-600 duration-200'
                        onClick={(e) => [setSelected(), setModal(false)]}>X
                    </p>

                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='ps-2'>I.D</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                onChange={(e) => setDetails({ ...details, id: e.target.value })}
                                value={details.id}
                                disabled
                            />
                        </div>
                    </div>
                    {/* SCHOOLARSHIP */}
                    <div className={`flex gap-2 ${type === 'schoolarship' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={selected.application_letter ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Grades</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={selected.grades ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Family Tree</label>
                            <Select
                                options={familyOpt}
                                value={{ label: details.family_tree, value: details.family_tree }}
                                onChange={(e) => setDetails({ ...details, family_tree: e.value })}
                            />
                        </div>
                    </div>
                    {/* MEDICAL */}
                    <div className={`flex gap-2 ${type === 'medical' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={selected.application_letter ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Medical Abstract</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={selected.medical_abstract ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                    </div>

                    {/* BURIAL */}
                    <div className={`flex gap-2 ${type === 'burial' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={details.application_letter ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Death Certificate</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={details.death_certificate ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Brgy. Indigency</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={details.indigency ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Valid I.D</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                value={details.valid_id ? 'Submitted' : 'Not Submitted'}
                                disabled
                            />
                        </div>
                    </div>

                    {/* CERTIFICATION OR RECOMMENDATION */}
                    <div className={`flex flex-col gap-2 ${type === 'certificate' || type === 'recommendation' ? '' : 'hidden'}`}>
                        <div className='flex gap-2'>
                            <div className='flex flex-col gap-1 w-3/6'>
                                <label className='ps-2'>Application Letter</label>
                                <input type="text"
                                    placeholder='Type'
                                    className='py-1 px-2 border-2 border-neutral-500 w-full'
                                    value={details.application_letter ? 'Submitted' : 'Not Submitted'}
                                    disabled
                                />
                            </div>
                            <div className='flex flex-col gap-1 w-3/6'>
                                <label className='ps-2'>Family Tree</label>
                                <Select
                                    options={typeOpt}
                                    value={{ label: details.family_tree, value: details.family_tree }}
                                    onChange={(e) => setDetails({ ...details, family_tree: e.value })}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center gap-2'>
                            <p className='ps-2'>Application Letter</p>
                            <input
                                type="file"
                                className="px-3 py-1 rounded-md w-5/6"
                                onChange={(e) => setFiles1(e.target.files[0])}
                            />
                        </div>


                    </div>

                    <div className='flex flex-col gap-1 w-3/6'>
                        <label className='ps-2'>Status</label>
                        <Select
                            options={statusOpt}
                            value={{ label: details.status, value: details.status }}
                            onChange={(e) => setDetails({ ...details, status: e.value })}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='ps-2'>Remarks</label>
                        <input type="text"
                            placeholder='Remarks'
                            className='py-1 px-2 border-2 border-neutral-500 w-full'
                            onChange={(e) => setDetails({ ...details, remarks: e.target.value })}
                            value={details.remarks}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button className='w-4/6 mt-5 p-2 bg-emerald-500 font-bold text-white hover:bg-emerald-600 duration-200'
                            onClick={handleSubmit}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full h-full fixed top-0 left-0 bg-indigo-900 z-40 opacity-40'>

            </div>
        </>

    )
}
