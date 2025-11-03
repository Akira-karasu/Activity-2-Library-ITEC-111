import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // NestJS URL
});

export default api;
