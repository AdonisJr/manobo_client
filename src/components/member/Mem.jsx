import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemForm from './MemForm';
import MemTable from './MemTable';
import { useReactToPrint } from 'react-to-print';

export default function Mem({ accessToken, user }) {
    const [member, setMember] = useState([]);
    const [isModalOpen, setModal] = useState(false);
    const [selected, setSelected] = useState({});
    const printRef = React.useRef();

    const preparePrintData = () => {
        let printData = '<style>';
        printData += 'table {border-collapse: collapse; width: 100%; padding: 10px;}';
        printData += 'th, td {padding: 8px; text-align: left; border-bottom: 1px solid #ddd;}';
        printData += '.title {text-align: center; padding: 5px}';
        printData += '</style>';
        printData += '<h1 class="title">Member Accounts Report</h1>';
        printData += '<table>';
        printData += '<thead>';
        printData += '<tr>';
        Object.keys(member[0]).forEach(key => {
          printData += `<th>${key}</th>`;
        });
        printData += '</tr>';
        printData += '</thead>';
        printData += '<tbody>';
        member.forEach(data => {
          printData += '<tr>';
          Object.values(data).forEach(value => {
            printData += `<td>${value}</td>`;
          });
          printData += '</tr>';
        });
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

    // GET FUNCTION
    const getMember = async () => {
        await axios
            .get(`/user?role=member`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setMember(res.data.data)
            });

    };
    useEffect(() => {
        getMember();
    }, [selected])
    return (
        <div className='flex flex-col gap-5 w-full bg-white p-2'>
            <div>
                {
                    !isModalOpen ? <></> :
                        <MemForm setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
                }
            </div>
            <div className='p-2'>
                <p className='font-bold text-lg text-slate-500'>Member Accounts Management</p>
            </div>
            <div className='flex gap-3 px-5 justify-end'>
                <button className='flex items-center rounded-md gap-2 px-2 py-2 bg-emerald-400 text-white hover:bg-emerald-500 duration-200'
                    onClick={(e) => setModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                    ADD NEW
                </button>
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

            <div className='w-full p-2 bg-'>
                <MemTable printRef={printRef} member={member} setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
            </div>
        </div>
    )
}
