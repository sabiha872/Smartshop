import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.get("http://localhost:5000/api/orders");
    setOrders(data);
  };

  return (
    <div className="orders-page">
      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Payment: {order.paymentMethod}</p>
            <h3>Total: ₹{order.totalAmount}</h3>

            {order.items.map((item, index) => (
              <div className="order-item" key={index}>
                <img src={item.image} alt={item.name} width="70" />
                <span>{item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;