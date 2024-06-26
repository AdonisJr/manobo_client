import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import headDesign from "../../assets/headDesign.jpg"
import Settings from "./Settings";
import OtherInfo from "./OtherInfo";
import ChangePassword from "./ChangePassword";

export default function MemberHeader({
  user,
  setUser,
  activePage,
  handleActivePage,
  setAccessToken,
  settingsOpen,
  handleSettings,
  accessToken,
  setSelected
}) {
  const cookies = new Cookies({ path: "/" });
  const [showInformation, setInformation] = useState(false)
  const [showChangePassword, setShowChangePass] = useState(false);
  useEffect(() => { console.log(showChangePassword) }, [showChangePassword])
  return (
    <header className="w-full">
      {/* <div className="w-full relative">
        <img src={headDesign} alt="Design" className="w-full" />
        <div className="w-full absolute bottom-0 bg-neutral-700 h-10 opacity-30">

        </div>
      </div> */}
      {/* }<OtherInfo accessToken={accessToken} setInformation={setInformation} isAdmin={true} user={memberSelected} setMemberSelected={setMemberSelected} /> */}
      {
        showInformation ? <OtherInfo setSelected={setSelected} user={user} setInformation={setInformation} isAdmin={false} accessToken={accessToken} /> : ""
      }
      {
        !showChangePassword ? "" :
          <ChangePassword accessToken={accessToken} setShowChangePass={setShowChangePass} user={user} />
      }
      <nav className="flex justify-between items-center text-white p-2 sm:p-5 gap-2 bg-slate-700 rounded-s-lg shadow-lg">
        {
          settingsOpen ? <Settings user={user} setInformation={setInformation} setShowChangePass={setShowChangePass} /> : ""
        }
        <div>
          <p className="text-slate-300 font-bold">{activePage}</p>
        </div>

        {user.id ?
          <div className="flex gap-1" onClick={handleSettings}>
            <div className="cursor-pointer">
              <p className="">
                {user.last_name + ", " + user.first_name}

              </p>
              <span className="text-sm text-slate-400">{user.role}</span>
            </div>
            <div className="flex pt-1 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-down ${settingsOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>
            </div>

          </div>
          :
          <div className="flex gap-2 items-center text-xs font-semibold">
            <Link
              to="/signIn"
              className="text-xs font-semibold py-3 px-5 bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg rounded-md text-white duration-200"
            >
              SIGN IN
            </Link>
            <Link
              to="/signUp"
              className="text-xs font-semibold py-3 px-5 bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg rounded-md text-white duration-200"
            >
              SIGN UP
            </Link>
          </div>
        }
      </nav>
      {/* <div className="flex justify-center gap-5 pt-2 bg-neutral-800 text-yellow-500 text-md font-bold">
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "report tracker" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("report tracker")}
        >
          REPORT TRACKER
        </button>
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "person of concern" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("person of concern")}
        >
          PERSON OF CONCERN
        </button>
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "officer" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("officer")}
        >
          OFFICER
        </button>
      </div> */}
    </header>
  );
}
