import React from 'react';
import './MatchesPage.css';

const leagues = [
  { id: 1, name: 'La Liga', icon: '/images/laliga-seeklogo 1.png' },
  { id: 2, name: 'Premier League', icon: '/images/pngwing.com-2 1.png' },
  { id: 3, name: 'Bundesliga', icon: '/images/pngwing.com-3 1.png' },
  { id: 4, name: 'Serie A', icon: '/images/pngwing.com-4 1.png' },
  { id: 5, name: 'Ligue 1', icon: '/images/pngwing.com-5 1.png' },
];

const newsItems = [
  {
    id: 1,
    title: 'Real Sociedad 1-4 FC Barcelona: It\'s all starting to click!',
    image: '/images/Rectangle 29.png',
    time: 'About 2 hours ago'
  },
  {
    id: 2,
    title: 'The squad for the trip to San Sebastian Xavi names...',
    image: '/images/Mask group.png',
    time: '22 AUG 2022, 14:16'
  },
  {
    id: 3,
    title: 'Carlo Ancelotti in the running to be named UEFA coach of...',
    image: '/images/Vector 3.png',
    time: '22 AUG 2021, 12:18'
  }
];

const matches = [
  { 
    id: 1, 
    homeTeam: 'Real Sociedad', 
    awayTeam: 'Real Madrid', 
    score: '5:1',
    status: '70\'LIVE', 
    league: 'La Liga Week 22',
    date: 'Mon, 22 Aug 2022'
  },
  { 
    id: 2, 
    homeTeam: 'Athletica Madrid', 
    awayTeam: 'FC Barcelona', 
    score: '2:1',
    status: '80\'LIVE', 
    league: 'La Liga Week 22',
    date: 'Mon, 22 Aug 2022'
  },
];

const bundesligaMatches = [
  { 
    id: 3, 
    homeTeam: 'Bayern Munich', 
    awayTeam: 'Vld Stuttgart', 
    score: '1:0',
    status: '70\'LIVE', 
    league: 'La Liga Week 22',
    date: 'Mon, 22 Aug 2022'
  },
  { 
    id: 4, 
    homeTeam: 'Bayern Dortm.', 
    awayTeam: 'Vfl Wolfsburg', 
    score: '5:1',
    status: '80\'LIVE', 
    league: 'La Liga Week 22',
    date: 'Mon, 22 Aug 2022'
  },
];

const MatchesPage = () => {
  return (
    <div className="matches-page-container">
      <div className="menu-section">
        <h2 className="menu-title">Leagues</h2>
        <div className="leagues-list">
          {leagues.map(league => (
            <div key={league.id} className="league-item">
              <img src={league.icon} alt={league.name} className="league-icon" />
              <span>{league.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="matches-main-content">
        <div className="league-section">
          <h2>La Liga</h2>
          <div className="matches-list">
            {matches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <div className="match-info">
                    <span className="league-name">{match.league}</span>
                    <span className="match-date">{match.date}</span>
                  </div>
                  <div className="match-options">•••</div>
                </div>
                <div className="match-content">
                  <div className="team-info">
                    <span className="team-name">{match.homeTeam}</span>
                    <span className="score">{match.score}</span>
                    <span className="team-name">{match.awayTeam}</span>
                  </div>
                  <div className="match-status">{match.status}</div>
                  <button className="watch-now-btn">Watch Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="league-section">
          <h2>Bundesliga</h2>
          <div className="matches-list">
            {bundesligaMatches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <div className="match-info">
                    <span className="league-name">{match.league}</span>
                    <span className="match-date">{match.date}</span>
                  </div>
                  <div className="match-options">•••</div>
                </div>
                <div className="match-content">
                  <div className="team-info">
                    <span className="team-name">{match.homeTeam}</span>
                    <span className="score">{match.score}</span>
                    <span className="team-name">{match.awayTeam}</span>
                  </div>
                  <div className="match-status">{match.status}</div>
                  <button className="watch-now-btn">Watch Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="news-section">
        <h2 className="section-title">Trending News</h2>
        <div className="news-list">
          {newsItems.map(news => (
            <div key={news.id} className="news-card">
              <img src={news.image} alt={news.title} className="news-image" />
              <div className="news-content">
                <h3 className="news-title">{news.title}</h3>
                <span className="news-time">{news.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;