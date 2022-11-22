import "./Header.css";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
function Header() {
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
          <i class="fa-solid fa-cart-shopping"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
