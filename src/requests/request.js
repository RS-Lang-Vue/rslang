import axios from "axios";
import config from "@/config/config";

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;
