import { useGoogleMap } from "@ubilabs/google-maps-react-hooks";
import React, { useEffect, useRef } from "react";

export default function Marker({ selectedCrime, currentLocation }) {
  const map = useGoogleMap();
  const markerRef = useRef();
  const currentMarkRef = useRef();
  let lat = "";
  let lng = "";
  if (selectedCrime[0]) {
    lat = selectedCrime[0].latitude;
    lng = selectedCrime[0].longitude;
  }
  const getSpecificDate = (created_at) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(created_at);
    const longDate = date.toLocaleDateString("en-US", options);
    return longDate;
  };

  useEffect(() => {
    if (!map) return;
    currentMarkRef.current = new window.google.maps.Marker({
      map,
      title: "Your current location",
      icon: "http://localhost:3000/currentIcon.svg",
    });
    markerRef.current = new window.google.maps.Marker({
      map,
      icon: "http://localhost:3000/markIcon.svg",
    });
  }, [map]);

  useEffect(() => {
    console.log(currentLocation);
    if (!selectedCrime[0]) return;
    if (!markerRef.current) return;
    const lat = Number(selectedCrime[0].latitude);
    const lng = Number(selectedCrime[0].longitude);
    if (isNaN(selectedCrime[0].latitude) || isNaN(selectedCrime[0].longitude))
      return;

    markerRef.current.setPosition({
      lat,
      lng,
    });
    currentMarkRef.current.setPosition({
      lat: 8.5168619,
      lng: 125.9807228,
    });

    markerRef.current.setIcon({ url: "http://localhost:3000/markIcon.svg" });
    markerRef.current.setTitle(
      selectedCrime
        ? `Report No. : ${selectedCrime[0]?.report_number} \n crime : ${
            selectedCrime[0]?.type_of_crime
          } \n Date: ${getSpecificDate(selectedCrime[0]?.created_at)}`
        : ""
    );

    console.log("wewe");
  }, [lat, lng, selectedCrime, map]);

  return <></>;
}
