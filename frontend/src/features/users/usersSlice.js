import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (name) => {
  const response = await fetch('/api/users', {
    body: JSON.stringify({name}),
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  });
  const data = await response.json()
  return data;
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {
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
