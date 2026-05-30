// src/components/ModuleSelector.tsx

import { useState } from 'react';
import type { Module } from '../types';

interface ModuleSelectorProps {
  recommendedModuleIds: string[];
  allModules: Module[];
  onContinue: (selectedModuleIds: string[]) => void;
}

export function ModuleSelector({
  recommendedModuleIds,
  allModules,
  onContinue
}: ModuleSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(recommendedModuleIds);

  const toggleModule = (moduleId: string) => {
    setSelectedIds(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const isSelected = (moduleId: string) => selectedIds.includes(moduleId);

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>FounderHub Berlin</h1>
      </div>
      <div className="screen-content">
        <h2>Based on your needs, we recommend:</h2>
        <div className="module-list">
          {allModules.map(module => {
            const selected = isSelected(module.id);

            return (
              <div
                key={module.id}
                className={`module-card ${selected ? 'selected' : ''}`}
                onClick={() => toggleModule(module.id)}
              >
                <div className="module-card-content">
                  <strong>{selected ? '✓ ' : ''}{module.name}</strong>
                  <span className="module-description"> - {module.description}</span>
                </div>
                {!selected && (
                  <span className="add-button">+ Add</span>
                )}
              </div>
            );
          })}
        </div>
        <button
          className="primary-button"
          onClick={() => onContinue(selectedIds)}
          disabled={selectedIds.length === 0}
        >
          Continue with selected modules →
        </button>
      </div>
    </div>
  );
}