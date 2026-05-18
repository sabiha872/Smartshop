import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="badge">
          ⭐ Best Prices • Trusted by Shoppers
        </div>

        <h1>
          Ayaana Ka Khajana 🛍️
        </h1>

        <p className="subtitle">
          Amazon, Flipkart aur Meesho ke prices compare
          karke cheapest product find karo.
        </p>

        <Link to="/products" className="start-btn">
          🛒 Start Shopping →
        </Link>

        <div className="hero-points">
          <span>🛡️ Best Price Guarantee</span>
          <span>⏱️ Save Time & Money</span>
          <span>✅ 100% Trusted</span>
        </div>

      </section>

      <section className="features">

        <h2>Why Choose Us?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>🏷️ Price Compare</h3>
            <p>
              Amazon, Flipkart aur Meesho ke prices compare karo.
            </p>
          </div>

          <div className="feature-card">
            <h3>⚡ Save More</h3>
            <p>
              Lowest price find karke har product par paisa bachao.
            </p>
          </div>

          <div className="feature-card">
            <h3>🛡️ Trusted Platform</h3>
            <p>
              Reliable sources se price comparison milega.
            </p>
          </div>

          <div className="feature-card">
            <h3>🛒 Easy Shopping</h3>
            <p>
              Search, compare aur best deal quickly choose karo.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;