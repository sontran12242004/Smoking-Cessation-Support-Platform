import React from "react";

export default function Blog() {
  return (
    <div className="blog-root">
      {/* Hero Section */}
      <section className="blog-hero">
        <h1>NicOff <span>Blog</span></h1>
        <p>Latest insights, tips, and success stories about quitting smoking</p>
      </section>

      {/* Featured Posts */}
      <section className="blog-section">
        <h2>Featured Posts</h2>
        <div className="featured-posts">
          <div className="featured-post">
            <img src="/12780586_5056010.jpg" alt="Quitting smoking benefits" />
            <div className="post-content">
              <span className="post-category">Health & Wellness</span>
              <h3>10 Amazing Health Benefits After Quitting Smoking</h3>
              <p>Discover how your body transforms after just 24 hours, 1 week, and 1 month of being smoke-free...</p>
              <div className="post-meta">
                <span className="post-date">March 15, 2024</span>
                <span className="read-time">5 min read</span>
              </div>
              <button className="read-more-btn"><a href="https://www.prohealthuc.com/quitting-smoking/?auto=format&fit=crop&w=800&q=80">Read More</a></button>
            </div>
          </div>
          <div className="featured-post">
            <img src="/istockphoto-1450268558-612x612.jpg" alt="Stress management" />
            <div className="post-content">
              <span className="post-category">Mental Health</span>
              <h3>Managing Stress Without Cigarettes</h3>
              <p>Learn effective stress management techniques that don't involve reaching for a cigarette...</p>
              <div className="post-meta">
                <span className="post-date">March 12, 2024</span>
                <span className="read-time">4 min read</span>
              </div>
              <button className="read-more-btn"><a href="https://smokefree.gov/challenges-when-quitting/stress/coping-with-stress">Read More</a></button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="blog-section">
        <h2>Latest Articles</h2>
        <div className="articles-grid">
          <article className="article-card">
            <img src="/emma-simpson-mNGaaLeWEp0-unsplash.jpg" alt="Nicotine withdrawal symptoms" />
            <div className="article-content">
              <span className="article-category">Health & Wellness</span>
              <h3>Understanding Nicotine Withdrawal Symptoms</h3>
              <p>Learn about common withdrawal symptoms and how to manage them effectively during your quit smoking journey...</p>
              <div className="article-meta">
                <span className="article-date">March 18, 2024</span>
                <span className="read-time">4 min read</span>
              </div>
              <button className="read-more-btn">
                <a href="https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/quit-smoking-medications/how-quit-smoking-medicines-work.html">Read More</a>
              </button>
            </div>
          </article>

          <article className="article-card">
            <img src="/istockphoto-1459345882-612x612.jpg" alt="Healthy alternatives" />
            <div className="article-content">
              <span className="article-category">Lifestyle</span>
              <h3>Healthy Alternatives to Smoking</h3>
              <p>Discover effective ways to replace smoking habits with healthier activities and coping mechanisms...</p>
              <div className="article-meta">
                <span className="article-date">March 16, 2024</span>
                <span className="read-time">5 min read</span>
              </div>
              <button className="read-more-btn">
                <a href="https://www.healthline.com/health/quit-smoking-alternatives">Read More</a>
              </button>
            </div>
          </article>

          <article className="article-card">
            <img src="/istockphoto-1450268558-612x612.jpg" alt="Support system" />
            <div className="article-content">
              <span className="article-category">Community</span>
              <h3>Building Your Support System</h3>
              <p>How to create and maintain a strong support network to help you stay smoke-free for good...</p>
              <div className="article-meta">
                <span className="article-date">March 14, 2024</span>
                <span className="read-time">6 min read</span>
              </div>
              <button className="read-more-btn">
                <a href="https://www.mayoclinic.org/healthy-lifestyle/quit-smoking/in-depth/quit-smoking/art-20045452">Read More</a>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Categories */}
      <section className="blog-section">
        <h2>Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <span className="category-icon">💪</span>
            <h3>Health & Wellness</h3>
            <p>12 articles</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🧠</span>
            <h3>Mental Health</h3>
            <p>8 articles</p>
          </div>
          <div className="category-card">
            <span className="category-icon">🎯</span>
            <h3>Success Stories</h3>
            <p>15 articles</p>
          </div>
          <div className="category-card">
            <span className="category-icon">💡</span>
            <h3>Tips & Tricks</h3>
            <p>20 articles</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="blog-section newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest articles and tips</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <style>{`
        .blog-root {
          background: #f7fafc;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
          font-family: 'Segoe UI', Arial, sans-serif;
        }

        .blog-hero {
          background: linear-gradient(135deg, #4ca44c 0%, #2e7d32 100%);
          padding: 80px 0 60px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .blog-hero h1 {
          font-size: 52px;
          color: #ffffff;
          font-weight: 800;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .blog-hero h1 span {
          color: #ffd700;
          position: relative;
        }

        .blog-hero h1 span::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #ffd700;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .blog-hero h1 span:hover::after {
          transform: scaleX(1);
        }

        .blog-hero p {
          color: #ffffff;
          font-size: 22px;
          margin-top: 15px;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .blog-section {
          max-width: 1200px;
          margin: 0 auto 48px auto;
          padding: 40px 28px;
          position: relative;
        }

        .blog-section h2 {
          color: #2e7d32;
          font-size: 32px;
          margin-bottom: 32px;
          position: relative;
          padding-bottom: 15px;
        }

        .blog-section h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #4ca44c, #ffd700);
          border-radius: 2px;
        }

        .featured-posts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .featured-post {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          position: relative;
        }

        .featured-post:hover {
          transform: translateY(-12px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .featured-post img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .featured-post:hover img {
          transform: scale(1.05);
        }

        .post-content {
          padding: 30px;
        }

        .post-category {
          background: linear-gradient(90deg, #4ca44c, #2e7d32);
          color: #fff;
          padding: 6px 16px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 15px;
        }

        .post-content h3 {
          margin: 15px 0;
          font-size: 24px;
          color: #1a1a1a;
          line-height: 1.4;
          font-weight: 700;
        }

        .post-content p {
          color: #666;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          color: #888;
          font-size: 14px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }

        .read-more-btn {
          background: linear-gradient(90deg, #4ca44c, #2e7d32);
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
          display: inline-block;
        }

        .read-more-btn a {
          color: #fff;
          text-decoration: none;
        }

        .read-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(76, 164, 76, 0.3);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }

        .article-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
        }

        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        .article-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .article-card:hover img {
          transform: scale(1.05);
        }

        .article-content {
          color: #333;
          padding: 25px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .category-card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #4ca44c, #2e7d32);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        .category-card:hover::before {
          transform: scaleX(1);
        }

        .category-icon {
          font-size: 40px;
          margin-bottom: 20px;
          display: block;
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-icon {
          transform: scale(1.1);
        }

        .category-card h3 {
          color: #1a1a1a;
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: 700;
        }

        .category-card p {
          color: #666;
          font-size: 15px;
        }

        .newsletter {
          background: linear-gradient(135deg, #4ca44c 0%, #2e7d32 100%);
          color: #fff;
          text-align: center;
          border-radius: 20px;
          padding: 60px 30px;
          position: relative;
          overflow: hidden;
        }

        .newsletter::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        .newsletter h2 {
          color: #fff;
          font-size: 36px;
          margin-bottom: 20px;
          position: relative;
        }

        .newsletter p {
          margin-bottom: 30px;
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto 30px;
          line-height: 1.6;
          position: relative;
        }

        .newsletter-form {
          display: flex;
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
          position: relative;
        }

        .newsletter-form input {
          flex: 1;
          padding: 15px 25px;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .newsletter-form input:focus {
          outline: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .newsletter-form button {
          background: #fff;
          color: #4ca44c;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          background: #ffd700;
          color: #2e7d32;
        }

        @media (max-width: 768px) {
          .blog-hero {
            padding: 60px 20px;
          }

          .blog-hero h1 {
            font-size: 36px;
          }

          .blog-hero p {
            font-size: 18px;
          }

          .blog-section {
            padding: 30px 20px;
          }

          .featured-posts {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-form button {
            width: 100%;
          }

          .categories-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .featured-post, .article-card, .category-card {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
} 