import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import MemberSidebar from "./components/member/MemberSidebar";
import MemberHeader from "./components/member/MemberHeader";
import SchoolarshipAssistance from "./components/member/SchoolarshipAssistance";
import MedicalAssistance from "./components/member/MedicalAssistance";
import BurialAssistance from "./components/member/BurialAssistance";
import Certification from "./components/member/Certification";
import Recommendation from "./components/member/Recommendation";
const socket = io.connect("http://localhost:3001");

export default function App() {
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("Dashboard");
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);
  const [validated, setValidated] = useState(0);
  const [q, setQ] = useState("");
  const [settingsOpen, setSettings] = useState(false)
  const [selected, setSelected] = useState({})

  const handleSettings = () => {
    setSettings(!settingsOpen)
  }

  const handleValidated = (value) => {
    setValidated(value)
  }
  useEffect(() => {
  }, []);

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
            if (res.data.data.role === "staff") return navigate("/staff");
            if (res.data.data.role === "admin") return navigate("/admin");
            if (res.data.data.role === "enumerator") return navigate("/enumerator");
            console.log(res.data.data)
            setUser(res.data.data);
          });
      } else {
        navigate("/")
      }
    };
    getUser();
  }, [selected]);
  // useEffect(()=>{
  //   getReportedCrime();
  // },[validated, q])
  return (
    <main className="flex min-h-screen max-w-screen gap-5 bg-slate-900 overflow-x-hidden">
      <div className="w-72">
        <MemberSidebar settingsOpen={settingsOpen} handleSettings={handleSettings} user={user} handleActivePage={handleActivePage} activePage={activePage} setUser={setUser} setAccessToken={setAccessToken} />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <MemberHeader settingsOpen={settingsOpen} handleSettings={handleSettings} user={user}
          setUser={setUser}
          setSelected={setSelected}
          activePage={activePage}
          handleActivePage={handleActivePage}
          setAccessToken={setAccessToken}
          accessToken={accessToken}
        />
        {!user.id ? <p className="p-5 bg-red-400 me-5 rounded-lg text-white">Please login to access this page.</p> :
          <div className="min-h-screen pe-5 overflow-x-hidden">
            {
              activePage === 'Schoolarship Assistance' ? <SchoolarshipAssistance accessToken={accessToken} user={user} /> :
                activePage === 'Medical Assistance' ? <MedicalAssistance accessToken={accessToken} user={user} /> :
                  activePage === 'Burial Assistance' ? <BurialAssistance accessToken={accessToken} user={user} /> :
                    activePage === 'Certification' ? <Certification accessToken={accessToken} user={user} /> :
                      activePage === 'Recommendation' ? <Recommendation accessToken={accessToken} user={user} /> : ''
            }
          </div>
        }

      </div>


    </main>
  );

}
