import React from 'react';

function HomePage() {
  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoText}>FinFlow</span>
          </div>
          <div style={styles.navLinks}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#pricing" style={styles.navLink}>Pricing</a>
            <a href="#about" style={styles.navLink}>About</a>
          </div>
          <div style={styles.authButtons}>
            <a href="/login" style={styles.loginBtn}>Login</a>
            <a href="/register" style={styles.registerBtn}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Smart Finance Management
            <span style={styles.gradientText}> Made Simple</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Take control of your financial future with our AI-powered platform. 
            Track, analyze, and optimize your money like never before.
          </p>
          <div style={styles.heroButtons}>
            <a href="/register" style={styles.ctaButton}>
              Start Free Trial
            </a>
            <a href="#features" style={styles.secondaryButton}>
              Learn More
            </a>
          </div>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>50K+</span>
              <span style={styles.statLabel}>Active Users</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>$2.5B+</span>
              <span style={styles.statLabel}>Managed</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>98%</span>
              <span style={styles.statLabel}>Satisfaction</span>
            </div>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.chartPlaceholder}>
            📊 Interactive Dashboard Preview
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Powerful Features</h2>
          <p style={styles.sectionSubtitle}>Everything you need to master your finances</p>
        </div>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>💸</div>
            <h3 style={styles.featureTitle}>Expense Tracking</h3>
            <p style={styles.featureDesc}>Automatically categorize and track all your expenses in real-time.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📈</div>
            <h3 style={styles.featureTitle}>Investment Insights</h3>
            <p style={styles.featureDesc}>Get AI-powered investment recommendations and portfolio analysis.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Goal Planning</h3>
            <p style={styles.featureDesc}>Set financial goals and track your progress with smart milestones.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🛡️</div>
            <h3 style={styles.featureTitle}>Security First</h3>
            <p style={styles.featureDesc}>Bank-level security to keep your financial data safe and private.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📱</div>
            <h3 style={styles.featureTitle}>Mobile App</h3>
            <p style={styles.featureDesc}>Manage your finances on the go with our mobile application.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🤖</div>
            <h3 style={styles.featureTitle}>AI Assistant</h3>
            <p style={styles.featureDesc}>Get personalized financial advice from our AI assistant.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Finances?</h2>
          <p style={styles.ctaText}>Join thousands of users who have already taken control of their financial future.</p>
          <a href="/register" style={styles.ctaButtonLarge}>
            Start Your Journey Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>FinFlow</h4>
            <p style={styles.footerText}>Making financial management accessible to everyone.</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Product</h4>
            <a href="#features" style={styles.footerLink}>Features</a>
            <a href="#pricing" style={styles.footerLink}>Pricing</a>
            <a href="#about" style={styles.footerLink}>About</a>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Support</h4>
            <a href="#" style={styles.footerLink}>Help Center</a>
            <a href="#" style={styles.footerLink}>Contact</a>
            <a href="#" style={styles.footerLink}>Privacy</a>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 FinFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#333',
    lineHeight: 1.6,
  },
  navbar: {
    backgroundColor: '#fff',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#666',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  authButtons: {
    display: 'flex',
    gap: '1rem',
  },
  loginBtn: {
    padding: '0.5rem 1.5rem',
    textDecoration: 'none',
    color: '#667eea',
    fontWeight: '600',
    borderRadius: '8px',
    transition: 'all 0.3s',
  },
  registerBtn: {
    padding: '0.5rem 1.5rem',
    textDecoration: 'none',
    backgroundColor: '#667eea',
    color: 'white',
    fontWeight: '600',
    borderRadius: '8px',
    transition: 'all 0.3s',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80vh',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    gap: '4rem',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    lineHeight: 1.2,
    marginBottom: '1.5rem',
    color: '#2d3748',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#718096',
    marginBottom: '2.5rem',
    maxWidth: '500px',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
  },
  ctaButton: {
    padding: '1rem 2rem',
    backgroundColor: '#667eea',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  secondaryButton: {
    padding: '1rem 2rem',
    border: '2px solid #667eea',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  stats: {
    display: 'flex',
    gap: '3rem',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    color: '#718096',
    fontSize: '0.9rem',
  },
  heroVisual: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    width: '400px',
    height: '300px',
    backgroundColor: '#f7fafc',
    border: '2px dashed #cbd5e0',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a0aec0',
    fontSize: '1.1rem',
  },
  features: {
    padding: '6rem 2rem',
    backgroundColor: '#f7fafc',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#718096',
    maxWidth: '600px',
    margin: '0 auto',
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#2d3748',
  },
  featureDesc: {
    color: '#718096',
    lineHeight: 1.6,
  },
  ctaSection: {
    padding: '6rem 2rem',
    backgroundColor: '#667eea',
    color: 'white',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaButtonLarge: {
    padding: '1.2rem 3rem',
    backgroundColor: 'white',
    color: '#667eea',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'all 0.3s',
  },
  footer: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '3rem 2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '2rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  footerText: {
    color: '#cbd5e0',
    lineHeight: 1.6,
  },
  footerLink: {
    color: '#cbd5e0',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingTop: '2rem',
    borderTop: '1px solid #4a5568',
    textAlign: 'center',
    color: '#a0aec0',
  },
};

export default HomePage;