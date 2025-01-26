import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { Setup } from './components/Setup';
import { Scoreboard } from './components/Scoreboard';
import { DifficultySelector } from './components/DifficultySelector';
import { GameState, Player, Difficulty } from './types/game';
import { getAIMove } from './utils/ai';

const initialBoard = Array(9).fill(null);

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: [...initialBoard],
    currentPlayer: 'X',
    winner: null,
    playerName: '',
    difficulty: 'medium',
    isAIFirst: false,
    scores: {},
  });

  const [gameStarted, setGameStarted] = useState(false);

  const checkWinner = (board: (Player | null)[]): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
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
  };

  const handleCellClick = (index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = checkWinner(newBoard);
    
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: 'O',
      winner,
    }));
  };

  const handleStart = (name: string, difficulty: Difficulty, aiFirst: boolean) => {
    setGameState({
      board: [...initialBoard],
      currentPlayer: 'X',
      winner: null,
      playerName: name,
      difficulty,
      isAIFirst: aiFirst,
      scores: { [name]: 0, AI: 0 },
    });
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameState(prev => ({
      ...prev,
      board: [...initialBoard],
      currentPlayer: 'X',
      winner: null,
    }));
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty
    }));
  };

  useEffect(() => {
    if (gameStarted && gameState.isAIFirst && gameState.board.every(cell => cell === null)) {
      const aiMove = getAIMove(gameState.board, gameState.difficulty);
      const newBoard = [...gameState.board];
      newBoard[aiMove] = 'O';
      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: 'X',
      }));
    }
  }, [gameStarted, gameState.isAIFirst]);

  useEffect(() => {
    if (gameState.winner) {
      // Only update scores if there's a clear winner (not a draw)
      if (gameState.winner !== 'draw') {
        setGameState(prev => ({
          ...prev,
          scores: {
            ...prev.scores,
            [gameState.winner === 'X' ? prev.playerName : 'AI']: 
              prev.scores[gameState.winner === 'X' ? prev.playerName : 'AI'] + 1
          }
        }));
      }
      return;
    }

    if (gameState.currentPlayer === 'O' && !gameState.winner) {
      setTimeout(() => {
        const aiMove = getAIMove(gameState.board, gameState.difficulty);
        const newBoard = [...gameState.board];
        newBoard[aiMove] = 'O';
        const winner = checkWinner(newBoard);
        
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: 'X',
          winner,
        }));
      }, 500);
    }
  }, [gameState.currentPlayer, gameState.winner]);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Setup onStart={handleStart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
          <p className="text-gray-600">
            {gameState.winner
              ? gameState.winner === 'draw'
                ? "It's a draw!"
                : `${gameState.winner === 'X' ? gameState.playerName : 'AI'} wins!`
              : `Current player: ${gameState.currentPlayer === 'X' ? gameState.playerName : 'AI'}`}
          </p>
        </div>

        <Board board={gameState.board} onCellClick={handleCellClick} />

        <div className="space-y-4">
          <Scoreboard scores={gameState.scores} />
          <DifficultySelector 
            difficulty={gameState.difficulty} 
            onDifficultyChange={handleDifficultyChange}
          />
          <button
            onClick={handleReset}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;