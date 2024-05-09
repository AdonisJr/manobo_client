import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useReactToPrint } from 'react-to-print';
import OtherInfoForm from './OtherInfoForm';

export default function OtherInfo({ setInformation, isAdmin, user, setMemberSelected, accessToken, setSelected }) {
    const [credentials, setCredentials] = useState({ ...user, user_id: user.id });
    const [isUpdate, setIsUpdate] = useState(false)
    const [accountDetails, setAccountDetails] = useState(user)
    const [isFamily, setIsFamily] = useState(false);
    const [relationship, setRelationship] = useState(null);
    const [deleteSelected, setDeleteSelected] = useState(null);
    const printRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: `
            @media print {
                /* Hide the footer */
                @page {
                  size: full;
                  margin: 10mm;
                }
                body {
                  margin: 0;
                }
              }
            `,
    });
    // opt
    let barangayOpt = [
        {
            label: "Consuelo",
            value: "Consuelo"
        }, {
            label: "San Teodoro",
            value: "San Teodoro"
        }, {
            label: "Bunawan Brook",
            value: "Bunawan Brook"
        }, {
            label: "Libertad",
            value: "Libertad"
        }, {
            label: "San Andres",
            value: "San Andres"
        }, {
            label: "Imelda",
            value: "Imelda"
        }, {
            label: "Poblacion",
            value: "Poblacion"
        }, {
            label: "Mambalili",
            value: "Mambalili"
        }, {
            label: "Nueva Era",
            value: "Nueva Era"
        }, {
            label: "San Marcos",
            value: "San Marcos"
        }
    ];
    const genderOpt = [
        { label: 'male', value: "male" },
        { label: 'female', value: 'female' }
    ]
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

    // HANDLE FUNCTIONS

    const handlePhilhealth = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, philhealth: 1 })
        } else {
            setCredentials({ ...credentials, philhealth: 0 })
        }
    }
    const handleFourps = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, fourps: 1 })
        } else {
            setCredentials({ ...credentials, fourps: 0 })
        }
    }
    const handleSenior = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, senior_citizen: 1 })
        } else {
            setCredentials({ ...credentials, senior_citizen: 0 })
        }
    }
    const handlePensioner = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, pensioner: 1 })
        } else {
            setCredentials({ ...credentials, pensioner: 0 })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        !isUpdate ?
            await axios
                .post(`/otherInfo`, credentials, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    showSuccessMessage(res.data.message)

                    setTimeout(() => {

                    }, 2000)
                }).catch(error => {
                    showErrorMessage(error.response.data.error + error.response.data.message)
                }) :
            await axios
                .put(`/otherInfo`, credentials, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    showSuccessMessage(res.data.message)
                    if (accountDetails) {
                        axios.put(`/user?id=${accountDetails.id}`, accountDetails, {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        })
                    }

                    setTimeout(() => {
                        setSelected({})
                    }, 2000)
                }).catch(error => {
                    showErrorMessage(error.response.data.error + error.response.data.message)
                })


    }

    const handleDelete = async (id) => {
        if (!id) return
        await axios.delete(`/relationship?id=${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(res => {
            showSuccessMessage(res.data.message)
            setTimeout(() => {
                getRelationship();
            }, 1000)
        }).catch(error => {
            console.log(error)
        })
    }
    const getOtherInfo = async () => {
        await axios
            .get(`/otherInfo/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log(res.data.data)
                setCredentials(res.data.data[0])
                setIsUpdate(true)
            }).catch(error => {
                console.log(error.response.data.error + error.response.data.message)
                setIsUpdate(false)
            })
    }

    const getRelationship = async () => {
        await axios
            .get(`/relationship?user_id=${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setRelationship(res.data.data)
            }).catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getRelationship();
        getOtherInfo();
    }, [])
    return (
        <>
            <div className='z-30 absolute top-0 left-0 flex justify-center items-center w-screen h-screen p-5'>
                <ToastContainer />

                <div className='relative bg-white p-2 z-50 rounded-lg w-5/6 border-4 h-full overflow-y-scroll border-slate-200' ref={printRef}>
                    {
                        !isFamily ? "" :
                            <OtherInfoForm user={user} accessToken={accessToken} setIsFamily={setIsFamily} getRelationship={getRelationship} />
                    }
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x absolute top-3 right-3 cursor-pointer"
                        viewBox="0 0 16 16"
                        onClick={(e) => setInformation(false)}
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                    <div className='flex gap-10'>
                        <p className='text-lg font-semibold text-emerald-500'>Account Information |</p>
                        <button
                            className='flex gap-2 items-center hover:text-slate-600 duration-200'
                            onClick={handlePrint}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                            </svg>
                            Print
                        </button>
                    </div>
                    {/* sec1 */}
                    <div className='flex gap-2 py-2 border-t-2 border-slate-200'>
                        <div className="flex w-3/12 flex-col">
                            <label className="ps-2">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.first_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, first_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-3/12 flex-col">
                            <label className="ps-2">Middle Name</label>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.middle_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, middle_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.last_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, last_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Suffix</label>
                            <input
                                type="text"
                                placeholder="Jr"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.suffix}
                                onChange={(e) => setAccountDetails({ ...accountDetails, suffix: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                    </div>
                    {/* sec2 */}
                    <div className='flex gap-2 py-2 border-b-2 border-slate-200'>

                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Email</label>
                            <input
                                type="email"
                                placeholder="sample@gmail.com"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.email}
                                onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-3/12 flex-col">
                            <label className="ps-2">Barangay</label>
                            <Select
                                options={barangayOpt}
                                onChange={(e) => setAccountDetails({ ...accountDetails, barangay: e.value })}
                                value={{ label: accountDetails.barangay, value: accountDetails.barangay }}
                                isSearchable={true}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Gender</label>
                            <Select
                                options={genderOpt}
                                onChange={(e) => setAccountDetails({ ...accountDetails, gender: e.value })}
                                value={{ label: accountDetails.gender, value: accountDetails.gender }}
                                isSearchable={true}
                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Phone Number</label>
                            <input
                                type="text"
                                placeholder="090909090954"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.phone_number}
                                onChange={(e) => setAccountDetails({ ...accountDetails, phone_number: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Role</label>
                            <input
                                type="text"
                                placeholder="090909090954"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.role}
                                onChange={(e) => setAccountDetails({ ...accountDetails, role: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                    </div>
                    {/* FAMILY TREE */}
                    <div className='flex flex-col gap-2 border-b-2 p-2 py-4 border-slate-200'>
                        <div className='flex justify-between items-center pe-4'>
                            <p className='text-lg font-semibold text-emerald-500'>Family Tree</p>
                            <p className='text-xs font-bold bg-emerald-500 py-1 px-3 text-white rounded-md cursor-pointer hover:bg-emerald-600 duration-200'
                                onClick={(e) => setIsFamily(true)}
                            >ADD
                            </p>
                        </div>
                        <table>
                            <thead>
                                <tr className='bg-blue-50'>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Relationship</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !relationship ?
                                        <tr>
                                            <td></td>
                                            <td className='p-1'>No Data</td>
                                        </tr> :
                                        relationship.map(data => (
                                            <tr className='text-center bg-slate-50'>
                                                <td className='p-1'>{data.first_name}</td>
                                                <td className='p-1'>{data.middle_name}</td>
                                                <td>{data.last_name}</td>
                                                <td>{data.relationship}</td>
                                                <td>
                                                    <div className='flex items-center cursor-pointer'
                                                        onClick={(e) => handleDelete(data.rel_id)}>
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
                    </div>
                    {/* header2 */}
                    <div className=''>
                        <p className='text-lg font-semibold text-emerald-500'>Other Information</p>
                    </div>
                    {/* sec */}
                    <div className='flex gap-2 py-2 px-5 border-b-2 border-slate-200'>
                        <div className="flex w-2/12 flex-col">
                            <div className='flex flex-col items-center'>
                                <p className="ps-2">Petsa Gipanganak </p>
                                <p className="ps-2">(Date of Birth) </p>
                            </div>
                            <input
                                type="date"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                value={credentials.birth_date}
                                onChange={(e) => setCredentials({ ...credentials, birth_date: e.target.value })}

                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <div className='flex flex-col items-center'>
                                <p className="ps-2">Edad </p>
                                <p className="ps-2">(Age) </p>
                            </div>
                            <input
                                type="number"
                                placeholder="25"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.age}
                                onChange={(e) => setCredentials({ ...credentials, age: e.target.value })}

                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <div className='flex flex-col items-center'>
                                <p className="ps-2">Tribo </p>
                                <p className="ps-2">(Etno-linguistic Group) </p>
                            </div>
                            <input
                                type="text"
                                placeholder="sample"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.tribe}
                                onChange={(e) => setCredentials({ ...credentials, tribe: e.target.value })}
                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <div className='flex flex-col items-center'>
                                <p className="ps-2">Lugar nga Kagikan </p>
                                <p className="ps-2">(Place of Birth) </p>
                            </div>
                            <input
                                type="text"
                                placeholder="Davao City"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.birth_place}
                                onChange={(e) => setCredentials({ ...credentials, birth_place: e.target.value })}

                            />
                        </div>
                    </div>
                    {/* sec */}
                    <div className='flex gap-2 py-2 px-5 border-b-2 border-slate-200'>
                        {/*  */}
                        <div className="flex w-5/12 flex-col border-e-2 border-slate-200">
                            <div className='flex flex-col items-center font-bold'>
                                <p className="ps-2">Pag Rehistro sa Pagpanganak </p>
                                <p className="ps-2">(Birth Registration) </p>
                            </div>
                            <div className='flex gap-2 p-3'>
                                <div className='flex flex-col items-center h-32'>
                                    <p className='h-16 text-center'>Narehistro ba sa Local Civil Registry Office?</p>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            value={'1'}
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='birth_registration'
                                            onChange={(e) => setCredentials({ ...credentials, birth_registration: e.target.value })}
                                            checked={credentials.birth_registration === '1'}
                                        />Yes
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='birth_registration'
                                            value={'0'}
                                            onChange={(e) => setCredentials({ ...credentials, birth_registration: e.target.value })}
                                            checked={credentials.birth_registration === '0'}
                                        />No
                                    </div>
                                </div>
                                {/*  */}
                                <div className='flex flex-col items-center'>
                                    <p className='h-16 text-center'>Aduna bay gihawiran nga kopya sa birth certificate?</p>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='birth_copy'
                                            value={'1'}
                                            onChange={(e) => setCredentials({ ...credentials, birth_copy: e.target.value })}
                                            checked={credentials.birth_copy === '1'}
                                        />Yes
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='birth_copy'
                                            value={'0'}
                                            onChange={(e) => setCredentials({ ...credentials, birth_copy: e.target.value })}
                                            checked={credentials.birth_copy === '0'}
                                        />No
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/*  */}
                        <div className="flex w-7/12 flex-col">
                            <div className='flex flex-col items-center font-bold'>
                                <p className="ps-2">Kahimtang sa Kaminyoon </p>
                                <p className="ps-2">(Marital Status) </p>
                            </div>
                            <div className='flex gap-2 p-3'>
                                <div className='flex flex-col p-2 w-3/6 h-32'>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status1'
                                            value={'Single'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status1: e.target.value })}
                                            checked={credentials.marital_status1 === 'Single'}
                                        /> Single
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status1'
                                            value={'Married'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status1: e.target.value })}
                                            checked={credentials.marital_status1 === 'Married'}
                                        /> Married
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status1'
                                            value={'Separated/Annuled'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status1: e.target.value })}
                                            checked={credentials.marital_status1 === 'Separated/Annuled'}
                                        /> Separated/Annuled
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status1'
                                            value={'Live-in'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status1: e.target.value })}
                                            checked={credentials.marital_status1 === 'Live-in'}
                                        /> Live-in
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status1'
                                            value={'Unknown'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status1: e.target.value })}
                                            checked={credentials.marital_status1 === 'Unknown'}
                                        /> Unknown
                                    </div>
                                </div>
                                {/*  */}
                                <div className={`flex flex-col items-center ${credentials.marital_status1 !== 'Married' ? 'hidden' : ''}`}>
                                    <p className='h-16 text-center'>Kung Married, na rehistro ba sa Local Civil Registry?</p>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status2'
                                            value={'1'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status2: e.target.value })}
                                            checked={credentials.marital_status2 === '1'}
                                        />Yes
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status2'
                                            value={'0'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status2: e.target.value })}
                                            checked={credentials.marital_status2 === '0'}
                                        />No
                                    </div>
                                </div>
                                {/*  */}
                                <div className={`flex flex-col items-center ${credentials.marital_status1 !== 'Married' ? 'hidden' : ''}`}>
                                    <p className='h-16 text-center'>Kung Married, aduna bay gihawiran nga kopya sa mirriage cirtificate?</p>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status3'
                                            value={'1'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status3: e.target.value })}
                                            checked={credentials.marital_status3 === '1'}
                                        />Yes
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            placeholder="090909090954"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                            name='marital_status3'
                                            value={'0'}
                                            onChange={(e) => setCredentials({ ...credentials, marital_status3: e.target.value })}
                                            checked={credentials.marital_status3 === '0'}
                                        />No
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    {/*  */}
                    <div className='flex gap-2 py-2 px-5 border-b-2 border-slate-200'>

                        <div className="flex w-2/6 flex-col border-e-2 border-slate-200 px-2">
                            <div className='flex flex-col items-center font-bold'>
                                <p className="ps-2">Relihiyon </p>
                                <p className="ps-2">(Religios Affilation) </p>
                            </div>
                            <input
                                type="text"
                                placeholder="Roman Catholic"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.religion}
                                onChange={(e) => setCredentials({ ...credentials, religion: e.target.value })}

                            />
                        </div>
                        <div className="flex w-4/6 flex-col">
                            <div className='flex flex-col items-center font-bold'>
                                <p className="ps-2">Benificiary/Membership to Social Program & Services </p>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    placeholder="090909090954"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                    name='philhealth'
                                    onChange={handlePhilhealth}
                                    checked={credentials.philhealth == 1}
                                />Philhealth
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    placeholder="090909090954"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                    name='fourps'
                                    onClick={handleFourps}
                                    checked={credentials.fourps == 1}
                                />Pantawind Pamilya Pilipino Program
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    placeholder="090909090954"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                    name='senior_citizen'
                                    onClick={handleSenior}
                                    checked={credentials.senior_citizen == 1}
                                />Senior Citizen
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    placeholder="090909090954"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                    name='pensioner'
                                    onClick={handlePensioner}
                                    checked={credentials.pensioner == 1}
                                />Pensioner
                            </div>
                            <div className='flex gap-2 items-center w-full'>
                                <label>Uban pa (Others, spicify)</label>
                                <input
                                    type="text"
                                    placeholder="Benificiary Spicify"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-4/6"
                                    value={credentials.benificiary}
                                    onChange={(e) => setCredentials({ ...credentials, benificiary: e.target.value })}

                                />
                            </div>

                        </div>

                    </div>
                    {/*  */}
                    <div className='flex flex-col p-2 gap-2 border-b-2 border-slate-200'>
                        <div className='flex flex-col items-center pt-2 ps-5'>
                            <p className='font-bold'>ALANG SA NAG EDAD 5 HANGTUD 24 ANG PANUIGON</p>
                            <p className='font-semibold'>(For all persons 5 to 25 years old)</p>
                        </div>
                        <div className='flex w-full'>
                            <div className='w-3/6'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Pagtungha sa Eskwelahan </p>
                                    <p className="ps-2 font-semibold">(School Attendance) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex w-full flex-col items-center'>
                                        Kasamtangan ba siya nga nagtungha sa eskwelahan?
                                        <div className='flex gap-2'>
                                            <input
                                                type="radio"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                name='school_attendance1'
                                                value={'1'}
                                                onChange={(e) => setCredentials({ ...credentials, school_attendance1: e.target.value })}
                                                checked={credentials.school_attendance1 === '1'}
                                            />Yes
                                            <input
                                                type="radio"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                name='school_attendance1'
                                                value={'0'}
                                                onChange={(e) => setCredentials({ ...credentials, school_attendance1: e.target.value })}
                                                checked={credentials.school_attendance1 === '0'}
                                            />No
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-3/6'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Pangalan ug Address sa Eskwelahan nga Gitunghaan </p>
                                    <p className="ps-2 font-semibold">(Name and Address of School Attended) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='w-full flex gap-2 flex-col p-2 items-center'>
                                        Unsay pangalan ug address sa eskwelahan ngaiyang gitunghaan?
                                        <input
                                            type="text"
                                            placeholder="School Name"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                            value={credentials.school_name1}
                                            onChange={(e) => setCredentials({ ...credentials, school_name1: e.target.value })}

                                        />
                                        <input
                                            type="text"
                                            placeholder="School Address"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                            value={credentials.school_address1}
                                            onChange={(e) => setCredentials({ ...credentials, school_address1: e.target.value })}

                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex flex-col p-2 gap-2 border-b-2 items-center border-slate-200'>
                        <div className='flex flex-col items-center pt-2 ps-5 border-b-2 w-4/6 border-slate-100 p-2'>
                            <p className='font-bold'>ALANG SA NAG EDAD SUGOD 5 ANYOS PATAAS</p>
                            <p className='font-semibold'>(For all persons 5 years old and older)</p>
                        </div>
                        <div className='flex w-full'>
                            <div className='w-2/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Literacy</p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex w-full flex-col items-center'>
                                        Makahimo ba siya mobasa ug mosulat sa usa ka yano nga mensahe sa bisan unsang pinulongan o sinultian?
                                        <div className='flex gap-2'>
                                            <input
                                                type="radio"
                                                placeholder="090909090954"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                name='literacy'
                                                value={'1'}
                                                onChange={(e) => setCredentials({ ...credentials, literacy: e.target.value })}
                                                checked={credentials.literacy === '1'}
                                            />Yes
                                            <input
                                                type="radio"
                                                placeholder="090909090954"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                name='literacy'
                                                value={'0'}
                                                onChange={(e) => setCredentials({ ...credentials, literacy: e.target.value })}
                                                checked={credentials.literacy === '0'}
                                            />No
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Pinulongan </p>
                                    <p className="ps-2 font-semibold">(Dialect Spoken) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full flex flex-col p-2 items-center'>
                                            Unsa nga pinulongan ang iyang nahibaloan?
                                            <input
                                                type="text"
                                                placeholder="Dialect"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.dialect}
                                                onChange={(e) => setCredentials({ ...credentials, dialect: e.target.value })}

                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Naabot nga Grado ug Tuig Nahuman </p>
                                    <p className="ps-2 font-semibold">(Highest Grade/Year Completed) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full flex flex-col gap-2 p-2 items-center'>
                                            Unsay kinatas-ang grado/tuig nahuman?
                                            <input
                                                type="text"
                                                placeholder="Grade"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.highest_grade}
                                                onChange={(e) => setCredentials({ ...credentials, highest_grade: e.target.value })}

                                            />
                                            <input
                                                type="text"
                                                placeholder="Year Completed"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.year_completed}
                                                onChange={(e) => setCredentials({ ...credentials, year_completed: e.target.value })}

                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Pangalan ug Address sa Eskwelahan nga Gitunghaan</p>
                                    <p className="ps-2 font-semibold">(Name and Address of School Attended) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full flex flex-col gap-2 p-2 items-center'>
                                            Unsay pangalan ug address sa eskwelahan nga iyang gitunghaan?
                                            <input
                                                type="text"
                                                placeholder="Name of School"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.school_name2}
                                                onChange={(e) => setCredentials({ ...credentials, school_name2: e.target.value })}

                                            />
                                            <input
                                                type="text"
                                                placeholder="Address"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.school_address2}
                                                onChange={(e) => setCredentials({ ...credentials, school_address2: e.target.value })}

                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex flex-col p-2 items-center gap-2 border-b-2 border-slate-200'>
                        <div className='flex flex-col items-center pt-2 ps-5 border-b-2 border-slate-100 p-2 w-4/6'>
                            <p className='font-bold'>ALANG SA NAG EDAD 15 ANYOS PATAAS</p>
                            <p className='font-semibold'>(For all persons 15 years old and above)</p>
                        </div>
                        <div className='flex w-full'>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Nakuha nga Teknikal/Bokasyonal nga Kurso</p>
                                    <p className="ps-2 font-semibold">(Technical/Vocational Course Obtained) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex w-full flex-col items-center'>
                                        Nigraduar ba siya sa teknikal o bokasyonal nga kurso?
                                        <div className='flex flex-col gap-2 pt-2'>
                                            <div className='flex items-center gap-2'>
                                                <input
                                                    type="radio"
                                                    placeholder="090909090954"
                                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                    name='vocational_course'
                                                    value={'1'}
                                                    onChange={(e) => setCredentials({ ...credentials, vocational_course: e.target.value })}
                                                    checked={credentials.vocational_course === '1'}
                                                />Yes
                                                <input
                                                    type="text"
                                                    placeholder="Spicify"
                                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                    value={credentials.vocational_specify}
                                                    onChange={(e) => setCredentials({ ...credentials, vocational_specify: e.target.value })}
                                                    disabled={credentials.vocational_course === '0'}
                                                />
                                            </div>
                                            <div className='flex gap-2'>
                                                <input
                                                    type="radio"
                                                    placeholder="090909090954"
                                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 cursor-pointer"
                                                    name='rad2'
                                                    value={'0'}
                                                    onChange={(e) => setCredentials({ ...credentials, vocational_course: e.target.value })}
                                                    checked={credentials.vocational_course === '0'}
                                                />No
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Pangalan ug Address sa Eskwelahan nga Gitunghaan </p>
                                    <p className="ps-2 font-semibold">(Name and Address of School Attended) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full gap-2 flex flex-col p-2 items-center'>
                                            Unsay pangalan ug address sa eskwelahan ngaiyang gitunghaan?
                                            <input
                                                type="text"
                                                placeholder="School Name"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.school_name3}
                                                onChange={(e) => setCredentials({ ...credentials, school_name3: e.target.value })}

                                            />
                                            <input
                                                type="text"
                                                placeholder="School Address"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.school_address3}
                                                onChange={(e) => setCredentials({ ...credentials, school_address3: e.target.value })}

                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Espesyal nga Kahanas </p>
                                    <p className="ps-2 font-semibold">(Special Skills/Expertise) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full flex flex-col gap-2 p-2 items-center'>
                                            Mga butang diin sya adunay kahanas?
                                            <input
                                                type="text"
                                                placeholder="Skills"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.special_skills}
                                                onChange={(e) => setCredentials({ ...credentials, special_skills: e.target.value })}

                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-3/12'>
                                <div className='flex flex-col items-center'>
                                    <p className="ps-2 font-bold">Kasagaran nga Kalihukan/Trabaho</p>
                                    <p className="ps-2 font-semibold">(Usual Activity/Occupation) </p>
                                </div>
                                <div className='flex flex-col gap-2 items-start'>
                                    <div className='flex flex-col gap-2 items-start'>
                                        <div className='w-full flex flex-col gap-2 p-2 items-center'>
                                            Sa nilabay nga 12 ka bulan kon isa ka tuig, unsa ang iyang kalihukan o trabaho?
                                            <input
                                                type="text"
                                                placeholder="Occupation"
                                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                                                value={credentials.occupation}
                                                onChange={(e) => setCredentials({ ...credentials, occupation: e.target.value })}

                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center p-5'>
                        <button className='w-4/6 bg-emerald-500 p-2 rounded-lg text-white text-lg hover:bg-emerald-600 duration-200'
                            onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-screen absolute top-0 left-0 bg-indigo-900 z-10 opacity-40'>

            </div>
        </>
    )
}
