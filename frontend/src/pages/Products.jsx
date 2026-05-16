import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Products() {
  const { addToCart, products, addToWishlist } = useContext(CartContext);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const getLowestPrice = (p) => Math.min(p.amazon, p.flipkart, p.meesho);

  return (
    <div className="products-page">
      <h1>Products</h1>

      <p>Compare prices and choose the cheapest one.</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} />

            <div className="category">{p.category}</div>

            <h3>{p.name}</h3>

            <div className="price-box">
              <p>Amazon: ₹{p.amazon}</p>
              <p>Flipkart: ₹{p.flipkart}</p>
              <p>Meesho: ₹{p.meesho}</p>
            </div>

            <h4>Lowest Price: ₹{getLowestPrice(p)}</h4>

            <button onClick={() => addToCart(p)}>Add To Cart</button>
            <button
  className="wishlist-btn"
  onClick={() => addToWishlist(p)}
>
  ❤️ Add To Wishlist
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;