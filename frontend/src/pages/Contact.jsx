function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us 📞</h1>
        <p>Need help? SmartShop support is here.</p>

        <div className="contact-info">
          <p>📧 Email: support@smartshop.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Location: India</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your name" />
          <input type="email" placeholder="Your email" />
          <textarea placeholder="Your message"></textarea>
          <button type="button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;