import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { incomesService } from "./incomesService";

// Async thunk to get household incomes
export const getHouseHoldIncomes = createAsyncThunk(
  "incomes/getHouseHoldIncomes",
  async (user, thunkAPI) => {
    try {
      return await incomesService.getHouseHoldIncomes(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Async thunk to save household incomes
export const saveHouseHoldIncomes = createAsyncThunk(
  'incomes/saveHouseHoldIncomes',
  async (incomesData, thunkAPI) => {
    try {
      const response = await incomesService.saveHouseHoldIncomes(incomesData);
      return response.data; // Assuming the response contains the saved incomes data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetIncomesState = createAction("Reset_incomes");

const initialState = {
  incomes: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

// Slice for managing incomes state
export const incomesSlice = createSlice({
  name: "incomes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouseHoldIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouseHoldIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.incomes = action.payload;
      })
      .addCase(getHouseHoldIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(saveHouseHoldIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveHouseHoldIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.incomes = action.payload;
      })
      .addCase(saveHouseHoldIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetIncomesState, () => initialState);
  },
});

export default incomesSlice.reducer;
