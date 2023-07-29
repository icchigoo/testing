import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId !== null) {
        return await authService.getUserById(userId);
      } else {
        // Handle the case when userId is null
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (newPassword, thunkAPI) => {
    try {
      const response = await authService.updatePassword(newPassword);
      return response; // Return the relevant response data
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.createUser(userData);
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.updateUser(userData);

      // If the API call is successful and there are uploaded images, update the user object with the image URLs
      if (response.success && userData.images.length > 0) {
        const updatedUser = { ...response.user, images: userData.images };
        return updatedUser;
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);

export const logout = () => (dispatch) => {
  // Clear user data from the Redux store and local storage
  dispatch(authSlice.actions.clearUser());
  localStorage.removeItem("user"); // Remove user data from local storage
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      // Clear the user data from the state
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error instanceof Error ? action.error.message : String(action.error);
        state.isLoading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User created successfully"; // Optionally, you can set a success message here
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error instanceof Error ? action.error.message : String(action.error);
        state.isLoading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error instanceof Error ? action.error.message : String(action.error);
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Password updated successfully";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error instanceof Error ? action.error.message : String(action.error);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error instanceof Error ? action.error.message : String(action.error);
      });
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
