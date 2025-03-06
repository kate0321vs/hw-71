import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import DishItem from '../../components/DishItem/DishItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectDishes } from '../../store/dishesSlice.ts';
import { fetchDishes } from '../../store/dishesThunk.ts';
import { Dish } from '../../types';
import { addDish, selectCartDishes } from '../../store/cartSlice.ts';

const Menu = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCartDishes)

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch]);

const addDishToCart = (dish: Dish) => {
    dispatch(addDish(dish));
}

  console.log(cart)

const totalPrice = cart.reduce((acc, dish) => acc + dish.dish.price * dish.amount , 0);

  return (
    <Container>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h4" sx={{flexGrow: 1}}>
          Dishes
        </Typography>
      </Box>
      {dishes.length !== 0 ? dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} onAddDishToCart={() => addDishToCart(dish)} />
      )) : <p style={{marginTop: 30}}>No dishes yet</p>}
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4}}>
        <Typography variant="h5">
          Total Price: {totalPrice}
        </Typography>
        <Button variant="contained">Checkout</Button>
      </Box>
    </Container>
  );
};

export default Menu;