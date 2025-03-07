import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import DishItem from '../../components/DishItem/DishItem.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectDishes, selectFetchDishesLoading } from '../../store/dishesSlice.ts';
import { fetchDishes, submitOrder } from '../../store/dishesThunk.ts';
import { Dish } from '../../types';
import { addDish, deleteDish, resetCart, selectCartDishes, selectSubmitLoading } from '../../store/cartSlice.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import CartModal from '../../components/UI/CartModal/CartModal.tsx';
import { toast } from 'react-toastify';

const Menu = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCartDishes);
  const loading = useAppSelector(selectFetchDishesLoading);
  const [open, setOpen] = useState<boolean>(false);
  const submitLoading = useAppSelector(selectSubmitLoading);

  useEffect(() => {
    dispatch(fetchDishes())
  }, [dispatch]);

  const addDishToCart = (dish: Dish) => {
    dispatch(addDish(dish));
  }

  const onDeleteDish = (dish: Dish) => {
    dispatch(deleteDish(dish))
  }

  const submitAction = async () => {
    if (cart) {
      await dispatch(submitOrder(cart));
      toast.success('Order was submitted Successfully!');
      dispatch(resetCart());
      handleClose();
    }
  };

  const totalPrice = cart.reduce((acc, dish) => acc + dish.dish.price * dish.amount, 0);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <Container>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h4" sx={{flexGrow: 1}}>
          Dishes
        </Typography>
      </Box>
      {loading ? <Spinner/> :
        dishes.length !== 0 ? dishes.map((dish) => (
            <DishItem
              key={dish.id}
              dish={dish}
              onAddDishToCart={() => addDishToCart(dish)}/>
          )) :
          <p style={{marginTop: 30}}>No dishes yet</p>}
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 4}}>
        <Typography variant="h5">
          Total Price: {totalPrice}
        </Typography>
        <Button variant="contained" onClick={handleOpen}>Checkout</Button>
      </Box>
      <CartModal open={open} onClose={handleClose} cartDishes={cart} totalPrice={totalPrice + 150}
                 onDeleteDish={onDeleteDish} submitAction={submitAction} isLoading={submitLoading} />
    </Container>
  );
};

export default Menu;