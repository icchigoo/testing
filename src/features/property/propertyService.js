import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

// Function to get all properties
const getProperty = async () => {
  const response = await axios.get(`${base_url}property/`, config);
  return response.data; // Return the data field directly
};

// Function to get a property by ID
const getPropertyById = async (id) => {
  const response = await axios.get(`${base_url}property/${id}`, config);
  return response.data;
};

const createProperty = async (property) => {
  try {
    const response = await axios.post(`${base_url}property/`, property, config);
    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

const editProperty = async (id, updatedProperty) => {
  try {
    const response = await axios.patch(`${base_url}property/${id}`, updatedProperty, config);
    return response.data;
  } catch (error) {
    console.error("Error editing property:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Object containing the property service functions
const propertyService = {
  getProperty,
  getPropertyById,
  createProperty,
  editProperty
};

export default propertyService;
