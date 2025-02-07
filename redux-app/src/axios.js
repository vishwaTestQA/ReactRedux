import axios from "axios";

 const BASE_URL= 'https://localhost:3443';
 const baseURL =  'https://localhost:3443'; 

export default axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers:{"Content-Type":"application/json"},
  withCredentials:true
})