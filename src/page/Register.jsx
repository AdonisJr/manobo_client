import React, { useState } from "react";
import Select from "react-select";
import LoadingButton from "../components/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadID from "../components/client/UploadID";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ role: 'member' });
  const [showPassword, setShowPassword] = useState(true);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // opt
  let barangayOpt = [
    {
      label: "Consuelo",
      value: "Consuelo"
    }, {
      label: "San Teodoro",
      value: "San Teodoro"
    }, {
      label: "Bunawan Brook",
      value: "Bunawan Brook"
    }, {
      label: "Libertad",
      value: "Libertad"
    }, {
      label: "San Andres",
      value: "San Andres"
    }, {
      label: "Imelda",
      value: "Imelda"
    }, {
      label: "Poblacion",
      value: "Poblacion"
    }, {
      label: "Mambalili",
      value: "Mambalili"
    }, {
      label: "Nueva Era",
      value: "Nueva Era"
    }, {
      label: "San Marcos",
      value: "San Marcos"
    }
  ];

  // TOGGLE SHOW PASSWORD

  const handleToggle = (e) => {
    if (e.target.checked === true) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  // TOAST FUNCTION
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };
  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };

  // RANK OPTION FOR SELECT

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    // VALIDATIONS
    if (!credentials.first_name) return showErrorMessage("First Name is required");
    if (!credentials.last_name) return showErrorMessage("Last Name is required");
    if (!credentials.email) return showErrorMessage("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email))
      return showErrorMessage("Invalid email format.");
    // if(!passwordRegex.test(credentials.password)) return showErrorMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    if (credentials.password !== credentials.confirm_password) return showErrorMessage("Password do not match.");
    if (!/^\d{11}$/.test(credentials.phone_number)) return showErrorMessage("Please enter a valid 11-digit phone number.")
    // INSERT
    await axios
      .post("/user", credentials)
      .then((res) => {
        showSuccessMessage('Successfully registered.')
        setTimeout(() => {
          setLoading(false)
          navigate('/signIn')
        }, 2000)
      })
      .catch((error) => {
        console.log(error);
        showErrorMessage(
          error.response.data.error + ". " + error.response.data.message
        );
        setLoading(false);
        // navigate("/");
      });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center text-center bg-neutral-200 md:flex-row p-5">
      <ToastContainer />
      {
        step === 1 ?
          <div className="w-full flex relative h-full flex-col p-4 bg-white rounded-md gap-2 sm:w-4/6 md:w-3/6 md:rounded-tr-md md:rounded-br-md md:rounded-tl-none md:rounded-bl-none">
            <div className="absolute w-full left-0 -top-14 flex justify-center">
              <div className=" bg-emerald-500 p-5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-lines-fill text-white" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </svg>
              </div>
            </div>
            <p className="text-2xl m-5 font-bold pt-10">Sign Up</p>
            {/* FIRST NAME */}
            <div className="flex justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                First Name:
              </label>
              <input
                type="text"
                className="border-2 border-neutral-500 w-4/6 p-2 rounded-md"
                onChange={(e) =>
                  setCredentials({ ...credentials, first_name: e.target.value })
                }
                value={credentials.first_name}
              />
            </div>
            {/* LAST NAME */}
            <div className="flex justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                Last Name:
              </label>
              <input
                type="text"
                className="border-2 border-neutral-500 w-4/6 p-2 rounded-md"
                onChange={(e) =>
                  setCredentials({ ...credentials, last_name: e.target.value })
                }
                value={credentials.lastName}
              />
            </div>
            {/* address */}
            <div className="flex justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                Address:
              </label>
              <Select
                options={barangayOpt}
                onChange={(e) => setCredentials({ ...credentials, barangay: e.value })}
                defaultValue={{ label: credentials.barangay, value: credentials.barangay }}
                className="w-4/6 text-start"
              />
            </div>

            {/* EMAIL */}
            <div className="flex justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                Email:
              </label>
              <input
                type="email"
                className="border-2 border-neutral-500 w-4/6 p-2 rounded-md"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                value={credentials.email}
              />
            </div>
            {/* PASSWORD */}
            <div className="flex relative gap-1 justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                Password:
              </label>
              <input
                type={showPassword === true ? 'password' : 'text'}
                className="border-2 border-neutral-500 w-2/6 p-2 rounded-md"
                placeholder="Password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
              />
              <input
                type={showPassword === true ? 'password' : 'text'}
                className="border-2 border-neutral-500 w-2/6 p-2 rounded-md"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    confirm_password: e.target.value,
                  })
                }
                value={credentials.confirm_password}
              />
              <input type="checkbox" className="absolute top-4 right-5 md:right-6 lg:right-8 cursor-pointer" onChange={handleToggle} />

            </div>
            {/* PASSWORD */}

            <div className="flex gap-1 justify-center items-center rounded-md">
              <label htmlFor="" className="w-3/12">
                Phone Number:
              </label>
              <input
                type="text"
                className="border-2 border-neutral-500 w-4/6 p-2 rounded-md"
                onChange={(e) =>
                  setCredentials({ ...credentials, phone_number: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <LoadingButton
                isLoading={loading}
                text="Register"
                size="w-5/6 mt-5"
                onClick={handleSubmit}
              />
            </div>
            <div>
              <p className="mb-0 mt-2 pt-1 text-sm">
                Already have an account?
                <a
                  href="/signIn"
                  className="text-danger ps-2 font-semibold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
          : <UploadID credentials={credentials} />
      }
    </main>
  );
}
