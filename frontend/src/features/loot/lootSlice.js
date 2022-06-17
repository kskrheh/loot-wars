import { createSlice } from "@reduxjs/toolkit";

export const lootSlice = createSlice({
  name: 'loot',
  initialState: {
    weapons: [],
  },
  reducers: {
    findLoot: (state, action) => {
      state.weapons += action.payload
    }
  }
})

export const {findLoot} = lootSlice.actions

export default lootSlice.reducer
