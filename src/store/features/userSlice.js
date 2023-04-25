import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  message: null,
  errors: null,
};

// Update the API endpoint to match your API
const API_BASE_URL = process.env.API_BASE_URL || '';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async ({ userName, nickName, mobileNumber, email, status }) => {
  let url = `/spring/web/auth/users`;

  if (userName) {
    url += `?userName=${userName}`;
  }
  if (nickName) {
    url += `&nickName=${nickName}`;
  }
  if (mobileNumber) {
    url += `&mobileNumber=${mobileNumber}`;
  }
  if (email) {
    url += `&email=${email}`;
  }
  if (status) {
    url += `&status=${status}`;
  }
  url = url.replace('users&', 'users?');

  const response = await axios.get(url);
  return response.data.data.content;
});

export const addUser = createAsyncThunk('user/addUser', async (user, { rejectWithValue }) => {
  try {
    console.log('Sending payload:', JSON.stringify(user));
    const response = await axios.post(`${API_BASE_URL}/auth/users`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    console.log('Sending payload:', JSON.stringify(updatedUser));
    const response = await axios.put(`${API_BASE_URL}/auth/users/${id}`, updatedUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  await axios.delete(`${API_BASE_URL}/auth/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
      state.message = null;
    },
    setStatusIdle: (state) => { // Add this reducer
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload.data); // Access the nested data field here
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.message = action.payload.message;
          state.errors = action.payload.errors;
        } else {
          state.message = action.error.message;
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.status = 'failed';
        if (action.payload) {
          state.message = action.payload.message;
          state.errors = action.payload.errors;
        } else {
          state.message = action.error.message;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload);
        state.users.splice(index, 1);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.message = action.error.message;
        state.errors = action.error.error.errors;
      });
  },
});
export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
