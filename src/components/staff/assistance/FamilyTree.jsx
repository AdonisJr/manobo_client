import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import CustomConfirmModal from '../../CustomConfirmModal';
import Pagination from '../../Pagination';
import AssistanceForm from './AssistanceForm';
import Select from 'react-select';
import OtherInfo from '../../member/OtherInfo';
import { useReactToPrint } from 'react-to-print';

export default function FamilyTree({ user, accessToken }) {
  const [credentials, setCredentials] = useState();
  const [members, setMembers] = useState([]);
  const [showConfirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [schoolarship, setSchoolarship] = useState([]);
  const [selected, setSelected] = useState([]);
  const [deleteSelected, setDeleteSelected] = useState("");
  const [isModalOpen, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [showOtherInfo, setShowOtherInfo] = useState(false);
  const [memberSelected, setMemberSelected] = useState([]);
  const printRef = React.useRef();

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   pageStyle: `
  //           @media print {
  //               /* Hide the footer */
  //               @page {
  //                 size: auto;
  //                 margin: 20mm;
  //               }
  //               body {
  //                 margin: 0;
  //               }
  //             }
  //           `,
  // });

  const preparePrintData = () => {
    let printData = '<style>';
    printData += 'table {border-collapse: collapse; width: 100%; padding: 10px;}';
    printData += 'th, td {padding: 8px; text-align: left; border-bottom: 1px solid #ddd;}';
    printData += '.title {text-align: center; padding: 5px}';
    printData += '</style>';
    printData += '<h1 class="title">Enumerator Accounts Report</h1>';
    printData += '<table>';
    printData += '<thead>';
    printData += '<tr>';
    // Object.keys(datas[0]).forEach(key => {
    //   printData += `<th>${key}</th>`;
    // });
    printData += '<th>ID</th>'
    printData += '<th>Name</th>'
    printData += '<th>Email</th>'
    printData += '<th>Relationship</th>'
    printData += '<th>Gender</th>'
    printData += '<th>Contact Number</th>'
    printData += '</tr>';
    printData += '</thead>';
    printData += '<tbody>';
    datas.map(data => {
      printData += '<tr>';
      printData += `<td>${data.id}</td>`
      printData += `<td>${data.first_name + " " + data.middle_name + " " + data.last_name} </td>`
      printData += `<td>${data.email}</td>`
      printData += `<td>${data.relationship}</td>`
      printData += `<td>${data.gender}</td>`
      printData += `<td>${data.contact_number}</td>`
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
      .delete(`/assistance?id=${deleteSelected.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        showSuccessMessage(res.data.message)
        setTotalPages(Math.ceil(res.data.totalCount / 5))
      }).catch(error => {
        showErrorMessage(error.response.data.error + error.response.data.message)
      })
    setConfirm(false);
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

  // GET FUNCTION
  const getMembers = async () => {
    await axios
      .get(`/user?role=member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setMembers(res.data.data)
      });

  };
  const getData = async () => {
    await axios
      .get(`/user?role=member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setMembers(res.data.data)
      });

  };

  // handle functions

  const handleSubmit = async () => {
    if (!credentials) return showErrorMessage('Error, Please select user.')
    const details = credentials.value;

    await axios
      .get(`/relationship?user_id=${details.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setDatas(res.data.data)
      }).catch(error => {
        console.log(error)
      })
    // await axios
    //   .get(`/user/all`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     params: {
    //       id: details.id,
    //       middle_name: details.middle_name,
    //       last_name: details.last_name,

    //     }
    //   }).then(res => {
    //     setDatas(res.data.data)
    //   }).catch(error => {
    //     console.log(error)
    //   })
  }

  useEffect(() => {
    getData();
    getMembers();
  }, [refresh])

  return (
    <div className='flex flex-col gap-1'>
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
        showOtherInfo ? <OtherInfo accessToken={accessToken} setInformation={setShowOtherInfo} isAdmin={false} user={memberSelected} setMemberSelected={setMemberSelected} /> : ""
      }
      {
        !isModalOpen ? "" :
          <AssistanceForm accessToken={accessToken} user={useEffect} selected={selected} setSelected={setSelected} setModal={setModal} getData={getData} />
      }
      {/* table */}
      <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
        <div>
          <p className='font-bold text-lg text-slate-500'>Family Tracer Management</p>
        </div>
        <div className='py-2'>
          <label className='ps-2'>
            Search Member
          </label>
          <div className='flex gap-2 items-center justify-between pe-5'>
            <div className='flex gap-2 items-center w-3/6'>
              <Select options={members.map(member => ({
                label: member.id + ", " + member.first_name + " " + member.middle_name + " " + member.last_name,
                value: { id: member.id, middle_name: member.middle_name, last_name: member.last_name }
              }))}
                onChange={(e) => setCredentials({ ...credentials, value: e.value })}
                className='w-full'
              />
              <butoon className="flex gap-1 font-mono bg-emerald-500 text-white py-1 px-2 rounded-md hover:bg-emerald-600 duration-200 cursor-pointer"
                onClick={handleSubmit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                  className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                Trace
              </butoon>
            </div>
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

        </div>
        <div className='w-full overflow-x-scroll'>
          <table className='min-w-full table table-auto text-sm' ref={printRef}>
            <thead>
              <tr className='bg-blue-50 text-center'>
                <th className='p-2'>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Relationship</th>
                <th>Gender</th>
                <th>Contact Number</th>
                <th>Other Information</th>
              </tr>
            </thead>
            <tbody>
              {
                !datas ? "" :
                  datas.map(data => (
                    <tr className='hover:bg-emerald-100 text-center'>
                      <td className='p-1'>{data.id}</td>
                      <td className='p-1'>{`${data.first_name} ${data.middle_name} ${data.last_name}`}</td>
                      <td className='p-1'>{data.email}</td>
                      <td className='p-1'>{data.relationship}</td>
                      <td className='p-1'>{data.gender}</td>
                      <td className='p-1'>{data.phone_number}</td>
                      <td><p className='hover:underline cursor-pointer' onClick={(e) => [setShowOtherInfo(true), setMemberSelected(data)]}>View</p></td>
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
