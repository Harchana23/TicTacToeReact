import { Board, Cell, Difficulty, Player } from '../types/game';

function getEmptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

function checkWinner(board: Board): Player | 'draw' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null;
}

function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'draw') return 0;

  const emptyCells = getEmptyCells(board);
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of emptyCells) {
      board[move] = 'O';
      bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
      board[move] = null;
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of emptyCells) {
      board[move] = 'X';
      bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
      board[move] = null;
    }
    return bestScore;
  }
}

export function getAIMove(board: Board, difficulty: Difficulty): number {
  const emptyCells = getEmptyCells(board);
  
  if (difficulty === 'easy') {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  if (difficulty === 'medium') {
    return Math.random() > 0.5 
      ? getBestMove(board)
      : emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  return getBestMove(board);
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = 0;
  const emptyCells = getEmptyCells(board);

  for (const move of emptyCells) {
    board[move] = 'O';
    const score = minimax(board, 0, false);
    board[move] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}