import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await fetch('http://localhost:4000/loot', {
//     method: 'POST', 
//     credentials: 'include',
//     headers: {"Content-Type": "application/json"}
//   });
  
//   console.log(response);
//   return response.json();
// })

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: undefined,
      weapons: [],
      weaponsId: []
    },
  },
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
  }
})

export const { auth, login, logout, weaponsId } = userSlice.actions

export default userSlice.reducer
