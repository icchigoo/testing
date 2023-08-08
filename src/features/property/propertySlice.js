import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import propertyService from "./propertyService";

const setLoadingState = (state) => {
  state.isLoading = true;
  state.isError = false;
  state.isSuccess = false;
  state.message = "";
};

const setSuccessState = (state, payload) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.message = "";
  return payload;
};

const setErrorState = (state, error) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  state.message = error.message;
};

// Async thunk to get all properties
export const getProperty = createAsyncThunk("property/getProperties", async (_, thunkAPI) => {
  try {
    return await propertyService.getProperty();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Async thunk to get a property by ID
export const getPropertyById = createAsyncThunk("property/getPropertyById", async (id, thunkAPI) => {
  try {
    return await propertyService.getPropertyById(id);
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return thunkAPI.rejectWithValue(error);
  }
});

// Async thunk to create a property
export const createProperty = createAsyncThunk("property/createProperty", async (propertyData, thunkAPI) => {
  try {
    return await propertyService.createProperty(propertyData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
  selectedProperty: null,
};

// Slice for managing property state
export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperty.pending, setLoadingState)
      .addCase(getProperty.fulfilled, (state, action) => {
        setSuccessState(state, action.payload);
        state.properties = action.payload;
      })
      .addCase(getProperty.rejected, setErrorState)

      .addCase(getPropertyById.pending, setLoadingState)
      .addCase(getPropertyById.fulfilled, (state, action) => {
        setSuccessState(state, action.payload);
        state.selectedProperty = action.payload;
      })
      .addCase(getPropertyById.rejected, setErrorState)

      .addCase(createProperty.pending, setLoadingState)
      .addCase(createProperty.fulfilled, (state, action) => {
        setSuccessState(state, action.payload);
        state.createdProperty = action.payload;
      })
      .addCase(createProperty.rejected, setErrorState)

      .addCase(editProperty.fulfilled, (state, action) => {
        setSuccessState(state, action.payload);
        const editedPropertyIndex = state.properties.findIndex((p) => p._id === action.payload._id);
        if (editedPropertyIndex !== -1) {
          state.properties[editedPropertyIndex] = action.payload;
        }
      })
      .addCase(editProperty.rejected, setErrorState)

      .addCase(resetState, () => initialState);
  },
});

export default propertySlice.reducer;
