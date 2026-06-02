import React, { useEffect, useState } from "react";
import { fetchStandings } from "../services/apiService";
import VerticalLeaderboard from "./VerticalLeaderboard";
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

  return (
    <div>
      <VerticalLeaderboard 
        points={points} 
        loaded={loaded} 
        title="Prize Race" 
        subtitle="Total prize: R600 (R100 from each of us). Winner's team owner takes it all!"
      />
    </div>
  );
};

export default PrizePage;
