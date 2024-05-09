import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import CustomConfirmModal from '../CustomConfirmModal';
import RecommendationForm from './RecommendationForm';

export default function Recommendation({ user, accessToken }) {
  const [showConfirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [recommendations, setRecommendations] = useState([])
  const [isShowForm, setIsShowForm] = useState(false);

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
      .post(`/assistance`, { user_id: user.id, type: 'recommendation' }, {
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

  const getRecommendations = async () => {
    const res = await axios
      .get(`/recommendation`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setRecommendations(res.data.data)
      }).catch(error => {
        console.log(error.response.data.error + error.response.data.message)
      })
  }


  const generateRandomFilename = () => {
    const randomString = Math.random().toString(36).substring(7); // Random alphanumeric string
    return randomString;
  };

  const handleDownload = (data, extension) => {
    // Base64 encoded string
    const randomFilename = generateRandomFilename();
    const base64String = data;

    // Create a Blob from the Base64 encoded string
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // Create object URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create temporary anchor element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the download attribute and href of the anchor element
    a.href = url;
    a.download = `${randomFilename}.${extension}`;

    // Simulate click on the anchor element
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  useEffect(() => {
    getRecommendations();
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
        {
          !isShowForm ? "" :
            <RecommendationForm user={user} accessToken={accessToken} getRecommendations={getRecommendations} setIsShowForm={setIsShowForm} />
        }
        <div className='py-5'>
          <p className='text-xl font-bold'>Requirements:</p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>APPLICATION LETTER <span className='font-normal'>(Please be advised that the application letter must be physically submitted at the office to facilitate seamless integration.)</span></p>

          <p className='font-semibold'>FAMILY TREE <span className='font-normal'>
            The compilation and verification of family tree details in the system will be conducted by our staff to ensure an accurate and thorough representation of our familial connections across generations.
          </span>
          </p>
        </div>
        <div className='flex justify-center p-5'>
          <button className='bg-emerald-500 p-2 w-3/6 text-white font-bold rounded-md hover:bg-emerald-600 duration-200'
            onClick={(e) => setIsShowForm(true)}>Request</button>
        </div>
      </div>
      {/* table */}
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <div>
          <p className='font-bold'>Certification Requested List</p>
        </div>
        <div>
          <table className='w-full table table-auto text-xs'>
            <thead>
              <tr className='bg-blue-50'>
                <td className='p-2'>ID</td>
                <td>Application Letter</td>
                <td className='p-2'>Recommendation</td>
                <td>Family Tree</td>
                <td>Date Requested</td>
                <td>Remarks</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {
                !recommendations ? "" :
                  recommendations.map(data => (
                    <tr className='hover:bg-emerald-100'>
                      <td className='p-2'>{data.id}</td>
                      <td onClick={(e) => handleDownload(data.application_letter, data.application_extension)}>
                        <p className={`${data.application_letter ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.application_letter ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td onClick={(e) => handleDownload(data.cert, data.cert_extension)}>
                        <p className={`${data.cert ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.cert ? "Download" : "No Data"}
                        </p>
                      </td>
                      <td>{data.family_tree}</td>
                      <td>{getSpecificDate(data.created_at)}</td>
                      <td>{data.remarks}</td>
                      <td>{data.status}</td>
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
