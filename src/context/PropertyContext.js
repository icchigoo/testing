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

  const addProperty = async (propertyData) => {
    try {
      const response = await axios.post(
        `${base_url}property`,
        propertyData,
        config
      );
      const createdProperty = response.data;

      // Update the properties state to include the newly created property
      setProperties((prevProperties) => [...prevProperties, createdProperty]);
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const editProperty = async (id, updatedProperty) => {
    try {
      const response = await axios.patch(
        `${base_url}property/${id}`,
        updatedProperty,
        config
      );
      const editedProperty = response.data;

      // Update the properties state to include the updated property
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === editedProperty._id ? editedProperty : property
        )
      );
    } catch (error) {
      console.error("Error editing property:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, addProperty, editProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
