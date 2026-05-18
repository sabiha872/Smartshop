import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const defaultProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    amazon: 1499,
    flipkart: 1399,
    meesho: 1299,
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    amazon: 1999,
    flipkart: 1899,
    meesho: 1799,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    amazon: 999,
    flipkart: 899,
    meesho: 799,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    amazon: 799,
    flipkart: 699,
    meesho: 599,
  },
];

function CartProvider({ children }) {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || defaultProducts;
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
    toast.success("Product Added Successfully ✅");
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Added To Cart 🛒");
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    toast.error("Removed From Cart ❌");
  };

  const addToWishlist = (product) => {
    const alreadyAdded = wishlist.find((item) => item.id === product.id);

    if (alreadyAdded) {
      toast.info("Already in Wishlist ❤️");
      return;
    }

    setWishlist([...wishlist, product]);
    toast.success("Added to Wishlist ❤️");
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.error("Removed from Wishlist");
  };

  const placeOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cart,
      date: new Date().toLocaleDateString(),
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    toast.success("Order Placed Successfully 🎉");
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        orders,
        wishlist,
        addProduct,
        addToCart,
        removeFromCart,
        placeOrder,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;