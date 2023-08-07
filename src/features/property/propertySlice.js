import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

// Async thunk to get all properties
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

// Async thunk to get a property by ID
// Inside getPropertyById async thunk
export const getPropertyById = createAsyncThunk(
  "property/getPropertyById",
  async (id, thunkAPI) => {
    try {
      console.log("Fetching property by ID:", id);
      const response = await propertyService.getPropertyById(id);
      console.log("Fetched property:", response);
      return response;
    } catch (error) {
      console.error("Error fetching property by ID:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


// Async thunk to create a property
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

// Async thunk to edit a property
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

export const resetState = createAction("Reset_all");

const initialState = {
  properties: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  createdProperty: null,
};

// Slice for managing property state
export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
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
    
      .addCase(getPropertyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        console.log("getPropertyById.fulfilled - Action payload:", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.selectedProperty = action.payload;
      })
      .addCase(getPropertyById.rejected, (state, action) => {
        console.error("getPropertyById.rejected - Error:", action.error);
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProperty = action.payload;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(editProperty.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // Find the index of the edited property in the properties array
        const editedPropertyIndex = state.properties.findIndex((p) => p._id === action.payload._id);
        if (editedPropertyIndex !== -1) {
          // Update the property in the array
          state.properties[editedPropertyIndex] = action.payload;
        }
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default propertySlice.reducer;
