import axios from "axios";

export const api = axios.create({
  baseURL: "http://3.89.111.239:3333",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
});