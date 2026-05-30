// src/components/Results.tsx

import type { ModuleResult } from '../types';

interface ResultsProps {
  results: Array<{
    moduleName: string;
    result: ModuleResult;
  }>;
  onDone: () => void;
}

export function Results({ results, onDone }: ResultsProps) {
  const allSuccess = results.every(r => r.result.success);

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>FounderHub Berlin</h1>
      </div>
      <div className="screen-content">
        <h2 className={allSuccess ? 'success-header' : 'error-header'}>
          {allSuccess ? '✓ All set! Here\'s what we did:' : 'Results'}
        </h2>

        <div className="results-list">
          {results.map((item, index) => (
            <div
              key={index}
              className={`result-card ${item.result.success ? 'success' : 'error'}`}
            >
              <div className="result-header">
                <strong>{item.moduleName}</strong>
              </div>
              <div className="result-message">
                {item.result.message}
              </div>
              {item.result.details && (
                <details className="result-details">
                  <summary>View Details</summary>
                  <pre>{JSON.stringify(item.result.details, null, 2)}</pre>
                </details>
              )}
            </div>
          ))}
        </div>

        <button className="primary-button" onClick={onDone}>
          Done
        </button>
      </div>
    </div>
  );
}