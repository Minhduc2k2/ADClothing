import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
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
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List type={1} />} />
            </Route>
            <Route path="products">
              <Route index element={<List type={2} />} />
              <Route path="new" element={<New title="Add New Product" />} />
              <Route path="edit/:id" element={<Edit title="Edit Product" />} />
            </Route>
          </Route>
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
