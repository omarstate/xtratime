import React, { useState, useEffect } from 'react';
import './LandingPage.css'; // Reuse glassmorphism and base styles
import SpotlightCard from './SpotlightCard';
import { useRef } from 'react';

// Dummy data
const kubarsiImg = '/images/kubarsi.png';
const bgImage = '/images/playersbg.jpg';
const dummyData = [
  {
    name: 'Premier League',
    teams: [
      {
        name: 'Chelsea',
        players: [
          { id: 1, name: 'Olivier Giroud', number: 18, position: 'Forward', nationality: 'France', stats: { goals: 3, assists: 2, appearances: 13, height: "1.92m", weight: "93kg", age: 31, conversion: 14, accuracy: 41 }, img: kubarsiImg },
          { id: 2, name: 'Eden Hazard', number: 10, position: 'Midfielder', nationality: 'Belgium', stats: { goals: 7, assists: 5, appearances: 15, height: "1.75m", weight: "74kg", age: 28, conversion: 18, accuracy: 53 }, img: kubarsiImg },
          { id: 3, name: 'Gary Cahill', number: 24, position: 'Defender', nationality: 'England', stats: { goals: 1, assists: 0, appearances: 12, height: "1.93m", weight: "88kg", age: 33, conversion: 5, accuracy: 22 }, img: kubarsiImg },
          { id: 4, name: 'Willian', number: 22, position: 'Winger', nationality: 'Brazil', stats: { goals: 5, assists: 8, appearances: 20, height: "1.75m", weight: "77kg", age: 29, conversion: 12, accuracy: 40 }, img: kubarsiImg },
          { id: 5, name: 'César Azpilicueta', number: 28, position: 'Defender', nationality: 'Spain', stats: { goals: 2, assists: 3, appearances: 18, height: "1.78m", weight: "70kg", age: 30, conversion: 7, accuracy: 30 }, img: kubarsiImg },
          { id: 6, name: "N'Golo Kanté", number: 7, position: 'Midfielder', nationality: 'France', stats: { goals: 3, assists: 4, appearances: 19, height: "1.68m", weight: "68kg", age: 28, conversion: 10, accuracy: 35 }, img: kubarsiImg },
        ],
      },
      {
        name: 'Arsenal',
        players: [
          { id: 7, name: 'Pierre-Emerick Aubameyang', number: 14, position: 'Forward', nationality: 'Gabon', stats: { goals: 10, assists: 3, appearances: 16, height: "1.87m", weight: "80kg", age: 30, conversion: 21, accuracy: 48 }, img: kubarsiImg },
          { id: 8, name: 'Mesut Özil', number: 11, position: 'Midfielder', nationality: 'Germany', stats: { goals: 2, assists: 7, appearances: 14, height: "1.80m", weight: "76kg", age: 31, conversion: 8, accuracy: 36 }, img: kubarsiImg },
          { id: 9, name: 'Alexandre Lacazette', number: 9, position: 'Forward', nationality: 'France', stats: { goals: 8, assists: 2, appearances: 15, height: "1.75m", weight: "73kg", age: 28, conversion: 19, accuracy: 44 }, img: kubarsiImg },
          { id: 10, name: 'Granit Xhaka', number: 34, position: 'Midfielder', nationality: 'Switzerland', stats: { goals: 1, assists: 5, appearances: 17, height: "1.85m", weight: "82kg", age: 27, conversion: 6, accuracy: 28 }, img: kubarsiImg },
          { id: 11, name: 'David Luiz', number: 23, position: 'Defender', nationality: 'Brazil', stats: { goals: 2, assists: 1, appearances: 16, height: "1.89m", weight: "84kg", age: 32, conversion: 7, accuracy: 32 }, img: kubarsiImg },
        ],
      },
      {
        name: 'Manchester United',
        players: [
          { id: 12, name: 'Marcus Rashford', number: 10, position: 'Forward', nationality: 'England', stats: { goals: 11, assists: 6, appearances: 18, height: "1.80m", weight: "70kg", age: 22, conversion: 23, accuracy: 50 }, img: kubarsiImg },
          { id: 13, name: 'Paul Pogba', number: 6, position: 'Midfielder', nationality: 'France', stats: { goals: 4, assists: 8, appearances: 17, height: "1.91m", weight: "84kg", age: 26, conversion: 13, accuracy: 38 }, img: kubarsiImg },
          { id: 14, name: 'Harry Maguire', number: 5, position: 'Defender', nationality: 'England', stats: { goals: 2, assists: 1, appearances: 19, height: "1.94m", weight: "100kg", age: 27, conversion: 6, accuracy: 27 }, img: kubarsiImg },
        ],
      },
    ],
  },
  {
    name: 'LaLiga',
    teams: [
      {
        name: 'Barcelona',
        players: [
          { id: 15, name: 'Robert Lewandowski', number: 9, position: 'Forward', nationality: 'Poland', stats: { goals: 12, assists: 4, appearances: 17, height: "1.85m", weight: "80kg", age: 34, conversion: 25, accuracy: 60 }, img: kubarsiImg },
          { id: 16, name: 'Pedri', number: 8, position: 'Midfielder', nationality: 'Spain', stats: { goals: 3, assists: 7, appearances: 18, height: "1.74m", weight: "60kg", age: 20, conversion: 11, accuracy: 41 }, img: kubarsiImg },
          { id: 17, name: 'Frenkie de Jong', number: 21, position: 'Midfielder', nationality: 'Netherlands', stats: { goals: 2, assists: 5, appearances: 16, height: "1.80m", weight: "74kg", age: 25, conversion: 8, accuracy: 35 }, img: kubarsiImg },
        ],
      },
      {
        name: 'Real Madrid',
        players: [
          { id: 18, name: 'Karim Benzema', number: 9, position: 'Forward', nationality: 'France', stats: { goals: 14, assists: 6, appearances: 19, height: "1.85m", weight: "81kg", age: 32, conversion: 28, accuracy: 62 }, img: kubarsiImg },
          { id: 19, name: 'Luka Modrić', number: 10, position: 'Midfielder', nationality: 'Croatia', stats: { goals: 2, assists: 8, appearances: 18, height: "1.72m", weight: "66kg", age: 34, conversion: 7, accuracy: 33 }, img: kubarsiImg },
        ],
      },
    ],
  },
  {
    name: 'Bundesliga',
    teams: [
      {
        name: 'Bayern Munich',
        players: [
          { id: 20, name: 'Thomas Müller', number: 25, position: 'Forward', nationality: 'Germany', stats: { goals: 9, assists: 10, appearances: 18, height: "1.86m", weight: "75kg", age: 30, conversion: 20, accuracy: 55 }, img: kubarsiImg },
          { id: 21, name: 'Joshua Kimmich', number: 6, position: 'Midfielder', nationality: 'Germany', stats: { goals: 3, assists: 9, appearances: 17, height: "1.76m", weight: "75kg", age: 25, conversion: 10, accuracy: 38 }, img: kubarsiImg },
        ],
      },
    ],
  },
];

const leagueLogos = [
  { src: '/images/prem.png', name: 'Premier League' },
  { src: '/images/LIGA.png', name: 'LaLiga' },
  { src: '/images/bundsliga.png', name: 'Bundesliga' },
  { src: '/images/seria a.png', name: 'Serie A' },
];

const PlayersPage = () => {
  const [selectedLeagueIdx, setSelectedLeagueIdx] = useState(0);
  const [selectedTeamIdx, setSelectedTeamIdx] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedPlayerIdx, setSelectedPlayerIdx] = useState(null);
  const [staggered, setStaggered] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);

  const league = dummyData[selectedLeagueIdx];
  const team = league.teams[selectedTeamIdx];
  const players = team.players;
  const selectedPlayer = selectedPlayerIdx !== null ? players[selectedPlayerIdx] : null;

  // When team changes, reset carousel to leftmost player and trigger staggered animation
  useEffect(() => {
    setCarouselIndex(0);
    setSelectedPlayerIdx(null);
    setStaggered(true);
    const timer = setTimeout(() => setStaggered(false), players.length * 120 + 400);
    return () => clearTimeout(timer);
  }, [selectedTeamIdx, selectedLeagueIdx]);

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
    setCarouselIndex((prev) => (prev - 1 + players.length) % players.length);
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % players.length);
  };

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
                {players.map((player, idx) => {
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
            <div className="player-detail-anim" style={{ display: 'flex', width: '100%', gap: 40, alignItems: 'center', justifyContent: 'center', minHeight: 400, position: 'relative', transition: 'all 0.7s cubic-bezier(.4,2,.3,1)' }}>
              {/* BG Dim Overlay */}
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', zIndex: 1, pointerEvents: 'none' }} />
              {/* Left: Stats Card */}
              <div className="glass-card" style={{ flex: 1, minWidth: 380, minHeight: 420, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2, animation: 'slideInLeft 1s cubic-bezier(.4,2,.3,1)', background: 'rgba(30,40,80,0.7)', border: '2px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', backdropFilter: 'blur(24px)' }}>
                {/* Honours */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
                  {/* Example SVGs from react-icons */}
                  <div style={{ textAlign: 'center' }}><svg width="32" height="32" fill="#ffd700"><circle cx="16" cy="16" r="16" /></svg><div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>1</div></div>
                  <div style={{ textAlign: 'center' }}><svg width="32" height="32" fill="#c0c0c0"><rect x="4" y="4" width="24" height="24" rx="6" /></svg><div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>2</div></div>
                  <div style={{ textAlign: 'center' }}><svg width="32" height="32" fill="#b87333"><polygon points="16,4 28,28 4,28" /></svg><div style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>1</div></div>
                </div>
                {/* Stats Row */}
                <div style={{ display: 'flex', gap: 40, marginBottom: 32, justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 800, fontSize: 36 }}>{selectedPlayer.stats.minutes || 610}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Minutes Played</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 800, fontSize: 36 }}>{selectedPlayer.stats.appearances}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Appearances</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 800, fontSize: 36 }}>{selectedPlayer.stats.goals}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Goals</div></div>
                </div>
                {/* Line Chart (SVG) */}
                <div style={{ margin: '0 auto 32px auto', width: 220, height: 48 }}>
                  <svg width="220" height="48"><polyline points="0,40 30,30 60,35 90,20 120,25 150,10 180,18 220,8" fill="none" stroke="#ffd700" strokeWidth="4" strokeLinejoin="round" /></svg>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: 15, marginTop: 4 }}>Goals Amount Per Season</div>
                </div>
                {/* Height, Weight, Age */}
                <div style={{ display: 'flex', gap: 32, marginBottom: 32, justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>{selectedPlayer.stats.height}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Height</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>{selectedPlayer.stats.weight}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Weight</div></div>
                  <div style={{ textAlign: 'center' }}><div style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>{selectedPlayer.stats.age}</div><div style={{ color: '#ffd700', fontWeight: 600, fontSize: 15 }}>Age</div></div>
                </div>
                {/* Soon Matches */}
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 16, minWidth: 100, textAlign: 'center' }}>
                    <svg width="32" height="32" fill="#1e90ff"><circle cx="16" cy="16" r="16" /></svg>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 16, margin: '8px 0 2px 0' }}>Chelsea</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 15 }}>19:00</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 16, minWidth: 100, textAlign: 'center' }}>
                    <svg width="32" height="32" fill="#e74c3c"><circle cx="16" cy="16" r="16" /></svg>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: 16, margin: '8px 0 2px 0' }}>Man United</div>
                    <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 15 }}>21:00</div>
                  </div>
                </div>
              </div>
              {/* Right: Player Image & Info (no rectangle, just image) */}
              <div style={{ flex: 1, minWidth: 340, minHeight: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', animation: 'slideInRight 1s cubic-bezier(.4,2,.3,1)', zIndex: 2 }}>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)" style={{ transition: 'transform 0.7s cubic-bezier(.4,2,.3,1)' }}>
                  <img src={selectedPlayer.img} alt={selectedPlayer.name} id="active-player-img" style={{ width: 340, height: 340, borderRadius: '40px', objectFit: 'cover', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', border: 'none', marginBottom: 24, background: 'rgba(255,255,255,0.08)', transition: 'all 0.7s cubic-bezier(.4,2,.3,1)' }} />
                </SpotlightCard>
                <div style={{ color: '#ffd700', fontWeight: 700, fontSize: 32, marginBottom: 8, transition: 'all 1s cubic-bezier(.4,2,.3,1)' }}>#{selectedPlayer.number}</div>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 32, transition: 'all 1s cubic-bezier(.4,2,.3,1)' }}>{selectedPlayer.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayersPage; 