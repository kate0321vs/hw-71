import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Dish } from '../../../types';
import { selectDeleteLoading } from '../../../store/dishesSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { deleteDish, fetchDishes } from '../../../store/dishesThunk.ts';
import ButtonSpinner from '../../../components/UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  dish: Dish
}

const DishItem: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const onDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      await dispatch(deleteDish(dish.id));
      await dispatch(fetchDishes());
    }
  }

  return (
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          mt: 2,
          border: '1px solid lightgray',
          borderRadius: '10px',
        }}>
        <CardContent sx={{p:0, display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '1rem' }}>
          <img style={{width: 150, height: 150, objectFit:'cover', borderRadius: '10px'}} src={dish.image} alt=""/>
          <Typography variant="h6">{dish.title}</Typography>
        </CardContent>
        <Typography variant="h6">{dish.price} KGS</Typography>
        <Grid>
          <Button sx={{mx: 2}} component={NavLink} to={`/edit-dish/${dish.id}`}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={onDelete}
          >
            {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>} Delete
          </Button>
        </Grid>
      </Card>
  );
};

export default DishItem;