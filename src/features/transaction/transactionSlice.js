import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTransaction, getTransactionsForProperty, updateTransaction } from "../transaction/transactionService";

// Async thunk to create a transaction
export const createNewTransaction = createAsyncThunk(
  "transaction/createNewTransaction",
  async (transactionData) => {
    try {
      return await createTransaction(transactionData);
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk to get transactions for a property
export const fetchTransactionsForProperty = createAsyncThunk(
  "transaction/fetchTransactionsForProperty",
  async (propertyId) => {
    try {
      return await getTransactionsForProperty(propertyId);
    } catch (error) {
      throw error;
    }
  }
);

export const updateExistingTransaction = createAsyncThunk(
  "transaction/updateExistingTransaction",
  async ({ transactionId, updatedTransactionData }) => {
    try {
      return await updateTransaction(transactionId, updatedTransactionData);
    } catch (error) {
      throw error;
    }
  }
);

// Create the transaction slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: null,
    transactionsForProperty: [], // New state to store transactions for a property
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transaction = action.payload;
      })
      .addCase(createNewTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchTransactionsForProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransactionsForProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionsForProperty = action.payload; // Save fetched transactions to the state
      })
      .addCase(fetchTransactionsForProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
        .addCase(updateExistingTransaction.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateExistingTransaction.fulfilled, (state, action) => {
          state.isLoading = false;
          state.transaction = action.payload; // Update the transaction in state
        })
        .addCase(updateExistingTransaction.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.error.message;
        });
  },
});

export default transactionSlice.reducer;
