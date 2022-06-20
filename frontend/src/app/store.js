import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import usersReducer from '../features/users/usersSlice'
import lootReducer from '../features/loot/lootSlice'
import enemyReducer from '../features/enemy/enemySlice'

export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    loot: lootReducer,
    enemy: enemyReducer,
  },
})
