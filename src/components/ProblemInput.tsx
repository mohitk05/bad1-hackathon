// src/components/ProblemInput.tsx

import { useState } from 'react';

interface ProblemInputProps {
  onContinue: (problemText: string) => void;
}

const suggestedPrompts = [
  {
    title: "Housing & Legal Setup",
    text: "I just moved to Berlin to start my company. I need an apartment and help with legal entity registration."
  },
  {
    title: "Banking & Visa",
    text: "I need to open a business bank account and apply for a work permit for my startup."
  }
];

export function ProblemInput({ onContinue }: ProblemInputProps) {
  const [problemText, setProblemText] = useState('');

  const handleSubmit = () => {
    onContinue(problemText);
  };

  const handleSuggestedClick = (text: string) => {
    setProblemText(text);
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>GRÜNDERBOX / <span>PLATFORM</span></h1>
      </div>
      <div className="screen-content">
        <h2>What do you need help with?</h2>
        <p className="subtitle">
          Tell us about your situation and we'll connect you with the right services
        </p>

        <div className="prompt-grid">
          {suggestedPrompts.map((prompt, index) => (
            <div
              key={index}
              className="prompt-tile suggested"
              onClick={() => handleSuggestedClick(prompt.text)}
            >
              <div className="prompt-tile-title">{prompt.title}</div>
              <div className="prompt-tile-text">{prompt.text}</div>
            </div>
          ))}

          <div className="prompt-tile input-tile" onClick={(e) => e.stopPropagation()}>
            <div className="prompt-tile-title">Custom Request</div>
            <textarea
              className="tile-input"
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Describe your situation..."
              rows={4}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <button
          className="primary-button"
          onClick={handleSubmit}
          disabled={!problemText.trim()}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}