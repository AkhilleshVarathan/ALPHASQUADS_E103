import fs from "fs";
import path from "path";

/* ================= LOAD DATABASE ================= */

const dbPath = path.resolve("data/synthetic_db.json");
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

/* ================= CORE SCORING ================= */

/**
 * Activity score:
 * - Derived ONLY from coordination signals
 * - Uses duration as proxy for coordination load
 */
function computeActivityScore(userId) {
  const signals = db.coordinationSignals.filter(
    s => s.user_id === userId
  );

  if (signals.length === 0) return 0;

  const totalMinutes = signals.reduce(
    (sum, s) => sum + s.duration_minutes,
    0
  );

  return totalMinutes;
}

/**
 * Impact score:
 * - Derived ONLY from execution signals
 * - Complexity × Impact captures real contribution
 */
function computeImpactScore(userId) {
  const signals = db.executionSignals.filter(
    s => s.user_id === userId
  );

  if (signals.length === 0) return 0;

  const score = signals.reduce(
    (sum, s) => sum + s.complexity * s.impact,
    0
  );

  return score;
}

/**
 * Normalize scores to 0–100 range
 */
function normalizeScores(values) {
  const max = Math.max(...values, 1);
  return values.map(v => Math.round((v / max) * 100));
}

/* ================= MAIN PIPELINE ================= */

export function computeAllUserScores() {
  const rawScores = db.users
    .filter(u => u.role === "member")
    .map(user => ({
      user_id: user.id,
      name: user.name,
      raw_activity: computeActivityScore(user.id),
      raw_impact: computeImpactScore(user.id)
    }));

  const activityNorm = normalizeScores(
    rawScores.map(u => u.raw_activity)
  );

  const impactNorm = normalizeScores(
    rawScores.map(u => u.raw_impact)
  );

  const finalScores = rawScores.map((u, idx) => {
    const activity_score = activityNorm[idx];
    const impact_score = impactNorm[idx];

    return {
      user_id: u.user_id,
      name: u.name,
      activity_score,
      impact_score,
      silent_architect:
        impact_score >= 75 && activity_score <= 30
    };
  });

  return finalScores;
}
