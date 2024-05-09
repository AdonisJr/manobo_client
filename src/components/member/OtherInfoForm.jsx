import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OtherInfoForm({ user, accessToken, setIsFamily, getRelationship }) {
    const [datas, setDatas] = useState([])
    const [credentials, setCredentials] = useState({ user_id: user.id });

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

    const relationshipOpt = [
        { label: 'Mother', value: 'Mother' },
        { label: 'Father', value: 'Father' },
        { label: 'Grand Mother', value: 'Grand Mother' },
        { label: 'Grand Father', value: 'Mother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Son', value: 'Son' },
        { label: 'Daughter', value: 'Daughter' },
        { label: 'Wife', value: 'Wife' },
        { label: 'Husband', value: 'Husband' }
    ]

    const getRelatives = async () => {
        // await axios
        //     .get(`/user/all`, {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //         params: {
        //             id: user.id,
        //             middle_name: user.middle_name,
        //             last_name: user.last_name,

        //         }
        //     }).then(res => {
        //         setDatas(res.data.data)
        //     }).catch(error => {
        //         console.log(error)
        //     })
        await axios
            .get(`/user?role=member`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setDatas(res.data.data)
            });
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.relationship_id) return showErrorMessage('Please name.')
        if (!credentials.relationship) return showErrorMessage('Please select relationship.')
        await axios.post("/relationship", credentials, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            showSuccessMessage(res.data.message)
            setTimeout(()=>{
                getRelationship();
                setIsFamily(false)
            }, 1000)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getRelatives();
    }, [])

    return (
        <>
            <div className='absolute flex w-full h-full p-10 justify-center z-40'>

                <ToastContainer />
                <div className='relative flex flex-col gap-3 bg-white p-5 w-3/6 h-3/6 shadow-lg'>
                    <p className='absolute top-3 right-5 text-lg cursor-pointer hover:text-slate-400 duration-200'
                        onClick={(e) => setIsFamily(false)}
                    >x</p>
                    <div>
                        Name
                        <Select options={datas.map(data => ({
                            label: data.id + ", " + data.first_name + " " + data.middle_name + " " + data.last_name,
                            value: data.id
                        }))}
                            onChange={(e) => setCredentials({ ...credentials, relationship_id: e.value })}
                        />
                    </div>
                    <div>
                        Relationship
                        <Select
                            options={relationshipOpt}
                            onChange={(e) => setCredentials({ ...credentials, relationship: e.value })}
                        />
                    </div>
                    <p className='py-2 text-white text-center bg-emerald-500 hover:bg-emerald-600 duration-200 cursor-pointer'
                        onClick={handleSubmit}>Submit</p>
                </div>
            </div>
            <div className='absolute w-full h-full bg-emerald-800 opacity-25 z-20'>

            </div>
        </>

    )
}
