import { useState } from 'react';
import { ProblemInput } from './components/ProblemInput';
import { ModuleSelector } from './components/ModuleSelector';
import { Wizard } from './components/Wizard';
import { Results } from './components/Results';
import { analyzeProblems } from './orchestration/problemAnalyzer';
import { getModules, getModulesByIds, registerModule } from './orchestration/moduleRegistry';
import { exampleModule } from './modules/exampleModule';
import type { ModuleResult } from './types';
import './App.css';

// Register example module
registerModule(exampleModule);

type Screen = 'problem-input' | 'module-selector' | 'wizard' | 'results';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('problem-input');
  const [recommendedModuleIds, setRecommendedModuleIds] = useState<string[]>([]);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [results, setResults] = useState<Array<{ moduleName: string; result: ModuleResult }>>([]);

  const handleProblemSubmit = (text: string) => {
    const recommended = analyzeProblems(text);
    setRecommendedModuleIds(recommended);
    setCurrentScreen('module-selector');
  };

  const handleModuleSelection = (moduleIds: string[]) => {
    setSelectedModuleIds(moduleIds);
    setCurrentScreen('wizard');
  };

  const handleWizardComplete = async (inputs: Record<string, Record<string, any>>) => {
    const selectedModules = getModulesByIds(selectedModuleIds);
    const executionResults: Array<{ moduleName: string; result: ModuleResult }> = [];

    for (const module of selectedModules) {
      try {
        const moduleInputs = inputs[module.id] || {};
        const result = await module.execute(moduleInputs);
        executionResults.push({
          moduleName: module.name,
          result
        });
      } catch (error) {
        executionResults.push({
          moduleName: module.name,
          result: {
            success: false,
            message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        });
      }
    }

    setResults(executionResults);
    setCurrentScreen('results');
  };

  const handleReset = () => {
    setRecommendedModuleIds([]);
    setSelectedModuleIds([]);
    setResults([]);
    setCurrentScreen('problem-input');
  };

  return (
    <div className="app">
      {currentScreen === 'problem-input' && (
        <ProblemInput onContinue={handleProblemSubmit} />
      )}

      {currentScreen === 'module-selector' && (
        <ModuleSelector
          recommendedModuleIds={recommendedModuleIds}
          allModules={getModules()}
          onContinue={handleModuleSelection}
        />
      )}

      {currentScreen === 'wizard' && (
        <Wizard
          modules={getModulesByIds(selectedModuleIds)}
          onComplete={handleWizardComplete}
        />
      )}

      {currentScreen === 'results' && (
        <Results
          results={results}
          onDone={handleReset}
        />
      )}
    </div>
  );
}

export default App;
