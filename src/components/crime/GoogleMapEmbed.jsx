import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMapsProvider,
  useGoogleMap,
} from "@ubilabs/google-maps-react-hooks";
import Marker from "./Marker";

export default function GoogleMapEmbed({ apiKey, selectedCrime, currentLocation }) {
  const [location, setLocation] = useState({
    latitude: 8.5103189,
    longitude: 125.9800424,
  });

  
  const [mapContainer, setMapContainer] = useState(null);

  const mapRef = useCallback((node) => {
    node && setMapContainer(node);
  }, []);

  const mapOptions = {
    zoom: 15,
    center: {
      lat: 8.5103189,
      lng: 125.9800424,
    },
  };

  return (
    <GoogleMapsProvider
      mapContainer={mapContainer}
      googleMapsAPIKey={apiKey}
      mapOptions={mapOptions}
    >
      <div ref={mapRef} className="h-screen w-full bg-red-500 p-2">
      </div>
      
      <Marker selectedCrime={selectedCrime} />
      
    </GoogleMapsProvider>
  );
}
