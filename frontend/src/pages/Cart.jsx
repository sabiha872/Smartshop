import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    placeOrder,
    getCheapestPrice,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const getProductId = (item) => item._id || item.id;

  const totalPrice = cart.reduce(
    (total, item) => total + getCheapestPrice(item) * item.qty,
    0
  );

  const handleCheckout = () => {
    placeOrder("Cash on Delivery");
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
            {cart.map((item) => {
              const itemId = getProductId(item);

              return (
                <div className="product-card" key={itemId}>
                  <img src={item.image} alt={item.name} />

                  <h3>{item.name}</h3>
                  <h4>Price: ₹{getCheapestPrice(item)}</h4>

                  <div className="qty-box">
                    <button onClick={() => decreaseQty(itemId)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(itemId)}>+</button>
                  </div>

                  <h4>Subtotal: ₹{getCheapestPrice(item) * item.qty}</h4>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(itemId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2>Total Amount: ₹{totalPrice}</h2>
           <button onClick={() => navigate("/checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;