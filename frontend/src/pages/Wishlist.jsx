import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

  const getLowestPrice = (item) =>
    Math.min(item.amazon, item.flipkart, item.meesho);

  return (
    <div className="products-page">
      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="empty-cart">Your wishlist is empty.</p>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="category">{item.category}</div>

              <h3>{item.name}</h3>

              <h4>Lowest Price: ₹{getLowestPrice(item)}</h4>

              <button onClick={() => addToCart(item)}>Add To Cart</button>

              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;