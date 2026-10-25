# Abhishek Sharma — Professional Website V2.0

> Clean, personal, evidence-driven professional identity website for **Abhishek Sharma**, Computer Science engineering student (SVIET Punjab, 2023–2027) pursuing software engineering with a focus on backend systems, databases, and architectural fundamentals.

Positioning: **“Building software. Understanding the systems beneath it.”**

---

## 1. Design Direction & Color System

V2.0 is built with a **Light Editorial + Technical Blue** aesthetic. It moves away from generic dark/purple glowing themes toward a calm, readable, and technical look where evidence, query outputs, and code are primary.

### Design Tokens

| Token | Hex Value | Role |
|---|---|---|
| **Page background** | `#F7F8FA` | Crisp, low-strain light background |
| **Cards & surfaces** | `#FFFFFF` | Clean primary content surfaces |
| **Primary text** | `#171B26` | High-contrast, readable dark slate |
| **Secondary text** | `#606978` | Balanced neutral for metadata and descriptions |
| **Primary accent blue** | `#315EFB` | Active links, primary actions, and badges |
| **Accent hover** | `#2449CF` | Interactive states |
| **Borders & dividers** | `#E2E6EE` | Subtle separators and card borders |
| **Subtle section background** | `#EEF2F8` | Callout boxes, tags, and secondary panels |
| **Dark technical panel** | `#111827` | Code blocks, SQL outputs, and commit details |

---

## 2. Project Structure

```text
Abhishek-portfolio/
├── context/                             # Raw source resumes, imagery, and background notes
│   ├── Abhishek.pdf                     # Verified, ground-truth backend resume
│   ├── Abhishek_Resume.pdf              # Historical reference resume
│   ├── Context.txt                      # Detailed project specification & guidance
│   └── img4.webp                        # High-resolution profile portrait
├── plan.md                              # V2.0 Project plan & acceptance criteria
├── theme.md                             # V2.0 Theme tokens & design rules
├── README.md                            # Main project documentation
└── frontend/                            # Static frontend client application
    ├── public/
    │   ├── Abhishek-Sharma-Backend-Resume.pdf  # Downloadable verified resume
    │   └── assets/
    │       └── abhishek-profile.webp          # Optimized profile avatar
    ├── src/
    │   ├── data/                        # Structured content files (extensible)
    │   │   ├── profile.ts               # Bio, contact, education, boundaries
    │   │   ├── projects.ts              # Selected projects with honest scopes
    │   │   ├── engineeringLog.ts        # Paginated engineering log entries
    │   │   └── activityLog.ts           # Date-indexed activity & dynamic streak
    │   ├── components/                  # Reusable UI components
    │   │   ├── Navbar.tsx               # Header with mobile navigation drawer
    │   │   ├── Footer.tsx               # Minimal footer with verified links
    │   │   ├── ActivityWidget.tsx       # Date-indexed calendar & streak stats
    │   │   ├── ProjectCard.tsx          # Card with actual contribution callout
    │   │   ├── LogCard.tsx              # Engineering log card with key takeaways
    │   │   ├── CodeBlock.tsx            # Monospace dark code panel with copy action
    │   │   └── Icons.tsx                # Clean SVG icon components
    │   ├── pages/                       # Application route views
    │   │   ├── HomePage.tsx             # Curated home: positioning, widget, work, log
    │   │   ├── WorkPage.tsx             # Selected work listing with category filters
    │   │   ├── ProjectDetailPage.tsx    # Reusable deep-dive project template
    │   │   ├── EngineeringPage.tsx      # Paginated engineering log archive
    │   │   ├── EngineeringDetailPage.tsx# Stable permalink for individual lab logs
    │   │   └── AboutPage.tsx            # Background, education, boundaries, contact
    │   ├── App.tsx                      # Router and layout configuration
    │   ├── index.css                    # Tailwind CSS v4 & theme definitions
    │   └── main.tsx                     # React 19 root entry
    ├── package.json
    └── vite.config.ts
```

---

## 3. Pages & Routes

- `/` — **Home**: Authentic positioning, bio, compact verified activity widget, 3 featured projects, 3 recent engineering milestones, and direct contact channels.
- `/work` — **Selected Work**: Filterable project gallery (Backend & Systems, AI & IR, Full-Stack) with explicit contribution notes.
- `/work/:slug` — **Project Detail**: Problem statement, verified actual contribution, technologies genuinely used, architecture decisions, lessons learned, and code evidence.
- `/engineering` — **Engineering Log**: Curated archive of daily backend and database experiments with topic filters, search, and page-based pagination.
- `/engineering/:slug` — **Entry Detail**: Stable permalinks with detailed mental models, code/SQL verification snippets, and direct links to GitHub commits.
- `/about` — **About & Philosophy**: SVIET education details (CGPA: 8.14/10), capability boundaries table, verified hackathon achievement (3rd Place INR 20k), selected resume download, and direct communication links (Email, WhatsApp, LinkedIn, GitHub).

---

## 4. How to Add Content (Future Automation Friendly)

The site strictly separates presentation from content. You can update or append records directly in `frontend/src/data/`:

### Adding an Engineering Log Entry (`src/data/engineeringLog.ts`)
```ts
{
  id: "day-21",
  slug: "day-21-cursor-pagination",
  dayNumber: 21,
  date: "2026-10-24",
  title: "Day 21: Keyset / Cursor Pagination in PostgreSQL",
  topic: "Backend Architecture",
  status: "completed",
  summary: "Replacing OFFSET with WHERE id > last_seen_id for constant-time page access.",
  keyTakeaway: "Cursor pagination avoids table scans by leveraging B-tree index ordering.",
  details: [
    "Wrote query comparing execution cost of OFFSET 10000 vs WHERE id > 10000.",
    "Observed dramatic execution time reduction on large tables."
  ],
  codeSnippet: {
    language: "sql",
    caption: "Keyset query pattern",
    code: "SELECT * FROM items WHERE id > $1 ORDER BY id ASC LIMIT 20;"
  },
  evidenceCommit: {
    hash: "abc1234",
    date: "2026-10-24",
    message: "keyset pagination implementation",
    url: "https://github.com/Pixelated-Sage/abhishek-engineering-labs/commit/abc1234"
  },
  repoPath: "backend/day-21-cursor-pagination"
}
```

### Adding a Verified Activity Record (`src/data/activityLog.ts`)
Append a new object to `activityRecords`. The `computeStreakStats()` utility automatically re-calculates consecutive verified days and updates the calendar grid without manual calculation.

---

## 5. Development & Build Commands

All client commands are run inside the `frontend` folder:

```bash
cd frontend

# Install dependencies
npm install

# Start local development server (with HMR)
npm run dev

# Run TypeScript check & production build
npm run build

# Preview production build locally
npm run preview

# Run ESLint linter
npm run lint
```

---

## 6. Deployment Process

V2.0 produces a 100% static client bundle in `frontend/dist/`. It requires no runtime Node backend, server daemon, or database server.

### Preview Deployment (Vercel / Netlify / Cloudflare Pages)

1. Connect the repository to your hosting provider (or use the CLI).
2. Set **Root Directory** to `frontend`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Deploy to a preview domain first to inspect routes, mobile responsiveness, and assets.
6. Once approved, point the production domain to the new deployment.

---

## 7. Integrity & Content Standards

- **Verified Resume**: Points to `context/Abhishek.pdf` (saved as `/Abhishek-Sharma-Backend-Resume.pdf`), accurately reflecting backend engineering competencies.
- **Activity & Streak**: Calculated only from date-indexed verified records. No synthetic gap-filling or artificial streak counters.
- **Confidentiality**: Commercially sensitive details (Teaching Platform, unreleased OXLATE business strategy) and unowned historical projects (such as Real-Time Dispatch Dashboard) are excluded from this public identity site.
