import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
   const placeOrder = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  const orderItems = cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    product: item._id,
  }));

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user._id,
      orderItems,
      totalPrice: total,
    }),
  });

  if (res.ok) {
    localStorage.removeItem("cart");
    setCart([]);
    alert("Order placed successfully");
  }
};
  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>No products in cart.</p>
      ) : (
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p>₹{item.price} × {item.quantity}</p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
              <button
  onClick={placeOrder}
  className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5"
>
  Place Order
</button>
            </div>
          ))}

          <h2 className="text-3xl font-bold">Total: ₹{total}</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;