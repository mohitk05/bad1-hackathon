// src/orchestration/moduleRegistry.ts

import type { Module } from '../types';

const modules: Module[] = [];

export function registerModule(module: Module): void {
  if (modules.some(m => m.id === module.id)) {
    console.warn(`Module with id "${module.id}" is already registered`);
    return;
  }
  modules.push(module);
}

export function getModules(): Module[] {
  return [...modules];
}

export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

export function getModulesByIds(ids: string[]): Module[] {
  return ids
    .map(id => getModuleById(id))
    .filter((m): m is Module => m !== undefined);
}