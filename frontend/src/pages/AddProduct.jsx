import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const { addProduct } = useContext(CartContext);

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    amazon: "",
    flipkart: "",
    meesho: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({
      ...product,
      amazon: Number(product.amazon),
      flipkart: Number(product.flipkart),
      meesho: Number(product.meesho),
    });

    setProduct({
      name: "",
      category: "",
      image: "",
      amazon: "",
      flipkart: "",
      meesho: "",
    });

    navigate("/products");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Add Product</h1>

        <p>Add product details for price comparison.</p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <label>Product Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            placeholder="Electronics / Fashion / Gaming"
            value={product.category}
            onChange={handleChange}
            required
          />

          <label>Image URL</label>

          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={product.image}
            onChange={handleChange}
            required
          />

          {product.image && (
            <img
              src={product.image}
              alt="preview"
              className="preview-image"
            />
          )}

          <label>Amazon Price</label>

          <input
            type="number"
            name="amazon"
            placeholder="Amazon price"
            value={product.amazon}
            onChange={handleChange}
            required
          />

          <label>Flipkart Price</label>

          <input
            type="number"
            name="flipkart"
            placeholder="Flipkart price"
            value={product.flipkart}
            onChange={handleChange}
            required
          />

          <label>Meesho Price</label>

          <input
            type="number"
            name="meesho"
            placeholder="Meesho price"
            value={product.meesho}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;