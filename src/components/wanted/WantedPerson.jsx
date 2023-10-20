import React, { useState, useEffect } from "react";
import PersonTable from "./WantedTable";
import axios from "axios";
import PersonModal from "./WantedModal";

export default function PersonOfConcern({accessToken}) {
  const [personList, setPersonList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [keywords, setKeywords] = useState('');

  const handleModal = (action) => {
    setModalOpen(action);
  };

  const handleKeywordsChange = (e) =>{
    setKeywords(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`/person/?filter=WANTED PERSON&keywords=${keywords}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setPersonList([res.data.data]);
      });
  }, [keywords]);
  return (
    <div className="w-full h-full p-2 sm:p-5 shadow-lg rounded-sm bg-white">
      {
        isModalOpen ? <PersonModal handleModal={handleModal} /> : ''
      }
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl font-serif">WANTED PERSON</p>
        <div className="flex items-center gap-2 w-3/6">
          <input
            type="search"
            className="w-full border-2 border-slate-400 p-2 rounded-md outline-none"
            placeholder="Search"
            onChange={handleKeywordsChange}
            value={keywords}
          />
        </div>
      </div>
      <div className="flex flex-col py-2 gap-4">
        <button
          className="p-2 ms-2 bg-emerald-500 rounded-md border-b-4 border-emerald-700 text-white font-semibold hover:bg-emerald-600 hover:border-emerald-800 w-36 duration-150"
          onClick={() => handleModal(true)}
        >
          ADD
        </button>
        <PersonTable personList={personList} />
      </div>
    </div>
  );
}
