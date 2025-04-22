import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemListContainer from "./components/ItemListContainer"
import NavigationBar from './components/Navbar';
import ItemDetailContainer from './components/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound'; 

function App() {

  return (
<BrowserRouter>
<NavigationBar/>
<Routes>
  <Route path='/' element={<ItemListContainer greeting='📝 Bienvenidos a FarmaCHI 💊'/>}/>
  <Route path='/category/:categoryId' element={<ItemListContainer greeting='🔠 Categoria:'/>}/>
  <Route path='/item/:itemId' element={<ItemDetailContainer/>}/>
  {/* Ruta 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>

</BrowserRouter>
  )
}

export default App
