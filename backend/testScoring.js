import { computeAllUserScores } from "./services/scoringService.js";

const results = computeAllUserScores();

// Show top silent architects
const silentArchitects = results
  .filter(u => u.silent_architect)
  .slice(0, 10);

console.log("🔥 Silent Architects (sample):");
console.table(silentArchitects);
