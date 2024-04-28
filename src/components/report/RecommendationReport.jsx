import React, { useMemo } from 'react'
import { useReactToPrint } from 'react-to-print';

export default function RecommendationReport({ printSelected, user, setPrintSelected, setIsPrintOpen }) {
    const printRef = React.useRef();
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
    return (
        <>
            <div className='flex justify-center items-center p-2 absolute top-0 left-0 w-full h-screen overflow-scroll'>

                <div className='flex flex-col items-center justify-center relative bg-white min-h-full w-full z-40' ref={printRef}>
                    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 opacity-50'>
                        <img src='http://localhost:3000/certmark.png' className='w-3/6' />
                    </div>
                    <div className='flex gap-10 items-center absolute top-5 right-10 z-40'>
                        <p className='hover:text-slate-600 duration-200 cursor-pointer' onClick={handlePrint}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                            </svg>
                        </p>
                        <p className='text-xl hover:text-slate-600 duration-200 cursor-pointer' onClick={(e) => setIsPrintOpen(false)}>x</p>
                    </div>

                    <div className='text-center py-10 pt-5 font-sans font-bold z-50 mt-20'>
                        <p className='text-3xl'>Certificate of Recommendation</p>
                    </div>
                    <div className='flex flex-col gap-5 px-40 text-sm z-40'>
                        <p className='z-50'>
                            This is to certify that <span className='font-bold px-2'>{name}</span> of the Manobo Tribe has been an invaluable contributor to
                            the preservation, promotion, and celebration of Manobo heritage and culture. Their dedication and commitment
                            to upholding the traditions and values of the Manobo people have been exemplary.
                        </p>
                        <p className='py-3 z-50'>
                            <span className='font-bold pe-2'>{name}</span> has actively participated in various
                            initiatives aimed at safeguarding and revitalizing Manobo cultural practices.
                            Their passion for preserving the unique heritage of the Manobo
                            Tribe has been a source of inspiration to fellow members and the wider community.
                        </p>
                        <p className='py-3 z-50'>
                            In recognition of their outstanding efforts and unwavering dedication, we proudly present this certificate to
                            <span className='font-bold px-2'>{name}</span>. May their continued commitment to Manobo heritage serve as a beacon of
                            pride and cultural resilience for generations to come.
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
