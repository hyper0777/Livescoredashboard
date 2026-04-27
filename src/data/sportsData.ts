export type Sport = 'all' | 'football' | 'basketball' | 'soccer' | 'baseball' | 'tennis';
export type MatchStatus = 'live' | 'halftime' | 'final' | 'upcoming';

export interface LiveMatch {
  id: number;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  time: string;
  status: MatchStatus;
  homeColor: string;
  awayColor: string;
  homeAbbr: string;
  awayAbbr: string;
}

export interface UpcomingMatch {
  id: number;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  scheduledTime: string;
  homeAbbr: string;
  awayAbbr: string;
}

export interface Scorer {
  id: number;
  name: string;
  team: string;
  goals: number;
  league: string;
  sport: Sport;
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
  league: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  sport: Sport;
  league: string;
}

// Live Matches
export const liveMatches: LiveMatch[] = [
  {
    id: 1,
    sport: 'football',
    league: 'NFL',
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'Buffalo Bills',
    homeScore: 24,
    awayScore: 19,
    time: '3:45',
    status: 'live',
    homeColor: '#E31837',
    awayColor: '#00338D',
    homeAbbr: 'KC',
    awayAbbr: 'BUF',
  },
  {
    id: 2,
    sport: 'football',
    league: 'NFL',
    homeTeam: 'Dallas Cowboys',
    awayTeam: 'Philadelphia Eagles',
    homeScore: 21,
    awayScore: 28,
    time: '4:15',
    status: 'live',
    homeColor: '#003594',
    awayColor: '#004687',
    homeAbbr: 'DAL',
    awayAbbr: 'PHI',
  },
  {
    id: 3,
    sport: 'football',
    league: 'NFL',
    homeTeam: 'San Francisco 49ers',
    awayTeam: 'Green Bay Packers',
    homeScore: 17,
    awayScore: 14,
    time: '2:30',
    status: 'live',
    homeColor: '#AA0000',
    awayColor: '#203731',
    homeAbbr: 'SF',
    awayAbbr: 'GB',
  },
  {
    id: 4,
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Boston Celtics',
    homeScore: 98,
    awayScore: 105,
    time: 'Q4 3:22',
    status: 'live',
    homeColor: '#552583',
    awayColor: '#007A33',
    homeAbbr: 'LAL',
    awayAbbr: 'BOS',
  },
  {
    id: 5,
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Miami Heat',
    awayTeam: 'Golden State Warriors',
    homeScore: 89,
    awayScore: 92,
    time: 'Q4 1:45',
    status: 'live',
    homeColor: '#98002E',
    awayColor: '#1D428A',
    homeAbbr: 'MIA',
    awayAbbr: 'GSW',
  },
  {
    id: 6,
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Denver Nuggets',
    awayTeam: 'Phoenix Suns',
    homeScore: 112,
    awayScore: 108,
    time: 'Q3 8:15',
    status: 'live',
    homeColor: '#0E2240',
    awayColor: '#1D1160',
    homeAbbr: 'DEN',
    awayAbbr: 'PHX',
  },
  {
    id: 7,
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Los Angeles Clippers',
    awayTeam: 'New York Knicks',
    homeScore: 105,
    awayScore: 102,
    time: 'HT',
    status: 'halftime',
    homeColor: '#C60C30',
    awayColor: '#0851BA',
    homeAbbr: 'LAC',
    awayAbbr: 'NYK',
  },
  {
    id: 8,
    sport: 'soccer',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 2,
    time: '67',
    status: 'live',
    homeColor: '#6CABDE',
    awayColor: '#EF0107',
    homeAbbr: 'MCI',
    awayAbbr: 'ARS',
  },
  {
    id: 9,
    sport: 'soccer',
    league: 'Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    homeScore: 1,
    awayScore: 1,
    time: '45',
    status: 'halftime',
    homeColor: '#C8102E',
    awayColor: '#0051BA',
    homeAbbr: 'LIV',
    awayAbbr: 'CHE',
  },
  {
    id: 10,
    sport: 'baseball',
    league: 'MLB',
    homeTeam: 'New York Yankees',
    awayTeam: 'Boston Red Sox',
    homeScore: 5,
    awayScore: 3,
    time: 'Top 6',
    status: 'live',
    homeColor: '#0C2C56',
    awayColor: '#BD3039',
    homeAbbr: 'NYY',
    awayAbbr: 'BOS',
  },
  {
    id: 11,
    sport: 'baseball',
    league: 'MLB',
    homeTeam: 'Los Angeles Dodgers',
    awayTeam: 'San Francisco Giants',
    homeScore: 4,
    awayScore: 2,
    time: 'Final',
    status: 'final',
    homeColor: '#005A9C',
    awayColor: '#FD5000',
    homeAbbr: 'LAD',
    awayAbbr: 'SF',
  },
  {
    id: 12,
    sport: 'tennis',
    league: 'ATP Tour',
    homeTeam: 'Novak Djokovic',
    awayTeam: 'Carlos Alcaraz',
    homeScore: 1,
    awayScore: 2,
    time: '4-6, 6-3, 4-2',
    status: 'live',
    homeColor: '#001F3F',
    awayColor: '#FF4136',
    homeAbbr: 'NVK',
    awayAbbr: 'CAR',
  },
];

// Upcoming Matches
export const upcomingMatches: UpcomingMatch[] = [
  {
    id: 101,
    sport: 'football',
    league: 'NFL',
    homeTeam: 'Tampa Bay Buccaneers',
    awayTeam: 'Los Angeles Rams',
    scheduledTime: 'Today, 8:20 PM',
    homeAbbr: 'TB',
    awayAbbr: 'LAR',
  },
  {
    id: 102,
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Milwaukee Bucks',
    awayTeam: 'Chicago Bulls',
    scheduledTime: 'Tomorrow, 7:00 PM',
    homeAbbr: 'MIL',
    awayAbbr: 'CHI',
  },
  {
    id: 103,
    sport: 'soccer',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    scheduledTime: 'Mar 28, 3:00 PM',
    homeAbbr: 'RMA',
    awayAbbr: 'FCB',
  },
  {
    id: 104,
    sport: 'baseball',
    league: 'MLB',
    homeTeam: 'Houston Astros',
    awayTeam: 'Texas Rangers',
    scheduledTime: 'Mar 29, 2:00 PM',
    homeAbbr: 'HOU',
    awayAbbr: 'TEX',
  },
  {
    id: 105,
    sport: 'tennis',
    league: 'ATP Tour',
    homeTeam: 'Rafael Nadal',
    awayTeam: 'Jannik Sinner',
    scheduledTime: 'Mar 30, 10:00 AM',
    homeAbbr: 'RN',
    awayAbbr: 'JS',
  },
];

// Top Scorers
export const topScorers: Scorer[] = [
  {
    id: 1,
    name: 'Erling Haaland',
    team: 'Manchester City',
    goals: 28,
    league: 'Premier League',
    sport: 'soccer',
  },
  {
    id: 2,
    name: 'Harry Kane',
    team: 'Bayern Munich',
    goals: 24,
    league: 'Bundesliga',
    sport: 'soccer',
  },
  {
    id: 3,
    name: 'Luka Benzema',
    team: 'Real Madrid',
    goals: 22,
    league: 'La Liga',
    sport: 'soccer',
  },
  {
    id: 4,
    name: 'Lautaro Martínez',
    team: 'Inter Milan',
    goals: 20,
    league: 'Serie A',
    sport: 'soccer',
  },
  {
    id: 5,
    name: 'Kylian Mbappé',
    team: 'Paris Saint-Germain',
    goals: 19,
    league: 'Ligue 1',
    sport: 'soccer',
  },
];

// Standings
export const standings: Standing[] = [
  {
    position: 1,
    team: 'Arsenal',
    played: 28,
    won: 21,
    drawn: 4,
    lost: 3,
    goalsFor: 68,
    goalsAgainst: 24,
    goalDifference: 44,
    points: 67,
    league: 'Premier League',
  },
  {
    position: 2,
    team: 'Manchester City',
    played: 28,
    won: 20,
    drawn: 5,
    lost: 3,
    goalsFor: 72,
    goalsAgainst: 28,
    goalDifference: 44,
    points: 65,
    league: 'Premier League',
  },
  {
    position: 3,
    team: 'Liverpool',
    played: 28,
    won: 19,
    drawn: 6,
    lost: 3,
    goalsFor: 65,
    goalsAgainst: 30,
    goalDifference: 35,
    points: 63,
    league: 'Premier League',
  },
  {
    position: 4,
    team: 'Newcastle',
    played: 28,
    won: 16,
    drawn: 8,
    lost: 4,
    goalsFor: 52,
    goalsAgainst: 28,
    goalDifference: 24,
    points: 56,
    league: 'Premier League',
  },
  {
    position: 5,
    team: 'Manchester United',
    played: 28,
    won: 16,
    drawn: 5,
    lost: 7,
    goalsFor: 45,
    goalsAgainst: 35,
    goalDifference: 10,
    points: 53,
    league: 'Premier League',
  },
];

// News Articles
export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Champions League Final: Historic Showdown Ahead',
    excerpt:
      'Two of Europe\'s biggest clubs set to clash in one of the most anticipated finals of the decade.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69a9d92741a5bbac0cda4aca_1772738952946_74c79b62.png',
    date: 'Mar 24, 2024',
    sport: 'soccer',
    league: 'Champions League',
  },
  {
    id: 2,
    title: 'NBA Playoffs: Race to the Finals Intensifies',
    excerpt: 'Teams battle for supremacy as the regular season reaches its climax.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69a9d92741a5bbac0cda4aca_1772738952946_74c79b62.png',
    date: 'Mar 23, 2024',
    sport: 'basketball',
    league: 'NBA',
  },
  {
    id: 3,
    title: 'Super Bowl LVIII: MVP Delivers Unforgettable Performance',
    excerpt: 'One player\'s exceptional display guides their team to the championship.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69a9d92741a5bbac0cda4aca_1772738952946_74c79b62.png',
    date: 'Mar 22, 2024',
    sport: 'football',
    league: 'NFL',
  },
  {
    id: 4,
    title: 'Tennis Grand Slam: Unseeded Player Makes Stunning Run',
    excerpt: 'Underdog reaches the semifinals in a shocking upset.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69a9d92741a5bbac0cda4aca_1772738952946_74c79b62.png',
    date: 'Mar 21, 2024',
    sport: 'tennis',
    league: 'ATP Tour',
  },
  {
    id: 5,
    title: 'Baseball Spring Training: Teams Prepare for New Season',
    excerpt: 'Players gear up for what promises to be an exciting season.',
    image: 'https://d64gsuwffb70l.cloudfront.net/69a9d92741a5bbac0cda4aca_1772738952946_74c79b62.png',
    date: 'Mar 20, 2024',
    sport: 'baseball',
    league: 'MLB',
  },
];
