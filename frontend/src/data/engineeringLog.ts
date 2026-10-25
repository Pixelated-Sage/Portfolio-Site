export interface EngineeringEntry {
  id: string;
  slug: string;
  dayNumber: number;
  date: string;
  title: string;
  topic: 'PostgreSQL & SQL' | 'Transactions & Integrity' | 'Backend Architecture' | 'Concurrency & Locking' | 'HTTP & Node.js' | 'Database Design';
  status: 'completed' | 'in-progress' | 'experiment';
  summary: string;
  keyTakeaway: string;
  details: string[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  evidenceCommit?: {
    hash: string;
    date: string;
    message: string;
    url: string;
  };
  repoPath: string;
  featuredOnHome?: boolean;
}

export const engineeringLogData: EngineeringEntry[] = [
  {
    id: "day-20",
    slug: "day-20-database-consolidation",
    dayNumber: 20,
    date: "2026-10-23",
    title: "Day 20: Database Consolidation & Aggregated Analytics",
    topic: "PostgreSQL & SQL",
    status: "completed",
    summary:
      "Joining inventory with multi-row transaction ledgers to calculate total product quantities sold using INNER JOIN, SUM, and GROUP BY.",
    keyTakeaway:
      "Grouped calculations over relational ledgers allow point-in-time sales reporting without denormalizing counter columns into the primary inventory table.",
    details: [
      "Created an inventory table with strict non-negative check constraints on price and stock.",
      "Populated realistic product data (chai, haldi, munch, dahi, ataa, dudh) and simulated 14 distinct purchase transactions.",
      "Wrote aggregation query joining `inventory` and `transactions` on `pid`, computing `SUM(t.quantity)` grouped by product id and name.",
      "Inspected PostgreSQL execution behavior when grouping across indexed foreign keys.",
    ],
    codeSnippet: {
      language: "sql",
      caption: "psql session executing product sales aggregation",
      code: `SELECT 
    i.pid AS product_id, 
    i.pname AS product_name, 
    SUM(t.quantity) AS product_sold 
FROM inventory i 
INNER JOIN transactions t ON i.pid = t.pid 
GROUP BY i.pid, i.pname;

/*
 product_id | product_name | product_sold 
------------+--------------+--------------
 P01        | dudh         |           10
 P03        | haldi        |            3
 P06        | ataa         |            4
 P02        | chai         |            2
 P04        | munch        |           10
 P05        | dahi         |            9
(6 rows)
*/`,
    },
    evidenceCommit: {
      hash: "17b212c",
      date: "2026-10-23",
      message: "sql practice",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/17b212c",
    },
    repoPath: "databases/day-20-database-consolidation",
    featuredOnHome: true,
  },
  {
    id: "day-19",
    slug: "day-19-inventory-transactions",
    dayNumber: 19,
    date: "2026-10-22",
    title: "Day 19: Inventory Stock Transactions & State Integrity",
    topic: "Transactions & Integrity",
    status: "completed",
    summary:
      "Implementing an atomic stock management workflow with check constraints (`stock >= 0`), foreign keys, and transaction rollbacks on violation.",
    keyTakeaway:
      "Enforcing invariants like `stock >= 0` at the database constraint level guarantees data consistency even when application layer checks fail or race conditions occur.",
    details: [
      "Configured `CHECK (stock >= 0)` on the inventory table to physically prevent negative inventory balances.",
      "Created transactional workflow: check out product, insert transaction log record, decrement stock.",
      "Tested error behavior when attempting to purchase more stock than available; observed PostgreSQL rejecting the update and aborting the transaction cleanly.",
    ],
    codeSnippet: {
      language: "sql",
      caption: "Atomic inventory transaction with check constraint defense",
      code: `BEGIN;

SELECT stock FROM inventory WHERE pid = 'P01' FOR UPDATE;

INSERT INTO transactions (tid, pid, quantity, created_at)
VALUES ('T08', 'P01', 1, NOW());

UPDATE inventory 
SET stock = stock - 1 
WHERE pid = 'P01';

COMMIT;`,
    },
    evidenceCommit: {
      hash: "81e2f10",
      date: "2026-10-22",
      message: "inventory system with the things i have learned till now",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/81e2f10",
    },
    repoPath: "databases/day-19-inventory-transactions",
    featuredOnHome: true,
  },
  {
    id: "day-18",
    slug: "day-18-serializable-isolation",
    dayNumber: 18,
    date: "2026-10-13",
    title: "Day 18: SERIALIZABLE Isolation & Serialization Anomalies",
    topic: "Transactions & Integrity",
    status: "completed",
    summary:
      "Exploring PostgreSQL's SSI (Serializable Snapshot Isolation). Observing serialization error 40001 when concurrent transactions execute conflicting read-write dependencies.",
    keyTakeaway:
      "SERIALIZABLE isolation prevents write skew and phantom reads, but the application MUST be designed with an automatic retry mechanism when PostgreSQL aborts with code 40001.",
    details: [
      "Configured `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE` across two concurrent sessions.",
      "Simulated write skew: Session A reads predicate and updates based on assumption; Session B simultaneously modifies the predicate.",
      "Observed the exact PostgreSQL error: `ERROR: could not serialize access due to read/write dependencies among transactions`.",
      "Learned that serializable isolation is not free—it trades throughput and requires application retry loops.",
    ],
    codeSnippet: {
      language: "sql",
      caption: "Testing serialization failure detection",
      code: `-- Session 1
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT SUM(value) FROM accounts;

-- Session 2 (Concurrent)
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
UPDATE accounts SET value = value + 100 WHERE id = 1;
COMMIT;

-- Session 1 tries to write based on old view
UPDATE accounts SET value = value - 100 WHERE id = 2;
-- Result: ERROR 40001: could not serialize access`,
    },
    evidenceCommit: {
      hash: "4ddf867",
      date: "2026-10-13",
      message: "serializable done",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/4ddf867",
    },
    repoPath: "databases/day-18-serializable",
    featuredOnHome: true,
  },
  {
    id: "day-17",
    slug: "day-17-isolation-mvcc",
    dayNumber: 17,
    date: "2026-10-12",
    title: "Day 17: Transaction Isolation Levels & MVCC Mechanics",
    topic: "Transactions & Integrity",
    status: "completed",
    summary:
      "Studying READ COMMITTED vs REPEATABLE READ. How Multi-Version Concurrency Control (MVCC) creates snapshots of tuples using xmin and xmax to avoid read locks.",
    keyTakeaway:
      "In MVCC, 'readers never block writers, and writers never block readers' because old versions of rows are kept in storage until vacuumed.",
    details: [
      "Tested default READ COMMITTED: a query sees all transactions committed before each individual statement begins.",
      "Tested REPEATABLE READ: a transaction sees a consistent snapshot taken when the first query in the transaction began.",
      "Investigated PostgreSQL tuple hidden columns (`xmin`, `xmax`, `ctid`) to see how row versions are identified.",
    ],
    evidenceCommit: {
      hash: "74d09f4",
      date: "2026-10-12",
      message: "isolation (MVCC)",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/74d09f4",
    },
    repoPath: "databases/day-17-isolation",
  },
  {
    id: "day-16",
    slug: "day-16-concurrency-row-locking",
    dayNumber: 16,
    date: "2026-10-03",
    title: "Day 16: PostgreSQL Concurrency & SELECT FOR UPDATE",
    topic: "Concurrency & Locking",
    status: "completed",
    summary:
      "Simulating concurrent client updates across two psql sessions. Locking rows with FOR UPDATE to prevent race conditions during state transitions.",
    keyTakeaway:
      "Explicit row locks (`FOR UPDATE`) serialize access to specific rows without locking the entire table, preventing lost updates in balance transfers.",
    details: [
      "Opened two simultaneous terminal windows connected to the same PostgreSQL database.",
      "In Terminal 1: started a transaction and ran `SELECT ... FOR UPDATE` on a specific balance row.",
      "In Terminal 2: attempted an immediate update on the same row; observed Terminal 2 pausing and waiting until Terminal 1 ran `COMMIT`.",
      "Documented row-lock acquisition and the danger of deadlocks when acquiring locks in mismatched orders.",
    ],
    codeSnippet: {
      language: "sql",
      caption: "Acquiring an exclusive row lock",
      code: `BEGIN;
-- Acquires an exclusive row lock on this account record
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;

-- Another concurrent session attempting to modify id = 1 will block
-- until this transaction commits or rolls back.
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
COMMIT;`,
    },
    evidenceCommit: {
      hash: "9be4a1f",
      date: "2026-10-03",
      message: "concurrency (nice concept)",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/9be4a1f",
    },
    repoPath: "databases/day-16-concurrency",
  },
  {
    id: "day-15",
    slug: "day-15-pagination-mechanics",
    dayNumber: 15,
    date: "2026-10-03",
    title: "Day 15: Bounded Result Sets with LIMIT & OFFSET",
    topic: "Backend Architecture",
    status: "completed",
    summary:
      "Building page and limit query parameter handling, input sanitization, dynamic SQL generation, and analyzing why offset pagination slows down on deep pages.",
    keyTakeaway:
      "Always validate and bound pagination inputs (e.g., maximum limit of 50) to protect database servers from unbounded memory allocation.",
    details: [
      "Built middleware and controller parsing `page` and `limit` query parameters with default fallbacks.",
      "Calculated SQL offset: `offset = (page - 1) * limit`.",
      "Researched why `OFFSET 100000` causes PostgreSQL to scan and discard 100,000 rows before returning results, noting keyset pagination as the scalable remedy.",
    ],
    evidenceCommit: {
      hash: "49f6caa",
      date: "2026-10-03",
      message: "learned pagination but without keyset/cursor will learn it",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/49f6caa",
    },
    repoPath: "backend/day-15-pagination",
  },
  {
    id: "day-14",
    slug: "day-14-sql-api-integration",
    dayNumber: 14,
    date: "2026-09-30",
    title: "Day 14: SQL-Powered Backend REST Endpoints",
    topic: "Backend Architecture",
    status: "completed",
    summary:
      "Connecting Express controllers through repository functions executing parametric SQL queries, handling query filters safely to prevent SQL injection.",
    keyTakeaway:
      "Parameterized queries (`$1, $2`) ensure user inputs are treated as literal values rather than executable SQL syntax.",
    details: [
      "Built REST endpoints serving database records filtered by query parameters.",
      "Separated database query execution into dedicated repository methods.",
      "Practiced safe parameter substitution using Node-pg parameterized arrays.",
    ],
    evidenceCommit: {
      hash: "96526fb",
      date: "2026-09-30",
      message: "hey i built the whole backend with advance sql",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/96526fb",
    },
    repoPath: "backend/day-14-sql-api",
  },
  {
    id: "day-13",
    slug: "day-13-advanced-sql-queries",
    dayNumber: 13,
    date: "2026-09-30",
    title: "Day 13: Advanced SQL Subqueries, CASE & COALESCE",
    topic: "PostgreSQL & SQL",
    status: "completed",
    summary:
      "Writing correlated subqueries, existential filters with EXISTS / NOT EXISTS, conditional transformations with CASE WHEN, and null fallback handling.",
    keyTakeaway:
      "`COALESCE` and `CASE WHEN` allow clean presentation logic to be computed directly inside the database engine without pushing messy null checks into application code.",
    details: [
      "Wrote scalar subqueries inside SELECT projections.",
      "Compared `IN (subquery)` performance versus `EXISTS (correlated subquery)`.",
      "Used `CASE WHEN` statements to categorize records based on metric thresholds.",
    ],
    evidenceCommit: {
      hash: "da19f80",
      date: "2026-09-30",
      message: "done the advance sql (enjoyed it )",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/da19f80",
    },
    repoPath: "databases/day-13-advanced-sql",
  },
  {
    id: "day-11",
    slug: "day-11-normalization-anomalies",
    dayNumber: 11,
    date: "2026-09-28",
    title: "Day 11: Relational Normalization & Anomaly Prevention",
    topic: "Database Design",
    status: "completed",
    summary:
      "Analyzing insertion, update, and deletion anomalies. Decomposing redundant flat tables into 1NF, 2NF, and 3NF relational schemas with junction tables.",
    keyTakeaway:
      "Normalizing to 3NF eliminates data duplication and prevents scenarios where deleting a single record accidentally erases referenced master data.",
    details: [
      "Constructed a denormalized student-course table demonstrating update and deletion anomalies.",
      "Decomposed data into 1NF (atomic columns), 2NF (no partial dependencies on composite keys), and 3NF (no transitive dependencies).",
      "Created an `enrollments` junction table with composite unique constraints.",
    ],
    evidenceCommit: {
      hash: "76cc75a",
      date: "2026-09-28",
      message: "normalization",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/76cc75a",
    },
    repoPath: "databases/day-11-normalization",
  },
  {
    id: "day-10",
    slug: "day-10-database-constraints",
    dayNumber: 10,
    date: "2026-09-28",
    title: "Day 10: Database Integrity: Constraints & Foreign Keys",
    topic: "Database Design",
    status: "completed",
    summary:
      "Enforcing integrity rules at the database level: PRIMARY KEY, FOREIGN KEY ON DELETE CASCADE/SET NULL, UNIQUE, NOT NULL, and CHECK constraints.",
    keyTakeaway:
      "Never rely solely on frontend or API validation for data invariants; database constraints are the true source of truth.",
    details: [
      "Configured `ON DELETE CASCADE` and `ON DELETE SET NULL` to observe cascading behaviors.",
      "Added `CHECK` constraints on numeric columns to reject negative quantities.",
      "Tested how violating constraints results in clear SQL error codes that the backend can translate to client responses.",
    ],
    evidenceCommit: {
      hash: "da0571b",
      date: "2026-09-28",
      message: "constraints and db validations",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/da0571b",
    },
    repoPath: "databases/day-10-constraints",
  },
  {
    id: "day-09",
    slug: "day-09-backend-transactions",
    dayNumber: 9,
    date: "2026-09-24",
    title: "Day 9: Multi-Step DB Transactions in Node.js",
    topic: "Transactions & Integrity",
    status: "completed",
    summary:
      "Managing PostgreSQL transactions from Node.js with pool client checkouts, explicit BEGIN, COMMIT, and try/catch ROLLBACK blocks to ensure atomic bank transfers.",
    keyTakeaway:
      "A database transaction in Node.js requires checking out a dedicated client from the pool (`pool.connect()`); issuing `BEGIN` on the pool directly will fail silently across different connections.",
    details: [
      "Discovered that `pool.query('BEGIN')` does not guarantee subsequent queries use the same connection.",
      "Refactored code to explicitly checkout a `client = await pool.connect()`.",
      "Implemented money transfer: debit account A, credit account B, insert audit log.",
      "Wrapped in `try / catch / finally` ensuring `client.release()` always executes.",
    ],
    evidenceCommit: {
      hash: "f40134e",
      date: "2026-09-24",
      message: "created transaction in db",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/f40134e",
    },
    repoPath: "backend/day-09-backend-db-Transaction",
  },
  {
    id: "day-07",
    slug: "day-07-postgresql-performance-indexing",
    dayNumber: 7,
    date: "2026-09-22",
    title: "Day 7: Query Plans & Indexing with EXPLAIN ANALYZE",
    topic: "PostgreSQL & SQL",
    status: "completed",
    summary:
      "Evaluating query execution paths. Populating mock records, running EXPLAIN ANALYZE to observe sequential scans, adding B-Tree indexes, and comparing execution times.",
    keyTakeaway:
      "Indexes speed up reads but incur write overhead. Using `EXPLAIN ANALYZE` shows actual row counts vs planner estimates and warns when an index is ignored due to small table sizes.",
    details: [
      "Generated large dataset using `generate_series()` in PostgreSQL.",
      "Executed `EXPLAIN ANALYZE SELECT * FROM users WHERE email = '...';`",
      "Observed `Seq Scan` with high execution cost.",
      "Created a B-tree index on `email`, re-ran the query, and observed the planner switch to `Index Scan`, reducing execution time by orders of magnitude.",
    ],
    evidenceCommit: {
      hash: "671a64a",
      date: "2026-09-22",
      message: "Database performance opt by index",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/671a64a",
    },
    repoPath: "databases/day-07-postgresql-performance",
  },
  {
    id: "day-06",
    slug: "day-06-backend-repository-pattern",
    dayNumber: 6,
    date: "2026-09-21",
    title: "Day 6: Repository Pattern & Data Access Layer",
    topic: "Backend Architecture",
    status: "completed",
    summary:
      "Decoupling business logic from persistence. Creating dedicated repository objects for database queries so controllers remain unaware of SQL syntax.",
    keyTakeaway:
      "The repository pattern shields services from SQL details, making business rules testable with mock data stores.",
    details: [
      "Extracted SQL queries out of route controllers into a `user.repository.js` file.",
      "Services call repository functions like `findUserById()` or `createUser()`.",
      "Standardized data returned from database drivers into domain objects.",
    ],
    evidenceCommit: {
      hash: "a19b78f",
      date: "2026-09-21",
      message: "separate database access into repository",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/a19b78f",
    },
    repoPath: "backend/day-06-backend",
  },
  {
    id: "day-03-04",
    slug: "day-03-04-architecture-error-handling",
    dayNumber: 4,
    date: "2026-09-18",
    title: "Days 3–4: Layered Architecture & Centralized Error Handling",
    topic: "Backend Architecture",
    status: "completed",
    summary:
      "Structuring an Express application into Routes, Controllers, and Services. Implementing custom application error classes and centralized error-handling middleware.",
    keyTakeaway:
      "Without centralized error middleware, unhandled asynchronous rejections will crash the Node.js process or hang HTTP connections indefinitely.",
    details: [
      "Refactored spaghetti route files into clean 3-tier layering: Route -> Controller -> Service.",
      "Created an `AppError` class extending native JavaScript `Error` with HTTP status codes.",
      "Implemented Express 4-argument error middleware `(err, req, res, next)` to format JSON responses consistently.",
    ],
    evidenceCommit: {
      hash: "300d0c8",
      date: "2026-09-18",
      message: "separate routes controllers and services",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/300d0c8",
    },
    repoPath: "backend/day-03-&-04-architecture",
  },
  {
    id: "day-01",
    slug: "day-01-node-http-server",
    dayNumber: 1,
    date: "2026-09-15",
    title: "Day 1: Building a Raw HTTP Server in Node.js",
    topic: "HTTP & Node.js",
    status: "completed",
    summary:
      "Creating an HTTP server from the native `node:http` module without any external packages. Parsing URL paths, HTTP methods, headers, and assembling stream chunks.",
    keyTakeaway:
      "HTTP in Node.js is an event-driven stream of byte buffers. Frameworks like Express are simply middleware abstractions sitting on top of `IncomingMessage` and `ServerResponse`.",
    details: [
      "Used native `http.createServer((req, res) => { ... })`.",
      "Manually accumulated incoming request body streams using `req.on('data')` and `req.on('end')`.",
      "Parsed JSON payloads without third-party body-parser.",
      "Set proper HTTP response headers (`Content-Type: application/json`) and status codes manually.",
    ],
    evidenceCommit: {
      hash: "11bbf35",
      date: "2026-09-15",
      message: "built a node.js http server without express",
      url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/11bbf35",
    },
    repoPath: "backend/day-01-http-node",
  },
];
