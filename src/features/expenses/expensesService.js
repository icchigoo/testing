import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

// Function to get household expenses
const getHouseHoldExpenses = async () => {
  try {
    const response = await axios.get(`${base_url}expenses/`, config);
    return response.data;
  } catch (error) {
    console.error("Error getting household expenses:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Function to save household expenses
const saveHouseHoldExpenses = async ( expensesData) => {
  try {
    const response = await axios.post(`${base_url}expenses/save`, expensesData, config);
    return response.data;
  } catch (error) {
    console.error("Error saving household expenses:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

// Export the expenses service functions
export const expensesService = {
  getHouseHoldExpenses,
  saveHouseHoldExpenses
};
