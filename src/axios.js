import axios from "axios";
import BASE_URL from "./config.json";
 const axiosClient = axios.create({
  baseURL: `${BASE_URL.BASE_URL}`,
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
 
    return response;
  },
  (error) => {
    const { response } = error;
    if (
      response &&
      response.status &&
      (response.status === 422 || response.status === 400)
    ) {
      return response;
    } else if (response && response.status && response.status === 401) {
      return false;
    } else if (response && response.status) {
      return false;
    } else {
      return false;
    }
  }
);
export default axiosClient;
