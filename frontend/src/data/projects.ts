export interface ProjectDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  period: string;
  status: 'completed' | 'in-progress' | 'experiment';
  featured: boolean;
  summary: string;
  problem: string;
  actualContribution: string;
  technologies: string[];
  technicalApproach: string[];
  designDecisions: {
    decision: string;
    rationale: string;
  }[];
  limitationsAndLessons: string[];
  evidenceLinks: {
    label: string;
    url: string;
    type: 'github' | 'demo' | 'docs' | 'notes';
  }[];
  codeHighlight?: {
    filename: string;
    language: string;
    code: string;
    caption: string;
  };
}

export const projectsData: ProjectDetail[] = [
  {
    id: "engineering-lab",
    slug: "engineering-lab",
    title: "Backend Engineering Lab",
    tagline: "An implementation-first laboratory rebuilding backend fundamentals from scratch.",
    category: "Backend & Systems",
    period: "Sept 2026 – Present (Active)",
    status: "in-progress",
    featured: true,
    summary:
      "A structured hands-on repository where I build minimal servers, database layers, query plans, and concurrency experiments without magic ORMs to master real system behavior.",
    problem:
      "Modern frameworks and AI tools make it deceptively easy to spin up a working API without understanding what happens beneath the hood. When race conditions, dirty reads, missing transaction rollbacks, or slow sequential scans occur, surface-level framework knowledge falls apart.",
    actualContribution:
      "100% independently implemented. Built 20 sequential exercises starting from a raw Node.js HTTP server (no framework), advancing into layered Express architecture (routes -> controllers -> services -> repositories), Neon DB PostgreSQL integration, indexing with EXPLAIN ANALYZE, ACID transactions, row locking (`FOR UPDATE`), MVCC isolation experiments, and inventory control constraints.",
    technologies: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Raw SQL",
      "psql CLI",
      "Git",
    ],
    technicalApproach: [
      "Layered Architecture: Refactored early monolithic scripts into strict separation of concerns (HTTP controller handles req/res, service executes business rules, repository issues raw SQL).",
      "Transaction Safety: Replaced uncoordinated SQL calls with explicit `BEGIN`, `COMMIT`, and `ROLLBACK` blocks using client checkouts to ensure atomicity in fund and stock transfers.",
      "Concurrency & Locking: Tested race conditions across multiple psql client sessions using `SELECT ... FOR UPDATE` to prevent overselling inventory.",
      "Query Performance Inspection: Used `EXPLAIN ANALYZE` to study how B-tree indexes turn expensive sequential table scans into fast index scans.",
    ],
    designDecisions: [
      {
        decision: "Zero ORMs (Pure pg client & SQL)",
        rationale:
          "ORMs hide query generation, implicit transactions, and connection pooling. Writing raw SQL forced me to understand data types, constraints, and joins directly.",
      },
      {
        decision: "Discrete Day-by-Day Lab Directories",
        rationale:
          "Rather than one monolithic app where early code gets refactored away, isolated directories allow direct comparison between Day 1 naive HTTP parsing and Day 19 concurrent transactions.",
      },
    ],
    limitationsAndLessons: [
      "Pagination in Day 15 uses `LIMIT` and `OFFSET`, which degrades at large table offsets. A planned next step is implementing keyset/cursor pagination.",
      "Learned the hard way that error propagation in Express requires passing errors to `next(err)` rather than swallowing them in unhandled promise rejections.",
      "Observed firsthand how `SERIALIZABLE` transaction isolation aborts on serialization failures and requires an explicit application-level retry loop.",
    ],
    evidenceLinks: [
      {
        label: "GitHub Repository",
        url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs",
        type: "github",
      },
      {
        label: "Day 19: Inventory Transactions",
        url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/tree/master/databases/day-19-inventory-transactions",
        type: "notes",
      },
      {
        label: "Day 16: Concurrency & Locks",
        url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/tree/master/databases/day-16-concurrency",
        type: "notes",
      },
    ],
    codeHighlight: {
      filename: "databases/day-19-inventory-transactions/queries.sql",
      language: "sql",
      code: `-- Deduct stock atomically within a transaction using row-level locking
BEGIN;

-- Lock the target row to prevent concurrent purchase race conditions
SELECT stock, price FROM inventory 
WHERE pid = 'P01' 
FOR UPDATE;

-- Validate stock availability in business logic, then record transaction
INSERT INTO transactions (tid, pid, quantity, created_at)
VALUES ('T08', 'P01', 1, NOW());

-- Update stock within check constraint boundaries (stock >= 0)
UPDATE inventory 
SET stock = stock - 1 
WHERE pid = 'P01';

COMMIT;`,
      caption:
        "Atomic transaction verifying stock deduction with row-level locking and constraint verification.",
    },
  },
  {
    id: "chatpdf",
    slug: "chatpdf",
    title: "ChatPDF — AI Document Q&A",
    tagline: "Retrieval-augmented question answering across multi-page PDF documents.",
    category: "AI & Information Retrieval",
    period: "May 2026 – June 2026",
    status: "completed",
    featured: true,
    summary:
      "A document intelligence prototype using semantic chunking, vector similarity retrieval with ChromaDB, and context-grounded response generation via the Gemini API.",
    problem:
      "Standard LLM prompting suffers from strict context-window limits and hallucinations when asked specific questions about detailed private PDF manuals or technical documents.",
    actualContribution:
      "I implemented the core RAG retrieval pipeline: parsing uploaded PDFs, segmenting text into semantic chunks with overlap, generating vector embeddings, querying ChromaDB for top-k relevant segments, and constructing grounded prompts. Later web UI integration was developed with AI assistance.",
    technologies: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "Gemini API",
      "Vector Embeddings",
      "PyPDF / pdfplumber",
    ],
    technicalApproach: [
      "Document Ingestion: Extracted clean raw text from PDF files, filtering out headers and blank whitespace.",
      "Chunking Strategy: Applied recursive text chunking (500 tokens with 50-token overlap) to maintain paragraph context across chunk boundaries.",
      "Vector Storage: Stored embeddings in local ChromaDB collections with document metadata for targeted filtering.",
      "Grounded Generation: Assembled retrieved chunks into an explicit system prompt directing the LLM to only answer based on provided context.",
    ],
    designDecisions: [
      {
        decision: "FastAPI Backend Layer",
        rationale:
          "Kept python inference code isolated in lightweight asynchronous endpoints, allowing decoupled client access.",
      },
      {
        decision: "Strict Source Attribution",
        rationale:
          "Every generated answer includes citations to the specific page and chunk IDs retrieved to combat hallucinations.",
      },
    ],
    limitationsAndLessons: [
      "Fixed-size chunking sometimes splits critical tables across chunks, reducing retrieval quality for tabular data.",
      "Recognized that RAG quality depends far more on data ingestion and chunking hygiene than on model parameter size.",
    ],
    evidenceLinks: [
      {
        label: "GitHub Profile",
        url: "https://github.com/Pixelated-Sage",
        type: "github",
      },
    ],
    codeHighlight: {
      filename: "rag_service.py",
      language: "python",
      code: `def retrieve_and_generate(query: str, doc_id: str, k: int = 3):
    # Vector similarity search in ChromaDB
    results = collection.query(
        query_texts=[query],
        where={"doc_id": doc_id},
        n_results=k
    )
    
    # Ground context to prevent hallucinations
    context_blocks = "\\n\\n".join(results['documents'][0])
    prompt = f"""You are a helpful assistant. Answer strictly based on the following text:
Context:
{context_blocks}

Question: {query}
Answer:"""
    
    return gemini_client.generate_content(prompt)`,
      caption:
        "Core retrieval and prompt assembly pipeline grounding LLM responses in verified document chunks.",
    },
  },
  {
    id: "liora",
    slug: "liora",
    title: "LIORA — Skincare Platform",
    tagline: "Mobile skincare tracking and recommendation platform with authenticated backend.",
    category: "Full-Stack & Mobile",
    period: "Feb 2026 – April 2026",
    status: "experiment",
    featured: true,
    summary:
      "A full-stack mobile prototype combining a React Native client with a Node.js backend, PostgreSQL database, JWT authentication, and image-based product discovery.",
    problem:
      "Users often struggle to track the effectiveness of active ingredients in skincare routines and find products suitable for their specific skin barrier conditions.",
    actualContribution:
      "Contributed to full-stack application architecture under review by an experienced senior developer. Set up the React Native client navigation, implemented JWT authentication flows with refresh tokens, structured PostgreSQL schema tables, and experimented with Redis caching for repeated product queries. Note: significant portions of boilerplate and UI styling were generated with AI assistance.",
    technologies: [
      "React Native / Expo",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "JWT & Bcrypt",
      "Tailwind / NativeWind",
    ],
    technicalApproach: [
      "Separated backend services for authentication, product catalog, and user routine tracking.",
      "Utilized JSON Web Tokens (access + refresh token pattern) for session management on mobile devices.",
      "Structured relational PostgreSQL schemas with foreign keys linking users, routines, and product ingredients.",
    ],
    designDecisions: [
      {
        decision: "PostgreSQL for User Data + Redis for Catalog Caching",
        rationale:
          "Relational integrity was crucial for user routine logs, while frequently accessed ingredient lists benefited from in-memory caching.",
      },
    ],
    limitationsAndLessons: [
      "AI assistance helped generate features rapidly, but when caching invalidation bugs surfaced in Redis, diagnosing them was difficult without deeper caching fundamentals.",
      "This project was the primary catalyst that motivated me to start the Backend Engineering Lab to master databases and servers from the ground up.",
    ],
    evidenceLinks: [
      {
        label: "GitHub Profile",
        url: "https://github.com/Pixelated-Sage",
        type: "github",
      },
    ],
  },
];
