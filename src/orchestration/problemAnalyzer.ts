// src/orchestration/problemAnalyzer.ts

const keywordMap: Record<string, string[]> = {
  housing: ['apartment', 'housing', 'place to stay', 'flat', 'room', 'anmeldung'],
  legal: ['legal', 'company registration', 'lawyer', 'contract', 'compliance', 'entity'],
  banking: ['bank', 'account', 'tax', 'accounting', 'finance'],
  visa: ['visa', 'permit', 'immigration', 'work permit', 'residence'],
  networking: ['networking', 'events', 'mentorship', 'investors', 'community']
};

export function analyzeProblems(userText: string): string[] {
  if (!userText || userText.trim().length === 0) {
    return [];
  }

  const lowerText = userText.toLowerCase();
  const matches: string[] = [];

  for (const [moduleId, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      matches.push(moduleId);
    }
  }

  return matches;
}