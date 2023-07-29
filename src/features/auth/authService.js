import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/login`, user);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/${id}`, config);
    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null; // Return a default value or handle the error appropriately
  }
};

const updatePassword = async (newPassword) => {
  try {
    const response = await axios.put(`${base_url}user/password`, { password: newPassword }, config);
    return response.data; // Return the relevant response data
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${base_url}user/edit-user/`, userData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const createUser = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return !!user; // Return true if user is logged in, false otherwise
};

const authService = {
  login,
  getUserById,
  updatePassword,
  updateUser,
  isLoggedIn,
  createUser,
};

export default authService;
