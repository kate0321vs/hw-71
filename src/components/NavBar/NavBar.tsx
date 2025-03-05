import {NavLink} from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';


const NavBar = () => {
  return (
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to='/'
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            Turtle Pizza Admin
          </Typography>
          <Button color='inherit'  component={NavLink} to='/admin/dishes'>Dishes</Button>
          <Button color='inherit'  component={NavLink} to='/admin/orders'>Orders</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;