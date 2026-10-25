export interface ProfileData {
  name: string;
  tagline: string;
  role: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
  };
  bioShort: string;
  bioLong: string[];
  focus: string[];
  socialLinks: {
    github: string;
    engineeringLab: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
  resume: {
    url: string;
    fileName: string;
    label: string;
    verifiedDate: string;
    description: string;
  };
  capabilityBoundaries: {
    coreSkills: string[];
    activelyBuilding: string[];
    familiarWithAssistance: string[];
    explicitNonClaims: string[];
  };
  achievements: {
    title: string;
    description: string;
    badge?: string;
  }[];
}

export const profileData: ProfileData = {
  name: "Abhishek Sharma",
  role: "Software Engineer — Backend & Systems",
  tagline: "Building software. Understanding the systems beneath it.",
  location: "Punjab, India",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Swami Vivekananda Institute of Engineering & Technology (SVIET)",
    location: "Banur, Punjab",
    period: "Aug 2023 – Aug 2027",
    cgpa: "8.14 / 10",
  },
  bioShort:
    "Computer Science engineering student focused on backend software engineering. Deliberately transitioning from AI-assisted application building toward independently mastering Node.js, Express, PostgreSQL, transactions, and system architecture.",
  bioLong: [
    "I began my journey building web and mobile applications using modern frameworks and AI-assisted workflows. While that helped me rapidly assemble functioning interfaces and prototypes, practical interview scenarios and building real systems exposed crucial gaps in my low-level fundamentals.",
    "Instead of continuing to rely on AI-generated glue code, I made a deliberate choice to step back and rebuild my technical foundation from scratch through an implementation-first engineering lab.",
    "My daily methodology is straightforward: understand a system concept, implement it in minimal code without magic abstractions, run edge-case tests, inspect PostgreSQL query execution and locks, document mistakes honestly, and commit the verified evidence.",
  ],
  focus: [
    "Node.js & Express.js HTTP internals and layered architectures",
    "PostgreSQL relational modeling, indexes, constraints, and query plans",
    "Database transactions, ACID guarantees, MVCC, and concurrency locking",
    "Pragmatic API design, validation, error propagation, and bounded pagination",
  ],
  socialLinks: {
    github: "https://github.com/Pixelated-Sage",
    engineeringLab: "https://github.com/Pixelated-Sage/abhishek-engineering-labs",
    linkedin: "https://www.linkedin.com/in/abhishek-sharma-080b2530b/",
    email: "mailto:abhisheks.ai.dev@gmail.com",
    whatsapp: "https://wa.me/917888816472",
  },
  resume: {
    url: "/Abhishek-Sharma-Backend-Resume.pdf",
    fileName: "Abhishek-Sharma-Backend-Resume.pdf",
    label: "Download Verified Resume (Oct 2026)",
    verifiedDate: "October 2026",
    description:
      "Curated, ground-truth resume reflecting verified backend competencies, genuine project contributions, and honest technical boundaries.",
  },
  capabilityBoundaries: {
    coreSkills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Node.js & Express.js",
      "PostgreSQL & SQL",
      "RESTful API Architecture",
      "Git & Linux fundamentals",
    ],
    activelyBuilding: [
      "Transaction isolation levels (READ COMMITTED to SERIALIZABLE)",
      "Row-level locking (`FOR UPDATE`) & concurrency contention",
      "Query performance analysis (`EXPLAIN ANALYZE`) & indexing strategies",
      "Database schema normalization (1NF - 3NF) & constraint design",
      "Keyset / cursor pagination vs offset pagination",
    ],
    familiarWithAssistance: [
      "React.js & React Native (mobile UI)",
      "Python & FastAPI",
      "RAG pipelines (ChromaDB vector retrieval & Gemini API embeddings)",
      "Redis caching & basic pub/sub concepts",
      "Docker basics & Nginx reverse proxy configurations",
    ],
    explicitNonClaims: [
      "I do not claim independent mastery of complex ML pipelines (e.g. custom LSTM/XGBoost architectures).",
      "I do not present AI-assisted proof-of-concept technologies as established production strengths.",
      "I do not claim ownership of historical team projects beyond my actual verified contribution.",
    ],
  },
  achievements: [
    {
      title: "3rd Place — Hackathon 2026",
      description:
        "Won INR 20,000 as part of a competitive engineering team with an AI/ML financial forecasting solution, contributing to data preprocessing and workflow integration.",
      badge: "INR 20,000 Award",
    },
    {
      title: "Technical Leadership — Super 60 Community",
      description:
        "Coordinated peer workshops, hackathons, and practical code-along sessions encouraging hands-on implementation and student programming fundamentals.",
      badge: "Community Coordinator",
    },
  ],
};
