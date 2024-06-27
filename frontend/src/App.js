import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/Header/Header";
import { Routes, Route, Switch, BrowserRouter } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import store from "./store"
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home";
import './index.css'
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products";
import  Search from "./component/Product/Search";
import Login from "./component/User/LoginSignUp"
import UserOptions from "./component/Header/userOptions";
import { useSelector } from "react-redux";
import ProfilePage from "./component/User/ProfilePage"
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/cart/CartItems"
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder"
import axios from "axios";
import { loadUser } from "./actions/userAction";
import Payment from "./component/cart/Payment"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/orderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList"
import NewProduct from "./component/admin/NewProduct"
import NotFound from "./component/layout/Not Found/NotFound"
import Contact from "./component/layout/Contact/Contact"
import About from "./component/layout/About/About"

function App() {

  const { isAuthenticated, user }= useSelector((state) => state.user);

   const[stripeApiKey, setstripeApiKey]= useState("");

  async function getStripeApiKey() {

    const { data }= await axios.get("https://aio-store-backend.vercel.app/api/v1/stripeapikey");

    setstripeApiKey(data.stripeApiKey);
  }  


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Montserrat","Roboto", "Droid Sans", "Chilanka"],
      },
    });
   
    store.dispatch(loadUser());
  
    getStripeApiKey();
  }, []);
  
  return  <BrowserRouter>
    <Header />
    {isAuthenticated &&user&& <UserOptions user={user} />}
    <Routes>
    
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:keyword" element={<Products />} />
    <Route path="/Search" element={<Search />} />
    <Route path="/login" element={<Login />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/account" element={<ProtectedRoute element={ProfilePage} />} />
    <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
    <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
    <Route path="/password/forgot" element={<ForgotPassword />} />
    <Route path="/password/reset/:token" element={<ResetPassword />} />
    <Route path="/cart" element={<ProtectedRoute element={Cart} />} />
    <Route path="/orders" element={<ProtectedRoute element={MyOrders} />} />
    <Route path="/shipping" element={<ProtectedRoute element={Shipping} />} />
    <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />
    <Route path="/admin/dashboard" element={<ProtectedRoute  element={Dashboard} />} />
    <Route path="/admin/products" element={<ProtectedRoute  element={ProductList} />} />
    <Route path="/admin/product" element={<ProtectedRoute  element={NewProduct} />} />
    <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
    <Route path="/order/:id" element={<ProtectedRoute element={OrderDetails} />} />
    <Route path="*" element={<NotFound />} />
    {stripeApiKey && (
      <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}>
  <Payment />
</Elements>} />
    )}
     
    </Routes>
    <Footer />
  </BrowserRouter>
}

export default App;

