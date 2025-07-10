import React, { useState, useEffect, useCallback } from 'react';
import './LandingPage.css'; // Reuse glassmorphism and base styles
import SpotlightCard from './SpotlightCard';
import { useRef } from 'react';
import { fetchPlayers, fetchLeagues } from './api/players';

// Dummy data
const kubarsiImg = '/images/kubarsi.png';
const defaultPlayerImage = '/images/kubarsi.png';

const leagueLogos = [
  { src: '/images/prem.png', name: 'Premier League' },
  { src: '/images/LIGA.png', name: 'LaLiga' },
  { src: '/images/bundsliga.png', name: 'Bundesliga' },
  { src: '/images/seria a.png', name: 'Serie A' },
];

const PlayersPage = () => {
  // Add new state for exit animation
  const [isClosing, setIsClosing] = useState(false);
  
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
    setIsClosing(true);
    setTimeout(() => {
    setSelectedPlayerIdx(null);
      setIsClosing(false);
    }, 500); // Match animation duration
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
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: `url('/images/black bgggg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Remove the old hero-background div */}
      <div style={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '1400px',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* League Selector as Logo Squares */}
        <div style={{ display: 'flex', gap: '2.5rem', marginBottom: 32, justifyContent: 'center' }}>
          {leagueLogos.map((logo, idx) => (
            <div
              key={logo.name}
              style={{
                width: 120,
                height: 120,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: idx === selectedLeagueIdx ? '2px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: idx === selectedLeagueIdx 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 32px rgba(255, 255, 255, 0.1)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: idx === selectedLeagueIdx ? 'translateY(-4px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredLogo(idx)}
              onMouseLeave={() => setHoveredLogo(null)}
              onClick={() => { setSelectedLeagueIdx(idx); setSelectedTeamIdx(0); setSelectedPlayerIdx(null); }}
              title={logo.name}
            >
              <img 
                src={logo.src} 
                alt={logo.name} 
                style={{ 
                  width: 80,
                  height: 80,
                  objectFit: 'contain',
                  transition: 'all 0.3s ease',
                  filter: idx === selectedLeagueIdx ? 'brightness(1.2)' : 'brightness(0.9)',
                }} 
              />
              <span style={{ 
                fontFamily: 'Neue Plak Condensed',
                fontWeight: 900,
                fontSize: 16,
                color: idx === selectedLeagueIdx ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                marginTop: 8,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                transition: 'all 0.3s ease',
                textShadow: idx === selectedLeagueIdx ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                padding: '0 8px'
              }}>{logo.name}</span>
            </div>
          ))}
        </div>
        {/* Club Selector with Horizontal Scroll */}
        <div style={{ 
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto 32px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{ 
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            overflowX: 'auto',
            padding: '1rem 0',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome and Safari
            scrollBehavior: 'smooth'
          }}>
          {league.teams.map((t, idx) => (
            <div
                key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                  flex: '0 0 auto',
                  width: '150px', // Increased width for larger icons
              }}
              onClick={() => { setSelectedTeamIdx(idx); setSelectedPlayerIdx(null); }}
            >
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '16px', 
                  width: 90, 
                  height: 90, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: idx === selectedTeamIdx ? '2px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)', 
                  boxShadow: idx === selectedTeamIdx 
                    ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 32px rgba(255, 255, 255, 0.1)' 
                    : '0 4px 16px rgba(0, 0, 0, 0.2)', 
                  marginBottom: 12,
                  transition: 'all 0.3s ease',
                  transform: idx === selectedTeamIdx ? 'translateY(-4px)' : 'translateY(0)',
                }}>
                  <img 
                    src="/images/barca.webp" 
                    alt={t.name} 
                    style={{ 
                      width: 60, 
                      height: 60, 
                      objectFit: 'contain',
                      transition: 'all 0.3s ease',
                      filter: idx === selectedTeamIdx ? 'brightness(1.2)' : 'brightness(0.9)',
                    }} 
                  />
                </div>
                <span style={{ 
                  fontFamily: 'Neue Plak Condensed', 
                  fontWeight: 900, 
                  fontSize: 20, 
                  color: idx === selectedTeamIdx ? '#fff' : 'rgba(255, 255, 255, 0.8)', 
                  marginTop: 4,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  textShadow: idx === selectedTeamIdx ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
                }}>{t.name}</span>
              </div>
            ))}
            </div>
        </div>
        {/* Main Content */}
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}>
          {/* Player Gallery with Horizontal Scroll */}
          <div style={{ 
            width: '100%',
            overflowX: 'hidden',
            position: 'relative',
            opacity: selectedPlayer ? 0.4 : 1,
            transition: 'opacity 0.5s cubic-bezier(.4,2,.3,1)',
            filter: selectedPlayer ? 'blur(10px)' : 'none',
            transform: selectedPlayer ? 'scale(1.05)' : 'scale(1)'
          }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              padding: '2rem 0',
              margin: '0 auto',
              maxWidth: '1200px',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}>
              {/* Player cards remain the same */}
              {teamPlayers.map((player, idx) => {
                  const imgW = 260, imgH = 340, nameFont = 26, numSize = 54, numFont = 26;
                  const opacity = 1;
                  const zIndex = 1;
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
                        transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1)',
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
                                              className="custom-spotlight-card"
                        spotlightColor="rgba(0, 229, 255, 0.2)"
                        style={{
                          width: imgW,
                          height: imgH,
                          borderRadius: 32,
                        boxShadow: '0 12px 40px 0 rgba(0,0,0,0.45)',
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
                        fontSize: 38,
                        letterSpacing: 1,
                        textShadow: '0 4px 16px rgba(0,0,0,0.85)',
                        opacity: 1,
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
          </div>

          {/* Player Detail View */}
          {selectedPlayer && (
            <div style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(23, 32, 90, 0.3)',
              backdropFilter: 'blur(25px) saturate(180%)',
              WebkitBackdropFilter: 'blur(25px) saturate(180%)',
              zIndex: 1000,
              padding: '2rem',
              opacity: isClosing ? 0 : 1,
              transition: 'all 0.5s cubic-bezier(.4,2,.3,1)',
              pointerEvents: isClosing ? 'none' : 'auto'
            }}>
              <div style={{
                width: '80%',
                maxWidth: '1200px',
                height: '80vh',
                maxHeight: '700px',
                background: `linear-gradient(135deg, rgba(0, 71, 255, 0.7), rgba(255, 0, 0, 0.5)), url('/images/black bgggg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '24px',
                position: 'relative',
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.5rem',
                animation: isClosing 
                  ? 'scaleOut 0.5s cubic-bezier(.4,2,.3,1)'
                  : 'scaleIn 0.5s cubic-bezier(.4,2,.3,1)',
                transform: isClosing ? 'scale(0.9)' : 'scale(1)',
                opacity: isClosing ? 0 : 1,
                transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s cubic-bezier(.4,2,.3,1)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '3rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {/* Left: Stats */}
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '2rem 0',
                    animation: isClosing 
                      ? 'slideOutLeft 0.5s cubic-bezier(.4,2,.3,1)'
                      : 'slideInLeft 0.5s cubic-bezier(.4,2,.3,1)',
                    transform: isClosing ? 'translateX(-20px)' : 'translateX(0)',
                    opacity: isClosing ? 0 : 1,
                    transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s cubic-bezier(.4,2,.3,1)'
                  }}>
                    {/* Position & Nationality Tag */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#1e3a8a',
                      padding: '0.5rem 1rem',
                      borderRadius: '50px',
                      width: 'fit-content',
                      marginBottom: '2.7rem',
                      marginTop: '-3.2rem',
                    }}>
                      <span style={{ 
                        color: '#fff',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>{selectedPlayer.position}</span>
                      <span style={{ color: '#fff', opacity: 0.5 }}>|</span>
                      <img 
                        src={`https://flagsapi.com/${selectedPlayer.nationality === 'England' ? 'GB' : selectedPlayer.nationality}/flat/32.png`}
                        alt={selectedPlayer.nationality}
                        style={{ width: 20, height: 20, borderRadius: '50%' }}
                      />
                    </div>

                    {/* Player Name */}
                    <h1 style={{ 
                      color: '#fff',
                      fontSize: '4rem',
                      fontWeight: 900,
                      marginBottom: '3rem',
                      fontFamily: 'Neue Plak Condensed',
                      letterSpacing: '-0.02em',
                      lineHeight: 1
                    }}>{selectedPlayer.name}</h1>

                    {/* Honors */}
                    <div style={{
                      marginBottom: '2rem'
                    }}>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        opacity: 0.5,
                        marginBottom: '1rem'
                      }}>HONORS</h3>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                        {/* Example trophies - replace with actual data */}
                        {[1,2,3,4].map((i) => (
                          <div key={i} style={{
                            width: '40px',
                            height: '40px',
                            background: '#1e3a8a',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            color: '#fff',
                            fontWeight: '600'
                          }}>{i}</div>
                        ))}
                      </div>
                    </div>

                    {/* Main Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '2rem',
                      marginBottom: '3rem'
                    }}>
                      <div>
                        <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700' }}>{selectedPlayer.stats.minutes || 610}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>Minutes Played</div>
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700' }}>{selectedPlayer.stats.appearances || 13}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>Appearances</div>
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700' }}>{selectedPlayer.stats.goals || 3}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600' }}>Goals</div>
                      </div>
                    </div>

                    {/* Physical Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '2rem',
                      marginBottom: '3rem'
                    }}>
                      <div>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600' }}>{selectedPlayer.stats.height}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '500' }}>Height</div>
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600' }}>{selectedPlayer.stats.weight}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '500' }}>Weight</div>
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '600' }}>{selectedPlayer.stats.age}</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '500' }}>Age</div>
                      </div>
                    </div>

                    {/* Upcoming Matches */}
                    <div style={{ marginTop: '-1.5rem' }}>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        opacity: 0.5,
                        marginBottom: '0.5rem'
                      }}>UPCOMING MATCH</h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: '#1e3a8a',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        maxWidth: '280px'
                      }}>
                        <img 
                          src="/images/barca.webp" 
                          alt="Team" 
                          style={{ 
                            width: 24, 
                            height: 24, 
                            objectFit: 'contain' 
                          }} 
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            color: '#fff', 
                            fontSize: '0.8rem', 
                            fontWeight: '600' 
                          }}>Manchester United</div>
                          <div style={{ 
                            color: '#3b82f6', 
                            fontSize: '0.7rem' 
                          }}>UEFA Champions League</div>
                        </div>
                        <div style={{ 
                          color: '#fff', 
                          fontSize: '0.8rem', 
                          fontWeight: '600' 
                        }}>10:00</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Player Image */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: '100%',
                    animation: isClosing 
                      ? 'slideOutRight 0.5s cubic-bezier(.4,2,.3,1)'
                      : 'slideInRight 0.5s cubic-bezier(.4,2,.3,1)',
                    transform: isClosing ? 'translateX(20px)' : 'translateX(0)',
                    opacity: isClosing ? 0 : 1,
                    transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s cubic-bezier(.4,2,.3,1)'
                  }}>
                    {/* Circular Stats */}
                    <div style={{
                      position: 'absolute',
                      top: '10%',
                      right: '10%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      zIndex: 3
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#1e3a8a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        border: '2px solid #3b82f6'
                      }}>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>{selectedPlayer.stats.conversion || 14}%</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: '500' }}>Conversion</div>
                      </div>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: '#1e3a8a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        border: '2px solid #3b82f6'
                      }}>
                        <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '700' }}>{selectedPlayer.stats.accuracy || 41}%</div>
                        <div style={{ color: '#3b82f6', fontSize: '0.7rem', fontWeight: '500' }}>Accuracy</div>
                      </div>
                    </div>

                    <img 
                      src={selectedPlayer.renderImg} 
                      alt={selectedPlayer.name} 
                      style={{ 
                        height: '90%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center center',
                        marginTop: '-20%',
                        filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.3))',
                        transition: 'all 0.5s cubic-bezier(.4,2,.3,1)',
                        transform: isClosing ? 'scale(0.9)' : 'scale(1)',
                        opacity: isClosing ? 0 : 1
                      }} 
                    />
                  </div>
                </div>

                {/* Back Button */}
                <button
                  onClick={handleBackToGallery}
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                    background: '#1e3a8a',
                    border: 'none',
                    borderRadius: '50px',
                    width: '200px',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isClosing ? 0 : 1,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.5)'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = '#2563eb';
                    e.target.style.transform = 'translateX(-50%) scale(1.05)';
                    e.target.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = '#1e3a8a';
                    e.target.style.transform = 'translateX(-50%) scale(1)';
                    e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                  }}
                >
                  <span style={{ 
                    color: '#fff', 
                    fontSize: '1.8rem',
                    display: 'block'
                  }}>←</span>
                  <span style={{
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    letterSpacing: '0.5px'
                  }}>Back to Gallery</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage; 