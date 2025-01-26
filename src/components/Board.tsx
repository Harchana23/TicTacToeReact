import React from 'react';
import { Cell } from '../types/game';

interface BoardProps {
  board: Cell[];
  onCellClick: (index: number) => void;
}

export function Board({ board, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-72">
      {board.map((cell, index) => (
        <button
          key={index}
          className="h-24 bg-white border-2 border-gray-300 rounded-lg text-4xl font-bold hover:bg-gray-100 transition-colors"
          onClick={() => onCellClick(index)}
          disabled={cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}