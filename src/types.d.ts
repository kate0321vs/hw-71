export interface Dish {
    title: string;
    price: number;
    image: string;
    id: string;
}

export interface ApiDish {
    title: string;
    price: number;
    image: string;
}

export interface DishesListApi {
    [id: string]: ApiDish;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

