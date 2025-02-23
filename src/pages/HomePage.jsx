import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./HomePage.css";

const HomePage = ({ currUser, handleLogout }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x > canvas.width || particle.x < 0) particle.dx *= -1;
        if (particle.y > canvas.height || particle.y < 0) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Smart Task Automation",
      description:
        "Automate recurring tasks and workflows with AI-powered suggestions",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: "⚡",
      title: "Real-time Analytics",
      description:
        "Track productivity metrics and team performance in real-time",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description:
        "Set and monitor team and personal goals with visual progress",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: "🤝",
      title: "Team Sync",
      description:
        "Seamless collaboration with integrated chat and file sharing",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "📊",
      title: "Custom Workflows",
      description: "Create and optimize workflows that match your team's needs",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: "🔄",
      title: "Integration Hub",
      description: "Connect with your favorite tools and services effortlessly",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="home-page">
      <canvas ref={canvasRef} className="particle-canvas" />

      <div className="content-wrapper">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your Workflow</h1>
            <p className="hero-subtitle">
              Streamline tasks, boost productivity, and achieve more together
            </p>
            <Link to="/tasks" className="cta-button">
              Get Started
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">Supercharge Your Productivity</h2>
            <p className="section-subtitle">
              Discover powerful tools designed to transform how you work
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                className={`feature-card gradient-${index + 1}`}
                key={feature.title}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-shine"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Workflow?</h2>
            <p>Join thousands of teams already using our platform</p>
            <Link to="/signup" className="cta-button secondary">
              Start Free Trial
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="home-footer">
          <div className="footer-content">
            <div className="footer-info">
              <p className="copyright">
                © {new Date().getFullYear()} Task Management Tool. All rights
                reserved.
              </p>
            </div>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  currUser: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
};

export default HomePage;
