import React, { useState } from 'react';
import './LandingPage.css';
import SignIn from './SignIn';
import GetStarted from './GetStarted';
import PlayersPage from './PlayersPage';

// LeagueRow component
const LeagueRow = ({ name, code, logo, onViewMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%',
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        borderBottom: isExpanded ? '1px solid #eee' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img 
            src={logo} 
            alt={name} 
            style={{ 
              height: '40px',
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
          <span style={{ 
            fontSize: '2.5rem', 
            fontWeight: '900',
            fontFamily: 'Neue Plak Condensed',
            letterSpacing: '0.5px',
            color: 'black',
            textTransform: 'uppercase'
          }}>{name}</span>
          <span style={{ 
            fontSize: '1rem',
            color: '#666',
            marginLeft: '0.5rem',
            opacity: 0.7,
            fontWeight: '500'
          }}>{code}</span>
        </div>
        <button 
          onClick={() => {
            setIsExpanded(!isExpanded);
            onViewMore();
          }}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#111',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = '#f5f5f5'}
          onMouseLeave={e => e.target.style.background = 'none'}
        >
          VIEW MORE
        </button>
      </div>
      
      {/* Dropdown Content */}
      {isExpanded && (
        <div style={{
          padding: '2rem',
          background: '#f9f9f9',
          borderTop: '1px solid #eee'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Position</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Club</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Played</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Won</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Drawn</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Lost</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>GF</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>GA</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>GD</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy data - replace with actual league data */}
              {[1, 2, 3, 4].map(pos => (
                <tr key={pos} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', textAlign: 'left' }}>{pos}</td>
                  <td style={{ padding: '1rem', textAlign: 'left' }}>Team {pos}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>10</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>7</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>2</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>22</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>8</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>+14</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>23</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

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

  // Add handleViewMore function to the main component
  const handleViewMore = (league) => {
    console.log(`Viewing more details for ${league}`);
    // Here you can add logic to fetch league standings
  };

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
       <section style={{ background: 'white', color: 'black', padding: '3rem 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Bundesliga */}
            <LeagueRow 
              name="BUNDESLIGA" 
              code="GR" 
              logo="/images/bundsliga.png"
              onViewMore={() => handleViewMore('bundesliga')}
            />

            {/* Premier League */}
            <LeagueRow 
              name="PREMIER LEAGUE" 
              code="EN" 
              logo="/images/prem.png"
              onViewMore={() => handleViewMore('premier-league')}
            />

            {/* Serie A */}
            <LeagueRow 
              name="SERIE A" 
              code="IT" 
              logo="/images/seria a.png"
              onViewMore={() => handleViewMore('serie-a')}
            />

            {/* La Liga */}
            <LeagueRow 
              name="LA LIGA" 
              code="SP" 
              logo="/images/LIGA.png"
              onViewMore={() => handleViewMore('la-liga')}
            />
          </div>
        </section>

        {/* Today's Matches Section */}
        <section style={{ background: 'white', color: 'black', padding: '4rem 0' }}>
          <div className="animate-fadeInUp" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 2rem' }}>
            {/* Section Title */}
            <h2 className="animate-fadeInLeft" style={{ 
              fontSize: '5rem', 
              fontWeight: '900', 
              marginBottom: '3rem',
              fontFamily: 'Neue Plak Condensed',
              textTransform: 'uppercase',
              letterSpacing: '-1px',
              color: 'black'
            }}>
              TODAY'S MATCHES
            </h2>

            {/* Scrollable Match Cards Container */}
            <div className="animate-fadeInRight delay-200" style={{
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
              '&::-webkit-scrollbar': { display: 'none' }, // Chrome and Safari
              paddingBottom: '1rem' // Space for potential scrollbar
            }}>
              <div style={{
                display: 'inline-flex',
                gap: '2rem',
                padding: '1rem 0.5rem'
              }}>
                {/* Match Cards */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} style={{
                    background: '#1A1A1A',
                    borderRadius: '24px',
                    padding: '1.5rem 2rem',
                    minWidth: '400px',
                    display: 'inline-block',
                    whiteSpace: 'normal',
                    verticalAlign: 'top'
                  }}>
                    {/* Competition Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      <img 
                        src="/images/prem.png" 
                        alt="Champions League"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          objectFit: 'contain'
                        }}
                      />
                      <span style={{
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>UEFA CHAMPIONS LEAGUE - 2ND LEG</span>
                      <span style={{
                        marginLeft: 'auto',
                        color: '#fff',
                        fontSize: '1.1rem',
                        fontWeight: '700'
                      }}>08:00PM</span>
                    </div>

                    {/* Teams */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      color: '#fff'
                    }}>
                      {/* Team 1 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <img 
                          src="/images/barca.webp"
                          alt="Chelsea"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'contain',
                            background: '#fff'
                          }}
                        />
                        <span style={{
                          fontSize: '1.8rem',
                          fontWeight: '900',
                          fontFamily: 'Neue Plak Condensed'
                        }}>CHELSEA</span>
                      </div>

                      {/* VS */}
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        opacity: 0.7
                      }}>VS</span>

                      {/* Team 2 */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <img 
                          src="/images/barca.webp"
                          alt="Liverpool"
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'contain',
                            background: '#fff'
                          }}
                        />
                        <span style={{
                          fontSize: '1.8rem',
                          fontWeight: '900',
                          fontFamily: 'Neue Plak Condensed'
                        }}>LIVERPOOL</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Football Area Section (replaces Features) */}
        <section style={{ background: 'white', padding: '0', margin: 0, border: 'none', minHeight: '800px', position: 'relative' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 0 8rem 0', position: 'relative' }}>
            <div className="animate-fadeInUp" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <h2 className="animate-fadeInLeft" style={{ 
                fontWeight: 900, 
                fontSize: 140, 
                letterSpacing: -2, 
                color: 'black',
                margin: 0
              }}>XTRA TIME NEWS</h2>
              <div className="animate-fadeInRight" style={{ 
                fontWeight: 900, 
                fontSize: 24, 
                letterSpacing: 0.5, 
                color: 'black', 
                lineHeight: 1.1,
                textAlign: 'right'
              }}>
                ALL OF<br />FOOTBALL<br />AREA IS HERE
              </div>
            </div>

            {/* Main Cards */}
            <div style={{ 
              display: 'flex', 
              gap: 40, 
              justifyContent: 'center', 
              alignItems: 'stretch',
              position: 'relative',
              zIndex: 2,
              marginTop: '2rem'
            }}>
              {/* Card 1: Stats */}
              <div className="animate-fadeInLeft delay-100 hover-lift smooth-transition" style={{ 
                background: '#181818', 
                color: 'white', 
                borderRadius: 32, 
                padding: '3rem', 
                flex: 1,
                minHeight: 600,
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <img src="/images/lewa.jpg" alt="Lewy" style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' }} />
                  <img src="/images/barca.webp" alt="Barca" style={{ width: 48, height: 48, borderRadius: '50%', background: '#fff', objectFit: 'contain' }} />
                  <span style={{ fontWeight: 900, fontSize: 70, marginLeft: 16 }}>LEWY</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 24 }}>
                  <div style={{ fontWeight: 900, fontSize: 56 }}>22</div>
                  <span style={{ fontWeight: 700, fontSize: 36, opacity: 0.7 }}>GOAL</span>
                  <div style={{ fontWeight: 900, fontSize: 56, marginLeft: 32 }}>2</div>
                  <span style={{ fontWeight: 700, fontSize: 36, opacity: 0.7 }}>ASSIST</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 36, opacity: 0.7, marginBottom: 12 }}>GOAL CONVERSION</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          width: 16, 
                          height: 89, 
                          borderRadius: 8, 
                          background: i < 12 ? '#8ec6f8' : '#333', 
                          opacity: 0.9 
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ fontWeight: 900, fontSize: 26, marginLeft: 12 }}>24%</span>
                </div>
                <button style={{ 
                  marginTop: 'auto', 
                  width: '100%', 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'white', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 32, 
                  fontWeight: 700, 
                  fontSize: 22, 
                  padding: '1.2rem 0', 
                  cursor: 'pointer',
                  marginBottom: 0,
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 28px -1px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px -1px rgba(0, 0, 0, 0.1)';
                }}
                >VIEW MORE STAT</button>
              </div>

              {/* Card 2: Player Story */}
              <div className="animate-fadeInUp delay-200 hover-lift smooth-transition" style={{ 
                background: '#222', 
                color: 'white', 
                borderRadius: 32, 
                padding: 0, 
                flex: 1,
                minHeight: 600,
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
                overflow: 'hidden', 
                position: 'relative' 
              }}>
                <img 
                  src="/images/salah.jpeg" 
                  alt="Lamine Yamal" 
                  style={{ 
                    width: '94%', 
                    height: 360, 
                    objectFit: 'cover', 
                    borderRadius: '24px', 
                    margin: '14px 0 12px 0' 
                  }} 
                />
                <button style={{ 
                  position: 'absolute', 
                  top: 160, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: 'white', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 56, 
                  fontWeight: 400, 
                  fontSize: 15, 
                  padding: '1rem 2.8rem', 
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.1)',
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translate(-50%, -2px)';
                  e.currentTarget.style.boxShadow = '0 6px 28px -1px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translate(-50%, 0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px -1px rgba(0, 0, 0, 0.1)';
                }}
                >Read More</button>
                <div style={{ 
                  fontWeight: 900, 
                  fontSize: 67, 
                  margin: '1.5rem 0 0.8rem 0', 
                  textAlign: 'center' 
                }}>LAMINE YAMAL</div>
                <div style={{ 
                  fontWeight: 400, 
                  fontSize: 20, 
                  color: '#eee', 
                  textAlign: 'center', 
                  margin: '0 2rem 2rem 2rem',
                  lineHeight: 1.4
                }}>
                  Lamine Yamal Nasraoui Ebana is a Spanish professional footballer who plays as a winger for La Liga club Barcelona and the Spain national team.
                </div>
              </div>

              {/* Card 3: Club */}
              <div className="animate-fadeInRight delay-300 hover-lift smooth-transition" style={{ 
                background: '#181818', 
                color: 'white', 
                borderRadius: 32, 
                padding: '3rem', 
                flex: 1,
                minHeight: 600,
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)', 
                position: 'relative'
              }}>
                <img 
                  src={hoveredLogo === null ? "/images/barca.webp" : 
                       hoveredLogo === 0 ? "/images/arsenal.png" :
                       hoveredLogo === 1 ? "/images/barca.webp" :
                       hoveredLogo === 2 ? "/images/inter.png" :
                       "/images/bayern.png"}
                  alt={hoveredLogo === null ? "Barcelona" :
                      hoveredLogo === 0 ? "Arsenal" :
                      hoveredLogo === 1 ? "Barcelona" :
                      hoveredLogo === 2 ? "Inter Milan" :
                      "Bayern Munich"}
                  style={{ 
                    width: 180, 
                    height: 180, 
                    borderRadius: '50%', 
                    background: '#fff', 
                    objectFit: 'contain', 
                    marginBottom: 24,
                    transition: 'all 0.3s ease-in-out'
                  }} 
                />
                <div style={{ 
                  fontWeight: 900, 
                  fontSize: 48, 
                  marginBottom: 12,
                  transition: 'all 0.3s ease-in-out'
                }}>
                  {hoveredLogo === null ? "BARCELONA" :
                   hoveredLogo === 0 ? "ARSENAL" :
                   hoveredLogo === 1 ? "BARCELONA" :
                   hoveredLogo === 2 ? "INTER MILAN" :
                   "BAYERN MUNICH"}
                </div>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: 24, 
                  opacity: 0.7,
                  marginBottom: 'auto',
                  transition: 'all 0.3s ease-in-out'
                }}>
                  {hoveredLogo === null ? "LA LIGA" :
                   hoveredLogo === 0 ? "PREMIER LEAGUE" :
                   hoveredLogo === 1 ? "LA LIGA" :
                   hoveredLogo === 2 ? "SERIE A" :
                   "BUNDESLIGA"} LEADERS
                </div>

                {/* League Circles - Moved inside the card */}
                <div className="animate-fadeInUp delay-400" style={{ 
                  display: 'flex', 
                  gap: 32, 
                  justifyContent: 'center',
                  marginTop: 'auto',
                  width: '100%'
                }}>
                  {[
                    { src: '/images/prem.png', league: 'Premier League' },
                    { src: '/images/LIGA.png', league: 'La Liga' },
                    { src: '/images/seria a.png', league: 'Serie A' },
                    { src: '/images/bundsliga.png', league: 'Bundesliga' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: hoveredLogo === i ? '#000' : '#222',
                        border: '2px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHoveredLogo(i)}
                      onMouseLeave={() => setHoveredLogo(null)}
                    >
                      <img 
                        src={item.src} 
                        alt={item.league} 
                        style={{ 
                          width: 36, 
                          height: 36, 
                          objectFit: 'contain', 
                          opacity: hoveredLogo === i ? 1 : 0.7, 
                          transition: 'opacity 0.2s' 
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="animate-fadeInUp" style={{ 
          background: '#111',
          color: 'white',
          padding: '5rem 0 2rem 0',
          marginTop: '4rem'
        }}>
          <div style={{ 
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '4rem',
              marginBottom: '4rem'
            }}>
              {/* Brand Section */}
              <div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <img 
                    src="/images/xtra time logo only 1.png" 
                    alt="XtraTime" 
                    style={{ 
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain'
                    }}
                  />
                  <span style={{ 
                    fontSize: '2rem',
                    fontWeight: '900',
                    fontFamily: 'Neue Plak Condensed',
                    color: 'white'
                  }}>XtraTime</span>
                </div>
                <p style={{ 
                  fontSize: '1.1rem',
                  color: '#999',
                  lineHeight: '1.6',
                  maxWidth: '300px'
                }}>
                  The ultimate football experience platform. Stay connected with the beautiful game.
                </p>
              </div>

              {/* Quick Links Sections */}
              <div>
                <h4 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'Neue Plak Condensed',
                  color: 'white'
                }}>Product</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Features</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Pricing</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>API</a>
                </div>
              </div>

              <div>
                <h4 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'Neue Plak Condensed',
                  color: 'white'
                }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>About</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Blog</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Careers</a>
                </div>
              </div>

              <div>
                <h4 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'Neue Plak Condensed',
                  color: 'white'
                }}>Support</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Help Center</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Contact</a>
                  <a href="#" style={{ color: '#999', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }}>Status</a>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div style={{ 
              borderTop: '1px solid #222',
              paddingTop: '2rem',
              textAlign: 'center',
              color: '#666',
              fontSize: '1rem'
            }}>
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