import { useState, useEffect } from "react";
import axios from "axios";
import LoadingButton from "../components/LoadingButton";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();

  // TOAST FUNCTION
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };

  // handle change functions

  const handleEmail = (e) => {
    setCredential({ ...credential, email: e.target.value });
  };
  const handlePassword = (e) => {
    setCredential({ ...credential, password: e.target.value });
  };

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credential.email) return showErrorMessage("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credential.email))
      return showErrorMessage("Invalid email format.");

    setLoading(true);

    await axios
      .post("/api/auth", credential)
      .then((res) => {
        cookies.set("user", res.data);
        console.log(res);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        showErrorMessage(
          error.response.data.error + ". " + error.response.data.message
        );
        setLoading(false);
        // navigate("/");
      });
  };

  return (
    <section className="h-screen">
      <ToastContainer />
      <div className="flex justify-center items-center bg-slate-100 h-full p-3">
        <div className="relative g-6 w-full p-3 sm:w-3/6 flex bg-white sm:h-4/6 flex-wrap items-center justify-center lg:justify-between">
          <div className="absolute w-full left-0 -top-14 flex justify-center">
            <div className=" bg-emerald-500 p-5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-lock text-white" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
              </svg>
            </div>
          </div>

          <form className="w-full">
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                SIGN IN
              </p>
            </div>

            {/* <!-- Email input --> */}
            <div className="relative mb-6 w-full" data-te-input-wrapper-init>
              <input
                type="email"
                className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                onChange={handleEmail}
              />
              <label
                className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 
                  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem]
                  peer-focus:scale-[0.8] peer-focus:bg-white peer-focus:px-2 peer-focus:text-gray-500 motion-reduce:transition-none
                  ${credential.email === ""
                    ? ""
                    : "-translate-y-[1.15rem] scale-[0.8] bg-white px-2"
                  }`}
              >
                Email address
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                type="password"
                className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none"
                onChange={handlePassword}
              />
              <label
                className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] 
                  truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 
                  ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8]  peer-focus:bg-white peer-focus:px-2
                  peer-focus:text-gray-500 motion-reduce:transition-none
                  ${credential.password === ""
                    ? ""
                    : "-translate-y-[1.15rem] scale-[0.8] bg-white px-2"
                  }`}
              >
                Password
              </label>
            </div>

            {/* <!-- Login button --> */}
            <div className="text-center lg:text-left">

              <p className="mb-0 mt-2 pt-1 text-sm pb-5">
                {"Don't"} have account yet?
                <a
                  href="/signUp"
                  className="text-danger ps-2 font-semibold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:underline"
                >
                  Register
                </a>
              </p>
              {/* <!-- Register link --> */}
              <LoadingButton
                isLoading={loading}
                text="LOGIN"
                onClick={handleSubmit}
                size="w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
