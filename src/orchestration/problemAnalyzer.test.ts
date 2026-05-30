import { analyzeProblems } from './problemAnalyzer';

// Test 1: Housing keywords
console.log('Test 1:', analyzeProblems('I need an apartment'));
// Expected: ['housing']

// Test 2: Multiple modules
console.log('Test 2:', analyzeProblems('I need housing and legal help'));
// Expected: ['housing', 'legal']

// Test 3: Empty input
console.log('Test 3:', analyzeProblems(''));
// Expected: []

// Test 4: No matches
console.log('Test 4:', analyzeProblems('random text'));
// Expected: []