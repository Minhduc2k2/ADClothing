import "./Header.css";
import { Link } from "react-router-dom";

function Header({ user }) {
  const logout = () => {
    window.open("http://localhost:8800/auth/logout", "_self");
  };
  return (
    <div className="header">
      <h3>ADClothing</h3>
      <div className="header-info">
        <div>Home</div>
        <div>Shop</div>
        <div>About Us</div>
      </div>
      {user ? (
        <div>
          <ul className="list">
            <li className="listItem">
              <img
                src={user.avatar}
                alt=""
                className="avatar"
              />
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
        </Link>)}
      <div>Some Icon</div>
    </div>
  );
}

export default Header;
