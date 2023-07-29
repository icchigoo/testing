import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

// Function to create a new transaction
const createTransaction = async (propertyId, transactionData) => {
  try {
    const response = await axios.post(`${base_url}transaction/${propertyId}/`, transactionData, config);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

// Export your transaction service functions
export { createTransaction };
