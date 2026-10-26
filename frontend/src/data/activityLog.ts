export interface ActivityRecord {
  date: string; // YYYY-MM-DD
  title: string;
  topic: string;
  commitHash?: string;
  commitMessage?: string;
  commitUrl?: string;
  exercisePath?: string;
  status: 'verified';
  summary: string;
}

export const activityRecords: ActivityRecord[] = [
  {
    "date": "2026-10-25",
    "title": "Day 21: Multi-Layer Validation and Error Handling",
    "topic": "Backend Architecture",
    "commitHash": "fb8450e",
    "commitMessage": "validation done , totally loved and enjoyed it (next station automated api testing)",
    "commitUrl": "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/fb8450ea8544f865bffd7898e0adbec6eafc4db5",
    "exercisePath": "backend/day-21-validation-errors",
    "status": "verified",
    "summary": "Built multi-layer validation in Express: verified implementations for Zod DTO (400), authorization (403), and domain conflicts (422) with centralized error middleware (500), plus documented persistence constraints."
  },
  {
    date: "2026-10-23",
    title: "SQL Consolidation & Grouped Aggregations",
    topic: "PostgreSQL & SQL",
    commitHash: "17b212c",
    commitMessage: "sql practice",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/17b212c",
    exercisePath: "databases/day-20-database-consolidation",
    status: "verified",
    summary: "Joined inventory with multi-row transactions to calculate sales quantities via SUM() and GROUP BY.",
  },
  {
    date: "2026-10-22",
    title: "Inventory Stock Transactions & CHECK Constraints",
    topic: "Transactions & Integrity",
    commitHash: "81e2f10",
    commitMessage: "inventory system with the things i have learned till now",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/81e2f10",
    exercisePath: "databases/day-19-inventory-transactions",
    status: "verified",
    summary: "Created inventory transaction logic with non-negative stock constraint safeguards and row locking.",
  },
  {
    date: "2026-10-13",
    title: "PostgreSQL SERIALIZABLE Isolation & SSI",
    topic: "Transactions & Integrity",
    commitHash: "4ddf867",
    commitMessage: "serializable done",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/4ddf867",
    exercisePath: "databases/day-18-serializable",
    status: "verified",
    summary: "Observed SSI abort code 40001 on read/write dependency conflicts during concurrent execution.",
  },
  {
    date: "2026-10-12",
    title: "MVCC Mechanics & Isolation Levels",
    topic: "Transactions & Integrity",
    commitHash: "74d09f4",
    commitMessage: "isolation (MVCC)",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/74d09f4",
    exercisePath: "databases/day-17-isolation",
    status: "verified",
    summary: "Tested READ COMMITTED vs REPEATABLE READ and inspected hidden xmin/xmax tuple metadata.",
  },
  {
    date: "2026-10-11",
    title: "Engineering Lab Documentation Sync",
    topic: "Documentation & Workflow",
    commitHash: "c03cab3",
    commitMessage: "README updated",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/c03cab3",
    exercisePath: "README.md",
    status: "verified",
    summary: "Consolidated learning progress, updated directory index, and refined technical README notes.",
  },
  {
    date: "2026-10-03",
    title: "Concurrency & Row Locking (FOR UPDATE)",
    topic: "Concurrency & Locking",
    commitHash: "9be4a1f",
    commitMessage: "concurrency (nice concept)",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/9be4a1f",
    exercisePath: "databases/day-16-concurrency",
    status: "verified",
    summary: "Simulated multi-client contention and verified how SELECT FOR UPDATE prevents lost updates.",
  },
  {
    date: "2026-09-30",
    title: "Advanced SQL Queries & Endpoints",
    topic: "PostgreSQL & SQL",
    commitHash: "da19f80",
    commitMessage: "done the advance sql (enjoyed it )",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/da19f80",
    exercisePath: "databases/day-13-advanced-sql",
    status: "verified",
    summary: "Implemented correlated subqueries, EXISTS predicates, CASE WHEN, and connected into Express endpoints.",
  },
  {
    date: "2026-09-29",
    title: "Lab Reset & Query Progression Structure",
    topic: "Workflow",
    commitHash: "7a7ffbe",
    commitMessage: "new start",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/7a7ffbe",
    exercisePath: "databases/",
    status: "verified",
    summary: "Reorganized SQL database experiments into modular standalone folders for comparison.",
  },
  {
    date: "2026-09-28",
    title: "Relational Normalization & Constraints",
    topic: "Database Design",
    commitHash: "76cc75a",
    commitMessage: "normalization",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/76cc75a",
    exercisePath: "databases/day-11-normalization",
    status: "verified",
    summary: "Decomposed denormalized schemas to 3NF and implemented PRIMARY/FOREIGN KEY constraints.",
  },
  {
    date: "2026-09-24",
    title: "Multi-Step DB Transactions with Node.js",
    topic: "Transactions & Integrity",
    commitHash: "f40134e",
    commitMessage: "created transaction in db",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/f40134e",
    exercisePath: "backend/day-09-backend-db-Transaction",
    status: "verified",
    summary: "Wrapped pool client checkouts in BEGIN/COMMIT/ROLLBACK blocks for atomic transfers.",
  },
  {
    date: "2026-09-22",
    title: "PostgreSQL Index Performance & EXPLAIN ANALYZE",
    topic: "PostgreSQL & SQL",
    commitHash: "671a64a",
    commitMessage: "Database performance opt by index",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/671a64a",
    exercisePath: "databases/day-07-postgresql-performance",
    status: "verified",
    summary: "Evaluated sequential scans vs B-Tree index scans using EXPLAIN ANALYZE on populated tables.",
  },
  {
    date: "2026-09-21",
    title: "Cloud PostgreSQL Integration & Repository Pattern",
    topic: "Backend Architecture",
    commitHash: "a19b78f",
    commitMessage: "separate database access into repository",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/a19b78f",
    exercisePath: "backend/day-06-backend",
    status: "verified",
    summary: "Connected Express API to Neon cloud PostgreSQL and isolated SQL queries into repository classes.",
  },
  {
    date: "2026-09-19",
    title: "Centralized Error Handling in Express",
    topic: "Backend Architecture",
    commitHash: "d30bc8a",
    commitMessage: "add centralized error handling",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/d30bc8a",
    exercisePath: "backend/day-03-&-04-architecture",
    status: "verified",
    summary: "Implemented 4-parameter error middleware to catch and format unhandled promise rejections.",
  },
  {
    date: "2026-09-18",
    title: "Separating Routes, Controllers & Services",
    topic: "Backend Architecture",
    commitHash: "300d0c8",
    commitMessage: "separate routes controllers and services",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/300d0c8",
    exercisePath: "backend/day-03-&-04-architecture",
    status: "verified",
    summary: "Refactored monolithic endpoints into modular controllers and business services.",
  },
  {
    date: "2026-09-16",
    title: "Express.js Middleware & Payload Validation",
    topic: "HTTP & Node.js",
    commitHash: "d9499ab",
    commitMessage: "build Express API with middleware",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/d9499ab",
    exercisePath: "backend/day-02-express",
    status: "verified",
    summary: "Created custom request logger middleware and validated incoming JSON bodies.",
  },
  {
    date: "2026-09-15",
    title: "Native Node.js HTTP Server Without Frameworks",
    topic: "HTTP & Node.js",
    commitHash: "11bbf35",
    commitMessage: "built a node.js http server without express",
    commitUrl: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/11bbf35",
    exercisePath: "backend/day-01-http-node",
    status: "verified",
    summary: "Handled raw TCP/HTTP request streams, URL parsing, and response status headers using node:http.",
  },
];

export interface StreakStats {
  totalVerifiedDays: number;
  currentStreakDays: number;
  latestVerifiedDate: string;
  verifiedDatesList: string[];
  daysLookup: Record<string, ActivityRecord>;
}

export function computeStreakStats(): StreakStats {
  const verifiedDates = Array.from(new Set(activityRecords.map((r) => r.date))).sort();
  const daysLookup: Record<string, ActivityRecord> = {};
  for (const record of activityRecords) {
    daysLookup[record.date] = record;
  }

  // Calculate current streak backward from latest recorded date
  // A streak counts consecutive calendar days with verified activity
  let streak = 0;
  if (verifiedDates.length > 0) {
    const latestStr = verifiedDates[verifiedDates.length - 1];
    const currentDate = new Date(latestStr + "T00:00:00");
    
    // Check consecutive calendar days backwards
    while (true) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      if (daysLookup[dateKey]) {
        streak++;
        // Step back 1 day
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return {
    totalVerifiedDays: verifiedDates.length,
    currentStreakDays: streak,
    latestVerifiedDate: verifiedDates[verifiedDates.length - 1] || "",
    verifiedDatesList: verifiedDates,
    daysLookup,
  };
}

export const recentMilestones = [
  {
    date: "Oct 25, 2026",
    title: "Day 21: Multi-Layer Validation and Error Handling",
    summary: "Built multi-layer validation in Express: verified implementations for Zod DTO (400), authorization (403), and domain conflicts (422) with centralized error middleware (500), plus documented persistence constraints.",
    exercise: "backend/day-21-validation-errors",
  },
  {
    date: "Oct 23, 2026",
    title: "Inventory Sales Aggregation Completed",
    summary: "Consolidated multi-table transaction ledgers with raw SQL joins and GROUP BY summaries.",
    exercise: "databases/day-20-database-consolidation",
  },
  {
    date: "Oct 22, 2026",
    title: "Stock Transaction Invariants Enforced",
    summary: "Implemented atomic stock updates with row-level locks and database CHECK (stock >= 0) constraints.",
    exercise: "databases/day-19-inventory-transactions",
  },
  {
    date: "Oct 13, 2026",
    title: "SERIALIZABLE Isolation & SSI Contention",
    summary: "Discovered and tested PostgreSQL 40001 serialization failures under concurrent write-skew conditions.",
    exercise: "databases/day-18-serializable",
  },
];
