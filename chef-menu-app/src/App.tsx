import React, { useState } from 'react';
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import logo from './chef-menu-app/Logo_food.jpeg'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#820b33',
    },
    secondary: {
      main: '#6fa287',
    },
  },
});

const MenuItemComponent: React.FC<{ item: { name: string, description: string, course: string, price: number } }> = ({ item }) => (
  <div style={{ padding: 16, borderBottom: '1px solid #ccc' }}>
    <Typography variant="h6">{item.name}</Typography>
    <Typography>{item.description}</Typography>
    <Typography>{item.course}</Typography>
    <Typography>${item.price.toFixed(2)}</Typography>
  </div>
);

const HomeScreen: React.FC<{ menu: Array<{ name: string, description: string, course: string, price: number }> }> = ({ menu }) => (
  <div style={{ padding: 16 }}>
    <img src={logo} alt="Logo" style={{ width: '100px', marginBottom: '16px' }} />
    <Typography variant="h6">Menu</Typography>
    {menu.length === 0 ? (
      <Typography>No menu items available</Typography>
    ) : (
      menu.map((item, index) => (
        <MenuItemComponent key={index} item={item} />
      ))
    )}
    <Typography>Total Items: {menu.length}</Typography>
  </div>
);

const AddMenuItemScreen: React.FC<{ addMenuItem: (item: { name: string, description: string, course: string, price: number }) => void }> = ({ addMenuItem }) => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');

  const handleSubmit = () => {
    addMenuItem({ name: dishName, description, course, price: Number(price) });
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h6">Add Menu Item</Typography>
      <TextField
        label="Dish Name"
        fullWidth
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        value={course}
        onChange={(e) => setCourse(e.target.value as string)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>Select Course</MenuItem>
        <MenuItem value="Starter">Starter</MenuItem>
        <MenuItem value="Main">Main</MenuItem>
        <MenuItem value="Dessert">Dessert</MenuItem>
      </Select>
      <TextField
        label="Price"
        fullWidth
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Menu Item
      </Button>
    </div>
  );
};

const App: React.FC = () => {
  const [menu, setMenu] = useState<Array<{ name: string, description: string, course: string, price: number }>>([]);
  const [screen, setScreen] = useState<'home' | 'add'>('home');

  const addMenuItem = (item: { name: string, description: string, course: string, price: number }) => {
    setMenu([...menu, item]);
    setScreen('home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container style={{ background: '#0b8e70', minHeight: '100vh', padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Chef's Menu
        </Typography>
        <nav>
          <Button onClick={() => setScreen('home')}>Home</Button>
          <Button onClick={() => setScreen('add')}>Add Menu Item</Button>
        </nav>
        {screen === 'home' ? (
          <HomeScreen menu={menu} />
        ) : (
          <AddMenuItemScreen addMenuItem={addMenuItem} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
