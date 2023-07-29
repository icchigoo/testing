import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTransaction } from "../transaction/transactionService";

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



// Create the transaction slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: null,
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
      
  },
});

export default transactionSlice.reducer;
