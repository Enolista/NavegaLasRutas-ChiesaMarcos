import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainer from "./components/ItemListContainer";
// import NavbarBootstrap from './components/NavbarBootstrap';
import NavigationBar from './components/Navbar';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting='📝 Bienvenidos a FarmaCHI 💊' />} />
          <Route path='/category/:categoryId' element={<ItemListContainer greeting='🔠 Categoria:' />} />
          <Route path='/item/:itemId' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
