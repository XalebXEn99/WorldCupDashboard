import React, { useEffect, useMemo, useState } from "react";
import { fetchFixtures, fetchStandings } from "../services/apiService";
import { getOwner } from "../services/teamService";
import type { GroupStanding, Match } from "../types";

const GroupStage: React.FC = () => {
  const [fixtures, setFixtures] = useState<Match[]>([]);
  const [groups, setGroups] = useState<GroupStanding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [fixturesData, standingsData] = await Promise.all([
          fetchFixtures(),
          fetchStandings()
        ]);
        if (isMounted) {
          setFixtures(fixturesData);
          setGroups(standingsData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    const interval = setInterval(load, 120000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const groupMatches = useMemo(() => {
    const groupsMap: Record<string, Match[]> = {};
    fixtures
      .filter(match => match.stage === "GROUP_STAGE")
      .forEach(match => {
        const group = match.group || "Group";
        groupsMap[group] = groupsMap[group] || [];
        groupsMap[group].push(match);
      });

    return Object.entries(groupsMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([group, matches]) => ({
        group,
        matches: matches.sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
      }));
  }, [fixtures]);

  const handleViewResults = () => {
    document.getElementById("group-standings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Group Stage</h2>
      </div>
      {isLoading ? (
        <p>Loading group stage schedule and standings...</p>
      ) : (
        <>
          {groupMatches.length ? groupMatches.map(({ group, matches }) => (
            <div key={group} className="group-block">
              <div className="section-header" style={{ padding: 0, marginBottom: 14 }}>
                <h3>{group}</h3>
                <button className="primary-button" type="button" onClick={handleViewResults}>
                  View results
                </button>
              </div>
              <div className="match-card-grid">
                {matches.map(match => (
                  <article key={match.id} className="match-card">
                    <div className="match-card-teams">
                      <div className="team-label">
                        <span>{match.homeTeam.name}</span>
                        <span className="owner-chip">{getOwner(match.homeTeam.name)}</span>
                      </div>
                      <strong>vs</strong>
                      <div className="team-label">
                        <span>{match.awayTeam.name}</span>
                        <span className="owner-chip">{getOwner(match.awayTeam.name)}</span>
                      </div>
                    </div>
                    <div className="match-card-meta">
                      <span>{new Date(match.utcDate).toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</span>
                      <span>{match.status.replace("TIMED", "Scheduled")}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )) : (
            <p>No group stage schedule available yet.</p>
          )}

          <div id="group-standings" className="standings-section">
            <h3>Group Standings</h3>
            {groups.length ? groups.map((group, idx) => (
              <div key={idx} className="standings-card">
                <h4>{group.group}</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Pos</th>
                      <th>Team</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>GF</th>
                      <th>GA</th>
                      <th>GD</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.table.map((row, i) => (
                      <tr key={i}>
                        <td>{row.position}</td>
                        <td>
                          <div className="team-label">
                            <span>{row.team.name}</span>
                            <span className="owner-chip">{getOwner(row.team.name)}</span>
                          </div>
                        </td>
                        <td>{row.won}</td>
                        <td>{row.draw}</td>
                        <td>{row.lost}</td>
                        <td>{row.goalsFor}</td>
                        <td>{row.goalsAgainst}</td>
                        <td>{row.goalDifference}</td>
                        <td><strong>{row.points}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )) : (
              <p className="table-placeholder">Standings will be available soon.</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default GroupStage;
