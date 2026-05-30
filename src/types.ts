// src/types.ts

export interface InputField {
  id: string;
  label: string;
  type: 'text' | 'file' | 'select' | 'date';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ModuleResult {
  success: boolean;
  message: string;
  details?: any;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  requiredInputs: InputField[];
  execute(inputs: Record<string, any>): Promise<ModuleResult>;
}

export interface WizardStep {
  moduleId: string;
  moduleName: string;
  inputs: Record<string, any>;
}