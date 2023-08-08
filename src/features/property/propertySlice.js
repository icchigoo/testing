import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

export const getProperty = createAsyncThunk(
  "property/getProperties",
  async (_, thunkAPI) => {
    try {
      return await propertyService.getProperty();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPropertyById = createAsyncThunk(
  "property/getPropertyById",
  async (id, thunkAPI) => {
    try {
      return await propertyService.getPropertyById(id);
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProperty = createAsyncThunk(
  "property/createProperty",
  async (propertyData, thunkAPI) => {
    try {
      return await propertyService.createProperty(propertyData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editProperty = createAsyncThunk(
  "property/editProperty",
  async ({ id, updatedProperty }, thunkAPI) => {
    try {
      return await propertyService.editProperty(id, updatedProperty);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  properties: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  selectedProperty: null, // Renamed from createdProperty
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [
            getProperty.pending,
            getPropertyById.pending,
            createProperty.pending,
            editProperty.pending,
          ].includes(action.type),
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.isSuccess = false;
          state.message = "";
        }
      )
      .addMatcher(
        (action) =>
          [
            getProperty.fulfilled,
            getPropertyById.fulfilled,
            createProperty.fulfilled,
            editProperty.fulfilled,
          ].includes(action.type),
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.properties = action.payload || state.properties;
          state.selectedProperty = action.payload || state.selectedProperty;
        }
      )
      .addMatcher(
        (action) =>
          [
            getProperty.rejected,
            getPropertyById.rejected,
            createProperty.rejected,
            editProperty.rejected,
          ].includes(action.type),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.error.message || "An error occurred.";
        }
      );
  },
});

export default propertySlice.reducer;
