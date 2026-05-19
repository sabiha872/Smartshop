import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    setProduct(data.product);
    setRelated(data.relatedProducts);
  };

  if (!product) return <p className="empty-text">Loading product...</p>;

  const prices = product.prices || {};
  const cheapest = Object.entries(prices)
    .filter(([, price]) => Number(price) > 0)
    .reduce((min, curr) => (Number(curr[1]) < Number(min[1]) ? curr : min));

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={product.image} alt={product.name} className="details-img" />

        <div className="details-info">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <div className="price-box">
            <p>Amazon: ₹{prices.amazon || "NA"}</p>
            <p>Flipkart: ₹{prices.flipkart || "NA"}</p>
            <p>Meesho: ₹{prices.meesho || "NA"}</p>
          </div>

          <h2>Best Deal: {cheapest[0]} ₹{cheapest[1]}</h2>

          <div className="product-actions">
            <button onClick={() => addToCart(product)} className="cart-btn">
              Add to Cart
            </button>
            <button onClick={() => addToWishlist(product)} className="wish-btn">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      <section className="reviews-box">
        <h2>Customer Reviews ⭐</h2>
        <p>⭐⭐⭐⭐⭐ Great product and best price comparison!</p>
        <p>⭐⭐⭐⭐ Good quality and useful for daily use.</p>
      </section>

      <h2 className="related-title">Related Products</h2>
      <div className="product-grid">
        {related.map((item) => (
          <div className="product-card" key={item._id}>
            <Link to={`/product/${item._id}`} className="product-link">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
            </Link>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;