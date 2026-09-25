import axios from "axios";

export const OPENTDB_BASE_URL = "https://opentdb.com";

export const axiosTrivia = axios.create({
  baseURL: OPENTDB_BASE_URL,
  timeout: 15_000,
});
