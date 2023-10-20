import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function PersonModal({handleModal}) {
  const [credentials, setCredentials] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    last_known_address: '',
    type: 'WANTED PERSON',
  })

  const typeOpt = [
    {value: 'MISSING PERSON', label: 'MISSING PERSON'},
    {value: 'WANTED PERSON', label: 'WANTED PERSON'},
  ]

  const genderOpt = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'},
  ]

  // handle change functions

  const handleFirstNameChange = (e) =>{
    setCredentials({...credentials, first_name: e.target.value})
  }
  const handleMiddleNameChange = (e) =>{
    setCredentials({...credentials, middle_name: e.target.value})
  }
  const handleLastNameChange = (e) =>{
    setCredentials({...credentials, last_name: e.target.value})
  }
  const handleGenderChange = (selected) =>{
    setCredentials({...credentials, gender: selected.value})
  }
  const handleAddressChange = (e) =>{
    setCredentials({...credentials, last_known_address: e.target.value})
  }

  useEffect(()=>{
    console.log(credentials)
  },[credentials])
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <form className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">ADD WANTED PERSON</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative flex flex-col gap-4 p-6 flex-auto">
              {/* First Row */}
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="ps-2">First Name</label>
                  <input
                    type="text"
                    placeholder="Taylor"
                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="ps-2">Middle Name</label>
                  <input
                    type="text"
                    placeholder="Alison"
                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                    onChange={handleMiddleNameChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="ps-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Swift"
                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
              {/* Second Row */}
              <div className="flex gap-2">
                <div className="flex w-6/12 flex-col">
                  <label className="ps-2">Gender</label>
                  <Select options={genderOpt} onChange={handleGenderChange} />
                </div>
                <div className="flex w-6/12 flex-col">
                  <label className="ps-2">Type</label>
                  <Select options={typeOpt} />
                </div>
              </div>
              {/* Third Row */}
              <div className="flex gap-2">
                <div className="flex w-full flex-col">
                  <label className="ps-2">Address</label>
                  <input
                    type="text"
                    placeholder="Agusan del Sur"
                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
