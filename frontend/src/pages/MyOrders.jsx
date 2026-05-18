import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function MyOrders() {
  const { orders } = useContext(CartContext);

  const getLowestPrice = (item) => Math.min(item.amazon, item.flipkart, item.meesho);

  return (
    <div className="orders-page">
      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <p className="empty-cart">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + getLowestPrice(item),
              0
            );

            return (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <p>{order.date}</p>
                </div>

                {order.items.map((item, index) => (
                  <div className="order-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{getLowestPrice(item)}</p>
                    </div>
                  </div>
                ))}

                <h3 className="order-total">Total: ₹{total}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;