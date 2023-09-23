import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import './App.css';

function App() {
  const cookies = new Cookies( { path: '/' });
  
  useEffect(()=>{
    console.log(cookies.get('user'))
  },[])
  return (
    <>
    <p className="text-gray-400 bg-black">www</p>
    </>
  );
}

export default App;
