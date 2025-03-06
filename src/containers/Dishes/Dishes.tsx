import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectDishes } from '../../store/dishesSlice.ts';
import DishItem from '../../components/DishItem/DishItem.tsx';
import { useEffect } from 'react';
import { fetchDishes } from '../../store/dishesThunk.ts';
import { Box, Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch])

  return (
    <Container>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h4" sx={{flexGrow: 1}}>
        Dishes
      </Typography>
        <Button variant="contained" component={NavLink} to={'/new-dish'}>Add New Dish</Button>
      </Box>
      {dishes.length !== 0 ? dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} adminDishesList/>
      )) : <p style={{marginTop: 30}}>No dishes yet</p>}
    </Container>
  );
};

export default Dishes;