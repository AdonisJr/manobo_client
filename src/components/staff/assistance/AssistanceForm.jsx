import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Select from 'react-select';

export default function AssistanceForm({ user, accessToken, setModal, getAnnouncements, selected, setSelected, getData }) {
    const [details, setDetails] = useState(selected)

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

    const statusOpt = [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'ON PROCESS', value: 'ON PROCESS' },
        { label: 'COMPLETED', value: 'COMPLETED' },
        { label: 'CANCELLED', value: 'CANCELLED' },
    ]

    const handleSubmit = async () => {
        axios.put(`/assistance`, details, {
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

        return console.log(selected)
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 inset-0 z-50 outline-none focus:outline-none">
                <ToastContainer />

                <div className='relative bg-white w-3/6 p-8  rounded-lg flex flex-col gap-2 h-4/6 overflow-y-auto'>
                    <p className='font-bold text-lg text-slate-600 pb-5'> Update Assistance </p>

                    <p className='absolute top-1 right-2 text-lg cursor-pointer text-red-700 font-bold hover:text-red-600 duration-200'
                        onClick={(e) => [setSelected(), setModal(false)]}>X
                    </p>

                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>I.D</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                onChange={(e) => setDetails({ ...details, id: e.target.value })}
                                value={details.id}
                                disabled
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Type</label>
                            <input type="text"
                                placeholder='Type'
                                className='py-1 px-2 border-2 border-neutral-500 w-full'
                                onChange={(e) => setDetails({ ...details, type: e.target.value })}
                                value={details.type}
                                disabled
                            />
                        </div>
                    </div>
                    {/* SCHOOLARSHIP */}
                    <div className={`flex gap-2 ${selected.type === 'schoolarship' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.application_letter, value: details.application_letter }}
                                onChange={(e) => setDetails({ ...details, application_letter: e.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Grades</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.grades, value: details.grades }}
                                onChange={(e) => setDetails({ ...details, grades: e.value })}
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
                    {/* MEDICAL */}
                    <div className={`flex gap-2 ${selected.type === 'medical' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.application_letter, value: details.application_letter }}
                                onChange={(e) => setDetails({ ...details, application_letter: e.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Medical Abstract</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.medical_abstract, value: details.medical_abstract }}
                                onChange={(e) => setDetails({ ...details, medical_abstract: e.value })}
                            />
                        </div>
                    </div>

                    {/* BURIAL */}
                    <div className={`flex gap-2 ${selected.type === 'burial' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.application_letter, value: details.application_letter }}
                                onChange={(e) => setDetails({ ...details, application_letter: e.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Death Certificate</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.death_certificate, value: details.death_certificate }}
                                onChange={(e) => setDetails({ ...details, death_certificate: e.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Brgy. Indigency</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.indigency, value: details.indigency }}
                                onChange={(e) => setDetails({ ...details, indigency: e.value })}
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Valid I.D</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.valid_id, value: details.valid_id }}
                                onChange={(e) => setDetails({ ...details, valid_id: e.value })}
                            />
                        </div>
                    </div>

                    {/* CERTIFICATION OR RECOMMENDATION */}
                    <div className={`flex gap-2 ${selected.type === 'certification' || selected.type === 'recommendation' ? '' : 'hidden'}`}>
                        <div className='flex flex-col gap-1 w-3/6'>
                            <label className='ps-2'>Application Letter</label>
                            <Select
                                options={typeOpt}
                                value={{ label: details.application_letter, value: details.application_letter }}
                                onChange={(e) => setDetails({ ...details, application_letter: e.value })}
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
