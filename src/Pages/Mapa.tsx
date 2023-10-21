import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapContainer = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 0, // Latitude
    lng: 0, // Longitude
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      />
    </LoadScript>
  );
};

export default MapContainer;
