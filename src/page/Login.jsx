import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingButton from '../components/LoadingButton';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [ credential, setCredential ] = useState({
        email: '',
        password: ''
      })
    const [ loading, setLoading ] = useState(false);
    const cookies = new Cookies( { path: '/' });
    const navigate = useNavigate();
  
      // handle change functions
    
      const handleEmail = (e) =>{
        setCredential({...credential, email: e.target.value})
      }
      const handlePassword = (e) =>{
          setCredential({...credential, password: e.target.value})
      }
  
      // Submit function
      const handleSubmit = async (e) =>{
          e.preventDefault();
          setLoading(true)
          console.log(credential)
        axios.post('/api/auth', credential)
          .then(res => {
            cookies.set('user', res.data);
            setLoading(false)
            navigate('/')
          })
          .catch(error => {
            navigate('/')
          })
         
      }

      
  return (
    <section className="h-screen">
        <div className="h-full px-5">
          {/* <!-- Left column container with background--> */}
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
  
            {/* <!-- Right column container --> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={handleSubmit}>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                    SIGN IN
                  </p>
                </div>
  
                {/* <!-- Email input --> */}
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    onChange={handleEmail}
                  />
                  <label className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 
                  transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem]
                  peer-focus:scale-[0.8] peer-focus:bg-white peer-focus:px-2 peer-focus:text-gray-500 motion-reduce:transition-none
                  ${credential.email === '' ? '' : '-translate-y-[1.15rem] scale-[0.8] bg-white px-2'}`}>
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
                  <label className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] 
                  truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 
                  ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8]  peer-focus:bg-white peer-focus:px-2
                  peer-focus:text-gray-500 motion-reduce:transition-none
                  ${credential.password === '' ? '' : '-translate-y-[1.15rem] scale-[0.8] bg-white px-2'}`}>
                    Password
                  </label>
                </div>
  
                {/* <!-- Login button --> */}
                <div className="text-center lg:text-left">

                  {/* <button
                    type="submit"
                    className="inline-block rounded bg-blue-400 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Login
                  </button> */}
  
                  {/* <!-- Register link --> */}
                  <LoadingButton isLoading={loading} text="LOGIN"/>
                  <p className="mb-0 mt-2 pt-1 text-sm">
                    {"Don't"} have account yet?
                    <a
                      href="/log"
                      className="text-danger ps-2 font-semibold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
