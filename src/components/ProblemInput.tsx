// src/components/ProblemInput.tsx

import { useState } from 'react';

interface ProblemInputProps {
  onContinue: (problemText: string) => void;
}

export function ProblemInput({ onContinue }: ProblemInputProps) {
  const [problemText, setProblemText] = useState('');

  const handleSubmit = () => {
    onContinue(problemText);
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>FounderHub Berlin</h1>
      </div>
      <div className="screen-content">
        <h2>What do you need help with?</h2>
        <p className="subtitle">
          Tell us about your situation and we'll connect you with the right services
        </p>
        <textarea
          className="problem-input"
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="e.g., I just arrived in Berlin to start my company. I need a place to stay and help with legal setup..."
          rows={6}
        />
        <button className="primary-button" onClick={handleSubmit}>
          Continue →
        </button>
      </div>
    </div>
  );
}