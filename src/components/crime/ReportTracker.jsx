import React, { useState, useEffect } from "react";
import CrimeTable from "./CrimeTable";
import GoogleMapEmbed from "./GoogleMapEmbed";

export default function ReportTracker({ crimes }) {
  const [selectedCrime, setSelectedCrime] = useState({});
  const [currentLocation, setCurrentLocation] = useState();
  const googleApi = process.env.REACT_APP_GOOGLE_API_KEY;
  

  useEffect(() =>{
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords)
        },
        (err) => {
          console.log(err)
        }
      );
    } else {
      console.log("Geolocation is not available in your browser.")
    }
  },[])

  const handleSelectedCrime = (selected) => {
    setSelectedCrime(crimes.filter((crime) => crime.id === selected.value));
  };

  const handleSubmit = async () => {
    console.log(selectedCrime[0].latitude);
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 p-2 sm:p-5 rounded-sm bg-white overflow-auto">
      <>
        <p>CRIMES</p>
        <div>
          <CrimeTable
            crimes={crimes}
            handleSelectedCrime={handleSelectedCrime}
            handleSubmit={handleSubmit}
          />
        </div>
      </>
      <div className="">
        {
          currentLocation ? 
        
        <GoogleMapEmbed apiKey={googleApi} selectedCrime={selectedCrime} zoom={19} currentLocation={currentLocation} />
      : 'Loading'  
      }
        </div>
    </div>
  );
}
