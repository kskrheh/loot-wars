import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // запускает обратный вызов обещания и отправляет действие жизнен,цикла
// createSlice функция принимающая начальное состояние, обьект функций редьюсера,авто создает действия и типы действия соответствующие 
// редьюсером и состоянию внутри он использует createAction и createReducer
export const fetchLoot = createAsyncThunk('users/fetchLoot', async () => {
  const response = await fetch('http://localhost:4000/loot');
  const data = await response.json();
  // console.log(data);
  return data;
})

export const lootSlice = createSlice({
  name: "loot",  // action.type в тоолките показывает что отрабатывает 
  initialState: {
    weapons: [],
    errorLoot: '',
    loadingLoot: false,
  },
  reducers: {
    removeWeapons: (state) => {
      state.weapons = []
    },
    pickLootWeapon: (state, action) => {
      state.weapons = state.weapons.map((el) => {
        if (+el.id === +action.payload) {
          return {
            ...el,
            pick: el.pick === 1 ? 3 : 1
          }
        }
        return el
      })
    },
  },
  extraReducers(builder) {  // каждый редьюсер имеет свой слайс состояния
    //фетч на получение лута
    builder.addCase(fetchLoot.fulfilled, (state, action) => { // добавляет редуктор для одного точного типа дейстий 
      state.status = 'succeeded'
      state.weapons = action.payload.map((el) => {
        return {
          ...el,
          pick: 1,
        }
      })
      state.loadingLoot = false;
    })
    builder.addCase(fetchLoot.pending, (state, action) => {
      state.status = 'pending';
      state.loadingLoot = true;
    })
    builder.addCase(fetchLoot.rejected, (state, action) => {
      state.status = 'rejected';
      state.loadingLoot = false;
      state.errorLoot = action.payload;
    })
  }
});

export const { findLoot, removeWeapons, pickLootWeapon } = lootSlice.actions;

export default lootSlice.reducer;
