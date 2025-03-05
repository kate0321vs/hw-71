import DishForm from '../../components/DishForm/DishForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { selectDish, selectFetchOneLoading, selectUpdateLoading } from '../../store/dishesSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneDish, updateDish } from '../../store/dishesThunk.ts';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { ApiDish } from '../../types';
import { toast } from 'react-toastify';

const EditDish = () => {
  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectDish);
  const loading = useAppSelector(selectFetchOneLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();

  useEffect( () => {
      dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    if (id) {
      await dispatch(updateDish({id, dish}));
      toast.success('Contact was edited Successfully!')
      navigate('/');
    }
  }

  return (
    <>
      {loading ? <Spinner/> : <DishForm isEdit dish={dish} onSubmitAction={onSubmit} isLoading={updateLoading} />}
    </>
  );
};

export default EditDish;