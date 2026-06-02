import axios from "axios";
import type { GroupStanding, Match } from "../types";

const API_URL = "/api";
const WC_START_MS = new Date("2026-06-11T00:00:00Z").getTime();
const WC_END_MS = new Date("2026-07-20T00:00:00Z").getTime();

function normalizeGroup(group?: string) {
  if (!group) return undefined;
  return group.replace(/^GROUP_/, "Group ").replace(/_/g, " ");
}

function mapMatch(raw: any): Match {
  return {
    id: raw.id,
    stage: raw.stage,
    group: normalizeGroup(raw.group),
    utcDate: raw.utcDate,
    status: raw.status,
    matchday: raw.matchday,
    homeTeam: { name: raw.homeTeam?.name || "TBD" },
    awayTeam: { name: raw.awayTeam?.name || "TBD" },
    score: {
      duration: raw.score.duration,
      fullTime: {
        home: raw.score.fullTime.home,
        away: raw.score.fullTime.away
      },
      halfTime: raw.score.halfTime
    },
    venue: raw.venue
  };
}

function mapStandings(rawStandings: any[]): GroupStanding[] {
  return rawStandings
    .filter(item => item.type === "TOTAL")
    .map(item => ({
      group: item.group || "Group",
      table: item.table.map((row: any) => ({
        position: row.position,
        team: { name: row.team.name },
        playedGames: row.playedGames,
        won: row.won,
        draw: row.draw,
        lost: row.lost,
        points: row.points,
        goalDifference: row.goalDifference,
        goalsFor: row.goalsFor,
        goalsAgainst: row.goalsAgainst
      }))
    }));
}

export async function fetchFixtures(): Promise<Match[]> {
  try {
    const res = await axios.get(`${API_URL}/competitions/WC/matches`);

    if (!res.data.matches) {
      return [];
    }
    console.log("Fetched fixtures:", res.data.matches.length, "matches");

    return res.data.matches
      .map(mapMatch)
      .filter((match: Match) => {
        const dateMs = new Date(match.utcDate).getTime();
        return dateMs >= WC_START_MS && dateMs < WC_END_MS;
      });
  } catch (err) {
    console.error("fetchFixtures failed:", err);
    throw err;
  }
}

export async function fetchStandings(): Promise<GroupStanding[]> {
  try {
    const res = await axios.get(`${API_URL}/competitions/WC/standings`);

    if (!res.data.standings) {
      return [];
    }

    console.log("Fetched standings for", res.data.standings.length, "groups");

    return mapStandings(res.data.standings);
  } catch (err) {
    console.error("fetchStandings failed:", err);
    throw err;
  }
}
