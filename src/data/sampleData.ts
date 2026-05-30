import { GroupStanding, Match } from "../types";

export const sampleFixtures: Match[] = [
  {
    id: 1,
    stage: "GROUP_STAGE",
    group: "Group A",
    utcDate: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    status: "SCHEDULED",
    homeTeam: { name: "USA" },
    awayTeam: { name: "Wales" },
    score: { fullTime: { home: null, away: null } }
  },
  {
    id: 2,
    stage: "GROUP_STAGE",
    group: "Group B",
    utcDate: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    status: "SCHEDULED",
    homeTeam: { name: "Argentina" },
    awayTeam: { name: "Cape Verde" },
    score: { fullTime: { home: null, away: null } }
  },
  {
    id: 3,
    stage: "GROUP_STAGE",
    group: "Group A",
    utcDate: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    status: "FINISHED",
    homeTeam: { name: "Spain" },
    awayTeam: { name: "Japan" },
    score: { fullTime: { home: 2, away: 1 } },
    events: [
      { minute: 12, player: { name: "Rodri" }, team: "Spain", type: "goal" },
      { minute: 55, player: { name: "Oliver Torres" }, team: "Spain", type: "goal" },
      { minute: 80, player: { name: "Ritsu Doan" }, team: "Japan", type: "goal" }
    ]
  },
  {
    id: 4,
    stage: "QUARTER_FINALS",
    utcDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    status: "SCHEDULED",
    homeTeam: { name: "France" },
    awayTeam: { name: "Portugal" },
    score: { fullTime: { home: null, away: null } }
  },
  {
    id: 5,
    stage: "FINAL",
    utcDate: new Date(Date.now() + 1000 * 60 * 60 * 200).toISOString(),
    status: "SCHEDULED",
    homeTeam: { name: "Brazil" },
    awayTeam: { name: "Germany" },
    score: { fullTime: { home: null, away: null } }
  },
  {
    id: 6,
    stage: "GROUP_STAGE",
    group: "Group C",
    utcDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "FINISHED",
    homeTeam: { name: "England" },
    awayTeam: { name: "Croatia" },
    score: { fullTime: { home: 1, away: 1 } },
    events: [
      { minute: 28, player: { name: "Harry Kane" }, team: "England", type: "goal" },
      { minute: 78, player: { name: "Luka Modric" }, team: "Croatia", type: "goal" }
    ]
  },
  {
    id: 7,
    stage: "LIVE",
    group: "Group D",
    utcDate: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    status: "LIVE",
    homeTeam: { name: "Brazil" },
    awayTeam: { name: "Argentina" },
    score: { fullTime: { home: 1, away: 2 } },
    events: [
      { minute: 10, player: { name: "Neymar" }, team: "Brazil", type: "goal" },
      { minute: 22, player: { name: "Lionel Messi" }, team: "Argentina", type: "goal" },
      { minute: 35, player: { name: "Julián Álvarez" }, team: "Argentina", type: "goal" }
    ]
  }
];

export const sampleStandings: GroupStanding[] = [
  {
    group: "Group A",
    table: [
      { team: { name: "Spain" }, playedGames: 1, won: 1, draw: 0, lost: 0, points: 3, goalDifference: 1 },
      { team: { name: "USA" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 },
      { team: { name: "Japan" }, playedGames: 1, won: 0, draw: 0, lost: 1, points: 0, goalDifference: -1 },
      { team: { name: "Wales" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 }
    ]
  },
  {
    group: "Group B",
    table: [
      { team: { name: "Argentina" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 },
      { team: { name: "Cape Verde" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 },
      { team: { name: "Belgium" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 },
      { team: { name: "Qatar" }, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalDifference: 0 }
    ]
  }
];
