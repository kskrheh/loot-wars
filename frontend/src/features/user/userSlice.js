import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: undefined,
    weapons: [],
    weaponsId: []
  },
}

export const fetchUserWeapons = createAsyncThunk('users/fetchUsers', async (name) => {
  const response = await fetch(`http://localhost:4000/users/${name}`, {
    method: 'GET', 
    credentials: 'include',
    headers: {"Content-Type": "application/json"}
  });
  
  const data = await response.json();
  return data;
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    auth: (state, action) => {
      state.user.name = action.payload
    },
    login: (state,action) => {
      state.user.name = action.payload
    },
    logout: (state) => {
      state.user.name = null;
    },
    weaponsId: (state, action) => {
      state.user.weaponsId.push(action.payload)
    }
  },
  extraReducers: {
    [fetchUserWeapons.fulfilled]: (state, {payload}) => {
      state.user.weapons = payload
    }
  }
})

export const { auth, login, logout, weaponsId } = userSlice.actions

export default userSlice.reducer
