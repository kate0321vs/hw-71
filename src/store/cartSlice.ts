import {CartDish, Dish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import { submitOrder } from './dishesThunk.ts';


interface CartState {
  cartDishes: CartDish[];
  submitLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  submitLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.findIndex(cartItem => cartItem.dish.id === dish.id);
      if (existingIndex !== -1) {
        state.cartDishes[existingIndex].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        })
      }
    },
    deleteDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.findIndex(cartItem => cartItem.dish.id === dish.id);
      if (existingIndex !== -1) {
        const currentItem = state.cartDishes[existingIndex];

        if (currentItem.amount > 1) {
          currentItem.amount--;
        } else {
          state.cartDishes.splice(existingIndex, 1);
        }
      }
    },
    resetCart: (state) => {
      state.cartDishes = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitOrder.pending, (state) => {
      state.submitLoading = true;
    });
    builder.addCase(submitOrder.fulfilled, (state) => {
      state.submitLoading = false;
    });
    builder.addCase(submitOrder.rejected, (state) => {
      state.submitLoading = false;
    });
  }
});

export const selectCartDishes = (state: RootState) => state.cart.cartDishes
export const cartReducer = cartSlice.reducer;
export const selectSubmitLoading = (state: RootState) => state.cart.submitLoading;
export const {addDish, deleteDish, resetCart} = cartSlice.actions;