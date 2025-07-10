import React from 'react';

const MatchesContainer = ({ matches }) => {
  return (
    <>
      <h1 className="today-matches-title">TODAY'S MATCHES</h1>
      <div className="matches-container">
        {matches.map((match, index) => (
          <div key={index} className="match-item">
            <div className="match-header">
              <div className="match-league-info">
                <img src="/images/prem.png" alt="Champions League" />
                <span>UEFA CHAMPIONS LEAGUE - 2ND LEG</span>
              </div>
              <div className="match-time">{match.time}</div>
            </div>
            <div className="match-teams">
              <div className="match-team">
                <img src={match.team1Logo} alt={match.team1} />
                <span>{match.team1}</span>
              </div>
              <span className="match-vs">VS</span>
              <div className="match-team">
                <img src={match.team2Logo} alt={match.team2} />
                <span>{match.team2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchesContainer; 