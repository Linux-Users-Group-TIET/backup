import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import About from './pages/About';
import MyAccount from './pages/MyAccount';
import Products from './pages/Products';
function App() {
  return <BrowserRouter>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/my-account' element={<MyAccount/>}/>
      <Route path='/products' element={<Products/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
