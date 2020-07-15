import axios from "axios";

export const apikey = "79d54bf1dc1b1e6e281ec2deb7d0bf3e";

const api = axios.create({
  baseURL: "http://67.205.169.66:8080",
  // baseURL: "http://localhost:5000",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   methods: "GET",
  // },
});

export default api;
