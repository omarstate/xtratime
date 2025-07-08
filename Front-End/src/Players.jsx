import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.css';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000';

const PLAYERS_PER_PAGE = 12;

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/players');
        setPlayers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError(
          err.response?.data || 
          err.message || 
          'Failed to fetch players. Please try again later.'
        );
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter players based on search term
  const filteredPlayers = searchTerm.trim() === '' 
    ? players 
    : players.filter(player => 
        (player.strPlayer?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (player.strTeam?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (player.strNationality?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlayers.length / PLAYERS_PER_PAGE);
  const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
  const endIndex = startIndex + PLAYERS_PER_PAGE;
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex);

  return (
    <div className="landing-page">
      {/* Background */}
      <div
        className="hero-background"
        style={{
          background: "url('/images/bg.png') center/cover no-repeat fixed"
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/xtra time logo only 1.png" alt="XtraTime" />
            <span>XtraTime</span>
          </div>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/players" className="active">Players</a>
            <a href="#matches">Matches</a>
            <a href="#leagues">Leagues</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-actions">
            <button className="btn-secondary">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </nav>

      <div className="players-section" style={{ 
        paddingTop: '120px',
        minHeight: '100vh'
      }}>
        <div className="container">
          <div className="section-header">
            <h2>Football Players</h2>
            <p>Discover detailed statistics and information about your favorite players</p>
            
            {/* Search Bar */}
            <div className="search-container" style={{
              maxWidth: '600px',
              margin: '2rem auto 0',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search players by name, team, or nationality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontSize: '1rem',
                  borderRadius: '30px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="search-input"
              />
              <div style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.5)'
              }}>
                🔍
              </div>
            </div>

            {/* Results count */}
            {!loading && !error && (
              <div style={{
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}>
                Showing {Math.min(startIndex + 1, filteredPlayers.length)}-{Math.min(endIndex, filteredPlayers.length)} of {filteredPlayers.length} players
              </div>
            )}
          </div>

          {loading && (
            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }} className="loading">
              Loading players...
            </div>
          )}

          {error && (
            <div style={{ 
              color: '#ff4757', 
              textAlign: 'center', 
              padding: '2rem',
              background: 'rgba(255, 71, 87, 0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 71, 87, 0.2)',
              margin: '2rem auto',
              maxWidth: '600px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#ff4757' }}>Error Loading Players</h3>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-secondary"
                style={{ marginTop: '1rem' }}
              >
                Try Again
              </button>
            </div>
          )}

          <div className="players-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            padding: '2rem 0'
          }}>
            {currentPlayers.map((player) => (
              <div 
                key={`${player.idPlayer}-${currentPage}-${searchTerm}`}
                className="glass-card player-card animate"
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.8rem',
                  cursor: 'pointer',
                  minHeight: '300px',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="player-image" style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <img
                    src={player.strCutout || player.strThumb || '/images/default-player.png'}
                    alt={player.strPlayer}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/default-player.png';
                    }}
                  />
                </div>
                <div className="player-info" style={{ textAlign: 'center', color: 'white' }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '0.3rem',
                    color: '#ffd700'
                  }}>{player.strPlayer}</h3>
                  <p style={{ 
                    fontSize: '0.9rem',
                    marginBottom: '0.3rem',
                    opacity: '0.9'
                  }}>{player.strTeam}</p>
                  <p style={{
                    fontSize: '0.8rem',
                    opacity: '0.8',
                    marginBottom: '0.3rem'
                  }}>{player.strPosition}</p>
                  <div className="player-stats" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.8rem',
                    marginTop: '0.8rem'
                  }}>
                    <div className="stat">
                      <span className="stat-value" style={{ fontSize: '0.9rem' }}>{player.strNationality || 'N/A'}</span>
                      <span className="stat-label" style={{ fontSize: '0.7rem' }}>Nationality</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value" style={{ fontSize: '0.9rem' }}>{player.strNumber || 'N/A'}</span>
                      <span className="stat-label" style={{ fontSize: '0.7rem' }}>Number</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="pagination" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Previous Page Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: currentPage === 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: currentPage === 1 ? 'rgba(255, 255, 255, 0.5)' : 'white',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                ←
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(pageNum => {
                  // Show first page, last page, and pages around current page
                  return (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - currentPage) <= 1
                  );
                })
                .map((pageNum, index, array) => {
                  // Add ellipsis between non-consecutive numbers
                  if (index > 0 && pageNum - array[index - 1] > 1) {
                    return [
                      <span key={`ellipsis-${pageNum}`} style={{ color: 'white' }}>...</span>,
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className="pagination-button"
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          background: pageNum === currentPage 
                            ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                            : 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: pageNum === currentPage ? '#333' : 'white',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          fontWeight: pageNum === currentPage ? '700' : '400'
                        }}
                      >
                        {pageNum}
                      </button>
                    ];
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className="pagination-button"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        background: pageNum === currentPage 
                          ? 'linear-gradient(135deg, #ffd700, #ffed4e)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: pageNum === currentPage ? '#333' : 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        fontWeight: pageNum === currentPage ? '700' : '400'
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

              {/* Next Page Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-button"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  background: currentPage === totalPages ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: currentPage === totalPages ? 'rgba(255, 255, 255, 0.5)' : 'white',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Players; 