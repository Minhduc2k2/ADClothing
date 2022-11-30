import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import New from "./pages/new/New";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import "./style/dark.scss";

import Edit from "./pages/new/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/signin/signin";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectRoute";
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
    <BrowserRouter>
      <div className="App">
        <ToastContainer
          position="bottom-center"
          limit={1}
          autoClose={2000}
          pauseOnHover={false}
        />
        <Header />
        <Routes>
          <Route path="/dashboard">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List type={1} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List type={2} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New title="Add New Product" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute>
                    <Edit title="Edit Product" />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace={true} />}
          />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
