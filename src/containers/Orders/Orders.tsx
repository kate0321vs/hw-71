import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { useEffect } from 'react';
import { deleteOrder, fetchDishes, fetchOrders } from '../../store/dishesThunk.ts';
import { selectDishes } from '../../store/dishesSlice.ts';
import { selectDeleteOrderLoading, selectOrders, selectOrdersLoading } from '../../store/ordersSlice.ts';
import { IOrder, OrdersDishes } from '../../types';
import OrderItem from './OrderItem/OrderItem.tsx';
import { Container } from '@mui/material';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { toast } from 'react-toastify';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const dishes = useAppSelector(selectDishes);
  const ordersLoading = useAppSelector(selectOrdersLoading);
  const completeLoading = useAppSelector(selectDeleteOrderLoading)

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchDishes())
  }, [dispatch]);

  const ordersArray: OrdersDishes[] = [];

  orders.map(order => {
    const dishesForOrder: IOrder[] = [];
    Object.keys(order.items).map(key => {
      if (key !== 'id') {
        const dish = dishes.find(dish => dish.id === key);
        if (dish) {
          dishesForOrder.push({
            title: dish.title,
            price: dish.price,
            amount: order.items[key]
          });
        }
      }
    });
    const totalPrice = dishesForOrder.reduce((acc, dish) => acc + dish.price * dish.amount, 0);
    ordersArray.push({dishes: dishesForOrder, id: order.id, total: totalPrice + 150});
  });

  const onDelete = async (id: string) => {
    if (window.confirm("Are yo you want to complete this order?")) {
      await dispatch(deleteOrder(id));
      toast.success('Order completed Successfully!');
      await dispatch(fetchOrders());
    }
  };

  return (
      <Container>
        {ordersLoading ? <Spinner /> :
        ordersArray.length > 0 ? ordersArray.map((order) => (
          <OrderItem key={order.id}
                     order={order.dishes}
                     total={order.total}
                     onDelete={() => onDelete(order.id)}
                     isLoading={completeLoading === order.id}/>
        )) : <p>No orders yet</p>}
      </Container>

  );
};

export default Orders;