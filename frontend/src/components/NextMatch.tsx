import React, { useEffect, useMemo, useState } from "react";
import { fetchFixtures } from "../services/apiService";
import { getOwner } from "../services/teamService";
import type { Match } from "../types";

const scheduledStatuses = new Set(["TIMED", "SCHEDULED"]);

const NextMatch: React.FC = () => {
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const upcoming = fixtures
          .filter(match => scheduledStatuses.has(match.status))
          .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())[0];
        setNextMatch(upcoming || null);
      } catch (error) {
        console.error(error);
        setNextMatch(null);
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!nextMatch) return;
    const updateCountdown = () => {
      const matchDate = new Date(nextMatch.utcDate).getTime();
      const diff = matchDate - Date.now();

      if (diff <= 0) {
        setTimeLeft("Kickoff!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextMatch]);

  const displayDate = useMemo(() => {
    if (!nextMatch) return "";
    return new Date(nextMatch.utcDate).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }, [nextMatch]);

  if (!loaded) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Next Match</h2>
      </div>
      <p>Loading next match...</p>
    </section>
  );

  if (loaded && !nextMatch) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Next Match</h2>
      </div>
      <p>No upcoming matches scheduled yet.</p>
    </section>
  );

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Next Match</h2>
      </div>
      <div className="score-card">
        <div className="match-up">
          <div className="team-label">
            <span>{nextMatch!.homeTeam.name}</span>
            <span className="owner-chip">{getOwner(nextMatch!.homeTeam.name)}</span>
          </div>
          <strong>vs</strong>
          <div className="team-label">
            <span>{nextMatch!.awayTeam.name}</span>
            <span className="owner-chip">{getOwner(nextMatch!.awayTeam.name)}</span>
          </div>
        </div>
        <div className="match-meta">
          <span>{displayDate}</span>
          <span>{nextMatch!.stage.replace(/_/g, " ")}</span>
        </div>
        <div className="match-meta">
          <strong>Kickoff in: {timeLeft}</strong>
        </div>
      </div>
    </section>
  );
};

export default NextMatch;
