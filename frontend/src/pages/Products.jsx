import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
 const addToCart = (product) => {
  const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = oldCart.find((item) => item._id === product._id);

  let updatedCart;

  if (existing) {
    updatedCart = oldCart.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...oldCart, { ...product, quantity: 1 }];
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  alert("Product added to cart");
};
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>
<button
  onClick={() => addToCart(product)}
  className="mt-5 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
>
  Add To Cart
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;