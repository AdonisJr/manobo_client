import React, { useState, useEffect, useMemo } from 'react'
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificationReport({ printSelected, user, setPrintSelected, setIsPrintOpen }) {
    const printRef = React.useRef();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const formatDate = () => {
            const date = new Date();
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const ampm = hour >= 12 ? 'pm' : 'am';
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            const formattedMinute = minute < 10 ? '0' + minute : minute;

            return `${month} ${day}, ${year} at ${formattedHour}:${formattedMinute}${ampm}`;
        };

        setCurrentDate(formatDate());
    }, []);
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: `
            @media print {
                /* Set page size to auto and adjust margins */
                @page {
                    size: auto;
                    margin: 60mm 20mm 20mm 20mm; /* top right bottom left */
                }
                body {
                    margin: 20mm;
                }
            }
        `,
    });
    const name = useMemo(() => {
        return printSelected.first_name.toUpperCase() + ' ' + printSelected.middle_name.toUpperCase() + " " + printSelected.last_name.toUpperCase()
    }, [printSelected])

    const staffName = useMemo(() => {
        return user.first_name.toUpperCase() + ' ' + user.middle_name.toUpperCase() + " " + user.last_name.toUpperCase()
    }, [printSelected])

    const downloadPDF = () => {
        const input = document.getElementById('pdf-content');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const width = pdf.internal.pageSize.getWidth();
                const height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save('certificate.pdf');
            });
    };
    return (
        <>
            <div className='flex justify-center items-center p-2 absolute top-0 left-0 w-full h-screen overflow-scroll'>

                {/* <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 opacity-50'>
                        <img src='http://localhost:3000/certmark.png' className='w-3/6' />
                    </div> */}
                <div className='flex gap-10 items-center absolute top-5 right-10 z-40 text-red-700 font-bold'>
                    {/* <p className='hover:text-slate-600 duration-200 cursor-pointer' onClick={handlePrint}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                            </svg>
                        </p> */}
                    <p className='cursor-pointer z-50' onClick={downloadPDF}>DOWNLOAD</p>
                    <p className='text-xl hover:text-slate-600 duration-200 cursor-pointer' onClick={(e) => setIsPrintOpen(false)}>x</p>
                </div>
                <div className='flex flex-col items-center relative pb-5 bg-white min-h-full w-4/6 z-40' ref={printRef} id="pdf-content">


                    <div className='text-center pb-10 font-sans font-bold z-50 mt-10'>
                        <p className='text-2xl'>Certificate of Recognition</p>
                    </div>
                    <div className='flex flex-col gap-5 px-40 text-xs z-40'>
                        <p className='z-50'>
                            This is to certify that <span className='font-bold px-2'>{name}</span> of the Manobo Tribe has been a devoted
                            guardian of Manobo heritage and culture. Through their unwavering commitment and passion, they have played
                            an instrumental role in preserving and promoting the rich cultural traditions of the Manobo people.
                        </p>
                        <p className='py-3 z-50'>
                            <span className='font-bold pe-2'>{name}</span> has actively engaged in activities aimed at safeguarding Manobo heritage.
                            Their dedication to preserving the unique customs,
                            language, and arts of the Manobo Tribe has been a source of inspiration to all.
                        </p>
                        <p className='py-3 z-50'>
                            In recognition of their outstanding efforts and unwavering dedication, we proudly present this certificate to
                            <span className='font-bold px-2'>{name}</span>. May their continued commitment to Manobo heritage serve as a beacon of
                            pride and cultural resilience for generations to come.
                        </p>
                        <p>
                            Presented this {currentDate}
                        </p>
                        <p>
                            Signed,
                        </p>
                        <p>
                            __________________
                        </p>
                        <p className='font-semibold'>
                            {staffName}
                            <p className='font-normal'>{user.role.toUpperCase()}</p>
                            <p className='font-normal'>Manobo Heritage Center</p>
                        </p>

                    </div>

                </div>
            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-emerald-500 opacity-25'>

            </div>
        </>
    )
}
