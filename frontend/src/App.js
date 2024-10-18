import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Cart from "./pages/cart/Cart";


const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/profile" element = {<Profile/>}/>
          <Route path="/cart" element = {<Cart/>}/>

        </Routes>
        <Footer />

      </BrowserRouter>
    </>
  );
};

export default App;
