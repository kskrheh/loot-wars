import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:4000/users');
  console.log(response);
  return response.json();
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // getEnemies: (state, action) => {
    //   state.users = action.payload
    // }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload
    })
  }
})

export const { getEnemies } = usersSlice.actions

export default usersSlice.reducer
