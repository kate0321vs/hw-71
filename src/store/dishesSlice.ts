import { ApiDish, Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { createDish, deleteDish, fetchDishes, fetchOneDish, updateDish } from './dishesThunk.ts';
import { RootState } from '../app/store.ts';

interface DishesSlice {
  dishes: Dish[];
  dish: ApiDish | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  createLoading: boolean;
  deleteLoading: string | boolean;
}

const initialState: DishesSlice = {
  dishes: [],
  fetchLoading: false,
  fetchOneLoading: false,
  dish: null,
  updateLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers(builder) {
  builder.addCase(fetchDishes.pending, (state) => {
   state.fetchLoading = true;
  });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.dishes = dishes;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneDish.pending, (state) => {
      state.dish = null
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state, {payload: dish}) => {
      state.fetchOneLoading = false;
      state.dish = dish
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.dish = null
      state.fetchOneLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false
    });

    builder.addCase(deleteDish.pending, (state, action) => {
      state.deleteLoading = action.meta.arg
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false
    });
  }
});

export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectDish = (state: RootState) => state.dishes.dish;
export const selectFetchOneLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectUpdateLoading = (state: RootState) => state.dishes.updateLoading;
export const selectCreateLoading = (state: RootState) => state.dishes.createLoading;
export const selectDeleteLoading = (state: RootState) => state.dishes.deleteLoading;
export const dishesReducer = dishesSlice.reducer;