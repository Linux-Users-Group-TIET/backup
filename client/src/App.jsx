import React from 'react'
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import About from './pages/About';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './pages/Profile';
import AddProduct from "./pages/AddProduct";
import Search from "./pages/Search";
import ListingDetail from "./pages/ListingDetails";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
