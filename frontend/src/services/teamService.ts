import { teamOwners } from "../data/teamOwners";

export function normalizeTeamName(name: string): string {
  const map: Record<string, string> = {
    "USA": "United States",
    "United States": "United States",
    "United States of America": "United States",
    "South Korea": "South Korea",
    "Korea Republic": "South Korea",
    "Türkiye": "Turkey",
    "Turkey": "Turkey",
    "Côte d'Ivoire": "Ivory Coast",
    "Cape Verde": "Cape Verde Islands",
    "Cape Verde Islands": "Cape Verde Islands",
    "DR Congo": "Congo DR",
    "Congo DR": "Congo DR",
    "Curacao": "Curaçao",
    "Curaçao": "Curaçao",
    "Equador": "Ecuador",
    "Ecuador": "Ecuador",
    "Columbia": "Colombia",
    "Colombia": "Colombia",
    "Bosnia": "Bosnia-Herzegovina",
    "Bosnia & Herzegovina": "Bosnia-Herzegovina",
    "Bosnia-Herzegovina": "Bosnia-Herzegovina"
  };
  return map[name] || name;
}

export function getOwner(team: string): string {
  const normalized = normalizeTeamName(team);
  return teamOwners[normalized] || "Unassigned";
}

export function groupTeamsByOwner(): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  Object.entries(teamOwners).forEach(([team, owner]) => {
    if (!grouped[owner]) grouped[owner] = [];
    grouped[owner].push(team);
  });

  return grouped;
}
