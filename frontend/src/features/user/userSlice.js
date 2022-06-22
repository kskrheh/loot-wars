import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: undefined,
    energy: undefined,
    fight: false,
    weapons: [],
    weaponsId: [],
    userWeaponsId: []
  },
  status: 'idle',
  errorReg: null,
  loading: false,
}

export const fetchUserWeapons = createAsyncThunk('user/fetchUserWeapon', async (name) => { // ac.t
  const response = await fetch(`http://localhost:4000/users/${name}/weapon`, {
    method: 'GET',
    credentials: 'include',
    headers: {"Content-Type": "application/json"}
  });

  const data = await response.json();
  return data;
})

export const fetchRegister = createAsyncThunk('user/fetchRegister', async ({ username, email, password, passwordRepeat }) => {
    const body = JSON.stringify({ username, passwordRepeat, password, email });
    const response = await fetch('http://localhost:4000/auth/register', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body,
      method: 'POST'
    });
    const data = await response.json();
    return data;
})
export const fetchLogin = createAsyncThunk('user/fetchLogin', async ({ username, password }) => {
    // console.log(username, password)
    const body = JSON.stringify({ username, password });
    const response = await fetch('http://localhost:4000/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body,
      method: 'POST'
    });
    return response.json();
})

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('http://localhost:4000/auth/info', {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'get'
  });
  const data = await response.json();
  // console.log(data)
  return data;
})

export const fetchFightUserUpdate = createAsyncThunk('user/fetchFightUserUpdate', async (enemyId) => {
  const response = await fetch(`http://localhost:4000/users/${enemyId}/fight`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'put'
  })
  const data = await response.json();
  return data;
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user.name = null
    },
    userWeaponsId: (state, action) => {
      state.user.userWeaponsId.push(action.payload)
    },
    weaponsId: (state, action) => {
      state.user.weaponsId.push(action.payload)
    },
    pickWeapon: (state, action) => {
      state.user.weapons = state.user.weapons.map((el) => {
        if(+el.id === +action.payload){
          return {
            ...el,
            pick: el.pick === 1 ? 2 : 1
          }
        }
        return el
      })
    },
    decreaseEnergy: (state ) => {
      state.user.energy -= 1
    },
    increaseEnergy: (state) => {
      state.user.energy += 1
    },
    // isFighting: (state) => {
    //   state.user.fight = !state.user.fight
    // }
  },
  extraReducers(builder) { //санки в тулките все пишуться через екстра редюсер
    builder.addCase(fetchUserWeapons.fulfilled, (state, action) => {
      const updateActionPayload = action.payload.map((el) => {
        return {
          ...el,
          pick: 1
        }
      })
      state.user.weapons = updateActionPayload
    })
    builder.addCase(fetchUserWeapons.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchUserWeapons.rejected, (state, action) => {
      state.status = 'rejected'
      state.loading = false
      state.errorReg = 'Ошибка при обновлении вашего инвентаря'


    })
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user.name = action.payload
      state.loading = false
      // console.log(action.payload);
    })
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorReg = 'ошибка регистрации, возможно пользователь с таким логином уже существует'
      // console.log(action.payload);
      state.loading = false
    })
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user.name = action.payload
      state.loading = false
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorReg = 'Пользователя с таким логином или паролем не существует'
      state.loading = false
    })
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = 'pending'
      state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user.name = action.payload.name;
      state.user.energy = action.payload.energy;
      // state.user.fight = action.payload.fight
      if (action.payload.weapons) {
        state.user.weapons = action.payload.weapons
      }
      state.loading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorReg = action.payload
      state.loading = false
    })
    builder.addCase(fetchFightUserUpdate.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user.fight = action.payload.fight
      state.loading = false
    })
  }
})

export const { logout, weaponsId, userWeaponsId, decreaseEnergy, increaseEnergy, pickWeapon, isFighting } = userSlice.actions

export default userSlice.reducer
