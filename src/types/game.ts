export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  playerName: string;
  difficulty: Difficulty;
  isAIFirst: boolean;
  scores: {
    [key: string]: number;
  };
}