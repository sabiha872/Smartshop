import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

function getCheapestPrice(product) {
  const prices = product.prices || {
    amazon: product.amazon,
    flipkart: product.flipkart,
    meesho: product.meesho,
  };

  const validPrices = Object.values(prices || {}).filter((p) => Number(p) > 0);
  return validPrices.length ? Math.min(...validPrices.map(Number)) : 0;
}

function CartProvider({ children }) {
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
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const getProductId = (product) => product._id || product.id;

  const addToCart = (product) => {
    const productId = getProductId(product);

    const existingItem = cart.find((item) => getProductId(item) === productId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          getProductId(item) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
      toast.info("Quantity increased 🛒");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      toast.success("Added To Cart 🛒");
    }
  };

  const increaseQty = (id) => {
  setCart(
    cart.map((item) =>
      (item._id || item.id) === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCart(
    cart.map((item) =>
      (item._id || item.id) === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    )
  );
};

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => getProductId(item) !== id));
    toast.error("Removed From Cart ❌");
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product) => {
    const productId = getProductId(product);
    const alreadyAdded = wishlist.find((item) => getProductId(item) === productId);

    if (alreadyAdded) {
      toast.info("Already in Wishlist ❤️");
      return;
    }

    setWishlist([...wishlist, product]);
    toast.success("Added to Wishlist ❤️");
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => getProductId(item) !== id));
    toast.error("Removed from Wishlist");
  };

  const placeOrder = (paymentMethod = "Cash on Delivery") => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + getCheapestPrice(item) * item.qty,
      0
    );

    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      paymentMethod,
      status: "Placed",
      date: new Date().toLocaleDateString(),
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    toast.success("Order Placed Successfully 🎉");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        wishlist,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        placeOrder,
        addToWishlist,
        removeFromWishlist,
        getCheapestPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartProvider;