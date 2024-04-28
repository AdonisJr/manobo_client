import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Select from "react-select";
import { useReactToPrint } from 'react-to-print';

export default function Census({ accessToken }) {
    const [censusData, setCensusData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const printRef = React.useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: `
            @media print {
                /* Hide the footer */
                @page {
                  size: auto;
                  margin: 20mm;
                }
                body {
                  margin: 0;
                }
              }
            `,
    });

    // get functions
    const getAllMembers = async () => {
        await axios
            .get(`/user/census?year=${year}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                setCensusData(res.data.data)
                console.log(res.data.data)
            })
    }

    const totalMembers = useMemo(() => {
        return censusData.reduce((acc, cur) => acc + cur.total_members, 0);
    }, [censusData]);

    useEffect(() => {
        getAllMembers()
        console.log(year)
    }, [year])
    return (
        <div className='flex flex-col gap-3 bg-white w-100 text-black p-5' ref={printRef}>
            <div className='p-2'>
                <p className='font-bold text-lg text-slate-500'>Census of Population Report</p>
            </div>
            <div className='p-5'>
                Total population across different barangay.
            </div>
            <div className='flex gap-2 items-end'>
                <div className='w-3/6'>
                    <p>
                        Filter by Year:
                    </p>
                    <Select
                        options={Array.from({ length: 31 }, (_, index) => ({ label: (2010 + index).toString(), value: (2010 + index).toString() }))}
                        value={{ label: year, value: year }}
                        onChange={(e) => setYear(e.value)}

                    />
                </div>
                <div className='w-3/6 flex justify-end pe-5'>
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
            <div className='text-sm'>
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-2'>Year</th>
                            <th>Barangay</th>
                            <th>Total Population</th>
                            <th>Male</th>
                            <th>Female</th>
                            <th>Married</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            !censusData ? <p>Loading...</p> :
                                censusData.map(data => (
                                    <tr className=''>
                                        <td className='p-2'>{data.year}</td>
                                        <td className='p-2'>{data.barangay}</td>
                                        <td className='p-2'>{data.total_members}</td>
                                        <td className='p-2'>{data.total_male_members}</td>
                                        <td className='p-2'>{data.total_female_members}</td>
                                        <td className='p-2'>{data.total_married_members}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <div className='p-5'>
                    <p className='p-1 bg-slate-100'>
                        Overall Total Population: {totalMembers}
                    </p>
                </div>

            </div>

        </div>
    )
}
