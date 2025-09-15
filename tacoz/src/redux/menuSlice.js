import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (queryParams = '') => {
    const base = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${base}/api/menu${queryParams}`);
     let menuItems=await res.json();
     localStorage.setItem('menuItems', JSON.stringify(menuItems));
     return menuItems;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',
    search: '',
    filters: { minDelivery: null, maxDelivery: null, minRating: null, platform: null, category: null }
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = { minDelivery: null, maxDelivery: null, minRating: null, platform: null, category: null };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

// Selector to get filtered items
export const selectFilteredMenu = createSelector(
  (state) => state.menu.items,
  (state) => state.menu.filters,
  (items, filters) => {
    return items.filter((item) => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.minRating && item.rating < filters.minRating) return false;
      if (filters.maxDelivery && item.deliveryPrice > filters.maxDelivery) return false;
      if (filters.platform && !item.orderingOptions.some(opt => opt.type === filters.platform)) return false;
      return true;
    });
  }
);

export const { setSearch, setFilters, clearFilters } = menuSlice.actions;
export default menuSlice.reducer;
