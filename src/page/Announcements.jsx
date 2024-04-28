import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Announcements({ user, accessToken }) {
  const [datas, setDatas] = useState([]);

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

  function getTimeDifferenceString(postedTime) {
    const postedDate = new Date(postedTime);
    const currentDate = new Date();

    const timeDifference = currentDate - postedDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);
    const yearsDifference = Math.floor(daysDifference / 365);

    if (yearsDifference > 0) {
        return `${yearsDifference}y ago`;
    } else if (monthsDifference > 0) {
        return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference > 0) {
        return `${daysDifference}d ago`;
    } else if (hoursDifference > 0) {
        return `${hoursDifference}h ago`;
    } else if (minutesDifference > 0) {
        return `${minutesDifference}m ago`;
    } else {
        return `${secondsDifference}s ago`;
    }
}

  const getData = async () => {
    await axios
      .get(`/announcement`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setDatas(res.data.data)
        console.log(res.data.data)
      });
  };
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='flex flex-col gap-5 p-5 bg-slate-100 min-h-screen'>
      <div className='flex gap-10 p-2 justify-center items-center bg-slate-700'>
        <img src='http://localhost:3000/logo.png' />
        <div className='px-5 border-s-2 border-slate-500'>
          <p className='text-2xl text-white font-serif'>BUNAWAN MANOBO HERITAGE CENTER</p>
          <p className='text-slate-400 text-lg'>INFORMATION MANAGEMENT SYSTEM</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-5/6 bg-white p-5'>
          <p className='text-2xl font-semibold text-slate-500 py-5'>Announcements and Upcoming Events</p>
          {
            !datas ? '' :
              datas.map(data => (
                <div className='card py-5'>
                  <p className='text-lg font-bold py-2 flex gap-2 items-center'>{data.title} <span className='text-xs text-slate-400 font-semibold'>{getTimeDifferenceString(data.created_at)}</span></p>
                  <p className='font-mono py-2'>{data.content}</p>
                  {
                    !data.url ? '' :
                      <img src={`http://localhost:3001/${data.url}`} className='max-w-[70%]' />
                  }
                  <p className='py-2'>{data.footer}</p>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
