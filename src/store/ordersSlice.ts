import { Order } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { deleteOrder, fetchOrders } from './dishesThunk.ts';
import { RootState } from '../app/store.ts';

interface OrderState {
  orders: Order[];
  ordersLoading: boolean;
  deletedOrderLoading: boolean | string;
}

const initialState: OrderState = {
  orders: [],
  ordersLoading: false,
  deletedOrderLoading: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.ordersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
      state.ordersLoading = false;
      state.orders = orders;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.ordersLoading = false;
    });

    builder.addCase(deleteOrder.pending, (state, action) => {
      state.deletedOrderLoading = action.meta.arg;
    });
    builder.addCase(deleteOrder.fulfilled, (state) => {
      state.deletedOrderLoading = false;
    });
    builder.addCase(deleteOrder.rejected, (state) => {
      state.deletedOrderLoading = false;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectDeleteOrderLoading = (state: RootState) => state.orders.deletedOrderLoading;
export const selectOrdersLoading = (state: RootState) => state.orders.ordersLoading;