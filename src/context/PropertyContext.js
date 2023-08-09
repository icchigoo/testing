import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/config";

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${base_url}property`, config);
      const data = response.data;
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={properties}>
      {children}
    </PropertyContext.Provider>
  );
};
