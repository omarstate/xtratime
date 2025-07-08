import React, { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import GetStarted from './GetStarted';
import PlayersPage from './PlayersPage';

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
  const [hoveredLogo, setHoveredLogo] = useState(null);

  // Handlers for switching pages
  const showLanding = () => setPage('landing');
  const showSignIn = () => setPage('signin');
  const showGetStarted = () => setPage('getstarted');
  const showPlayers = () => setPage('players');

  // Navbar (always visible)
  const Navbar = (
    <nav className="nav">
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
          <div className="nav-links" style={{ fontWeight: 700 }}>
            <a href="#home" onClick={showLanding} style={{ fontWeight: 700 }}>Home</a>
            <a href="#leagues" style={{ fontWeight: 700 }}>Leagues</a>
            <a href="#players" onClick={showPlayers} style={{ fontWeight: 700 }}>Players</a>
          </div>
        </div>
        <div className="nav-actions" style={{ fontWeight: 700 }}>
          <a href="#signin" onClick={showSignIn} style={{ color: 'white', textDecoration: 'none', fontWeight: 700, marginRight: 18 }}>Sign In</a>
          <a href="#getstarted" onClick={showGetStarted} style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>Get Started</a>
        </div>
      </div>
    </nav>
  );

  // Render the correct page
  let content;
  if (page === 'players') {
    content = <PlayersPage />;
  } else if (page === 'signin') {
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
            background: "url('/images/xtraBg_.png') center/cover no-repeat fixed"
          }}
        >
          {/* Removed hero-overlay to show background image clearly */}
        </div>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            {/* Only background image remains here */}
          </div>
        </section>

        {/* New White Section for Main Content */}
        <section style={{ background: 'white', color: 'black', padding: '3rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontWeight: 900, fontSize: 48, textAlign: 'center', marginBottom: 16, color: 'black', letterSpacing: -2, lineHeight: 1.1 }}>Your Ultimate Football Experience</h1>
            <p style={{ fontSize: 18, color: '#222', textAlign: 'center', marginBottom: 28, maxWidth: 600 }}>
              Live scores, real-time stats, and comprehensive coverage of all major leagues. Never miss a moment of the beautiful game.
            </p>
            <div style={{ display: 'flex', gap: 18, marginBottom: 32 }}>
              <button style={{ background: 'white', color: 'black', border: '2px solid #111', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>Start Watching Live</button>
              <button style={{ background: 'white', color: 'black', border: '2px solid #111', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>Explore Leagues</button>
            </div>
            <div style={{ display: 'flex', gap: 40, marginBottom: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 28, color: 'black' }}>50+</div>
                <div style={{ fontWeight: 400, fontSize: 15, color: '#222' }}>Leagues</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 28, color: 'black' }}>1000+</div>
                <div style={{ fontWeight: 400, fontSize: 15, color: '#222' }}>Matches</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 900, fontSize: 28, color: 'black' }}>10M+</div>
                <div style={{ fontWeight: 400, fontSize: 15, color: '#222' }}>Users</div>
              </div>
            </div>
          </div>
        </section>

        {/* New White Section for Match Preview */}
        <section style={{ background: 'white', color: 'black', padding: '3rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'white', border: '1.5px solid #111', borderRadius: 24, boxShadow: 'none', padding: 32, minWidth: 340, maxWidth: 420, width: '100%' }}>
              <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Premier League</span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>LIVE</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="/images/salah.jpeg" alt="Liverpool" style={{ width: 56, height: 56, borderRadius: '50%', border: '1.5px solid #111', objectFit: 'cover', marginBottom: 6 }} />
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Liverpool</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: 2, margin: '0 18px' }}>
                  2 <span style={{ fontWeight: 400, fontSize: 24, margin: '0 6px' }}>-</span> 1
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img src="/images/lewa.jpg" alt="Arsenal" style={{ width: 56, height: 56, borderRadius: '50%', border: '1.5px solid #111', objectFit: 'cover', marginBottom: 6 }} />
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Arsenal</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>65%</div>
                  <div style={{ fontWeight: 400, fontSize: 13, color: '#222' }}>Possession</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>12</div>
                  <div style={{ fontWeight: 400, fontSize: 13, color: '#222' }}>Shots</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>5</div>
                  <div style={{ fontWeight: 400, fontSize: 13, color: '#222' }}>Corners</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Football Area Section (replaces Features) */}
        <section style={{ background: 'white', padding: '0', margin: 0, border: 'none' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 0 0 0' }}>
            <h2 style={{ fontWeight: 900, fontSize: 140, letterSpacing: -2, textAlign: 'center', margin: '0 0 2.5rem 0', color: 'black' }}>XTRA TIME NEWS</h2>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              {/* Sidebar */}
              <div style={{ flex: '0 0 220px', padding: '2rem 0 0 2rem', fontWeight: 900, fontSize: 18, letterSpacing: 0.5, color: 'black', lineHeight: 1.1 }}>
                <div style={{ marginBottom: 24 }}>
                  ALL OF<br />FOOTBALL<br />AREA IS HERE
                </div>
              </div>
              {/* Main Cards */}
              <div style={{ flex: 1, display: 'flex', gap: 36, justifyContent: 'center', alignItems: 'flex-end' }}>
                {/* Card 1: Stats */}
                <div style={{ background: '#181818', color: 'white', borderRadius: 28, padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360, height: 480, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <img src="/images/lewa.jpg" alt="Lewy" style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' }} />
                    <img src="/images/barca.webp" alt="Barca" style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', objectFit: 'contain' }} />
                    <span style={{ fontWeight: 900, fontSize: 32, marginLeft: 12 }}>LEWY</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
                    <div style={{ fontWeight: 900, fontSize: 38 }}>22</div>
                    <span style={{ fontWeight: 700, fontSize: 18, opacity: 0.7 }}>GOAL</span>
                    <div style={{ fontWeight: 900, fontSize: 38, marginLeft: 24 }}>2</div>
                    <span style={{ fontWeight: 700, fontSize: 18, opacity: 0.7 }}>ASSIST</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18, opacity: 0.7, marginBottom: 8 }}>GOAL CONVERSION</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(16)].map((_, i) => <div key={i} style={{ width: 12, height: 32, borderRadius: 6, background: i < 12 ? '#8ec6f8' : '#333', opacity: 0.9 }} />)}
                    </div>
                    <span style={{ fontWeight: 900, fontSize: 20, marginLeft: 8 }}>24%</span>
                  </div>
                  <button style={{ marginTop: 'auto', width: '100%', background: 'white', color: 'black', border: 'none', borderRadius: 26, fontWeight: 700, fontSize: 18, padding: '0.9rem 0', cursor: 'pointer', marginBottom: 0 }}>VIEW MORE STAT</button>
                </div>
                {/* Card 2: Player Story */}
                <div style={{ background: '#222', color: 'white', borderRadius: 28, padding: 0, minWidth: 340, maxWidth: 360, height: 480, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', overflow: 'hidden', position: 'relative' }}>
                  <img src="/images/salah.jpeg" alt="Lamine Yamal" style={{ width: '94%', height: 270, objectFit: 'cover', borderRadius: '24px', margin: '18px 0 10px 0' }} />
                  <button style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)',background: 'rgba(40,40,40,0.7)', color: 'white', border: 'none', borderRadius: 30, fontWeight: 400, fontSize: 18, padding: '0.7rem 2.2rem', cursor: 'pointer', marginBottom: 0, zIndex: 2 }}>Read More</button>
                  <div style={{ fontWeight: 900, fontSize: 32, margin: '1.2rem 0 0.5rem 0', textAlign: 'center' }}>LAMINE YAMAL</div>
                  <div style={{ fontWeight: 400, fontSize: 16, color: '#eee', textAlign: 'center', margin: '0 1.5rem 1.5rem 1.5rem' }}>
                    Lamine Yamal Nasraoui Ebana is a Spanish professional footballer who plays as a winger for La Liga club Barcelona and the Spain national team.
                  </div>
                </div>
                {/* Card 3: Club */}
                <div style={{ background: '#181818', color: 'white', borderRadius: 28, padding: '2.5rem 2rem', minWidth: 340, maxWidth: 360, height: 400, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'relative', justifyContent: 'flex-end', marginBottom: 60 }}>
                  <img src="/images/barca.webp" alt="Barcelona" style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', objectFit: 'contain', marginBottom: 18 }} />
                  <div style={{ fontWeight: 900, fontSize: 38, marginBottom: 8 }}>BARCELONA</div>
                  <div style={{ fontWeight: 700, fontSize: 18, opacity: 0.7 }}>1ST PLACE</div>
                </div>
              </div>
              {/* Logos row, aligned with right card bottom */}
              <div style={{ display: 'flex', gap: 28, marginTop: -30, marginLeft: 'auto', marginRight: 0, justifyContent: 'center', width: 360, position: 'absolute', left: '72%', transform: 'translateX(80px, 0)' }}>
                {[
                  '/images/prem.png',
                  '/images/LIGA.png',
                  '/images/seria a.png',
                  '/images/bundsliga.png',
                ].map((src, i) => (
                  <div
                    key={i}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: hoveredLogo === i ? '#000' : '#222',
                      border: '2px solid #eee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                      transition: 'background 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredLogo(i)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <img src={src} alt="logo" style={{ width: 32, height: 32, objectFit: 'contain', opacity: hoveredLogo === i ? 1 : 0.7, transition: 'opacity 0.2s' }} />
                  </div>
                ))}
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