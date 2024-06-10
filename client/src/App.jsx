import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import About from './pages/About';
import signIn from './pages/SignIn';

import Products from './pages/Products';
import Header from './Components/Header';
function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/signup' element={<signUp/>}/>
      <Route path='/signin' element={<signIn/>}/>
  </Routes>
  </BrowserRouter>
}

export default App
