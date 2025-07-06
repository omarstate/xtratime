import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{position: 'relative', minHeight: '100vh'}}>
      {/* BG image with 10% opacity overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: "url('/images/bg.png') center/cover no-repeat fixed"
      }}>
        <div style={{width: '100%', height: '100%', background: 'rgba(24,24,24,0.9)'}} />
      </div>

      {/* Navbar */}
      <nav className="navbar" style={{position: 'relative', zIndex: 2}}>
        <div className="navbar-left">
          <img src="/images/xtra time logo only 1.png" alt="Logo" className="navbar-logo" style={{width: 44, height: 44, objectFit: 'contain'}} />
          <ul className="navbar-links">
            <li>Leagues</li>
            <li>Matches</li>
            <li>Players</li>
          </ul>
          <div className="navbar-actions">
            <input type="text" className="navbar-search" placeholder="Search..." />
            <img src="/images/notification-2 1.png" alt="Notifications" className="navbar-icon" style={{width: 32, height: 32, objectFit: 'contain'}} />
            <img src="/images/Vector.png" alt="Account" className="navbar-icon" style={{width: 32, height: 32, objectFit: 'contain'}} />
          </div>
        </div>
      </nav>

      {/* Main grid layout */}
      <div className="main-grid" style={{position: 'relative', zIndex: 1}}>
        {/* Top Leagues */}
        <div className="glass-card grid-top-leagues">
          <div className="top-leagues-title">Top Leagues</div>
          <div className="league-icons-row">
            <div className="league-icon-glass" style={{position: 'relative'}}>
              <img src="/images/pngwing.com 1.png" alt="Premier League" />
              <span className="league-badge">
                <img src="/images/notification-2 1.png" alt="badge" />
              </span>
            </div>
            <div className="league-icon-glass">
              <img src="/images/laliga-seeklogo 1.png" alt="La Liga" />
            </div>
            <div className="league-icon-glass">
              <img src="/images/pngwing.com-3 1.png" alt="Champions League" />
            </div>
            <div className="league-icon-glass">
              <img src="/images/pngwing.com-2 1.png" alt="Bundesliga" />
            </div>
          </div>
        </div>

        {/* League Table */}
        <div className="glass-card grid-league-table" style={{padding: 0, overflow: 'hidden'}}>
          <img src="/images/481111091_1265260571625564_3913554759385537875_n.jpg" alt="League Table" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20}} />
        </div>

        {/* Top Player */}
        <div className="glass-card grid-top-player top-player-card">
          <img src="/images/lewa.jpg" alt="Top Player" />
          <div className="overlay"></div>
          <div className="content">
            <div className="title">Top Player</div>
            <div className="player-info">Lewandowski<br />Barcelona</div>
          </div>
        </div>

        {/* News */}
        <div className="glass-card grid-news news-card">
          <img src="/images/jota.jpg" alt="News" />
          <div className="overlay"></div>
          <div className="content">
            <div className="title">News</div>
            <div className="player-info">Diogo Jota<br />1996-2025</div>
          </div>
        </div>

        {/* Today's Matches */}
        <div className=" grid-today-matches">
          <div style={{ padding: '28px', width: '100%' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 18, fontFamily: 'Inter, sans-serif',textAlign: 'left' }}>Today's Matches</div>
            <div className="today-matches-list">
              {/* Match 1 */}
              <div className="glass-card today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-3 1.png" alt="Champions League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  UEFA Champions League, Playoff - 2nd leg
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-3 1.png" alt="Chelsea" />
                      Chelsea
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="Everton" />
                      Everton
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">20:00</span>
                    <span className="today-match-channel">Eurosport</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 2 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-2 1.png" alt="Bundesliga" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Bundesliga
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-2 1.png" alt="Wolfsburg" />
                      VfL Wolfsburg
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Nurnberg" />
                      1. FC Nürnberg
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">20:00</span>
                    <span className="today-match-channel">Eurosport</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 7 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-1.png" alt="Premier League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Premier League
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Leicester" />
                      Leicester
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="West Ham" />
                      West Ham
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">17:00</span>
                    <span className="today-match-channel">Sky Sports</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 3 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-1.png" alt="Premier League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Premier League
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Liverpool" />
                      Liverpool
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="Man City" />
                      Man City
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">18:30</span>
                    <span className="today-match-channel">Sky Sports</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 4 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-2 1.png" alt="Bundesliga" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Bundesliga
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-2 1.png" alt="Bayern" />
                      Bayern
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Dortmund" />
                      Dortmund
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">21:00</span>
                    <span className="today-match-channel">Eurosport</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 8 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-2 1.png" alt="Bundesliga" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Bundesliga
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-2 1.png" alt="Leipzig" />
                      Leipzig
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Frankfurt" />
                      Frankfurt
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">16:00</span>
                    <span className="today-match-channel">Eurosport</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 5 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-3 1.png" alt="Champions League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  UEFA Champions League
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-3 1.png" alt="PSG" />
                      PSG
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="Real Madrid" />
                      Real Madrid
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">22:00</span>
                    <span className="today-match-channel">beIN Sports</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 6 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-1.png" alt="Premier League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  Premier League
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-5 1.png" alt="Arsenal" />
                      Arsenal
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="Tottenham" />
                      Tottenham
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">19:00</span>
                    <span className="today-match-channel">Sky Sports</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
              {/* Match 9 */}
              <div className="today-match-card">
                <div className="today-match-header">
                  <img src="/images/pngwing.com-3 1.png" alt="Champions League" style={{ width: 18, height: 18, marginRight: 6 }} />
                  UEFA Champions League
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div className="today-match-teams">
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-3 1.png" alt="Inter" />
                      Inter
                    </div>
                    <span style={{ color: '#bdbdbd', fontWeight: 600, fontSize: 18, margin: '0 4px' }}>/</span>
                    <div className="today-match-team">
                      <img src="/images/pngwing.com-4 1.png" alt="Atletico" />
                      Atletico
                    </div>
                  </div>
                  <div className="today-match-meta">
                    <div className="today-match-indicators">
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator"></span>
                      <span className="today-match-indicator red"></span>
                      <span className="today-match-indicator red"></span>
                    </div>
                    <span className="today-match-time">23:00</span>
                    <span className="today-match-channel">beIN Sports</span>
                    <img src="/images/notification-2 1.png" alt="Bell" className="today-match-bell" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Matches + Top Scorers Card (like Figma) */}
        <div className="glass-card grid-match1" style={{ gridColumn: '1 / span 5', gridRow: '4 / span 2', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between', padding: 0, minHeight: 320 }}>
          {/* Top Scorers */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 32 }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 16, color: '#fff' }}>Premier League<br />Top Scorers</div>
            {[1, 2, 3].map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                <img src="/images/salah.jpeg" alt="Salah" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ fontWeight: 700, color: '#fff' }}>Mohammed Salah</div>
                <div style={{ fontWeight: 900, color: '#ffe600', fontSize: '1.3rem' }}>31<span style={{ color: '#fff', fontSize: '1.1rem', marginLeft: 4 }}>★</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 