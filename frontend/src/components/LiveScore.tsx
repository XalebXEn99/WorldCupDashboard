import React, { useEffect, useState } from "react";
import { fetchFixtures } from "../services/apiService";
import { getOwner } from "../services/teamService";
import type { Match } from "../types";

const liveStatuses = new Set(["LIVE", "IN_PLAY"]);

const LiveScore: React.FC = () => {
  const [liveMatch, setLiveMatch] = useState<Match | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const live = fixtures.find(match => liveStatuses.has(match.status));
        setLiveMatch(live || null);
      } catch (error) {
        console.error(error);
        setLiveMatch(null);
      } finally {
        setLoaded(true);
      }
    }
    load();

    // Update every 3 minutes
    const interval = setInterval(load, 180000);
    return () => clearInterval(interval);
  }, []);

  if (!loaded) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Live Score</h2>
      </div>
      <p>Loading live score...</p>
    </section>
  );

  if (loaded && !liveMatch) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Live Score</h2>
      </div>
      <p>No live match right now.</p>
    </section>
  );

  const homeScore = liveMatch!.score.fullTime.home ?? 0;
  const awayScore = liveMatch!.score.fullTime.away ?? 0;

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Live Score</h2>
      </div>
      <div className="score-card">
        <div className="match-up">
          <div className="team-label">
            <span>{liveMatch!.homeTeam.name}</span>
            <span className="owner-chip">{getOwner(liveMatch!.homeTeam.name)}</span>
          </div>
          <strong>{homeScore} - {awayScore}</strong>
          <div className="team-label">
            <span>{liveMatch!.awayTeam.name}</span>
            <span className="owner-chip">{getOwner(liveMatch!.awayTeam.name)}</span>
          </div>
        </div>
        <div className="match-meta">
          <span>{liveMatch!.status}</span>
          <span>{liveMatch!.score.duration || "In play"}</span>
        </div>
        <div className="match-meta">
          <span>Half-time: {liveMatch!.score.halfTime?.home ?? 0}-{liveMatch!.score.halfTime?.away ?? 0}</span>
        </div>
      </div>
    </section>
  );
};

export default LiveScore;
