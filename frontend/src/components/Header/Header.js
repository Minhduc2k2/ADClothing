import { Link } from "react-router-dom";
import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./../../Store";
import "./Header.css";

function Header({ user }) {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const logout = () => {
    window.open("http://localhost:8800/auth/logout", "_self");
  };

  return (
    <div className="header">
      <Link to="/" className="no-decor">
        <h3>ADClothing</h3>
      </Link>
      <div className="header-info">
        <Link to="/" className="no-decor">
          <div>Home</div>
        </Link>
        <Link to="/shop" className="no-decor">
          <div>Shop</div>
        </Link>
        <Link to="/aboutus" className="no-decor">
          <div>About Us</div>
        </Link>
      </div>
      <div className="header-right">
        <InputGroup className="header-search">
          <Form.Control
            placeholder="Find any product"
            aria-label="Find any product"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
        </InputGroup>
        <Link to="/cart" className="no-decor">
          <div className="cart-container">
            <i class="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <Badge pill bg="danger" className="badge-notification">
                {cartItems.reduce(
                  (accumulate, currentValue) =>
                    accumulate + currentValue.quantity,
                  0
                )}
              </Badge>
            )}
          </div>
        </Link>
      </div>
      {user ? (
        <div>
          <ul className="list">
            <li className="listItem">
              <img src={user.imgPath} alt="" className="avatar" />
            </li>
            <li className="listItem">{user.name}</li>
            <li className="listItem" onClick={logout}>
              Logout
            </li>
          </ul>
        </div>
      ) : (
        <Link className="link" to="signin">
          Login
        </Link>
      )}
      <div>Some Icon</div>
    </div>
  );
}

export default Header;
