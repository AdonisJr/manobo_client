import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./App.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";
import ReportTracker from "./components/crime/ReportTracker";
import Officer from "./components/officer/Officer";
import PersonOfConcern from "./components/wanted/WantedPerson";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("");
  const [crimes, setCrimes] = useState("");
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);

  const getCrimes = async () => {
    await axios
      .get(`/crime`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("wewe");
        setCrimes(res.data.data);
      });
  };
  socket.on("receive_message", (socket) => {
    getCrimes();
  });

  // WEB SOCKET
  useEffect(() => {
    
    getCrimes();
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

        await axios
          .get(`/officer/?id=${decoded.id}`, {
            headers: {
              Authorization: `Bearer ${token.data}`,
            },
          })
          .then((res) => {
            setUser(res.data.data);
          });
        setAccessToken(token.data);
      }
    };
    getUser();
  }, []);

  return (
    <main className="flex flex-col min-h-screen max-w-screen bg-slate-200">
      <Header
        user={user}
        setUser={setUser}
        activePage={activePage}
        handleActivePage={handleActivePage}
        setAccessToken={setAccessToken}
      />

      {!accessToken ? (
        <p className="bg-red-200 shadow-md p-2 m-2 rounded-lg text-center text-slate-500 font-bold">
          Please login to access this page.
        </p>
      ) : (
        <div className="flex gap-2 w-full p-5">
          <div className="flex w-5/6">
            {activePage === "report tracker" ? (
              <ReportTracker crimes={crimes} />
            ) : activePage === "officer" ? (
              <Officer accessToken={accessToken} />
            ) : activePage === "person of concern" ? (
              <PersonOfConcern accessToken={accessToken} />
            ) : (
              ""
            )}
          </div>
          <div className="flex w-1/6 bg-white min-h-80 max-h-80 flex-wrap shadow-lg overflow-scroll rounded-sm">
            <p className="sticky top-0 bg-white w-full p-2 shadow-sm text-slate-500 font-bold">
              Reported Crimes Today
            </p>
            <div className="p-2">
              {!crimes
                ? "Loading"
                : crimes.map((crime) => (
                    <div
                      key={crime.id}
                      className={
                        crime.created_at.split("T")[0] === currentDate
                          ? "flex"
                          : "hidden"
                      }
                    >
                      <p>{crime.type_of_crime}</p>
                      <p>{}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
