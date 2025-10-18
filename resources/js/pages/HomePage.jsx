import React, { useState, useEffect } from 'react';
import '../../css/Elearning.css';

const ElearningLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      instructor: "Sarah Johnson",
      rating: 4.9,
      students: 12500,
      price: 89.99,
      image: "💻",
      category: "Development"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      instructor: "Mike Chen",
      rating: 4.8,
      students: 8400,
      price: 74.99,
      image: "⚛️",
      category: "Frontend"
    },
    {
      id: 3,
      title: "Laravel API Development",
      instructor: "David Wilson",
      rating: 4.7,
      students: 9200,
      price: 69.99,
      image: "🐘",
      category: "Backend"
    }
  ];

  const features = [
    {
      icon: "fas fa-laptop-code",
      title: "Hands-On Projects",
      description: "Build real-world applications with guided projects and code reviews"
    },
    {
      icon: "fas fa-users",
      title: "Mentor Support",
      description: "Get 1:1 guidance from industry experts and experienced developers"
    },
    {
      icon: "fas fa-certificate",
      title: "Career Certificates",
      description: "Earn recognized certificates to advance your career"
    },
    {
      icon: "fas fa-briefcase",
      title: "Job Ready Skills",
      description: "Learn exactly what employers are looking for in 2024"
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Enrolled" },
    { number: "200+", label: "Expert Instructors" },
    { number: "1.2K+", label: "Courses Available" },
    { number: "95%", label: "Career Success Rate" }
  ];

  return (
    <div className="elearning-landing">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">
            <span className="logo-icon">Edu</span>
            <span className="logo-text">LearnPro</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#courses">Courses</a>
            <a href="#features">Features</a>
            <a href="#instructors">Instructors</a>
            <a href="#pricing">Pricing</a>
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-outline" onClick={() => window.location.href = '/login'}>
  Sign In
</button>
            <button className="btn btn-primary">Start Learning</button>
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
              Master <span className="gradient-text">Full-Stack Development</span> with Laravel & React
            </h1>
            <p className="hero-subtitle">
              Join thousands of students learning modern web development through project-based courses, 
              expert mentorship, and career-focused curriculum.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                Start Free Trial
              </button>
              <button className="btn btn-secondary btn-large">
                <i className="fas fa-play-circle"></i>
                Watch Demo
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
            <div className="learning-dashboard">
              <div className="dashboard-card">
                <div className="card-header">
                  <span>Your Progress</span>
                  <div className="progress-circle">
                    <span>75%</span>
                  </div>
                </div>
                <div className="progress-item">
                  <span>Laravel Basics</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="progress-item">
                  <span>React Fundamentals</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="progress-item">
                  <span>API Integration</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
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
                <span className="logo-icon">Edu</span>
                <span className="logo-text">LearnPro</span>
              </div>
              <p>Master full-stack development with project-based learning and expert mentorship.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-github"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Learning Paths</h3>
              <ul>
                <li><a href="#">Full-Stack Development</a></li>
                <li><a href="#">Frontend Specialization</a></li>
                <li><a href="#">Backend Engineering</a></li>
                <li><a href="#">DevOps & Deployment</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Instructors</a></li>
                <li><a href="#">Success Stories</a></li>
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
            <p>&copy; 2024 LearnPro. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElearningLanding;