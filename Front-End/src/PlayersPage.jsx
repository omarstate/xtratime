import React, { useState, useEffect, useCallback } from 'react';
import './LandingPage.css'; // Reuse glassmorphism and base styles
import SpotlightCard from './SpotlightCard';
import { useRef } from 'react';
import { fetchPlayers, fetchLeagues } from './api/players';

// Dummy data
const kubarsiImg = '/images/kubarsi.png';
const bgImage = '/images/playersbg.jpg';
const defaultPlayerImage = '/images/kubarsi.png';

const leagueLogos = [
  { src: '/images/prem.png', name: 'Premier League' },
  { src: '/images/LIGA.png', name: 'LaLiga' },
  { src: '/images/bundsliga.png', name: 'Bundesliga' },
  { src: '/images/seria a.png', name: 'Serie A' },
];

const PlayersPage = () => {
  // All state hooks at the top
  const [selectedLeagueIdx, setSelectedLeagueIdx] = useState(0);
  const [selectedTeamIdx, setSelectedTeamIdx] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedPlayerIdx, setSelectedPlayerIdx] = useState(null);
  const [staggered, setStaggered] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to calculate age from date of birth
  const calculateAge = useCallback((dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);

  // Organize player data
  const organizePlayerData = useCallback((playersData) => {
    console.log('Organizing player data:', playersData);
    const organized = {};
    
    if (!Array.isArray(playersData)) {
      console.error('Expected players data to be an array, got:', typeof playersData);
      return [];
    }

    playersData.forEach(player => {
      // Use league name from the league logos if available, otherwise use "Other"
      const leagueName = leagueLogos.find(l => player.league?.toLowerCase().includes(l.name.toLowerCase()))?.name || 'Other';
      const team = player.strTeam || 'Unknown Team';
      
      if (!organized[leagueName]) {
        organized[leagueName] = {};
      }
      if (!organized[leagueName][team]) {
        organized[leagueName][team] = [];
      }
      
      // Transform player data to match the expected format
      const transformedPlayer = {
        id: player.idPlayer,
        name: player.strPlayer,
        number: player.strNumber || '0',
        position: player.strPosition || 'Unknown',
        nationality: player.strNationality || 'Unknown',
        img: player.strCutout || player.strThumb || defaultPlayerImage,
        renderImg: player.strRender || player.strCutout || player.strThumb || defaultPlayerImage,
        stats: {
          goals: 0,
          assists: 0,
          appearances: 0,
          height: player.strHeight || 'N/A',
          weight: player.strWeight || 'N/A',
          age: calculateAge(player.dateBorn),
          conversion: 0,
          accuracy: 0
        }
      };
      
      organized[leagueName][team].push(transformedPlayer);
    });

    // Convert to array format matching the original structure
    const result = Object.entries(organized).map(([leagueName, teams]) => ({
      name: leagueName,
      teams: Object.entries(teams).map(([teamName, players]) => ({
        name: teamName,
        players
      }))
    }));

    console.log('Organized data:', result);
    return result;
  }, [calculateAge]);

  // Fetch data effect
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Starting data fetch...');
        const [playersData, leaguesData] = await Promise.all([
          fetchPlayers(),
          fetchLeagues()
        ]);
        console.log('Data fetch complete:', { playersData, leaguesData });
        
        if (!mounted) return;

        if (!playersData || !Array.isArray(playersData)) {
          throw new Error('Invalid players data received');
        }

        // Process and organize the data
        const organizedData = organizePlayerData(playersData);
        
        if (!mounted) return;
        
        setPlayers(organizedData);
        setLeagues(leaguesData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        if (mounted) {
          setError(err.message || 'Failed to load player data');
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [organizePlayerData]);

  // Get current data
  const league = players[selectedLeagueIdx] || players[0];
  const team = league?.teams[selectedTeamIdx] || league?.teams[0];
  const teamPlayers = team?.players || [];
  const selectedPlayer = selectedPlayerIdx !== null ? teamPlayers[selectedPlayerIdx] : null;

  // Animation effect when team changes
  useEffect(() => {
    if (!teamPlayers.length) return;
    
    setCarouselIndex(0);
    setSelectedPlayerIdx(null);
    setStaggered(true);
    const timer = setTimeout(() => setStaggered(false), teamPlayers.length * 120 + 400);
    return () => clearTimeout(timer);
  }, [selectedTeamIdx, selectedLeagueIdx, teamPlayers.length]);

  // Handlers
  const handleLeagueChange = (idx) => {
    setSelectedLeagueIdx(idx);
    setSelectedTeamIdx(0);
    setSelectedPlayerIdx(null);
  };

  const handleTeamChange = (idx) => {
    setSelectedTeamIdx(idx);
    setSelectedPlayerIdx(null);
  };

  const handlePlayerClick = (idx) => {
    setSelectedPlayerIdx(idx);
  };

  const handleBackToGallery = () => {
    setSelectedPlayerIdx(null);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + teamPlayers.length) % teamPlayers.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % teamPlayers.length);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'white' }}>Loading players...</h2>
          <p style={{ color: '#ccc', marginTop: '1rem' }}>Please wait while we fetch the latest data</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,0,0,0.1)' }}>
          <h2 style={{ color: 'white' }}>Error Loading Data</h2>
          <p style={{ color: '#ff9999', margin: '1rem 0' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '1rem', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px',
              background: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render no data state
  if (!players.length) {
    return (
      <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ color: 'white' }}>No Players Found</h2>
          <p style={{ color: '#ccc', marginTop: '1rem' }}>There are no players available at the moment</p>
        </div>
      </div>
    );
  }

  // Background
  return (
    <div className="landing-page" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <div className="hero-background" style={{ background: `url('${bgImage}') center/cover no-repeat fixed`, transition: 'background 0.7s cubic-bezier(.4,2,.3,1)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.35)', zIndex: 1 }}></div>
      </div>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '6rem 2rem 2rem 2rem', position: 'relative', zIndex: 2, transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}>
        {/* League Selector as Logo Circles */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: 32, justifyContent: 'center' }}>
          {leagueLogos.map((logo, idx) => (
            <div
              key={logo.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: hoveredLogo === idx ? '#000' : '#222',
                border: idx === selectedLeagueIdx ? '3px solid #fff' : '2px solid #eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'background 0.2s, border 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredLogo(idx)}
              onMouseLeave={() => setHoveredLogo(null)}
              onClick={() => { setSelectedLeagueIdx(idx); setSelectedTeamIdx(0); setSelectedPlayerIdx(null); }}
              title={logo.name}
            >
              <img src={logo.src} alt={logo.name} style={{ width: 32, height: 32, objectFit: 'contain', opacity: hoveredLogo === idx ? 1 : 0.7, transition: 'opacity 0.2s' }} />
            </div>
          ))}
        </div>
        {/* Club Selector Carousel (logos only, no big container) */}
        <div style={{ display: 'flex', gap: '2.5rem', marginBottom: 32, justifyContent: 'center', alignItems: 'center' }}>
          {league.teams.map((t, idx) => (
            <div
              key={t.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => { setSelectedTeamIdx(idx); setSelectedPlayerIdx(null); }}
            >
              <div style={{ background: idx === selectedTeamIdx ? '#fff' : '#fff', borderRadius: '50%', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', border: idx === selectedTeamIdx ? '3px solid #111' : '2px solid #eee', boxShadow: idx === selectedTeamIdx ? '0 2px 12px rgba(0,0,0,0.10)' : 'none', marginBottom: 8, transition: 'all 0.2s' }}>
                <img src="/images/barca.webp" alt={t.name} style={{ width: 40, height: 40, objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: 'Neue Plak Condensed', fontWeight: 900, fontSize: 18, color: idx === selectedTeamIdx ? '#fff' : '#fff', marginTop: 2 }}>{t.name}</span>
            </div>
          ))}
        </div>
        {/* Main Content */}
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}>
          {/* Player Gallery Carousel */}
          {selectedPlayerIdx === null ? (
            <div style={{ width: '100%', height: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '4rem 0', overflow: 'hidden', fontFamily: 'Archivo, sans-serif' }}>
              {/* Left Arrow */}
              <button onClick={handlePrev} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: 56, height: 56, color: 'white', fontSize: 32, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>&lt;</button>
              {/* Carousel */}
              <div style={{ display: 'flex', gap: 100, alignItems: 'flex-end', justifyContent: 'center', width: '100%', overflow: 'visible', position: 'relative', minHeight: 380, margin: '0 auto' }}>
                {teamPlayers.map((player, idx) => {
                  const offset = idx - carouselIndex;
                  let blur = 1;
                  let zIndex = 1;
                  let opacity = 0.5;
                  let imgW = 220, imgH = 300, nameFont = 22, numSize = 48, numFont = 22;
                  if (offset === 0) {
                    blur = 0;
                    zIndex = 3;
                    opacity = 1;
                    imgW = 260; imgH = 340; nameFont = 26; numSize = 54; numFont = 26;
                  } else if (Math.abs(offset) === 1) {
                    blur = 0.5;
                    zIndex = 2;
                    opacity = 0.8;
                  }
                  const animDelay = staggered ? `${idx * 120}ms` : '0ms';
                  const [firstName, ...rest] = player.name.split(' ');
                  const lastName = rest.join(' ');
                  return (
                    <div
                      key={player.id}
                      style={{
                        width: imgW,
                        height: imgH + 40,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        zIndex,
                        opacity,
                        filter: `blur(${blur}px)` + (offset !== 0 ? ' grayscale(0.1)' : ''),
                        transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), filter 0.4s cubic-bezier(.4,0,.2,1)',
                        position: 'relative',
                        cursor: 'pointer',
                        animation: staggered ? 'fadeIn 0.7s cubic-bezier(.4,0,.2,1) both' : undefined,
                        animationDelay: animDelay,
                      }}
                      onMouseEnter={() => setCarouselIndex(idx)}
                      onClick={() => {
                        setCarouselIndex(idx);
                        setSelectedPlayerIdx(idx);
                      }}
                      tabIndex={0}
                    >
                      <SpotlightCard
                        className={`custom-spotlight-card${offset === 0 ? ' center' : ''}`}
                        spotlightColor="rgba(0, 229, 255, 0.2)"
                        style={{
                          width: imgW,
                          height: imgH,
                          borderRadius: 32,
                          boxShadow: offset === 0 ? '0 12px 40px 0 rgba(0,0,0,0.45)' : '0 4px 18px rgba(0,0,0,0.22)',
                          overflow: 'visible',
                          marginBottom: 0,
                          pointerEvents: 'auto',
                          transition: 'box-shadow 0.4s cubic-bezier(.4,0,.2,1), width 0.4s cubic-bezier(.4,0,.2,1), height 0.4s cubic-bezier(.4,0,.2,1), border-radius 0.4s cubic-bezier(.4,0,.2,1)',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={player.img}
                          alt={player.name}
                          id={offset === 0 ? 'active-player-img' : undefined}
                          style={{
                            width: imgW,
                            height: imgH,
                            objectFit: 'cover',
                            borderRadius: 32,
                            transition: 'box-shadow 0.4s cubic-bezier(.4,0,.2,1), width 0.4s cubic-bezier(.4,0,.2,1), height 0.4s cubic-bezier(.4,0,.2,1), border-radius 0.4s cubic-bezier(.4,0,.2,1)',
                            display: 'block',
                          }}
                        />
                        {/* Gradient overlay for name readability */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 80,
                          borderRadius: '0 0 32px 32px',
                          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.88) 100%)',
                          pointerEvents: 'none',
                          zIndex: 2,
                        }} />
                        {/* Player Number Circle */}
                        <div style={{
                          position: 'absolute',
                          top: 24,
                          right: 24,
                          background: '#1e90ff',
                          color: 'white',
                          borderRadius: '50%',
                          width: numSize,
                          height: numSize,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: numFont,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                          border: '3px solid #fff',
                          zIndex: 3,
                          transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                        }}>{player.number}</div>
                      </SpotlightCard>
                      {/* Player Name (bottom, bold, bigger) */}
                      <div style={{
                        marginTop: 0,
                        width: imgW,
                        textAlign: 'center',
                        color: 'white',
                        fontFamily: 'Neue Plak Condensed',
                        fontWeight: 900,
                        fontSize: offset === 0 ? 38 : 30,
                        letterSpacing: offset === 0 ? 1 : 0.5,
                        textShadow: '0 4px 16px rgba(0,0,0,0.85)',
                        opacity: offset === 0 ? 1 : 0.7,
                        zIndex: 4,
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                        lineHeight: 1.1,
                      }}>
                        <span style={{ fontWeight: 900, fontFamily: 'Neue Plak Condensed' }}>{firstName} {lastName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Right Arrow */}
              <button onClick={handleNext} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: 56, height: 56, color: 'white', fontSize: 32, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>&gt;</button>
            </div>
          ) : (
            // Player Detail Split View with animation
            <div className="player-detail-anim" style={{ 
              display: 'flex', 
              width: '100%', 
              height: '85vh',
              alignItems: 'center', 
              justifyContent: 'space-between', 
              position: 'relative', 
              transition: 'all 0.7s cubic-bezier(.4,2,.3,1)',
              padding: '0 2rem'
            }}>
              {/* BG Dim Overlay */}
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.75)', zIndex: 1, pointerEvents: 'none' }} />
              
              {/* Left: Player Info & Stats */}
              <div style={{ 
                flex: '0 0 45%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                animation: 'slideInLeft 1s cubic-bezier(.4,2,.3,1)',
                padding: '2rem'
              }}>
                {/* Position & Nationality */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ color: '#fff', fontSize: '1.2rem', opacity: 0.8 }}>{selectedPlayer.position}</span>
                  <span style={{ color: '#fff', fontSize: '1.2rem' }}>|</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={`https://flagsapi.com/${selectedPlayer.nationality === 'England' ? 'GB' : selectedPlayer.nationality}/flat/32.png`} 
                         alt={selectedPlayer.nationality} 
                         style={{ width: 24, height: 24, borderRadius: '50%' }}
                    />
                    <span style={{ color: '#fff', fontSize: '1.2rem' }}>{selectedPlayer.nationality}</span>
                  </div>
                </div>

                {/* Player Name */}
                <h1 style={{ 
                  color: '#fff',
                  fontSize: '4rem',
                  fontWeight: 900,
                  marginBottom: '2rem',
                  fontFamily: 'Neue Plak Condensed',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}>{selectedPlayer.name}</h1>

                {/* Stats Grid */}
                <div style={{ marginBottom: '3rem' }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    marginBottom: '2rem'
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>{selectedPlayer.stats.minutes || 610}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 600 }}>Minutes Played</div>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>{selectedPlayer.stats.appearances}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 600 }}>Appearances</div>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>{selectedPlayer.stats.goals}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 600 }}>Goals</div>
                    </div>
                  </div>

                  {/* Physical Stats */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '1rem'
                  }}>
                    <div>
                      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>{selectedPlayer.stats.height}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 500 }}>Height</div>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>{selectedPlayer.stats.weight}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 500 }}>Weight</div>
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>{selectedPlayer.stats.age}</div>
                      <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 500 }}>Age</div>
                    </div>
                  </div>
                </div>

                {/* Conversion & Accuracy */}
                <div style={{ 
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ 
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    position: 'relative'
                  }}>
                    <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>Conversion Rate</div>
                    <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>{selectedPlayer.stats.conversion}%</div>
                    <div style={{ 
                      position: 'absolute',
                      right: '1.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      border: '3px solid #1e90ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1e90ff',
                      fontSize: '1.2rem',
                      fontWeight: 700
                    }}>{selectedPlayer.number}</div>
                  </div>
                  <div style={{ 
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    borderRadius: '1rem'
                  }}>
                    <div style={{ color: '#1e90ff', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>Shooting Accuracy</div>
                    <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>{selectedPlayer.stats.accuracy}%</div>
                  </div>
                </div>

                {/* Upcoming Matches */}
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>Upcoming Matches</h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.05)',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <img src="/images/barca.webp" alt="Team" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                      <div>
                        <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>vs Barcelona</div>
                        <div style={{ color: '#1e90ff', fontSize: '0.9rem' }}>19:00</div>
                      </div>
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.05)',
                      padding: '1rem',
                      borderRadius: '0.75rem',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <img src="/images/barca.webp" alt="Team" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                      <div>
                        <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>vs Real Madrid</div>
                        <div style={{ color: '#1e90ff', fontSize: '0.9rem' }}>21:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Player Image */}
              <div style={{ 
                flex: '0 0 55%',
                height: '100%',
                position: 'relative',
                zIndex: 2,
                animation: 'slideInRight 1s cubic-bezier(.4,2,.3,1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={selectedPlayer.renderImg} 
                  alt={selectedPlayer.name} 
                  style={{ 
                    height: '90%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))',
                    transition: 'all 0.7s cubic-bezier(.4,2,.3,1)'
                  }} 
                />
              </div>

              {/* Back Button */}
              <button
                onClick={handleBackToGallery}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '2rem',
                  zIndex: 3,
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '3rem',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
              >
                <span style={{ color: '#fff', fontSize: '1.5rem' }}>←</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage; 