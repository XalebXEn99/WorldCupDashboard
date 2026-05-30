import React, { useEffect, useState } from "react";
import { fetchFixtures } from "../services/apiService";
import { getOwner } from "../services/teamService";

interface Match {
  utcDate: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: { fullTime: { home: number | null; away: number | null } };
  status: string;
  goals?: { minute: number; scorer: { name: string }; team: { name: string } }[];
}

const MatchHistory: React.FC = () => {
  const [history, setHistory] = useState<Match[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const finished = fixtures.filter((m: Match) => m.status === "FINISHED");
        setHistory(finished);
      } catch (error) {
        console.error(error);
        setHistory([]);
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  if (!loaded) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Match History</h2>
      </div>
      <p>Loading match history...</p>
    </section>
  );

  if (!history.length) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Match History</h2>
      </div>
      <p>No match history yet. The World Cup has not started.</p>
    </section>
  );

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Match History</h2>
      </div>
      <div className="match-history-list">
        {history.map((match, idx) => (
          <div key={idx} className="history-row">
            <div className="history-title">
              <strong>{new Date(match.utcDate).toLocaleDateString()}:</strong>
            </div>
            <div className="history-info">
              <div className="team-label-row">
                <span>{match.homeTeam.name}</span>
                <span className="owner-chip">{getOwner(match.homeTeam.name)}</span>
              </div>
              <strong>{match.score.fullTime.home} - {match.score.fullTime.away}</strong>
              <div className="team-label-row">
                <span>{match.awayTeam.name}</span>
                <span className="owner-chip">{getOwner(match.awayTeam.name)}</span>
              </div>
            </div>
            {match.goals && match.goals.length > 0 && (
              <ul>
                {match.goals.map((g, i) => (
                  <li key={i}>
                    {g.minute}' {g.scorer.name} ({g.team.name})
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchHistory;
