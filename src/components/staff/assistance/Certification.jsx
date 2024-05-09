import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import CustomConfirmModal from '../../CustomConfirmModal';
import Pagination from '../../Pagination';
import AssistanceForm from './AssistanceForm';
import CertificationReport from '../../report/CertificationReport';

export default function Certification({ user, accessToken }) {
  const [showConfirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [schoolarship, setSchoolarship] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState("");
  const [isModalOpen, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [printSelected, setPrintSelected] = useState({})
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
      .delete(`/certificate?id=${deleteSelected}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        showSuccessMessage(res.data.message)
        getData();
        setConfirm(false);
      }).catch(error => {
        showErrorMessage(error.response.data.error + error.response.data.message)
      })
  };

  const handleCancel = () => {
    // User clicked "No" or closed the dialog
    setConfirm(false);
    setDeleteSelected("");
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

  const getData = async () => {
    await axios
      .get(`/certificate/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: currentPage,
          limit: 5,
          type: 'certification'
        }
      })
      .then((res) => {
        setSchoolarship(res.data.data)
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
    getData();
  }, [refresh])

  return (
    <div className='flex flex-col gap-2'>
      <ToastContainer />
      {showConfirm ?
        <CustomConfirmModal
          message={`Are you sure you wan't to delete?`}
          selected={deleteSelected}
          delete={true}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        /> : ''
      }
      {
        !isModalOpen ? "" :
          <AssistanceForm accessToken={accessToken} user={useEffect} type={'certificate'} selected={selected} setSelected={setSelected} setModal={setModal} getData={getData} />
      }
      {
        !isPrintOpen ? "" :
          <CertificationReport accessToken={accessToken} printSelected={printSelected} setPrintSelected={setPrintSelected} user={user} setIsPrintOpen={setIsPrintOpen} />
      }
      {/* table */}
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <div>
          <p className='font-bold text-lg text-slate-500'>Certificate Requested List</p>
        </div>
        <div className='w-full overflow-x-scroll'>
          <table className='min-w-full table table-auto text-sm'>
            <thead>
              <tr className='bg-blue-50 text-center'>
                <td className='p-2'>ID</td>
                <td>Requested By</td>
                <td>Application Letter</td>
                <td>Certificate</td>
                <td>Family Tree</td>
                <td>Date Requested</td>
                <td>Remarks</td>
                <td>Status</td>
                <td>Action</td>
                <td>Print</td>
              </tr>
            </thead>
            <tbody>
              {
                !schoolarship ? "" :
                  schoolarship.map(data => (
                    <tr className='hover:bg-emerald-100 text-center'>
                      <td className='p-1'>{data.id}</td>
                      <td className='p-1'>{data.first_name + ", " + data.last_name}</td>
                      <td onClick={(e) => handleDownload(data.application_letter, data.application_extension)}>
                        <p className={`${data.application_letter ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.application_letter ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td onClick={(e) => handleDownload(data.cert, data.cert_extension)}>
                        <p className={`${data.cert ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.cert ? "SENT" : "NOT SENT"}
                        </p>
                      </td>
                      <td className='text-xs'>
                        <span className={`p-1`}>
                          {data.family_tree}
                        </span>
                      </td>
                      <td className='p-1'>{getSpecificDate(data.created_at)}</td>
                      <td className='p-1'>{data.remarks}</td>
                      <td>
                        <span className={`text-xs p-1`}>
                          {data.status}
                        </span>
                      </td>
                      <td className='flex flex-col gap-2'>
                        <div className='flex items-center cursor-pointer hover:underline'
                          onClick={(e) => [setModal(true), setSelected(data), console.log(data)]}>
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
                        <div className='flex items-center cursor-pointer hover:underline'
                          onClick={(e) => [setConfirm(true), setDeleteSelected(data.id)]}>
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
                      <td className='p-2'>
                        <button
                          className='flex gap-2 items-center hover:text-slate-600 duration-200'
                          // onClick={handlePrint}
                          onClick={(e) => [setPrintSelected(data), setIsPrintOpen(true)]}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                          </svg>
                        </button>
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
    </div>

  )
}
