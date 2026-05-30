import React, { useEffect, useState } from "react";
import { fetchFixtures } from "../services/apiService";
import { calculatePoints } from "../utils/calculatePoints";
import { teamOwners } from "../data/teamOwners";

const Leaderboard: React.FC = () => {
  const [points, setPoints] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const calculated = calculatePoints(fixtures);
        setPoints(calculated);
      } catch (error) {
        console.error(error);
        setPoints({});
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  const owners = Array.from(new Set(Object.values(teamOwners))).sort();
  const leadingPoints = owners.map(owner => points[owner] || 0);
  const maxPoints = Math.max(1, ...leadingPoints);

  if (!loaded) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Household Leaderboard</h2>
      </div>
      <p>Loading leaderboard...</p>
    </section>
  );

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Household Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {owners.map((owner, idx) => {
          const pts = points[owner] || 0;
          return (
            <div key={idx} className="leaderboard-row">
              <span>{owner}</span>
              <div className="leaderboard-bar-bg">
                <div className="leaderboard-bar-fill" style={{ width: `${(pts / maxPoints) * 100}%` }} />
              </div>
              <span>{pts} pts</span>
            </div>
          );
        })}
      </div>
      {!Object.values(points).some(value => value > 0) && (
        <p style={{ marginTop: 16, color: '#94a3b8' }}>No points scored yet. The World Cup has not started.</p>
      )}
    </section>
  );
};

export default Leaderboard;
