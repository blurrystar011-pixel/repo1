// client/src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
 addToCart: (state, action) => {
  const item = action.payload;
  const found = state.items.find(i => i._id === item._id);
  if (found) {
    found.qty += 1;
  } else {
    state.items.push({ ...item, qty: 1 });
  }
},
removeFromCart: (state, action) => {
  state.items = state.items.filter(i => i._id !== action.payload);
},
updateQty: (state, action) => {
  const { id, qty } = action.payload;
  const found = state.items.find(i => i._id === id);
  if (found) {
    if (qty < 1) {
      state.items = state.items.filter(i => i._id !== id);
    } else {
      found.qty = qty;
    }
  }
},

    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
