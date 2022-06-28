import { BrowserRouter, Route, Routes } from 'react-router-dom';
//pages
import Home from './pages/home/index';
import ProductDetail from './pages/productDetail';
import Collections from './pages/collections';
import CollectionDetail from './pages/collections/detail';
import SearchingResults from './pages/search';
import Cart from './pages/cart';
import Favorites from './pages/favorites';
import News from './pages/news';
import AboutUs from './pages/aboutUs';
import Help from './pages/help';
import Offer from './pages/offer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/offer' element={<Offer/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/collections' element={<Collections/>}/>
          <Route path='/collections/:id' element={<CollectionDetail/>}/>
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path='/products/search' element={<SearchingResults/>}/>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
