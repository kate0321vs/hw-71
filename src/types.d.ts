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
  amount: number;
  dish: Dish;
}

export interface ApiOrder {
  [id: string]: number;
}

export interface Order {
  id: string;
  items: ApiOrder;
}

export interface IOrder {
  title: string;
  price: number;
  amount: number;
}

export interface OrdersDishes {
  dishes: IOrder[];
  id: string;
  total?: number;
}


