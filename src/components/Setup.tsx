import React from 'react';
import { Difficulty } from '../types/game';

interface SetupProps {
  onStart: (name: string, difficulty: Difficulty, aiFirst: boolean) => void;
}

export function Setup({ onStart }: SetupProps) {
  const [name, setName] = React.useState('');
  const [difficulty, setDifficulty] = React.useState<Difficulty>('medium');
  const [aiFirst, setAIFirst] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name, difficulty, aiFirst);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-72">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Player Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
          Difficulty
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={aiFirst}
            onChange={(e) => setAIFirst(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-700">Let AI go first</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Start Game
      </button>
    </form>
  );
}