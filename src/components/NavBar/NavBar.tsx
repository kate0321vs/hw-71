import {NavLink, useLocation} from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  const location = useLocation();

  return (
    <Box sx={{mb: 5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color='inherit'
            component={NavLink}
            to={location.pathname === '/' ? '/' : '/admin'}
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            {location.pathname === '/'  ? 'Turtle Pizza' : 'Turtle Pizza Admin'}
          </Typography>

          {location.pathname === '/' ? null :
            <Box>
            <Button color="inherit" component={NavLink} to="/admin/dishes">Dishes</Button>
            <Button color='inherit'  component={NavLink} to="/admin/orders">Orders</Button>
          </Box> }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;