import axios from "axios";
import { BASE_URL } from "./config";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
