import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dish } from '../../types';
import { selectDeleteLoading } from '../../store/dishesSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { deleteDish, fetchDishes } from '../../store/dishesThunk.ts';
import ButtonSpinner from '../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

interface Props {
  dish: Dish,
  adminDishesList?: boolean,
  onAddDishToCart?: () => void,
}

const DishItem: React.FC<Props> = ({dish, adminDishesList, onAddDishToCart}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      await dispatch(deleteDish(dish.id));
      toast.success('Contact was deleted Successfully!');
      await dispatch(fetchDishes());
    }
  };

  let imageUrl = 'https://i.pinimg.com/474x/e4/7d/f7/e47df7957197ba5fa8308a987d034adb.jpg';
  if (dish.image) {
    imageUrl = dish.image;
  }

  return (
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          my: 3,
          border: '1px solid lightgray',
          borderRadius: '10px',
        }}
      onClick={onAddDishToCart}>
        <CardContent sx={{p:0, display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '1rem' }}>
          <img style={{width: 150, height: 150, objectFit:'cover', borderRadius: '10px'}} src={imageUrl} alt=""/>
          <Typography variant="h6">{dish.title}</Typography>
        </CardContent>
        <Typography variant="h6">{dish.price} KGS</Typography>
        {adminDishesList &&
          <Grid>
          <Button component={NavLink} to={`/edit-dish/${dish.id}`}>
            <EditIcon sx={{color: 'dimgray'}} fontSize="large"/>
          </Button>
          <Button
            onClick={onDelete}
          >
            {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>} {!deleteLoading && <DeleteIcon color='error' fontSize="large" />}
          </Button>
        </Grid>}
      </Card>
  );
};

export default DishItem;