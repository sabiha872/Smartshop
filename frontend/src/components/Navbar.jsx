import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛍️ SmartShop
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {user && (
          <>
            <Link to="/cart" className="cart-link">
              Cart <span>{cart.length}</span>
            </Link>

            <Link to="/wishlist">Wishlist</Link>

            <Link to="/my-orders">My Orders</Link>

            <Link to="/profile">Profile</Link>
          </>
        )}

        {user?.isAdmin && (
          <Link to="/add-product">Add Product</Link>
        )}
      </div>

      <div className="auth-buttons">
        {user ? (
          <button onClick={logout} className="register-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;