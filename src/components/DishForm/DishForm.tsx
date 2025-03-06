import { Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ApiDish } from '../../types';
import ButtonSpinner from '../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  isLoading?: boolean;
  isEdit?: boolean;
  onSubmitAction: (dish: ApiDish) => void;
  dish?: ApiDish | null;
}

const initialForm = {
  title: '',
  price: 0,
  image: ''
}

const DishForm: React.FC<Props> = ({isLoading, isEdit, onSubmitAction, dish}) => {
  const [form, setForm] = useState<ApiDish>(initialForm);

  useEffect(() => {
    if(dish) {
      setForm(dish);
    }
  }, [dish]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if (form.price < 0) {
      alert("Please enter a correct price");
      return;
    } else if (form.title.trim().length === 0) {
      alert("Please enter a correct title");
      return;
    }
    onSubmitAction({...form, price: Number(form.price)});
  }

  const onChange = (e: ChangeEvent<HTMLInputElement> ) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };




  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center'}}>
        {isEdit ? 'Edit Dish' : 'Add Dish'}
      </Typography>

      <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Title"
            name="title"
            variant="outlined"
            onChange={onChange}
            value={form.title}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Price"
            name="price"
            variant="outlined"
            onChange={onChange}
            value={form.price}
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            sx={{width: '100%', mb: 2}}
            label="Image"
            name="image"
            variant="outlined"
            onChange={onChange}
            value={form.image}
            disabled={isLoading}
          />
        </Grid>
        <Grid xs={12}>
          <Button sx={{width: '100%', mb: 2}} variant="contained" type='submit' disabled={isLoading}>
            {isLoading && <ButtonSpinner/>}{isEdit ? 'Edit' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DishForm;