import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const getLowestPrice = (item) => Math.min(item.amazon, item.flipkart, item.meesho);

  const totalPrice = cart.reduce((total, item) => total + getLowestPrice(item), 0);

  const handleCheckout = () => {
    placeOrder();
    navigate("/my-orders");
  };

  return (
    <div className="cart-page">
      <h1>My Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="products-grid">
            {cart.map((item, index) => (
              <div className="product-card" key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <h4>Lowest Price: ₹{getLowestPrice(item)}</h4>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total Amount: ₹{totalPrice}</h2>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;