import { teamOwners } from "../data/teamOwners";

interface Match {
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: { fullTime: { home: number | null; away: number | null } };
  status: string;
}

export function calculatePoints(matches: Match[]) {
  const points: Record<string, number> = {};

  // Initialize all owners with 0
  Object.values(teamOwners).forEach(owner => {
    points[owner] = 0;
  });

  matches.forEach(match => {
    if (match.status !== "FINISHED") return;

    const home = match.homeTeam.name;
    const away = match.awayTeam.name;
    const homeGoals = match.score.fullTime.home ?? 0;
    const awayGoals = match.score.fullTime.away ?? 0;

    const homeOwner = teamOwners[home];
    const awayOwner = teamOwners[away];

    if (!homeOwner || !awayOwner) return;

    if (homeGoals > awayGoals) {
      points[homeOwner] += 3;
    } else if (awayGoals > homeGoals) {
      points[awayOwner] += 3;
    } else {
      points[homeOwner] += 1;
      points[awayOwner] += 1;
    }
  });

  return points;
}
