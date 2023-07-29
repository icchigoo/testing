import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

// Function to get household incomes
const getHouseHoldIncomes = async () => {
  try {
    const response = await axios.get(`${base_url}incomes/`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting household incomes:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Function to save household incomes
const saveHouseHoldIncomes = async (incomesData) => {
  try {
    const response = await axios.post(`${base_url}incomes/save`, incomesData, config);
    return response.data;
  } catch (error) {
    console.error("Error saving household incomes:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Export the incomes service functions
export const incomesService = {
  getHouseHoldIncomes,
  saveHouseHoldIncomes,
};
