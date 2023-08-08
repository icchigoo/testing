import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

// Abstracted async thunk creation function
const createPropertyAsyncThunk = (name, serviceFunction) =>
  createAsyncThunk(`property/${name}`, async (payload, thunkAPI) => {
    try {
      return await serviceFunction(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

// Create async thunks
export const getProperty = createPropertyAsyncThunk("getProperties", propertyService.getProperty);
export const getPropertyById = createPropertyAsyncThunk("getPropertyById", propertyService.getPropertyById);
export const createProperty = createPropertyAsyncThunk("createProperty", propertyService.createProperty);
export const editProperty = createPropertyAsyncThunk("editProperty", propertyService.editProperty);



const initialState = {
  properties: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdProperty: null,
};

// Slice for managing property state
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    // ... Other reducer actions ...
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.properties = action.payload;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })



      .addCase(resetState, () => initialState);
  },
});

export const { resetState } = propertySlice.actions;
export default propertySlice.reducer;
