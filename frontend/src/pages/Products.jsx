import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const { addToCart, addToWishlist } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (error) {
      console.log("Product fetch error:", error);
    }
  };

  const getCheapest = (prices) => {
    if (!prices) return ["NA", 0];

    const entries = Object.entries(prices).filter(
      ([, price]) => Number(price) > 0
    );

    if (entries.length === 0) return ["NA", 0];

    return entries.reduce((min, current) =>
      Number(current[1]) < Number(min[1]) ? current : min
    );
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchSearch =
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  if (sort === "cheapest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => getCheapest(a.prices)[1] - getCheapest(b.prices)[1]
    );
  }

  return (
    <div className="products-page">
      <h1 className="page-title">SmartShop Products 🛍️</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="cheapest">Cheapest First</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty-text">No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const cheapest = getCheapest(product.prices);

            return (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} className="product-link">
  <img src={product.image} alt={product.name} />
  <h2>{product.name}</h2>
</Link>

                <div className="price-box">
                  <p>Amazon: ₹{product.prices?.amazon || "NA"}</p>
                  <p>Flipkart: ₹{product.prices?.flipkart || "NA"}</p>
                  <p>Meesho: ₹{product.prices?.meesho || "NA"}</p>
                </div>

                <h3>
                  Cheapest: {cheapest[0]} ₹{cheapest[1]}
                </h3>

                <div className="product-actions">
                  <button
                    onClick={() => addToCart(product)}
                    className="cart-btn"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    className="wish-btn"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;