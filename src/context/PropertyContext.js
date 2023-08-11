// Import necessary modules and components
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/config";
import { useAuthContext } from "./AuthContext";
import instance from "../utils/axiosInstance";

// Create a context to manage property-related data
const PropertyContext = createContext();

// Custom hook to easily access the PropertyContext
export const usePropertyContext = () => useContext(PropertyContext);

// PropertyProvider component manages property-related state and actions
export const PropertyProvider = ({ children }) => {
  // State to store the list of properties
  const [properties, setProperties] = useState([]);
  const { user } = useAuthContext();

  // Function to fetch properties from the API
  const fetchProperties = async () => {
    try {
      // Send a GET request to the API to fetch property data
      const response = await instance.get(`${base_url}property`);
      const data = response.data;

      // Update the properties state with the fetched property data
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Function to add a new property
  const addProperty = async (propertyData) => {
    try {
      // Send a POST request to the API to create a new property
      const response = await axios.post(`${base_url}property`, propertyData, config);
      const createdProperty = response.data;

      // Update the properties state to include the newly created property
      setProperties((prevProperties) => [...prevProperties, createdProperty]);
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  // Function to edit an existing property
  const editProperty = async (id, updatedProperty) => {
    try {
      // Send a PATCH request to the API to update an existing property
      const response = await axios.patch(`${base_url}property/${id}`, updatedProperty, config);
      const editedProperty = response.data;

      // Update the properties state to reflect the changes
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property._id === editedProperty._id ? editedProperty : property
        )
      );
    } catch (error) {
      console.error("Error editing property:", error);
    }
  };

  // Fetch properties from the API when the component mounts
  useEffect(() => {
    if (user !== null) {
      fetchProperties();
    } else {
      setProperties([]); // Clear properties when the user is null
    }
  }, [user]);

  // Provide property-related data and actions through the context
  return (
    <PropertyContext.Provider value={{ properties, addProperty, editProperty }}>
      {/* Render child components */}
      {children}
    </PropertyContext.Provider>
  );
};
