import React from "react";
import Cookies from "universal-cookie";

export default function Sidebar({ activePage, handleActivePage, user, setUser, setAccessToken }) {

  const cookies = new Cookies({ path: "/" });
  return (
    <div className="flex flex-col fixed justify-between w-56 p-2 min-h-screen text-start gap-5 pt-10 bg-slate-700 text-slate-600 font-semibold">

      <div className="flex justify-center text-slate-300 hover:text-white duration-200">
        <p className="text-white text-xl">BMHC<span className="text-emerald-400">IMS</span></p>
      </div>

      {/* middle */}
      <div className="flex flex-col gap-5">
        <button
          className={`flex gap-1 items-center hover:bg-emerald-500 text-start text-white hover:text-white duration-200 p-2 rounded-md ${activePage === "Dashboard" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Dashboard")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-command" viewBox="0 0 16 16">
            <path d="M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3M6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5zm4 1v4H6V6zm1-1V3.5A1.5 1.5 0 1 1 12.5 5zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11z" />
          </svg>
          Dashboard
        </button>
        <button
          className={`flex items-center gap-1 hover:bg-emerald-500 text-start text-white hover:text-white duration-200 p-2 rounded-md ${activePage === "Staff" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Staff")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-video3" viewBox="0 0 16 16">
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z" />
          </svg>
          Staff
        </button>
        <button
          className={`flex gap-1 items-center hover:bg-emerald-500 text-start text-white hover:text-white duration-200 p-2 rounded-md ${activePage === "Enumerator" ? "text-white bg-emerald-500" : "text-white"
            } duration-200`}
          onClick={() => handleActivePage("Enumerator")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
            <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
          </svg>
          Enumerator
        </button>
      </div>

      <footer>
        <a href="/announcements" className="flex py-8 gap-1 justify-center items-center hover:underline text-red-500 cursor-pointer text-center font-serif"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z" />
          </svg>
          announcements
        </a>
        <p className="flex flex-col items-center pt-2 text-white">
          {`${user.first_name} ${user.last_name}`}
          <span className="text-sm text-emerald-300">
            {`${user.role}`}
          </span>
        </p>
        <button className="flex gap-1 items-center justify-center w-full p-2 bg-white border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white duration-200"
          onClick={() => {
            cookies.remove("user");
            setUser({});
            setAccessToken('');
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
