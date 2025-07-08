import React, { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import GetStarted from './GetStarted';

const leagues = [
  { name: 'Premier League', icon: '🏴' },
  { name: 'Champions League', icon: '⚽️' },
  { name: 'LaLiga', icon: '🇪🇸' },
  { name: 'FIFA World Cup', icon: '🏆' },
  { name: 'Serie A', icon: '🇮🇹' },
  { name: 'Europa League', icon: '🥈' },
  { name: 'Bundesliga', icon: '🇩🇪' },
  { name: 'Ligue 1', icon: '🇫🇷' },
  { name: 'CAF Champions League', icon: '🌍' },
];

const matches = [
  {
    league: 'CONCACAF Gold Cup Final',
    home: { name: 'USA', flag: '🇺🇸' },
    away: { name: 'Mexico', flag: '🇲🇽' },
    score: '1 - 2',
    status: 'FT',
  },
  {
    league: 'United States - Major League Soccer',
    home: { name: 'Seattle Sounders', flag: '🟢' },
    away: { name: 'Columbus', flag: '🟩' },
    score: '1 - 1',
    status: 'FT',
  },
  {
    league: 'Friendlies',
    home: { name: 'Senegal', flag: '🇸🇳' },
    away: { name: 'Guinea', flag: '🇬🇳' },
    score: '1 - 0',
    status: 'FT',
  },
  {
    league: "Women's EURO",
    home: { name: 'Spain', flag: '🇪🇸' },
    away: { name: 'Belgium', flag: '🇧🇪' },
    score: '6 - 2',
    status: 'FT',
  },
];

const transfers = [
  { name: 'Jhon Duran', clubs: 'Inter → Aston Villa', status: 'On loan', img: '/images/salah.jpeg' },
  { name: 'Martin Zubimendi', clubs: 'Sociedad → Arsenal', status: '€60M', img: '/images/lewa.jpg' },
  { name: 'Jamie Gittens', clubs: 'Dortmund → Chelsea', status: '€64.4M', img: '/images/481111091_1265260571625564_3913554759385537875_n.jpg' },
];

const LandingPage = () => {
  const [page, setPage] = useState('landing');

  // Handlers for switching pages
  const showLanding = () => setPage('landing');
  const showSignIn = () => setPage('signin');
  const showGetStarted = () => setPage('getstarted');

  // Navbar (always visible)
  const Navbar = (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={showLanding}>
          <img src="/images/xtra time logo only 1.png" alt="XtraTime" />
          <span>XtraTime</span>
        </div>
        <div className="nav-links">
          <a href="#home" onClick={showLanding}>Home</a>
          <a href="#features">Features</a>
          <a href="#matches">Matches</a>
          <a href="#leagues">Leagues</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-actions">
          <button className="btn-secondary" onClick={showSignIn}>Sign In</button>
          <button className="btn-primary" onClick={showGetStarted}>Get Started</button>
        </div>
      </div>
    </nav>
  );

  // Render the correct page
  let content;
  if (page === 'signin') {
    content = <SignIn onGetStarted={showGetStarted} />;
  } else if (page === 'getstarted') {
    content = <GetStarted onSignIn={showSignIn} />;
  } else {
    content = (
      <>
        {/* Background */}
        <div
          className="hero-background"
          style={{
            background: "url('/images/bg.png') center/cover no-repeat fixed"
          }}
        >
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Your Ultimate
                <span className="gradient-text"> Football</span>
                <br />Experience
              </h1>
              <p className="hero-subtitle">
                Live scores, real-time stats, and comprehensive coverage of all major leagues. 
                Never miss a moment of the beautiful game.
              </p>
              <div className="hero-actions">
                <button className="btn-primary btn-large">
                  Start Watching Live
                </button>
                <button className="btn-outline btn-large">
                  Explore Leagues
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Leagues</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Matches</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10M+</span>
                  <span className="stat-label">Users</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="glass-card hero-card">
                <div className="match-preview">
                  <div className="match-header">
                    <span className="league-name">Premier League</span>
                    <span className="match-time">LIVE</span>
                  </div>
                  <div className="match-teams">
                    <div className="team">
                      <img src="/images/salah.jpeg" alt="Liverpool" />
                      <span>Liverpool</span>
                    </div>
                    <div className="score">
                      <span>2</span>
                      <span>-</span>
                      <span>1</span>
                    </div>
                    <div className="team">
                      <img src="/images/lewa.jpg" alt="Arsenal" />
                      <span>Arsenal</span>
                    </div>
                  </div>
                  <div className="match-stats">
                    <div className="stat">
                      <span className="stat-value">65%</span>
                      <span className="stat-label">Possession</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">12</span>
                      <span className="stat-label">Shots</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">5</span>
                      <span className="stat-label">Corners</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose XtraTime?</h2>
              <p>Experience football like never before with our cutting-edge platform</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚽</div>
                <h3>Live Scores</h3>
                <p>Real-time updates from all major leagues and competitions worldwide</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Advanced Stats</h3>
                <p>Comprehensive statistics and analytics for every match and player</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Predictions</h3>
                <p>AI-powered match predictions and betting insights</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile First</h3>
                <p>Optimized for all devices with seamless cross-platform experience</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3>Smart Notifications</h3>
                <p>Customizable alerts for goals, cards, and match events</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Global Coverage</h3>
                <p>Coverage of leagues from every continent and country</p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        <section className="live-matches">
          <div className="container">
            <div className="section-header">
              <h2>Live Matches</h2>
              <p>Watch the action unfold in real-time</p>
            </div>
            <div className="matches-grid">
              <div className="match-card">
                <div className="match-status live">LIVE</div>
                <div className="match-league">Champions League</div>
                <div className="match-teams">
                  <div className="team">
                    <img src="/images/salah.jpeg" alt="Real Madrid" />
                    <span>Real Madrid</span>
                  </div>
                  <div className="score">
                    <span>1</span>
                    <span>-</span>
                    <span>0</span>
                  </div>
                  <div className="team">
                    <img src="/images/lewa.jpg" alt="Bayern Munich" />
                    <span>Bayern Munich</span>
                  </div>
                </div>
                <div className="match-time">67'</div>
              </div>
              <div className="match-card">
                <div className="match-status upcoming">20:45</div>
                <div className="match-league">Premier League</div>
                <div className="match-teams">
                  <div className="team">
                    <img src="/images/481111091_1265260571625564_3913554759385537875_n.jpg" alt="Manchester City" />
                    <span>Man City</span>
                  </div>
                  <div className="score">
                    <span>-</span>
                    <span>-</span>
                    <span>-</span>
                  </div>
                  <div className="team">
                    <img src="/images/salah.jpeg" alt="Chelsea" />
                    <span>Chelsea</span>
                  </div>
                </div>
                <div className="match-time">Today</div>
              </div>
              <div className="match-card">
                <div className="match-status live">LIVE</div>
                <div className="match-league">La Liga</div>
                <div className="match-teams">
                  <div className="team">
                    <img src="/images/lewa.jpg" alt="Barcelona" />
                    <span>Barcelona</span>
                  </div>
                  <div className="score">
                    <span>2</span>
                    <span>-</span>
                    <span>2</span>
                  </div>
                  <div className="team">
                    <img src="/images/481111091_1265260571625564_3913554759385537875_n.jpg" alt="Atletico Madrid" />
                    <span>Atletico Madrid</span>
                  </div>
                </div>
                <div className="match-time">89'</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Experience Football Like Never Before?</h2>
              <p>Join millions of football fans worldwide and never miss a moment of the beautiful game.</p>
              <div className="cta-actions">
                <button className="btn-primary btn-large">Start Free Trial</button>
                <button className="btn-outline btn-large">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="footer-logo">
                  <img src="/images/xtra time logo only 1.png" alt="XtraTime" />
                  <span>XtraTime</span>
                </div>
                <p>The ultimate football experience platform</p>
              </div>
              <div className="footer-section">
                <h4>Product</h4>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">API</a>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
                <a href="#">Status</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 XtraTime. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <div className="landing-page">
      {Navbar}
      {content}
    </div>
  );
};

export default LandingPage; 