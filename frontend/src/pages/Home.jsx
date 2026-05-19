import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero new-hero">
        <div className="hero-content">
          <div className="badge">⭐ Best Deals • Fast Shopping • Trusted Store</div>

          <h1>SmartShop 🛍️</h1>

          <p className="subtitle">
            Discover electronics, fashion, beauty, home essentials and more.
            Compare prices, add to cart and shop smarter.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="start-btn">
              🛒 Start Shopping
            </Link>

            <Link to="/contact" className="outline-btn">
              Contact Us
            </Link>
          </div>

          <div className="hero-points">
            <span>🛡️ Secure Shopping</span>
            <span>🚚 Fast Delivery</span>
            <span>💳 Easy Payment</span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="SmartShop shopping"
          />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose SmartShop?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🏷️ Best Price Compare</h3>
            <p>Amazon, Flipkart aur Meesho ke prices compare karo.</p>
          </div>

          <div className="feature-card">
            <h3>🛒 Easy Cart</h3>
            <p>Add to cart, quantity change aur checkout simple hai.</p>
          </div>

          <div className="feature-card">
            <h3>📦 Order Tracking</h3>
            <p>My Orders page par apne orders check karo.</p>
          </div>

          <div className="feature-card">
            <h3>❤️ Wishlist</h3>
            <p>Apne favourite products wishlist me save karo.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Need help? SmartShop support is always ready.</p>

        <div className="contact-box">
          <p>📧 Email: sk419110@gmail.com</p>
          <p>📞 Phone: +91 6266709084</p>
          <p>📍 Location: India</p>
        </div>
      </section>
    </div>
  );
}

export default Home;