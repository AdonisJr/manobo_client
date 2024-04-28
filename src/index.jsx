import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import axios from "axios";
import Register from "./page/Register";
import Admin from "./page/Admin";
import "./App.css";
import Enumerator from "./page/Enumerator";
import Staff from "./page/Staff";
import Announcements from "./page/Announcements";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={< App />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/enumerator" element={<Enumerator />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
