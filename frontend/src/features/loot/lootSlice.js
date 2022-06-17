import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchLoot = createAsyncThunk('users/fetchLoot', async () => {
//   const response = await fetch('http://localhost:4000/loot');
//   console.log(response);
//   return response.json();
// })

export const lootSlice = createSlice({
  name: "loot",
  initialState: {
    weapons: [],
  },
  reducers: {
    findLoot: (state, action) => {
      state.weapons = action.payload;
    },
  },
});

export const { findLoot } = lootSlice.actions;

export default lootSlice.reducer;
