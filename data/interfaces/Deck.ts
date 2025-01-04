export interface Deck {
  id: string;
  title: string;
  questionIds: string[];
  leaderboard: LeaderboardItem[];
  timer?: number;
  creatorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LeaderboardItem {
  userId: string; // references the users collection
  xp: number; // the total xp the user has earned in this deck
  score?: number; // optional: e.g. user’s best score or % in this deck
}
