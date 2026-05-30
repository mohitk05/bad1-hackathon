// src/modules/exampleModule.ts

import type { Module, ModuleResult } from '../types';

export const exampleModule: Module = {
  id: 'example',
  name: 'Example Service',
  description: 'Example module for testing the orchestration layer',
  keywords: ['example', 'test', 'demo'],
  requiredInputs: [
    {
      id: 'name',
      label: 'Your Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., John Doe'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'text',
      required: true,
      placeholder: 'your@email.com'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      type: 'select',
      required: false,
      options: ['Option A', 'Option B', 'Option C']
    }
  ],
  execute: async (inputs: Record<string, any>): Promise<ModuleResult> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      message: `Hello ${inputs.name}! We've processed your request.`,
      details: {
        email: inputs.email,
        preferences: inputs.preferences || 'Not specified'
      }
    };
  }
};