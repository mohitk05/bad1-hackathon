// src/orchestration/wizardController.ts

import type { Module } from '../types';

export interface WizardState {
  currentStep: number;
  modules: Module[];
  inputs: Record<string, Record<string, any>>;
}

export function createWizardState(modules: Module[]): WizardState {
  return {
    currentStep: 0,
    modules,
    inputs: {}
  };
}

export function canAdvance(state: WizardState): boolean {
  if (state.currentStep >= state.modules.length) {
    return false;
  }

  const currentModule = state.modules[state.currentStep];
  const currentInputs = state.inputs[currentModule.id] || {};

  // Check all required fields are filled
  return currentModule.requiredInputs
    .filter(field => field.required)
    .every(field => {
      const value = currentInputs[field.id];
      return value !== undefined && value !== null && value !== '';
    });
}

export function isLastStep(state: WizardState): boolean {
  return state.currentStep === state.modules.length - 1;
}

export function isComplete(state: WizardState): boolean {
  return state.currentStep >= state.modules.length;
}