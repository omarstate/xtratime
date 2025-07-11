import React, { useState, useEffect, useCallback } from 'react';
import './LandingPage.css'; // Reuse glassmorphism and base styles
import SpotlightCard from './SpotlightCard';
import { useRef } from 'react';
import { fetchPlayers, fetchLeagues, fetchPlayersByTeam } from './api/players';
import { fetchTeams, fetchTeamsByLeague } from './api/teams';

// Dummy data


// Update leagueLogos to use actual league data
const leagueLogos = [
  { src: '/images/prem.png', name: 'PREMIER LEAGUE', id: 'premier-league', code: 'EN' },
  { src: '/images/laliga-logo.png', name: 'LA LIGA', id: 'laliga', code: 'ES' },
  { src: '/images/bundsliga.png', name: 'BUNDESLIGA', id: 'bundesliga', code: 'DE' },
  { src: '/images/seria a.png', name: 'SERIE A', id: 'serie-a', code: 'IT' },
  { src: '/images/Ligue-1-logo.png', name: 'LIGUE 1', id: 'ligue-1', code: 'FR' }
];

// Add position order constant
const POSITION_ORDER = {
  'Forward': 1,
  'Midfielder': 2,
  'Defender': 3,
  'Goalkeeper': 4,
  'Manager': 5
};

// Add position display names
const POSITION_DISPLAY = {
  'Forward': 'ATTACKERS',
  'Midfielder': 'MIDFIELDERS',
  'Defender': 'DEFENDERS',
  'Goalkeeper': 'GOALKEEPERS',
  'Manager': 'MANAGER'
};

// Add function to normalize position names
const normalizePosition = (position) => {
  position = position?.toLowerCase() || '';
  if (position.includes('forward') || position.includes('wing') || position.includes('striker') || position.includes('cf') || position.includes('rw') || position.includes('lw') || position.includes('attack')) return 'Forward';
  if (position.includes('mid') || position.includes('cdm') || position.includes('cam') || position.includes('cm')) return 'Midfielder';
  if (position.includes('defend') || position.includes('back') || position.includes('cb') || position.includes('lb') || position.includes('rb')) return 'Defender';
  if (position.includes('keeper') || position.includes('gk')) return 'Goalkeeper';
  if (position.includes('manager') || position.includes('coach')) return 'Manager';
  return 'Unknown';
};

const PlayersPage = () => {
  // Add new state for teams
  const [teams, setTeams] = useState([]);
  const [teamsByLeague, setTeamsByLeague] = useState({});
  // Add new state for exit animation
  const [isClosing, setIsClosing] = useState(false);
  
  // All state hooks at the top
  const [selectedLeagueIdx, setSelectedLeagueIdx] = useState(0);
  const [selectedTeamIdx, setSelectedTeamIdx] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Only use selectedPlayer state
  const [staggered, setStaggered] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  // Add new state for background transition
  const [isBackgroundTransitioning, setIsBackgroundTransitioning] = useState(false);

  // Add state for background image and transition
  const [currentBg, setCurrentBg] = useState('/images/black bgggg.jpg');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Add state for players loading
  const [playersLoading, setPlayersLoading] = useState(false);

  // Update getBackgroundImage to handle transitions
  const getBackgroundImage = () => {
    const selectedLeague = leagueLogos[selectedLeagueIdx]?.name;
    const selectedTeam = teamsByLeague[selectedLeague]?.[selectedTeamIdx]?.strTeam || 
                        teamsByLeague[selectedLeague]?.[selectedTeamIdx]?.name;
    
    return selectedTeam?.toLowerCase().includes('barcelona') ? '/images/Campnou.jpeg' : '/images/black bgggg.jpg';
  };

  // Update the player click handler and selection logic
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player); // Set the player object for the modal
  };

  const handleBackToGallery = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedPlayer(null);
      setIsClosing(false);
    }, 500); // Match animation duration
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + teamPlayers.length) % teamPlayers.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % teamPlayers.length);
  };

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
      const leagueName = leagueLogos.find(l => 
        player.league?.toLowerCase().includes(l.name.toLowerCase()) ||
        player.strLeague?.toLowerCase().includes(l.name.toLowerCase())
      )?.name || 'Other';
      
      const team = player.team?.name || player.strTeam || 'Unknown Team';
      
      if (!organized[leagueName]) {
        organized[leagueName] = {};
      }
      if (!organized[leagueName][team]) {
        organized[leagueName][team] = {
          Forward: [],
          Midfielder: [],
          Defender: [],
          Goalkeeper: [],
          Manager: [],
          Unknown: []
        };
      }
      
      // Transform player data to match the expected format
      const normalizedPosition = normalizePosition(player.strPosition || player.position);
      const transformedPlayer = {
        id: player.idPlayer || player._id,
        name: player.strPlayer || player.name,
        number: player.strNumber || player.number || '0',
        position: player.strPosition || player.position || 'Unknown',
        normalizedPosition: normalizedPosition,
        nationality: player.strNationality || player.nationality || 'Unknown',
        img: player.strCutout || player.image || player.strThumb,
        renderImg: player.strRender || player.renderImage || player.strCutout || player.strThumb,
        stats: {
          goals: player.stats?.goals || 0,
          assists: player.stats?.assists || 0,
          appearances: player.stats?.appearances || 0,
          height: player.strHeight || player.height || 'N/A',
          weight: player.strWeight || player.weight || 'N/A',
          age: calculateAge(player.dateBorn || player.dateOfBirth),
          conversion: player.stats?.conversion || 0,
          accuracy: player.stats?.accuracy || 0
        }
      };
      
      organized[leagueName][team][normalizedPosition].push(transformedPlayer);
    });

    // Convert to array format matching the original structure
    const result = Object.entries(organized).map(([leagueName, teams]) => ({
      name: leagueName,
      teams: Object.entries(teams).map(([teamName, positions]) => ({
        name: teamName,
        positions: positions,
        // Sort players within each position group
        players: Object.entries(positions)
          .sort(([posA], [posB]) => (POSITION_ORDER[posA] || 99) - (POSITION_ORDER[posB] || 99))
          .flatMap(([_, players]) => players)
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
        
        // First, fetch leagues and teams data
        const [leaguesData, teamsData] = await Promise.all([
          fetchLeagues(),
          fetchTeams()
        ]);
        
        if (!mounted) return;

        setLeagues(leaguesData || []);
        setTeams(teamsData || []);

        // Get teams for the initial league (Premier League)
        const initialLeagueTeams = await fetchTeamsByLeague(leagueLogos[0].name);
        
        if (!mounted) return;
        
        setTeamsByLeague(prev => ({
          ...prev,
          [leagueLogos[0].name]: initialLeagueTeams
        }));

        // Get players for the first team of the initial league
        if (initialLeagueTeams && initialLeagueTeams.length > 0) {
          const firstTeam = initialLeagueTeams[0];
          const teamPlayers = await fetchPlayersByTeam(firstTeam.strTeam || firstTeam.name);
          
          if (!mounted) return;
          
          const organizedData = organizePlayerData(teamPlayers);
          setPlayers(organizedData);
        }

        setLoading(false);
        setInitialLoadComplete(true);
      } catch (err) {
        console.error('Error loading data:', err);
        if (mounted) {
          setError(err.message || 'Failed to load data');
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [organizePlayerData]);

  // Add effect to fetch teams when league changes
  useEffect(() => {
    const loadTeamsByLeague = async () => {
      if (!leagueLogos[selectedLeagueIdx]) return;
      
      try {
        const leagueName = leagueLogos[selectedLeagueIdx].name;
        const teamsData = await fetchTeamsByLeague(leagueName);
        setTeamsByLeague(prev => ({
          ...prev,
          [leagueName]: teamsData
        }));
      } catch (err) {
        console.error(`Error loading teams for league:`, err);
      }
    };

    loadTeamsByLeague();
  }, [selectedLeagueIdx]);

  // Get current data
  const league = players[selectedLeagueIdx] || players[0];
  const team = league?.teams[selectedTeamIdx] || league?.teams[0];
  const teamPlayers = team?.players || [];

  // Animation effect when team changes
  useEffect(() => {
    if (!teamPlayers.length) return;
    
    setCarouselIndex(0);
    setSelectedPlayer(null); // Clear selected player when league changes
    setStaggered(true);
    const timer = setTimeout(() => setStaggered(false), teamPlayers.length * 120 + 400);
    return () => clearTimeout(timer);
  }, [selectedTeamIdx, selectedLeagueIdx, teamPlayers.length]);

  // Update handleLeagueChange to fetch teams for the selected league
  const handleLeagueChange = async (idx) => {
    setSelectedLeagueIdx(idx);
    setSelectedTeamIdx(0); // Reset to first team
    setSelectedPlayer(null); // Clear selected player when league changes
    
    const leagueName = leagueLogos[idx].name;
    try {
      // Fetch teams for the selected league
      const teamsData = await fetchTeamsByLeague(leagueName);
      setTeamsByLeague(prev => ({
        ...prev,
        [leagueName]: teamsData
      }));

      // Automatically fetch players for the first team
      if (teamsData && teamsData.length > 0) {
        const firstTeam = teamsData[0];
        const teamPlayers = await fetchPlayersByTeam(firstTeam.strTeam || firstTeam.name);
        const organizedData = organizePlayerData(teamPlayers);
        setPlayers(organizedData);
      }
    } catch (err) {
      console.error(`Error loading data for league ${leagueName}:`, err);
    }
  };

  // Update handleTeamChange
  const handleTeamChange = async (idx) => {
    try {
      setSelectedTeamIdx(idx);
      setSelectedPlayer(null); // Clear selected player when team changes
      setPlayersLoading(true); // Use playersLoading instead of general loading
      
      // Get the selected team
      const selectedLeague = leagueLogos[selectedLeagueIdx].name;
      const selectedTeam = teamsByLeague[selectedLeague][idx];
      
      if (!selectedTeam) {
        console.error('No team found at index:', idx);
        setError('Team not found');
        setPlayersLoading(false);
        return;
      }

      // Handle background transition
      const newBg = selectedTeam.strTeam?.toLowerCase().includes('barcelona') || 
                   selectedTeam.name?.toLowerCase().includes('barcelona') 
                   ? '/images/Campnou.jpeg' 
                   : '/images/black bgggg.jpg';
      
      if (newBg !== currentBg) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBg(newBg);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 50);
        }, 500);
      }

      console.log('Selected team:', selectedTeam);
      
      // Fetch players for the selected team
      const teamPlayers = await fetchPlayersByTeam(selectedTeam.strTeam || selectedTeam.name);
      
      // Update the players state with the filtered players
      const organizedData = organizePlayerData(teamPlayers);
      setPlayers(organizedData);
      setPlayersLoading(false);
      
    } catch (error) {
      console.error('Error changing team:', error);
      setError('Failed to load team players');
      setPlayersLoading(false);
    }
  };

  // Add keyframes for loading animation at the top of the component
  const loadingStyles = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  // Initial loading condition
  if (loading) {
    return (
      <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{loadingStyles}</style>
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

  // Main render
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{loadingStyles}</style>
      {/* Background Image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
      }}>
        <img 
          src={currentBg}
          alt="background"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            filter: 'blur(8px) brightness(0.7)',
            transform: isTransitioning ? 'scale(1.1)' : 'scale(1)',
            opacity: isTransitioning ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 1,
        opacity: isTransitioning ? 0.9 : 1,
        transition: 'opacity 0.5s ease-in-out',
      }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem'
      }}>
        {/* League Selector as Logo Squares */}
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem', 
          marginBottom: 40,
          marginTop: 80,
          justifyContent: 'center',
          padding: '0 2rem'
        }}>
          {leagueLogos.map((logo, idx) => (
            <div
              key={logo.name}
              style={{
                width: 120,
                height: 150, // Increased height to accommodate text
                background: '#1a1a1a',
                borderRadius: '24px',
                border: idx === selectedLeagueIdx ? '3px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px', // Space between logo and text
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: idx === selectedLeagueIdx 
                  ? '0 0 15px rgba(255, 215, 0, 0.3)' 
                  : '0 4px 16px rgba(0, 0, 0, 0.2)',
                transform: idx === selectedLeagueIdx ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredLogo(idx)}
              onMouseLeave={() => setHoveredLogo(null)}
              onClick={() => handleLeagueChange(idx)}
            >
              <img 
                src={logo.src} 
                alt={logo.name} 
                style={{ 
                  width: 70,
                  height: 70,
                  objectFit: 'contain',
                  transition: 'all 0.3s ease',
                  filter: 'brightness(0) invert(1)', // Make logos white
                  opacity: idx === selectedLeagueIdx ? 1 : 0.7
                }} 
              />
              <span style={{
                fontFamily: 'Neue Plak Condensed',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: idx === selectedLeagueIdx ? '#FFD700' : '#fff',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                opacity: idx === selectedLeagueIdx ? 1 : 0.7,
                maxWidth: '90%', // Prevent text from touching the edges
                lineHeight: '1.1'
              }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Club Selector */}
        <div style={{ 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto 40px',
          padding: '0 2rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}>
            {teamsByLeague[leagueLogos[selectedLeagueIdx].name]?.map((team, idx) => (
              <div
                key={team._id || team.idTeam || idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleTeamChange(idx)}
              >
                <div style={{ 
                  background: idx === selectedTeamIdx ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: idx === selectedTeamIdx ? '2px solid rgba(255, 255, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: idx === selectedTeamIdx 
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 16px rgba(0, 0, 0, 0.1)',
                  marginBottom: 8,
                  transition: 'all 0.3s ease',
                  transform: idx === selectedTeamIdx ? 'scale(1.05)' : 'scale(1)',
                }}>
                  <img 
                    src={team.strBadge || team.strLogo || "/images/barca.webp"}
                    alt={team.strTeam || team.name}
                    style={{ 
                      width: 45,
                      height: 45,
                      objectFit: 'contain',
                      transition: 'all 0.3s ease',
                      filter: idx === selectedTeamIdx ? 'brightness(1.2)' : 'brightness(0.8)',
                    }}
                  />
                </div>
                <span style={{ 
                  fontFamily: 'Neue Plak Condensed',
                  fontWeight: 700,
                  fontSize: 13,
                  color: idx === selectedTeamIdx ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '0 4px'
                }}>{team.strTeam || team.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}>
          {/* Player Gallery with Position Groups */}
          <div style={{ 
            width: '100%',
            overflowX: 'hidden',
            position: 'relative',
            opacity: selectedPlayer ? 0.4 : 1,
            transition: 'opacity 0.5s cubic-bezier(.4,2,.3,1)',
            filter: selectedPlayer ? 'blur(10px)' : 'none',
            transform: selectedPlayer ? 'scale(1.05)' : 'scale(1)'
          }}>
            {Object.entries(team?.positions || {})
              .sort(([posA], [posB]) => (POSITION_ORDER[posA] || 99) - (POSITION_ORDER[posB] || 99))
              .map(([position, players]) => {
                if (players.length === 0) return null;
                
                return (
                  <div key={position} style={{
                    marginBottom: '2rem'
                  }}>
                    {/* Position Header */}
                    <div style={{
                      padding: '1rem 2rem',
                      marginBottom: '1rem'
                    }}>
                      <h2 style={{
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        fontFamily: 'Neue Plak Condensed',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem'
                      }}>
                        {POSITION_DISPLAY[position] || position}
                      </h2>
                    </div>

                    {/* Players Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: position === 'Manager' ? 'repeat(auto-fit, 120px)' : 'repeat(auto-fill, 120px)',
                      gap: '0.75rem',
                      padding: '1rem 0',
                      margin: '0 auto',
                      maxWidth: '1200px',
                      justifyContent: 'center',
                      msOverflowStyle: 'none',
                      scrollbarWidth: 'none',
                      '&::-webkit-scrollbar': { display: 'none' },
                      position: 'relative',
                      minHeight: '200px', // Add minimum height to prevent layout shift
                    }}>
                      {/* Loading Overlay */}
                      {playersLoading && (
                        <>
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            zIndex: 10,
                            animation: 'fadeIn 0.3s ease-out',
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              border: '3px solid rgba(255, 255, 255, 0.1)',
                              borderTop: '3px solid #FFD700',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                            }} />
                            <div style={{
                              color: 'white',
                              fontSize: '1rem',
                              fontFamily: 'Neue Plak Condensed',
                              fontWeight: '600',
                              letterSpacing: '1px',
                            }}>
                              Loading Players...
                            </div>
                          </div>
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            zIndex: 5,
                            borderRadius: '16px',
                            animation: 'fadeIn 0.3s ease-out',
                          }} />
                        </>
                      )}
                      
                      {/* Update the grid container for smaller cards */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, 120px)', // Reverted to smaller fixed width
                        gap: '2rem', // Adjusted gap for smaller cards
                        padding: '2rem',
                        margin: '0 auto',
                        maxWidth: '1200px',
                        justifyContent: 'center',
                        position: 'relative',
                        minHeight: '200px', // Adjusted for smaller cards
                        alignItems: 'start',
                      }}>
                        {players.map((player, idx) => {
                          // Reverted dimensions
                          const imgW = 120, imgH = 160, nameFont = 16, numSize = 28, numFont = 14;
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
                                height: imgH + 25, // Adjusted margin for name
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
                              onClick={() => handlePlayerClick(player)} // Updated to pass the entire player object
                              tabIndex={0}
                            >
                              <SpotlightCard
                                className="custom-spotlight-card"
                                spotlightColor="rgba(0, 229, 255, 0.2)"
                                style={{
                                  width: imgW,
                                  height: imgH,
                                  borderRadius: 16,
                                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)',
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
                                    borderRadius: 16,
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
                                  height: 60,
                                  borderRadius: '0 0 16px 16px',
                                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.88) 100%)',
                                  pointerEvents: 'none',
                                  zIndex: 2,
                                }} />
                                {/* Player Number Circle */}
                                <div style={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
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
                                  border: '2px solid #fff',
                                  zIndex: 3,
                                  transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                                }}>{player.number}</div>
                              </SpotlightCard>
                              {/* Player Name */}
                              <div style={{
                                marginTop: 0,
                                width: imgW,
                                textAlign: 'center',
                                color: 'white',
                                fontFamily: 'Neue Plak Condensed',
                                fontWeight: 900,
                                fontSize: nameFont,
                                letterSpacing: 1,
                                textShadow: '0 4px 16px rgba(0,0,0,0.85)',
                                opacity: 1,
                                zIndex: 4,
                                position: 'absolute',
                                bottom: 6,
                                left: 0,
                                transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                                lineHeight: 1.1,
                                padding: '0 8px', // Added padding to prevent text overflow
                              }}>
                                <span style={{ fontWeight: 900, fontFamily: 'Neue Plak Condensed' }}>{firstName} {lastName}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
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
                background: `linear-gradient(135deg, rgba(0, 77, 255, 0.7), rgba(255, 0, 0, 0.5)), url('/images/black bgggg.jpg')`,
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
                        marginLeft: '-35%', // Increased left margin to move image further left
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