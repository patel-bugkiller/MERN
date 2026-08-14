import { Link, useNavigate } from "react-router-dom";
import "../css/Nav.css"; // adjust path if needed

function Nav({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSelect = (event) => {
    const path = event.target.value;

    if (path) {
      navigate(path);
      event.target.value = "";
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          <select className="nav-select" defaultValue="" onChange={handleSelect}>
            <option value="" disabled>Cart</option>
            <option value="/cart">View Cart</option>
            <option value="/cart">Cart Add</option>
            <option value="/cart">Cart Place</option>
          </select>
        </li>
        <li>
          <select className="nav-select" defaultValue="" onChange={handleSelect}>
            <option value="" disabled>Order</option>
            <option value="/order">View Order</option>
            <option value="/order">Order Create</option>
            <option value="/order">Order Delete</option>
          </select>
        </li>
        {isLoggedIn ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
