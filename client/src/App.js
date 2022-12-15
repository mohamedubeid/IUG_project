import {
  BrowserRouter, Route, Routes, Navigate,
} from 'react-router-dom';
import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Offers from './pages/categories/Offers';
import Contact from './pages/Contact';
import About from './pages/About';
import New from './pages/categories/New';
import './App.css';
import Footer from './components/Footer';
import TermOfUse from './pages/TermOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import InfoCenter from './pages/InfoCenter';
import ShippingAndReturns from './pages/ShippingAndReturns';
import Catagories from './pages/categories/Catagories';
import Catagory from './pages/categories/Catagory';
import ProductPage from './pages/categories/ProductPage';
import ShoppingCart from './pages/cart/ShoppingCart';
import NoShippingAddress from './pages/cart/NoShippingAddress';
import AddNewAddress from './pages/cart/AddNewAddress';
import ShippingAddress from './pages/cart/ShippingAddress';
import LoginAndSignUpPage from './pages/LoginAndSignUpPage';
import MyFavorites from './pages/user/MyFavorites';
import MyAddresses from './pages/user/MyAddresses';
import SelectMyAddress from './pages/cart/SelectMyAddress';
import AddNewShippingAddress from './pages/user/AddNewShippingAddress';
import MyOrders from './pages/user/MyOrders';
import OrderDetails from './pages/user/OrderDetails';
import MyProfile from './pages/user/MyProfile';
import ChangePassword from './pages/user/ChangePassword';
import FAQ from './pages/FAQ';
import Search from './pages/categories/Search';

import CssBaseline from '@mui/material/CssBaseline';


function App() {
  let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to={`/${lang}`} />} />
          {
            window.location.href.split('/').splice(3)[0] !== 'en' && window.location.href.split('/').splice(3)[0] !== 'ar'
              ?
              <Route path={`${window.location.href.split('/').splice(3).join('/')}`} element={<Navigate replace to={`/${lang}/${window.location.href.split('/').splice(3).join('/')}`} />} />
              :
              null
          }
          <Route path='/:lang'  >
            <Route path='' element={<Home />} />
            <Route path='search/:searchText' element={<Search />} />
            <Route exact path="offers" element={<Offers />} />
            <Route path="new" element={<New />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />

            <Route path="catagories" element={<Catagories />} />
            <Route path="catagories/:catId/:catName" element={<Catagory />} />
            <Route path="catagories/:catId/:catName/:productId/:productName" element={<ProductPage />} />

            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="no-shipping-address" element={<NoShippingAddress />} />
            <Route path="add-new-address" element={<AddNewAddress />} />
            <Route path="shipping-address" element={<ShippingAddress />} />
            <Route path="login" element={<LoginAndSignUpPage />} />
            <Route path="sign-up" element={<LoginAndSignUpPage />} />

            <Route path="my-favorites" element={<MyFavorites />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-addresses" element={<MyAddresses />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="my-orders/:orderId" element={<OrderDetails />} />

            <Route path="select-my-address" element={<SelectMyAddress />} />
            <Route path="add-new-shipping-address" element={<AddNewShippingAddress />} />
            <Route path="edit-address" element={<AddNewShippingAddress />} />
            <Route path="term-of-use" element={<TermOfUse />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path=":info-center" element={<InfoCenter />} />
            <Route path="shipping-returns" element={<ShippingAndReturns />} />
          </Route>

        </Routes>
        <Footer />
      </BrowserRouter>

    </Box >
  );
}

export default App;
