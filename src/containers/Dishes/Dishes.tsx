import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectDishes } from '../../store/dishesSlice.ts';
import DishItem from './DishItem/DishItem.tsx';
import { useEffect } from 'react';
import { fetchDishes } from '../../store/dishesThunk.ts';
import { Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch])

  return (
    <Container>
      <Button variant="contained" component={NavLink} to={'/new-dish'}>Add New Dish</Button>
      {dishes ? dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} />
      )) : <p>No dishes yet</p>}
    </Container>
  );
};

export default Dishes;