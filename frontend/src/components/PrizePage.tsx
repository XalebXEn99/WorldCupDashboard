import React, { useEffect, useState } from "react";
import { fetchStandings } from "../services/apiService";
import { teamOwners } from "../data/teamOwners";
import type { GroupStanding } from "../types";

function calculatePointsFromStandings(standings: GroupStanding[]): Record<string, number> {
  const points: Record<string, number> = {};

  // Initialize all owners with 0
  Object.values(teamOwners).forEach(owner => {
    points[owner] = 0;
  });

  // Sum points from all groups' standings
  standings.forEach(group => {
    group.table.forEach(row => {
      const owner = teamOwners[row.team.name];
      if (owner) {
        points[owner] = (points[owner] || 0) + row.points;
      }
    });
  });

  return points;
}

const PrizePage: React.FC = () => {
  const [points, setPoints] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const standings = await fetchStandings();
        const calculated = calculatePointsFromStandings(standings);
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
        <h2>Prize Race</h2>
      </div>
      <p>Loading prize race...</p>
    </section>
  );

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Prize Race</h2>
      </div>
      <p>Total prize: R600 (R100 from each of us). Winner's team owner takes it all!</p>
      <div className="leaderboard-list">
        {owners.map((owner, idx) => {
          const pts = points[owner] || 0;
          return (
            <div key={idx} className="leaderboard-row">
              <span>{owner}</span>
              <div className="leaderboard-bar-bg">
                <div className="leaderboard-bar-fill prize-bar" style={{ width: `${(pts / maxPoints) * 100}%` }} />
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

export default PrizePage;
