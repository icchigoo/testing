import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/config";

// Function to create a new transaction
const createTransaction = async (propertyId, transactionData) => {
  try {
    const response = await axios.post(
      `${base_url}transaction/${propertyId}/`,
      transactionData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

// Function to get transactions for a specific property
const getTransactionsForProperty = async (propertyId) => {
  try {
    const response = await axios.get(
      `${base_url}transaction/property/${propertyId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error getting transactions for property:", error);
    throw error;
  }
};

// Function to update a transaction
const updateTransaction = async (transactionId, updatedTransactionData) => {
  try {
    const response = await axios.put(
      `${base_url}transaction/${transactionId}`,
      updatedTransactionData,
      
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Export your transaction service functions
export { createTransaction, getTransactionsForProperty, updateTransaction };
