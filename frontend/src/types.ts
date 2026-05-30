export interface Team {
  name: string;
}

export interface Match {
  id: number;
  stage: string;
  group?: string;
  utcDate: string;
  status: string;
  matchday?: number;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    duration?: string;
    fullTime: { home: number | null; away: number | null };
    halfTime?: { home: number | null; away: number | null };
  };
  venue?: string;
}

export interface TeamStanding {
  team: Team;
  position?: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalDifference: number;
  goalsFor?: number;
  goalsAgainst?: number;
}

export interface GroupStanding {
  group: string;
  table: TeamStanding[];
}
