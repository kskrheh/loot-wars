import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  enemy: {
    name: undefined,
    weapons: [],
  },
  status: 'idle',
  error: null,
  loading: false,
}

export const fetchEnemyWeapons = createAsyncThunk('enemy/fetchUsers', async (name) => {
  const response = await fetch(`http://localhost:4000/users/enemy/${name}`, {
    method: 'GET',
    credentials: 'include',
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  console.log(data)
  return data;
})
export const fetchWeaponsTake = createAsyncThunk('enemy/takeloot', async (body) => {
  const response = await fetch('http://localhost:4000/users/enemy/takeloot', {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();
  console.log(data)
  return data;
})

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    pickEnemyWeapon: (state, action) => {
      console.log(action.payload);
      state.enemy.weapons = state.enemy.weapons.map((el, i) => {
        if (i === +action.payload) {
          return {
            ...el,
            pick: el.pick === 1 ? 3 : 1
          }
        }
        return el
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchEnemyWeapons.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.enemy = action.payload.user;
      state.enemy.weapons = action.payload.weapons.map((el) => {
        return {
          ...el,
          pick: 1,
        }
      })
      state.loading = false
    })
    builder.addCase(fetchEnemyWeapons.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchEnemyWeapons.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = 'Ошибка при загрузке врага'
    })
    builder.addCase(fetchWeaponsTake.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.loading = false
    })
    builder.addCase(fetchWeaponsTake.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchWeaponsTake.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.error = 'Ошибка при попытке забрать пушку'
    })
  }
})
export const { pickEnemyWeapon } = enemySlice.actions
export default enemySlice.reducer

