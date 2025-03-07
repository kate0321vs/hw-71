import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { IOrder } from '../../../types';
import ButtonSpinner from '../../../components/UI/Spinner/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  order: IOrder[];
  total: number | undefined;
  onDelete: () => void;
  isLoading?: boolean;
}

const OrderItem: React.FC<Props> = ({order, total, onDelete, isLoading}) => {

  return (
    <Card sx={{ mb: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        {order.map((dish, index) => (
          <Typography key={index}>
            {dish.amount} x {dish.title} <strong>{dish.price} KGS</strong>
          </Typography>
        ))}

        <Typography sx={{ mt: 1 }}>Delivery <strong>150 KGS</strong></Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="h6">
          Order total: {total && <strong>{total} KGS</strong>}
        </Typography>

        <Button sx={{ mt: 1 }} color="primary" onClick={onDelete}>
          {isLoading && <ButtonSpinner />} Complete order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderItem;