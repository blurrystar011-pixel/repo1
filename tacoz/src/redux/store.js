import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from './menuSlice';
import cartReducer from './cartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
     menu: menuReducer,
      cart: cartReducer
  },
});

export default store;
