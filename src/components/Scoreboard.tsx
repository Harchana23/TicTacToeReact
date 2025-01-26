import React from 'react';

interface ScoreboardProps {
  scores: {
    [key: string]: number;
  };
}

export function Scoreboard({ scores }: ScoreboardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Scoreboard</h2>
      <div className="space-y-2">
        {Object.entries(scores).map(([player, score]) => (
          <div key={player} className="flex justify-between">
            <span className="font-medium">{player}</span>
            <span className="text-indigo-600">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}