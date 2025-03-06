import { Box } from '@mui/material';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import NewDish from './containers/NewDish/NewDish.tsx';
import EditDish from './containers/EditDish/EditDish.tsx';
import Menu from './containers/Menu/Menu.tsx';

const App = () => {
    return (
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", display: "flex", flexDirection: "column"  }}>
        <Layout>
          <Routes>
            <Route path='/' element={(<Menu/>)}/>
            <Route path="/admin" element={(<Dishes />)}/>
            <Route path="/admin/dishes" element={(<Dishes />)}/>
            <Route path='/edit-dish/:id' element={<EditDish/>}/>
            <Route path="/new-dish" element={(<NewDish/>)}/>
            <Route path="*" element={(<h1>Not page found</h1>)}/>
          </Routes>
        </Layout>
      </Box>
    );
};

export default App;