import React, { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Thực tế sẽ gửi form ở đây
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="contact-root">
      <section className="contact-hero">
        <h1>Contact <span>NicOff</span></h1>
        <p>We're here to help you on your smoke-free journey. Reach out to us anytime!</p>
      </section>
      <section className="contact-main">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <ul>
            <li><b>Address:</b> 123 NicOff Street, District 1, Ho Chi Minh City</li>
            <li><b>Phone:</b> <a href="tel:0123456789">0123 456 789</a></li>
            <li><b>Email:</b> <a href="mailto:support@nicoff.com">support@nicoff.com</a></li>
            <li><b>Working hours:</b> Mon - Fri: 8:00 - 18:00</li>
          </ul>
          <div className="contact-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon">🌐</a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" title="Zalo" className="social-icon">💬</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">💼</a>
          </div>
          <div className="contact-map">
            <iframe
              title="NicOff Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502234567!2d106.700424!3d10.776889!2m3
                  !1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1eafc1b1b1%3A0x1234567890abcdef!2zMTIzIE5pY09mZiB
                  TdHJlZXQsIFRow6BuaCBwaOG7kSBUaOG7pywgUXXhuq1uIDEsIEjDoCBO4buZaSBDaMOtbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v17100
                  00000000!5m2!1sen!2s"
              width="100%"
              height="180"
              style={{ border: 0, borderRadius: 10 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="contact-form-wrap">
          <h2>Contact Form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            <input name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows={5} />
            <button type="submit">Send Message</button>
            {submitted && <div className="contact-success">Thank you! We will reply within 24h.</div>}
          </form>
          <div className="contact-policy">We will respond within 24h. Your information is confidential.</div>
        </div>
      </section>
      <section className="contact-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <b>How soon will I get a reply?</b>
            <div>We aim to respond to all inquiries within 24 hours during working days.</div>
          </div>
          <div className="faq-item">
            <b>Can I get support outside working hours?</b>
            <div>You can send us a message anytime. We will reply as soon as possible during working hours.</div>
          </div>
          <div className="faq-item">
            <b>How is my information used?</b>
            <div>Your information is only used to support your request and is kept confidential.</div>
          </div>
        </div>
      </section>
      <style>{`
        .contact-root {
          min-height: 100vh;
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          background: linear-gradient(120deg, #eaf7ea 60%, #d2f1e1 100%);
          font-family: Arial, sans-serif;
          color: #222;
        }
        .contact-hero {
          padding: 60px 0 30px 0;
          text-align: center;
        }
        .contact-hero h1 {
          font-size: 42px;
          color: #222;
          margin-bottom: 12px;
        }
        .contact-hero h1 span {
          color: #4ca44c;
        }
        .contact-hero p {
          font-size: 20px;
          color: #388e3c;
        }
        .contact-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px 60px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: center;
        }
        .contact-info {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px 24px 24px;
          min-width: 260px;
          max-width: 350px;
          flex: 1 1 260px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-info ul {
          padding-left: 0;
          list-style: none;
        }
        .contact-info li {
          margin-bottom: 10px;
        }
        .contact-info a {
          color: #388e3c;
          text-decoration: none;
        }
        .contact-social {
          display: flex;
          gap: 16px;
          margin-bottom: 10px;
        }
        .social-icon {
          font-size: 28px;
          transition: transform 0.18s;
        }
        .social-icon:hover {
          transform: scale(1.18) rotate(-8deg);
        }
        .contact-map {
          margin-top: 10px;
        }
        .contact-form-wrap {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px 24px 24px;
          min-width: 260px;
          max-width: 400px;
          flex: 1 1 320px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .contact-form input, .contact-form textarea {
          border: 1px solid #b2dfdb;
          border-radius: 6px;
          padding: 10px 12px;
          font-size: 15px;
          background: #f7f7f7;
          color: #222;
        }
        .contact-form button {
          background: #4ca44c;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 12px 0;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.18s;
        }
        .contact-form button:hover {
          background: #388e3c;
        }
        .contact-success {
          color: #388e3c;
          font-weight: bold;
          margin-top: 8px;
        }
        .contact-policy {
          font-size: 13px;
          color: #388e3c;
          margin-top: 8px;
        }
        .contact-faq {
          max-width: 900px;
          margin: 0 auto 40px auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 16px #4ca44c11;
          padding: 32px 24px 24px 24px;
        }
        .contact-faq h2 {
          color: #388e3c;
          font-size: 22px;
          margin-bottom: 18px;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .faq-item b {
          color: #222;
        }
        @media (max-width: 900px) {
          .contact-main {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .contact-info, .contact-form-wrap {
            max-width: 95vw;
          }
        }
      `}</style>
    </div>
  );
} 