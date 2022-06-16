import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,

  },
  reducers: {
    auth: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { auth } = userSlice.actions

export default userSlice.reducer
