import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined,

  },
  reducers: {
    auth: (state, action) => {
      state.user = action.payload
    },
    login: (state,action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null;
    }
  }
})

export const { auth, login, logout } = userSlice.actions

export default userSlice.reducer
