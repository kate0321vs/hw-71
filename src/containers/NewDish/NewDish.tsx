import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import DishForm from '../../components/DishForm/DishForm.tsx';
import { selectCreateLoading } from '../../store/dishesSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { createDish } from '../../store/dishesThunk.ts';
import { ApiDish } from '../../types';
import { useNavigate } from 'react-router-dom';

const NewDish = () => {
const dispatch = useAppDispatch();
const loading = useAppSelector(selectCreateLoading);
const navigate = useNavigate();

  const onSubmit = async (dish: ApiDish) => {
     await dispatch(createDish(dish));
     navigate('/');
  }

  return (
    <>
      <>
        {loading ? <Spinner/> : <DishForm onSubmitAction={onSubmit} isLoading={loading} />}
      </>
    </>
  );
};

export default NewDish;