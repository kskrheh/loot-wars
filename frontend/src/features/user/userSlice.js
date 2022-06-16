import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

  },
  reducers: {
    auth: (state, action) => {
      state.user = action.payload
    },
    login2: (state,action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
    }
  }
})

export const { auth, login2, logout } = userSlice.actions

export default userSlice.reducer
