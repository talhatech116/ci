import React, { useState, useEffect } from 'react';
import '../../css/FinanceLanding.css';

const FinanceLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'fas fa-wallet',
      title: 'Digital Wallet',
      description: 'Manage all your finances in one secure digital wallet with instant access',
      color: '#7c3aed'
    },
    {
      icon: 'fas fa-exchange-alt',
      title: 'Instant Transfers',
      description: 'Send and receive money instantly with zero hidden fees',
      color: '#06b6d4'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Bank-Grade Security',
      description: 'Your money is protected with enterprise-level security protocols',
      color: '#10b981'
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Smart Analytics',
      description: 'Get insights into your spending patterns and financial health',
      color: '#f59e0b'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Small Business Owner",
      content: "NayaPay transformed how I manage my business finances. The instant settlement feature is a game-changer!",
      avatar: "SA"
    },
    {
      name: "Ali Raza",
      role: "Freelancer",
      content: "Finally, a financial app that understands the needs of freelancers. Love the expense tracking features!",
      avatar: "AR"
    },
    {
      name: "Fatima Khan",
      role: "Student",
      content: "As a student, NayaPay helps me budget effectively and send money to family without any hassle.",
      avatar: "FK"
    }
  ];

  const stats = [
    { number: "2M+", label: "Active Users" },
    { number: "₨50B+", label: "Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.8", label: "App Rating" }
  ];

  const appStores = [
    { name: "App Store", icon: "fab fa-apple", url: "#" },
    { name: "Play Store", icon: "fab fa-google-play", url: "#" },
    { name: "App Gallery", icon: "fab fa-huawei", url: "#" }
  ];

  return (
    <div className="finance-landing">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">
            <div className="logo-icon">NP</div>
            <span className="logo-text">NayaPay</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#features">Features</a>
            <a href="#business">Business</a>
            <a href="#security">Security</a>
            <a href="#download">Download</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-outline">Sign In</button>
            <button className="btn btn-primary">Get Started</button>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              The Future of <span className="gradient-text">Digital Finance</span> is Here
            </h1>
            <p className="hero-subtitle">
              Experience banking reimagined. Send money, pay bills, and manage your finances with Pakistan's most innovative financial platform.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large">
                <i className="fab fa-apple"></i>
                Download App
              </button>
              <button className="btn btn-secondary btn-large">
                <i className="fab fa-google-play"></i>
                Google Play
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-header">
                  <div className="app-balance">
                    <span>Current Balance</span>
                    <div className="amount">₨ 45,280</div>
                  </div>
                </div>
                <div className="app-actions">
                  <div className="action-btn">
                    <i className="fas fa-paper-plane"></i>
                    <span>Send</span>
                  </div>
                  <div className="action-btn">
                    <i className="fas fa-qrcode"></i>
                    <span>Scan</span>
                  </div>
                  <div className="action-btn">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>Request</span>
                  </div>
                  <div className="action-btn">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Top-up</span>
                  </div>
                </div>
                <div className="recent-transactions">
                  <div className="transaction">
                    <div className="transaction-icon">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">Khaadi</div>
                      <div className="transaction-date">Today, 2:30 PM</div>
                    </div>
                    <div className="transaction-amount">-₨ 2,499</div>
                  </div>
                  <div className="transaction">
                    <div className="transaction-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">Ali Ahmed</div>
                      <div className="transaction-date">Today, 1:15 PM</div>
                    </div>
                    <div className="transaction-amount positive">+₨ 5,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Millions Trust NayaPay</h2>
            <p>Everything you need to manage your money, all in one place</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section id="business" className="business">
        <div className="container">
          <div className="business-content">
            <div className="business-text">
              <h2>Built for Pakistan's Digital Economy</h2>
              <p>NayaPay is designed to meet the unique needs of Pakistani consumers and businesses, providing seamless financial solutions for everyone.</p>
              
              <div className="business-features">
                <div className="business-feature">
                  <i className="fas fa-bolt"></i>
                  <div>
                    <h4>Instant Settlements</h4>
                    <p>Get paid instantly with real-time payment processing</p>
                  </div>
                </div>
                <div className="business-feature">
                  <i className="fas fa-percentage"></i>
                  <div>
                    <h4>Lowest Fees</h4>
                    <p>Enjoy the most competitive rates in the market</p>
                  </div>
                </div>
                <div className="business-feature">
                  <i className="fas fa-headset"></i>
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Round-the-clock customer service in Urdu and English</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="business-visual">
              <div className="floating-cards">
                <div className="card card-1">
                  <div className="card-header">
                    <span>NayaPay Business</span>
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="card-content">
                    <div className="metric">
                      <div className="metric-value">₨ 12.5M</div>
                      <div className="metric-label">Monthly Volume</div>
                    </div>
                  </div>
                </div>
                <div className="card card-2">
                  <div className="card-header">
                    <span>QR Payments</span>
                    <i className="fas fa-qrcode"></i>
                  </div>
                  <div className="card-content">
                    <div className="metric">
                      <div className="metric-value">50K+</div>
                      <div className="metric-label">Merchants</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security">
        <div className="container">
          <div className="security-content">
            <div className="security-visual">
              <div className="security-shield">
                <i className="fas fa-shield-alt"></i>
              </div>
            </div>
            <div className="security-text">
              <h2>Bank-Grade Security</h2>
              <p>Your financial safety is our top priority. We use military-grade encryption and advanced security measures to protect your money and data.</p>
              
              <div className="security-features">
                <div className="security-feature">
                  <i className="fas fa-fingerprint"></i>
                  <span>Biometric Authentication</span>
                </div>
                <div className="security-feature">
                  <i className="fas fa-lock"></i>
                  <span>End-to-End Encryption</span>
                </div>
                <div className="security-feature">
                  <i className="fas fa-eye-slash"></i>
                  <span>Privacy First</span>
                </div>
                <div className="security-feature">
                  <i className="fas fa-bell"></i>
                  <span>Instant Alerts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Loved by Pakistan</h2>
            <p>Join millions of satisfied users across the country</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  "{testimonial.content}"
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="download">
        <div className="container">
          <div className="download-content">
            <h2>Ready to Get Started?</h2>
            <p>Download NayaPay today and experience the future of digital payments</p>
            <div className="download-buttons">
              {appStores.map((store, index) => (
                <button key={index} className="store-btn">
                  <i className={store.icon}></i>
                  <div>
                    <span>Download on</span>
                    <strong>{store.name}</strong>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <div className="logo-icon">NP</div>
                <span className="logo-text">NayaPay</span>
              </div>
              <p>Making digital payments simple, secure, and accessible for everyone in Pakistan.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Product</h3>
              <ul>
                <li><a href="#">Personal</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Merchants</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NayaPay. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinanceLanding;