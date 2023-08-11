import axios from "axios";
import { config } from "./config";

// Create an instance of axios
const instance = axios.create();

// Add an interceptor to modify the request before it's sent
instance.interceptors.request.use(
  // The first function is called before the request is sent
  (axiosConfig) => {
    // Add authentication headers from the "config" object
    axiosConfig.headers = config.headers; // Here, "config" contains your authorization headers
    return axiosConfig; // Return the modified request configuration
  },
  // The second function handles errors that occur during the request
  (error) => {
    return Promise.reject(error); // Reject the promise with the error
  }
);

// Export the customized axios instance
export default instance;
