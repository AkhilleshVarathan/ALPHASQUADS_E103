import fs from "fs";

/* ================= CONFIG ================= */
const NUM_USERS = 800;          // ← your requirement
const NUM_PROJECTS = 10;

const EXECUTION_TYPES = [
  "commit",
  "bug_fix",
  "feature",
  "refactor",
  "review"
];

const COORDINATION_TYPES = [
  "meeting",
  "message"
];

/* ================= DB OBJECT ================= */
const db = {
  users: [],
  projects: [],
  executionSignals: [],
  coordinationSignals: []
};

/* ================= PROJECTS ================= */
for (let i = 1; i <= NUM_PROJECTS; i++) {
  db.projects.push({
    id: i,
    name: `Project_${i}`
  });
}

/* ================= USERS ================= */
for (let i = 1; i <= NUM_USERS; i++) {
  db.users.push({
    id: i,
    name: `User_${i}`,
    role: i % 25 === 0 ? "manager" : "member"
  });
}

/* ================= EXECUTION SIGNALS ================= */
let execId = 1;

db.users.forEach(user => {
  // fewer exec signals for noisy users, more for silent workers
  const numExec =
    Math.random() < 0.3
      ? randomInt(15, 25)   // high-impact contributors
      : randomInt(5, 12);

  for (let i = 0; i < numExec; i++) {
    db.executionSignals.push({
      id: execId++,
      user_id: user.id,
      project_id: randomInt(1, NUM_PROJECTS),
      type: randomPick(EXECUTION_TYPES),
      complexity: randomInt(1, 10),
      impact: randomInt(1, 10),
      timestamp: randomDate()
    });
  }
});

/* ================= COORDINATION SIGNALS ================= */
let coordId = 1;

db.users.forEach(user => {
  // some users talk a lot, some very little
  const numCoord =
    Math.random() < 0.3
      ? randomInt(20, 40)   // high-visibility users
      : randomInt(3, 10);   // silent workers

  for (let i = 0; i < numCoord; i++) {
    db.coordinationSignals.push({
      id: coordId++,
      user_id: user.id,
      project_id: randomInt(1, NUM_PROJECTS),
      type: randomPick(COORDINATION_TYPES),
      duration_minutes: randomInt(5, 120),
      timestamp: randomDate()
    });
  }
});

/* ================= HELPERS ================= */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

/* ================= WRITE FILE ================= */
fs.writeFileSync(
  "./data/synthetic_db.json",
  JSON.stringify(db, null, 2)
);

console.log("✅ Synthetic JSON database created with 800 users");
