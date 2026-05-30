import axios from "axios";
import type { GroupStanding, Match } from "../types";

const API_URL = ""; // same domain, no need to hardcode

const WC_START_MS = new Date("2026-06-11T00:00:00Z").getTime();
const WC_END_MS = new Date("2026-07-20T00:00:00Z").getTime();

function normalizeGroup(group?: string) {
  if (!group) return undefined;
  return group.replace(/^GROUP_/, "Group ").replace(/_/g, " ");
}

function mapMatch(raw: any): Match {
  return {
    id: raw.fixture?.id || raw.id,
    stage: raw.league?.round || raw.stage,
    group: normalizeGroup(raw.league?.group || raw.group),
    utcDate: raw.fixture?.date || raw.utcDate,
    status: raw.fixture?.status?.short || raw.status,
    matchday: raw.league?.round || raw.matchday,
    homeTeam: { name: raw.teams?.home?.name || raw.homeTeam?.name || "TBD" },
    awayTeam: { name: raw.teams?.away?.name || raw.awayTeam?.name || "TBD" },
    score: {
      duration: raw.fixture?.status?.long || raw.score?.duration,
      fullTime: {
        home: raw.goals?.home ?? raw.score?.fullTime?.home,
        away: raw.goals?.away ?? raw.score?.fullTime?.away
      },
      halfTime: raw.score?.halfTime
    },
    venue: raw.fixture?.venue?.name || raw.venue
  };
}

function mapStandings(rawStandings: any[]): GroupStanding[] {
  return rawStandings
    .filter(item => item.type === "total" || item.type === "TOTAL")
    .map(item => ({
      group: item.group || "Group",
      table: item.table.map((row: any) => ({
        position: row.rank || row.position,
        team: { name: row.team?.name },
        playedGames: row.all?.played || row.playedGames,
        won: row.all?.win || row.won,
        draw: row.all?.draw || row.draw,
        lost: row.all?.lose || row.lost,
        points: row.points,
        goalDifference: row.goalsDiff || row.goalDifference,
        goalsFor: row.all?.goals?.for || row.goalsFor,
        goalsAgainst: row.all?.goals?.against || row.goalsAgainst
      }))
    }));
}

export async function fetchFixtures(): Promise<Match[]> {
  try {
    const res = await axios.get(`/fixtures`);

    if (!res.data.response) {
      return [];
    }
    console.log("Raw fixtures response:", res.data);

    return res.data.response
      .map(mapMatch)
      .filter(match => {
        const dateMs = new Date(match.utcDate).getTime();
        return dateMs >= WC_START_MS && dateMs < WC_END_MS;
      });
  } catch (err) {
    console.error("fetchFixtures failed:", err);
    return [];
  }
}

export async function fetchStandings(): Promise<GroupStanding[]> {
  try {
    const res = await axios.get(`/standings`);

    if (!res.data.response) {
      return [];
    }

    console.log("Raw standings response:", res.data);

    return mapStandings(res.data.response[0].league.standings);
  } catch (err) {
    console.error("fetchStandings failed:", err);
    return [];
  }
}
