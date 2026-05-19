import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout() {
  const { cart, clearCart, getCheapestPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    pincode: "",
    fullAddress: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + getCheapestPrice(item) * item.qty,
    0
  );

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cart.map((item) => ({
        name: item.name,
        image: item.image,
        price: getCheapestPrice(item),
        qty: item.qty,
      })),
      totalAmount,
      paymentMethod: "Cash on Delivery",
      shippingAddress: address,
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      clearCart();
      toast.success("Order placed successfully 🎉");
      navigate("/my-orders");
    } catch (error) {
      toast.error("Order failed");
      console.log(error);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={placeOrderHandler} className="checkout-form">
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
          <textarea name="fullAddress" placeholder="Full Address" onChange={handleChange} required />

          <h2>Total: ₹{totalAmount}</h2>
          <button type="submit">Place Order COD</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;