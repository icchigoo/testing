import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/config";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check local storage for user data when the component is first rendered
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${base_url}user/login`, userData);
      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser)); // Store user data in local storage
      return loggedInUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const response = await axios.put(
        `${base_url}user/password`, 
        { password: newPassword }, config
      );
      return response.data;
    } catch (error) {
      console.error("Error updating password:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      const response = await axios.put(
        `${base_url}user/edit-user/`,
        updatedUserData,
        config
      );
      setUser(response.data); // Update the user in state with the updated data
      localStorage.setItem("user", JSON.stringify(response.data)); // Update the user in local storage
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  const logout = async () => {
    try {
      // Clear the user data
      setUser(null);
      localStorage.removeItem("user"); // Remove user data from local storage
    } catch (error) {
      console.error("Error logging out:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, updatePassword, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
