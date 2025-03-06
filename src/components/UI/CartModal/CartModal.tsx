import { Box, Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { CartDish, Dish } from '../../../types';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ButtonSpinner from '../Spinner/ButtonSpinner/ButtonSpinner.tsx';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  cartDishes: CartDish[] | null;
  totalPrice?: number;
  onDeleteDish: (dish: Dish) => void;
  submitAction: () => void;
  isLoading: boolean;
}

const CartModal: React.FC<CartModalProps> = ({ open, onClose, cartDishes, totalPrice, onDeleteDish, submitAction, isLoading}) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "grey.700" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Your Order
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {cartDishes && cartDishes.length > 0 ? (
          <>
            {cartDishes.map((dish) => (
              <Box
                key={dish.dish.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: "grey.100",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {dish.dish.title} x {dish.amount}
                </Typography>
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  {dish.dish.price} KGS
                </Typography>
                <Button
                  onClick={() => onDeleteDish(dish.dish)}
                  size="small"
                  color='error'
                >
                  <DeleteOutlineIcon />
                </Button>
              </Box>
            ))}

            <Divider sx={{ mt: 2, mb: 1 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Delivery:</Typography>
              <Typography variant="body1">
                <strong>150 KGS</strong>
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Total Price:
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {totalPrice} KGS
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" gap={3}>
              <Button onClick={onClose} variant="contained" color='inherit' disabled={isLoading}  sx={{ mt: 2 }}>
                Cancel
              </Button>
              <Button type='submit' onClick={submitAction} variant="contained" color="primary" disabled={isLoading}   sx={{ mt: 2 }}>
                {isLoading && <ButtonSpinner/>} Order
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1" textAlign="center" color="grey.600">
            Your order is empty.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};


  export default CartModal;
