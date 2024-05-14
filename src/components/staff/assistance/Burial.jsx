import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import CustomConfirmModal from '../../CustomConfirmModal';
import Pagination from '../../Pagination';
import AssistanceForm from './AssistanceForm';

export default function Burial({ user, accessToken }) {
  const getCurrentDate = () => {
    const current = new Date();
    return current.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  };
  const [showConfirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [schoolarship, setSchoolarship] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState("");
  const [isModalOpen, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("FOR APPROVAL");
  const [filterDate, setFilterDate] = useState({ from: null, to: getCurrentDate() })

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
      .delete(`/burial?id=${deleteSelected}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        showSuccessMessage(res.data.message)
        setConfirm(false);
        getData();
      }).catch(error => {
        showErrorMessage(error.response.data.error + error.response.data.message)
      })
  };

  const statusOpt = [

    { label: 'FOR APPROVAL', value: 'FOR APPROVAL' },
    { label: 'PENDING', value: 'PENDING' },
    { label: 'ON PROCESS', value: 'ON PROCESS' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'CANCELLED', value: 'CANCELLED' },
  ]

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

  const preparePrintData = () => {
    let printData = '<style>';
    printData += 'table {border-collapse: collapse; width: 100%; padding: 10px;}';
    printData += 'th, td {padding: 8px; text-align: left; border-bottom: 1px solid #ddd;}';
    printData += '.title {text-align: center; padding: 5px}';
    printData += '</style>';
    printData += '<h1 class="title">Schoolarship Assistance Report</h1>';
    printData += '<table>';
    printData += '<thead>';
    printData += '<tr>';
    printData += '<th>ID</th>'
    printData += '<th>Requested By</th>'
    printData += '<th>Date Requested</th>'
    printData += '<th>Last Update</th>'
    printData += '<th>Remarks</th>'
    printData += '<th>Status</th>'
    printData += '</tr>';
    printData += '</thead>';
    printData += '<tbody>';
    schoolarship.map(data => {
      printData += '<tr>';
      printData += `<td>${data.id}</td>`
      printData += `<td>${data.first_name + " " + data.middle_name + " " + data.last_name} </td>`
      printData += `<td>${getSpecificDate(data.created_at)}</td>`
      printData += `<td>${getSpecificDate(data.updated_at)}</td>`
      printData += `<td>${data.remarks}</td>`
      printData += `<td>${data.status}</td>`
      printData += '</tr>'
    })
    printData += '</tbody>';
    printData += '</table>';
    return printData;
  };

  const handlePrint = () => {
    const printData = preparePrintData();
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<pre>');
    printWindow.document.write(printData);
    printWindow.document.write('</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const getData = async () => {
    await axios
      .get(`/burial/all?filter=${filter}&dateFrom=${filterDate.from}&dateTo=${filterDate.to}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: currentPage,
          limit: 5,
          type: 'burial'
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
  }, [refresh, filter, filterDate])

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
          <AssistanceForm accessToken={accessToken} user={useEffect} type={'burial'} selected={selected} setSelected={setSelected} setModal={setModal} getData={getData} />
      }
      {/* table */}
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <div className='flex justify-between pe-10'>
          <p className='font-bold text-lg text-slate-500'>Burial Requested List</p>
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
        <div className='text-xs'>
          <div className='flex items-center gap-2 ps-10'>
            <p>Filter</p>
            <div className='flex flex-col gap-2 ps-10 w-2/6'>
              <p>
                Type:
              </p>
              <Select
                options={statusOpt}
                value={{ label: filter, value: filter }}
                onChange={(e) => setFilter(e.value)}
              />
            </div>
            <div className='flex flex-col gap-1 w-2/6'>
              <label className='ps-2'>Date From</label>
              <input type="date"
                className='py-1 px-2 border-2 border-neutral-500 w-full'
                onChange={(e) => [setFilterDate({ ...filterDate, from: e.target.value })]}
                value={filterDate.from}
              />
            </div>
            <div className='flex flex-col gap-1 w-2/6'>
              <label className='ps-2'>Date To</label>
              <input type="date"
                className='py-1 px-2 border-2 border-neutral-500 w-full'
                onChange={(e) => setFilterDate({ ...filterDate, to: e.target.value })}
                value={filterDate.to}
              />
            </div>
          </div>
        </div>
        <div className='w-full overflow-x-scroll'>
          <table className='min-w-full table table-auto text-sm'>
            <thead>
              <tr className='bg-blue-50 text-center'>
                <td className='p-2'>ID</td>
                <td>Type</td>
                <td>Requested By</td>
                <td>Application Letter</td>
                <td>Death Certificate</td>
                <td>Brgy Indigency</td>
                <td>Valid I.D</td>
                <td>Date Requested</td>
                <td>Remarks</td>
                <td>Status</td>
                <td>Action</td>

              </tr>
            </thead>
            <tbody>
              {
                !schoolarship ? "" :
                  schoolarship.map(data => (
                    <tr className='hover:bg-emerald-100 text-center'>
                      <td className='p-2'>{data.id}</td>
                      <td>{data.type}</td>
                      <td>{data.first_name + ", " + data.last_name}</td>
                      <td onClick={(e) => handleDownload(data.application_letter, data.application_extension)}>
                        <p className={`${data.application_letter ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.application_letter ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td onClick={(e) => handleDownload(data.death_certificate, data.death_extension)}>
                        <p className={`${data.death_certificate ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.death_certificate ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td onClick={(e) => handleDownload(data.indigency, data.indigency_extension)}>
                        <p className={`${data.indigency ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.indigency ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td onClick={(e) => handleDownload(data.valid_id, data.valid_extension)}>
                        <p className={`${data.valid_id ? 'hover:underline cursor-pointer text-blue-600' : ''}`}>
                          {data.valid_id ? "Download" : "Not Submitted"}
                        </p>
                      </td>
                      <td className='p-1'>{getSpecificDate(data.created_at)}</td>
                      <td className='p-1'>{data.remarks}</td>
                      <td>
                        <span>
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
