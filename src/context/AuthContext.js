import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post(`${base_url}user/login`, userData);
      const loggedInUser = response.data;
      setUser(loggedInUser);
      return loggedInUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
