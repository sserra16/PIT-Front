import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import { api } from "../api/api";

const MapContainer = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  }>();

  const getCoordinates = async (endereco: string) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          endereco
        )}&key=AIzaSyCW2hEZGOQLoQ9kLh1D_gX5dJVD1_Sz8e4`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setCoordinates(location);
      } else {
        console.log("Endereço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
    }
  };

  useEffect(() => {
    api.get("/get-enderecos").then((data) => {
      data.data.forEach((item: any, index: any) => {
        let endereco = "";

        for (const chave in item as any) {
          endereco += `${item[chave]} `;
        }

        endereco = endereco.slice(0, -2);

        getCoordinates(endereco);
      });
    });
  }, []);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: -19.912998,
    lng: -43.940933,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCW2hEZGOQLoQ9kLh1D_gX5dJVD1_Sz8e4">
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {/* {coordinates ? ( */}

        {}

        {/* ) : (
          ""
        )} */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
