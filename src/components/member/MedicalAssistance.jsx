import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import CustomConfirmModal from '../CustomConfirmModal';

export default function SchoolarshipAssistance({ user, accessToken }) {
  const [showConfirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [schoolarship, setSchoolarship] = useState([])

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

  const handleConfirm = async () => {
    // Perform delete operation or call the delete function
    await axios
      .post(`/assistance`, { user_id: user.id, type: 'medical'}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        showSuccessMessage(res.data.message)
        setRefresh(!refresh)
      }).catch(error => {
        showErrorMessage(error.response.data.error + error.response.data.message)
      })
    setConfirm(false);
  };

  const handleCancel = () => {
    // User clicked "No" or closed the dialog
    setConfirm(false);
  };

  // GET
  const getSpecificDate = (created_at) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(created_at);
    const longDate = date.toLocaleDateString("en-US", options);
    return longDate;
  };

  const getMedical = async () => {
    await axios
      .get(`/assistance/${user.id}?type=medical`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSchoolarship(res.data.data)
      }).catch(error => {
        console.log(error.response.data.error + error.response.data.message)
      })
  }

  useEffect(() => {
    getMedical();
  }, [refresh])
  // useEffect(()=>{console.log(schoolarship)},[schoolarship])
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <ToastContainer />
        {showConfirm ?
          <CustomConfirmModal
            message={`Do you wan't to request Schoolarship Assistance?`}
            selected={user.id}
            delete={false}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          /> : ''
        }
        <div className='py-5'>
          <p className='text-xl font-bold'>Requirements:</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>APPLICATION LETTER <span className='font-normal'>(Please be advised that the application letter must be physically submitted at the office to facilitate seamless integration.)</span></p>
          <p className='font-semibold'>MEDICAL ABSTRACT <span className='font-normal'>(

            The system mandates the submission of a valid medical abstract for the processing of medical assistance; kindly ensure to present the required documentation in person at the designated office.) </span>
          </p>
        </div>
        <div className='flex justify-center p-5'>
          <button className='bg-emerald-500 p-2 w-3/6 text-white font-bold rounded-md hover:bg-emerald-600 duration-200' onClick={(e) => setConfirm(true)}>Request</button>
        </div>
      </div>
      {/* table */}
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <div>
          <p className='font-bold'>Medical Requested List</p>
        </div>
        <div>
          <table className='w-full table table-auto'>
            <thead>
              <tr className='bg-blue-50'>
                <td className='p-2'>ID</td>
                <td>Application Letter</td>
                <td>Medical Abstract</td>
                <td>Date Requested</td>
                <td>Status</td>
                <td>Remarks</td>
              </tr>
            </thead>
            <tbody>
              {
                !schoolarship ? "" :
                  schoolarship.map(data => (
                    <tr className='hover:bg-emerald-100'>
                      <td className='p-2'>{data.id}</td>
                      <td>{data.application_letter}</td>
                      <td>{data.medical_abstract}</td>
                      <td>{getSpecificDate(data.created_at)}</td>
                      <td>{data.status}</td>
                      <td>{data.remarks}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}
