import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AdminHeader from "../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import PersonOfConcern from "../components/admin/wanted/PersonOfConcern";
import Sidebar from "../components/admin/Sidebar";
import Upload from "../components/admin/upload/Upload";
import io from "socket.io-client";
import StaffSidebar from "../components/staff/StaffSidebar";
import StaffHeader from "../components/staff/StaffHeader";
import Mem from "../components/member/Mem";
import Enu from "../components/enumerator/Enu";
import StaAssistance from "../components/staff/StaAssistance";
import Announcement from "../components/staff/Announcement";
import Medical from "../components/staff/assistance/Medical";
import Schoolarship from "../components/staff/assistance/Schoolarship";
import Burial from "../components/staff/assistance/Burial";
import Certification from "../components/staff/assistance/Certification";
import Recommendation from "../components/staff/assistance/Recommendation";
import FamilyTree from "../components/staff/assistance/FamilyTree";
import StaDashboard from "../components/staff/assistance/StaDashboard";
const socket = io.connect("http://localhost:3001");

export default function Staff() {
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("Dashboard");
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);
  const [validated, setValidated] = useState(0);
  const [q, setQ] = useState("");

  const handleValidated = (value) => {
    setValidated(value)
  }
  // handle FUNCTIONS

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  // SET USER / LOGGED IN

  useEffect(() => {
    // return console.log(decoded.data.id)
    const getUser = async () => {
      if (cookies.get("user")) {
        const token = cookies.get("user");
        const decoded = jwt_decode(token.data);
        setAccessToken(token.data);
        await axios
          .get(`/user/${decoded.id}`, {
            headers: {
              Authorization: `Bearer ${token.data}`,
            },
          })
          .then((res) => {
            if (res.data.data.role === "member") return navigate("/");
            if (res.data.data.role === "admin") return navigate("/admin");
            if (res.data.data.role === "enumerator") return navigate("/enumerator");
            setUser(res.data.data);
          });
      } else {
        navigate("/")
      }
    };
    getUser();
  }, []);

  return (
    <main className="flex min-h-screen max-w-screen gap-5 bg-slate-900 overflow-hidden font-serif">
      <div className="w-64">
        <StaffSidebar user={user} handleActivePage={handleActivePage} activePage={activePage} setUser={setUser} setAccessToken={setAccessToken} />
      </div>
      <div className="flex flex-col gap-5 w-full">
        {/* <StaffHeader user={user}
          setUser={setUser}
          activePage={activePage}
          handleActivePage={handleActivePage}
          setAccessToken={setAccessToken} /> */}
        <div className="min-h-screen p-2 pe-5 pt-5">
          {
            activePage === 'Enumerator' ? <Enu accessToken={accessToken} user={user} /> :
              activePage === 'Member' ? <Mem accessToken={accessToken} /> :
                activePage === 'Medical' ? <Medical accessToken={accessToken} user={user} /> :
                  activePage === 'Family Tree' ? <FamilyTree accessToken={accessToken} user={user} /> :
                    activePage === 'Schoolarship' ? <Schoolarship accessToken={accessToken} user={user} /> :
                      activePage === 'Burial' ? <Burial accessToken={accessToken} user={user} /> :
                        activePage === 'Certification' ? <Certification accessToken={accessToken} user={user} /> :
                          activePage === 'Recommendation' ? <Recommendation accessToken={accessToken} user={user} /> :
                            activePage === 'Announcements' ? <Announcement accessToken={accessToken} user={user} /> :
                            <StaDashboard accessToken={accessToken} user={user} />
          }
        </div>
      </div>


    </main>
  );

}
