import "./Header.css";
import { Link } from "react-router-dom";
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
      <div>Some Icon</div>
    </div>
  );
}

export default Header;
