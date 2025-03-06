import { ApiDish, CartDish, Dish, DishesListApi } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi.ts';

export const fetchDishes = createAsyncThunk<Dish[], undefined>(
  "dishes/fetchAll",
  async () => {
    const dishesResponse = await axiosApi<DishesListApi | null>('/dishes.json')
    const dishes = dishesResponse.data;
    let newDishes: Dish[] = [];
    if(dishes) {
     newDishes = Object.keys(dishes).map((key) => {
       return {...dishes[key], id: key};
     });
    }
    return newDishes;
  }
  );

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  "dishes/fetchOne",
  async (id) => {
    const dishResponse = await axiosApi<ApiDish | null>(`/dishes/${id}.json`);
    console.log(dishResponse.data);
    const dish = dishResponse.data;
    if(!dish) {
      throw new Error("Not Found!");
    }
     return dish;
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  "dishes/create",
  async (dish) => {
    await axiosApi.post('/dishes.json', dish);
  }
);

export const updateDish = createAsyncThunk<void, {id: string, dish: ApiDish}>(
  "dishes/update",
  async ({id, dish}) => {
    await axiosApi.put(`/dishes/${id}.json`, dish);
  }
);

export const deleteDish = createAsyncThunk(
  "dishes/delete",
  async (id: string) => {
    await axiosApi.delete(`/dishes/${id}.json`);
  }
);

export const submitOrder = createAsyncThunk(
  'cart/submitOrder',
  async (cart: CartDish[]) => {
    const order: Record<string, number> = {};
    cart.forEach((dish) => {
       order[dish.dish.id] = dish.amount
    });
    await axiosApi.post('/orders.json', order);
  }
);

