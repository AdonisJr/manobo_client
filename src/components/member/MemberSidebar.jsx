import React, { useState } from "react";
import Cookies from "universal-cookie";
import CustomConfirmModal from "../CustomConfirmModal";

export default function MemberSidebar({ activePage, handleActivePage, user, setUser, setAccessToken, settingsOpen, handleSettings }) {
  const [showConfirm, setConfirm] = useState(false);
  const cookies = new Cookies({ path: "/" });


  const handleConfirm = async () => {
    // Perform delete operation or call the delete function
    setConfirm(false)
    if (settingsOpen) {
      handleSettings();
    }
    cookies.remove("user");
    setUser({});
    setAccessToken('');
  };

  const handleCancel = () => {
    // User clicked "No" or closed the dialog
    setConfirm(false);
  };
  return (

    <div className="flex flex-col fixed justify-between w-60 p-2 min-h-screen text-start gap-5 pt-10 bg-slate-700 text-slate-600 font-semibold">
      {showConfirm ?
        <CustomConfirmModal
          message={`Are you sure you wan't to logout?`}
          // selected={deleteSelected}
          logout={true}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        : ""
      }
      <div className="flex justify-center text-slate-300 hover:text-white duration-200">
        <p className="text-white text-xl">BMHC<span className="text-emerald-400">IMS</span></p>
      </div>
      {/* middle */}
      <div className="flex flex-col gap-5 text-start">
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md ${activePage === "Dashboard" ? "text-white bg-emerald-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Dashboard")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
          </svg>
          Dashboard
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md ${activePage === "Schoolarship Assistance" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Schoolarship Assistance")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
          </svg>
          Schoolarship Assistance
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md  ${activePage === "Medical Assistance" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Medical Assistance")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-capsule-pill" viewBox="0 0 16 16">
            <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
          </svg>
          Medical Assistance
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md ${activePage === "Burial Assistance" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Burial Assistance")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-inboxes-fill" viewBox="0 0 16 16">
            <path d="M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1zM3.81.563A1.5 1.5 0 0 1 4.98 0h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393z" />
          </svg>
          Burial Assistance
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md ${activePage === "Certification" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Certification")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
          </svg>
          Certification
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-emerald-500 text-white hover:text-white duration-200 p-2 cursor-pointer rounded-md ${activePage === "Recommendation" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Recommendation")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-command" viewBox="0 0 16 16">
            <path d="M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3M6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5zm4 1v4H6V6zm1-1V3.5A1.5 1.5 0 1 1 12.5 5zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11z" />
          </svg>
          Recommendation
        </p>
        <a href="/announcements" className="flex gap-1 justify-center items-center hover:underline text-red-500 cursor-pointer text-center font-serif"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
          </svg>
          announcements
        </a>
      </div>
      <footer>
        <button className={`flex items-center gap-1 justify-center w-full p-2 bg-white border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white duration-200 rounded-md ${user.id ? '' : 'hidden'}`}
          onClick={() => {
            setConfirm(true)
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
          </svg>
          Sign Out
        </button>
      </footer>
    </div>
  );
}
