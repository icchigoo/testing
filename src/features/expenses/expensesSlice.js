import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { expensesService } from "./expensesService";

// Async thunk to get household expenses
export const getHouseHoldExpenses = createAsyncThunk(
  "expenses/getHouseHoldExpenses",
  async (user, thunkAPI) => {
    try {
      return await expensesService.getHouseHoldExpenses(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk to save household expenses
export const saveHouseHoldExpenses = createAsyncThunk(
  'expenses/saveHouseHoldExpenses',
  async (expensesData, thunkAPI) => {
    try {
      const response = await expensesService.saveHouseHoldExpenses(expensesData);
      return response.data; // Assuming the response contains the saved expenses data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetExpensesState = createAction("Reset_expenses");

const initialState = {
  expenses: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

// Slice for managing expenses state
export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouseHoldExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouseHoldExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getHouseHoldExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(saveHouseHoldExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveHouseHoldExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(saveHouseHoldExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetExpensesState, () => initialState);
  },
});

export default expensesSlice.reducer;
