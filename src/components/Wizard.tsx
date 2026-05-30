// src/components/Wizard.tsx

import { useState } from 'react';
import type { Module } from '../types';
import {
  createWizardState,
  canAdvance,
  isLastStep
} from '../orchestration/wizardController';
import type { WizardState } from '../orchestration/wizardController';

interface WizardProps {
  modules: Module[];
  onComplete: (inputs: Record<string, Record<string, any>>) => void;
}

export function Wizard({ modules, onComplete }: WizardProps) {
  const [wizardState, setWizardState] = useState<WizardState>(
    () => createWizardState(modules)
  );

  const currentModule = wizardState.modules[wizardState.currentStep];
  const currentInputs = wizardState.inputs[currentModule?.id] || {};

  const updateInput = (fieldId: string, value: any) => {
    setWizardState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [currentModule.id]: {
          ...prev.inputs[currentModule.id],
          [fieldId]: value
        }
      }
    }));
  };

  const handleNext = () => {
    if (!canAdvance(wizardState)) return;

    if (isLastStep(wizardState)) {
      onComplete(wizardState.inputs);
    } else {
      setWizardState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const progress = ((wizardState.currentStep + 1) / wizardState.modules.length) * 100;

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>GRÜNDERBOX / <span>PLATFORM</span></h1>
      </div>
      <div className="screen-content">
        <div className="wizard-progress">
          <div className="progress-text">
            Step {wizardState.currentStep + 1} of {wizardState.modules.length}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2>{currentModule.name} Information</h2>

        <div className="form-fields">
          {currentModule.requiredInputs.map(field => (
            <div key={field.id} className="form-field">
              <label>
                {field.label}
                {field.required && <span className="required"> *</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={currentInputs[field.id] || ''}
                  onChange={(e) => updateInput(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="text-input"
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  value={currentInputs[field.id] || ''}
                  onChange={(e) => updateInput(field.id, e.target.value)}
                  className="text-input"
                />
              )}

              {field.type === 'select' && (
                <select
                  value={currentInputs[field.id] || ''}
                  onChange={(e) => updateInput(field.id, e.target.value)}
                  className="text-input"
                >
                  <option value="">Select...</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'file' && (
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    updateInput(field.id, file);
                  }}
                  className="file-input"
                />
              )}
            </div>
          ))}
        </div>

        <button
          className="primary-button"
          onClick={handleNext}
          disabled={!canAdvance(wizardState)}
        >
          {isLastStep(wizardState) ? 'Submit' : `Next: ${wizardState.modules[wizardState.currentStep + 1]?.name} →`}
        </button>
      </div>
    </div>
  );
}