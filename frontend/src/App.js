import { useLocation, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import Image from "./pages/Image/image.js";
import Show from "./pages/Image/Show.js";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SigninPage from "./pages/SigninupPage/SigninPage";
import SignupPage from "./pages/SigninupPage/SignupPage";
import { useEffect, useState, useContext } from "react";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";
import Cookies from "js-cookie";
import { AuthContext } from "./context/AuthContext.js";
import CheckoutHistoryPage from "./pages/CheckoutHistoryPage/CheckoutHistoryPage";

function App() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:8800/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          if (resObject.user !== null) {
            Cookies.set("userInfo", JSON.stringify(resObject.user));
            dispatch({ type: "LOGIN_SUCCESS", payload: resObject.user });
          }
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
          console.log(err);
        });
    };
    getUser();
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        limit={1}
        autoClose={2000}
        pauseOnHover={false}
      />
      <Header user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/i" element={<Image />} />
        <Route path="/s" element={<Show />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/reviews/:id" element={<ReviewsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkouthistory" element={<CheckoutHistoryPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
