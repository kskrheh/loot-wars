import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // запускает обратный вызов обещания и отправляет действие жизнен,цикла
// createSlice функция принимающая начальное состояние, обьект функций редьюсера,авто создает действия и типы действия соответствующие 
// редьюсером и состоянию внутри он использует createAction и createReducer
export const fetchLoot = createAsyncThunk('users/fetchLoot', async () => {
  const response = await fetch('http://localhost:4000/loot');
  const data = await response.json();
  return data;
})

export const lootSlice = createSlice({
  name: "loot",  // action.type в тоолките показывает что отрабатывает 
  initialState: {
    weapons: [],
  },
  reducers: {

  },
  extraReducers(builder) {  // каждый редьюсер имеет свой слайс состояния
    builder.addCase(fetchLoot.fulfilled, (state, action) => { // добавляет редуктор для одного точного типа дейстий 
      state.status = 'succeeded'
      state.weapons = action.payload
    })
  }
});

export const { findLoot } = lootSlice.actions;

export default lootSlice.reducer;
