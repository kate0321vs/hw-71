import {CartDish, Dish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";


interface CartState {
  cartDishes: CartDish[];
};

const initialState: CartState = {
  cartDishes: [],
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
  },
});

export const selectCartDishes = (state: RootState) => state.cart.cartDishes
export const cartReducer = cartSlice.reducer;
export const {addDish} = cartSlice.actions;