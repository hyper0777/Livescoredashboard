export interface Match {
  id: string;
  sport: 'football' | 'basketball' | 'cricket';
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'finished' | 'upcoming';
  time: string;
  league: string;
  minute?: string;
}

export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export const footballMatches: Match[] = [
  {
    id: 'f1',
    sport: 'football',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 2,
    status: 'live',
    time: '15:00',
    league: 'Premier League',
    minute: "78'"
  },
  {
    id: 'f2',
    sport: 'football',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 3,
    awayScore: 1,
    status: 'live',
    time: '15:00',
    league: 'Premier League',
    minute: "65'"
  },
  {
    id: 'f3',
    sport: 'football',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    time: '20:00',
    league: 'La Liga'
  },
  {
    id: 'f4',
    sport: 'football',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    time: '18:30',
    league: 'Bundesliga'
  },
  {
    id: 'f5',
    sport: 'football',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeScore: 1,
    awayScore: 0,
    status: 'live',
    time: '17:00',
    league: 'Ligue 1',
    minute: "42'"
  }
];

export const basketballMatches: Match[] = [
  {
    id: 'b1',
    sport: 'basketball',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeScore: 98,
    awayScore: 92,
    status: 'live',
    time: '19:00',
    league: 'NBA',
    minute: 'Q3 5:23'
  },
  {
    id: 'b2',
    sport: 'basketball',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeScore: 110,
    awayScore: 105,
    status: 'finished',
    time: '19:30',
    league: 'NBA'
  },
  {
    id: 'b3',
    sport: 'basketball',
    homeTeam: 'Bucks',
    awayTeam: 'Nets',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    time: '20:00',
    league: 'NBA'
  }
];

export const cricketMatches: Match[] = [
  {
    id: 'c1',
    sport: 'cricket',
    homeTeam: 'India',
    awayTeam: 'Australia',
    homeScore: 287,
    awayScore: 145,
    status: 'live',
    time: '09:00',
    league: 'Test Series',
    minute: 'Day 2'
  },
  {
    id: 'c2',
    sport: 'cricket',
    homeTeam: 'England',
    awayTeam: 'New Zealand',
    homeScore: 320,
    awayScore: 298,
    status: 'finished',
    time: '10:30',
    league: 'ODI Series'
  },
  {
    id: 'c3',
    sport: 'cricket',
    homeTeam: 'Pakistan',
    awayTeam: 'South Africa',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    time: '14:00',
    league: 'T20 Series'
  }
];

export const premierLeagueStandings: Standing[] = [
  { position: 1, team: 'Arsenal', played: 28, won: 21, drawn: 4, lost: 3, goalsFor: 68, goalsAgainst: 24, goalDifference: 44, points: 67 },
  { position: 2, team: 'Manchester City', played: 28, won: 20, drawn: 5, lost: 3, goalsFor: 72, goalsAgainst: 28, goalDifference: 44, points: 65 },
  { position: 3, team: 'Liverpool', played: 28, won: 19, drawn: 6, lost: 3, goalsFor: 65, goalsAgainst: 30, goalDifference: 35, points: 63 },
  { position: 4, team: 'Newcastle', played: 28, won: 16, drawn: 8, lost: 4, goalsFor: 52, goalsAgainst: 28, goalDifference: 24, points: 56 },
  { position: 5, team: 'Manchester United', played: 28, won: 16, drawn: 5, lost: 7, goalsFor: 45, goalsAgainst: 35, goalDifference: 10, points: 53 },
  { position: 6, team: 'Tottenham', played: 28, won: 15, drawn: 6, lost: 7, goalsFor: 54, goalsAgainst: 42, goalDifference: 12, points: 51 },
  { position: 7, team: 'Chelsea', played: 28, won: 13, drawn: 7, lost: 8, goalsFor: 42, goalsAgainst: 35, goalDifference: 7, points: 46 },
  { position: 8, team: 'Brighton', played: 28, won: 12, drawn: 8, lost: 8, goalsFor: 48, goalsAgainst: 38, goalDifference: 10, points: 44 },
];
