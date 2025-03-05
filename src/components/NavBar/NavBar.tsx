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
            Contacts
          </Typography>
          <Button color='inherit' variant="outlined"  component={NavLink} to='/new-contact'>Add New Contact</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;