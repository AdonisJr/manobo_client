import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChartVisual from '../BarChartVisual';
import LineChartVisual from '../LineChatVisual';
import AreaChartVisual from '../AreaChartVisual';
import PieChartVisual from '../PieChartVisual';

export default function StaDashboard({ user, accessToken }) {
    const [members, setMembers] = useState([]);
    const [genderCounts, setGenderCounts] = useState();
    const [ageBrackets, setAgeBrackets] = useState([]);
    const [bracket, setBracket] = useState({});
    const [otherInfoData, setOtherInfoData] = useState([])


    // GET FUNCTION
    const getMember = async () => {
        await axios
            .get(`/user/stat`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setMembers(res.data.data)
            });

    };
    const getBracket = async () => {
        await axios
            .get(`/user/ageBracket`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setBracket(res.data.data)
            });

    };

    const getOtherInfo = async () => {
        await axios
            .get(`/otherInfo`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setOtherInfoData(res.data.data)
                console.log(res.data.data)
            });

    };

    // functions

    useEffect(() => {
        if (!members) return
        const calculateGenderCounts = () => {
            let maleCount = 0;
            let femaleCount = 0;
            let otherCount = 0;

            members.map(member => {
                if (member.gender === 'male') {
                    maleCount++
                } else if (member.gender === 'female') {
                    femaleCount++
                } else {
                    otherCount++
                }
            })

            setGenderCounts({ male: maleCount, female: femaleCount, other: otherCount })
        }

        function calculateAgeBracketCounts() {
            const ageBrackets = {
                '0-14': 0,
                '15-59': 0,
                '60+': 0
            };

            members.forEach(member => {
                const age = parseInt(member.age);
                if (age >= 0 && age <= 14) {
                    ageBrackets['0-14']++;
                } else if (age >= 15 && age <= 59) {
                    ageBrackets['15-59']++;
                } else {
                    ageBrackets['60+']++;
                }
            });

            setAgeBrackets({ age1: ageBrackets['0-14'], age2: ageBrackets['15-59'], age3: ageBrackets['60+'] })
        }

        calculateGenderCounts();
        calculateAgeBracketCounts();
    }, [members])

    function getPercentage(categoryCount, totalCount) {
        if (totalCount === 0) {
            return 0;
        }
        return (categoryCount / totalCount) * 100;
    }

    useEffect(() => {
        getMember();
        getBracket();
        getOtherInfo();
    }, [])
    return (
        <div className='flex flex-col gap-5'>
            <div className='text-white flex gap-10 bg-slate-700 p-5 rounded-lg'>
                <div className='w-4/12 relative px-10 border-e-2 border-slate-500 p-3'>
                    <p className='text-slate-300'>Total Members</p>
                    <p className='font-mono text-3xl'>{members.length}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        className="bi bi-people absolute top-8 right-10 text-slate-500" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                    </svg>
                </div>
                <div className='w-4/12 relative px-10 border-e-2 border-slate-500 p-3'>
                    <p className='text-slate-300'>Male Members</p>
                    <p className='font-mono text-3xl'>{!genderCounts ? '' : genderCounts.male}</p>
                    {
                        !genderCounts ? <span>0</span> :
                            <span className={`flex items-center font-sans ${getPercentage(genderCounts.male, members.length).toFixed(2) >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {getPercentage(genderCounts.male, members.length).toFixed(2)}%
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    className={`bi bi-arrow-up-short ${getPercentage(genderCounts.male, members.length).toFixed(2) >= 50 ? '' : 'rotate-180'}`} viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                                </svg>
                            </span>
                    }

                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        className="bi bi-gender-male absolute top-8 right-10 text-slate-500" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
                    </svg>
                </div>
                <div className='w-4/12 relative px-10 p-3'>
                    <p className='text-slate-300'>Female Members</p>
                    <p className='font-mono text-3xl'>{!genderCounts ? '' : genderCounts.female}</p>
                    {
                        !genderCounts ? <span>0</span> :
                            <span className={`flex items-center font-mono ${getPercentage(genderCounts.female, members.length).toFixed(2) >= 50 ? 'text-emerald-500' : 'text-red-500'}`}>


                                {getPercentage(genderCounts.female, members.length).toFixed(2)}%
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    className={`bi bi-arrow-up-short ${getPercentage(genderCounts.female, members.length).toFixed(2) >= 50 ? '' : 'rotate-180'}`} viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
                                </svg>
                            </span>
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        className="bi bi-gender-female absolute top-8 right-10 text-slate-500" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5" />
                    </svg>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex flex-col w-3/12 gap-2'>
                    <div className='text-white flex flex-col p-5 rounded-md bg-pink-700'>
                        <p className='font-sans text-2xl text-slate-300 text-center'>Age Bracket</p>
                        <p className=''>Aged from 0 to 14</p>
                        <p className='text-3xl'>
                            {
                                !ageBrackets ? 'Loading' :
                                    ageBrackets.age1
                            }
                        </p>
                        <p>
                            {
                                !ageBrackets ? <span>0</span> :
                                    <span className={`flex items-center text-slate-200`}>
                                        {getPercentage(ageBrackets.age1, members.length).toFixed(1)}%
                                    </span>
                            }
                        </p>
                    </div>
                    <div className='text-white flex flex-col p-5 rounded-md bg-blue-700'>
                        <p>Aged from 15 to 59</p>
                        <p className='text-3xl'>
                            {
                                !ageBrackets ? 'Loading' :
                                    ageBrackets.age2
                            }
                        </p>
                        <p>
                            {
                                !ageBrackets ? <span>0</span> :
                                    <span className={`flex items-center text-slate-200`}>
                                        {getPercentage(ageBrackets.age2, members.length).toFixed(1)}%
                                    </span>
                            }
                        </p>
                    </div>
                    <div className='text-white flex flex-col p-5 rounded-md bg-green-600'>
                        <p>Aged 60 and above</p>
                        <p className='text-3xl'>
                            {
                                !ageBrackets ? 'Loading' :
                                    ageBrackets.age3
                            }
                        </p>
                        <p>
                            {
                                !ageBrackets ? <span>0</span> :
                                    <span className={`flex items-center text-slate-200`}>
                                        {getPercentage(ageBrackets.age3, members.length).toFixed(1)}%
                                    </span>
                            }
                        </p>
                    </div>
                </div>
                <div className='bg-slate-700 rounded-lg p-4 w-9/12 text-white flex flex-col justify-center'>
                    <p className='text-lg font-bold'>Member Count Per Year</p>
                    <p className='py-2 text-sm'> An analysis showing the distribution of user registrations across different years</p>

                    <BarChartVisual members={members} />
                </div>

            </div>
            <div className='bg-slate-700 rounded-lg p-4 w-full text-white flex gap-5 flex-col justify-center'>
                <p className='text-lg text-slate-300 font-semibold'>Line Chart Visual | <span className='text-white'>Age Bracket</span></p>
                <LineChartVisual data={bracket} />
            </div>
            <div className='bg-slate-700 rounded-lg p-4 w-full text-white flex gap-5 flex-col justify-center'>
                <p className='text-lg text-slate-300 font-semibold'>Area Chart Visual | <span className='text-white'>Education Status</span></p>
                <AreaChartVisual data={otherInfoData} />
            </div>
            <div className='bg-slate-700 rounded-lg p-4 w-full text-white flex gap-5 flex-col justify-center'>
                <p className='text-lg text-slate-300 font-semibold'>Pie Chart Visual | <span className='text-white'>Population Graph Across Different Tribes</span></p>

                <div className='flex justify-center'>
                    <PieChartVisual data={otherInfoData} />
                </div>
            </div>
        </div>
    )
}
