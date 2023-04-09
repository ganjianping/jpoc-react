import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  nextUserId: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({ id: state.nextUserId, ...action.payload });
      state.nextUserId += 1;
    },
    updateUser: (state, action) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex >= 0) {
        state.users[userIndex] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
