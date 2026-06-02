import React from "react";

interface VerticalLeaderboardProps {
  points: Record<string, number>;
  loaded: boolean;
  title: string;
  subtitle?: string;
}

const VerticalLeaderboard: React.FC<VerticalLeaderboardProps> = ({ points, loaded, title, subtitle }) => {
  if (!loaded) return (
    <section className="section-card">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <p>Loading {title.toLowerCase()}...</p>
    </section>
  );

  const owners = Array.from(new Set(Object.keys(points))).sort();
  const leadingPoints = owners.map(owner => points[owner] || 0);
  const maxPoints = Math.max(1, ...leadingPoints);

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      {subtitle && <p style={{ marginBottom: 24 }}>{subtitle}</p>}
      
      <div className="vertical-leaderboard">
        {owners.map((owner, idx) => {
          const pts = points[owner] || 0;
          const heightPercent = (pts / maxPoints) * 100;
          return (
            <div key={idx} className="vertical-bar-container">
              <div className="vertical-bar-wrapper">
                <div 
                  className="vertical-bar-fill" 
                  style={{ height: `${heightPercent}%` }}
                  title={`${owner}: ${pts} pts`}
                />
              </div>
              <div className="bar-label">
                <span className="owner-name">{owner}</span>
                <span className="bar-points">{pts}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {!Object.values(points).some(value => value > 0) && (
        <p style={{ marginTop: 24, color: '#94a3b8' }}>No points scored yet. The World Cup has not started.</p>
      )}
    </section>
  );
};

export default VerticalLeaderboard;
