import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Contacts } from './components/Contacts';
import { Error } from './components/Error';
import { CatalogPage } from './components/CatalogPage';
import { CartPage } from './components/CartPage';
import { Basket } from './components/Basket';
import './App.css'



function App() {
  
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/catalog' element={<CatalogPage/>}/>
          <Route path='/catalog/:id' element={<CartPage/>}/>
          <Route path='/cart' element={<Basket/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
