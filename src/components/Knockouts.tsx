import React, { useEffect, useMemo, useState } from "react";
import { fetchFixtures } from "../services/apiService";
import { getOwner } from "../services/teamService";
import type { Match } from "../types";

const stageOrder = [
  "LAST_32",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL"
];

const Knockouts: React.FC = () => {
  const [knockouts, setKnockouts] = useState<Match[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const fixtures = await fetchFixtures();
        const filtered = fixtures.filter(match => 
          stageOrder.includes(match.stage) &&
          match.homeTeam.name !== "TBD" &&
          match.awayTeam.name !== "TBD"
        );
        setKnockouts(filtered);
      } catch (error) {
        console.error(error);
        setKnockouts([]);
      }
    }
    load();
  }, []);

  const grouped = useMemo(() => {
    return stageOrder.map(stage => ({
      stage,
      matches: knockouts.filter(match => match.stage === stage)
    }));
  }, [knockouts]);

  if (!knockouts.length) return (
    <section className="section-card">
      <div className="section-header">
        <h2>Knockout Stage</h2>
      </div>
      <p>Loading knockout fixtures...</p>
    </section>
  );

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Knockout Stage</h2>
      </div>
      <div className="group-block">
        {grouped.map(({ stage, matches }) => (
          <div key={stage} className="stage-block">
            <h3>{stage.replace(/_/g, " ")}</h3>
            {matches.length ? (
              <div className="match-card-grid">
                {matches.map(match => (
                  <article key={match.id} className="match-card">
                    <div className="match-card-teams">
                      <div className="team-label">
                        <span>{match.homeTeam.name}</span>
                        <span className="owner-chip">{getOwner(match.homeTeam.name)}</span>
                      </div>
                      <strong>{match.homeTeam.name === "TBD" || match.awayTeam.name === "TBD" ? "TBD" : `${match.score.fullTime.home ?? "-"} - ${match.score.fullTime.away ?? "-"}`}</strong>
                      <div className="team-label">
                        <span>{match.awayTeam.name}</span>
                        <span className="owner-chip">{getOwner(match.awayTeam.name)}</span>
                      </div>
                    </div>
                    <div className="match-card-meta">
                      <span>{new Date(match.utcDate).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</span>
                      <span>{match.status.replace("TIMED", "TBD")}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p>Fixtures will be decided once earlier rounds finish.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Knockouts;
