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
    const response = await fetch(`/api/users/enemy/${name}`, {
        method: 'GET',
        credentials: 'include',
        headers: {"Content-Type": "application/json"}
    });

    const data = await response.json();
    return data;
})

export const enemySlice = createSlice({
    name: 'enemy',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchEnemyWeapons.fulfilled, (state, action) => {
            state.enemy = action.payload.user;
            state.enemy.weapons = action.payload.weapons
        })
    }
})

export default enemySlice.reducer
