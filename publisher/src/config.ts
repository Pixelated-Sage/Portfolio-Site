import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from publisher root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ConfigSchema = z.object({
  pgHost: z.string().default('localhost'),
  pgPort: z.coerce.number().default(5432),
  pgUser: z.string().default(process.env.USER || 'abhishek'),
  pgPassword: z.string().default(''),
  pgDatabase: z.string().default('portfolio_publisher'),

  ollamaBaseUrl: z.string().url().default('http://localhost:11434'),
  ollamaModel: z.string().default('qwen2.5:3b-instruct'),

  portfolioRepoPath: z
    .string()
    .default(path.resolve(__dirname, '../../')),
  labRepoPath: z
    .string()
    .default('/home/abhishek/Documents/C02/abhishek-engineering-labs'),
  inputNotePath: z
    .string()
    .default(path.resolve(__dirname, '../../input/today.md')),

  gitRemote: z.string().default('origin'),
  gitBranch: z.string().default('master'),
});

export const config = ConfigSchema.parse({
  pgHost: process.env.PGHOST,
  pgPort: process.env.PGPORT,
  pgUser: process.env.PGUSER,
  pgPassword: process.env.PGPASSWORD,
  pgDatabase: process.env.PGDATABASE,

  ollamaBaseUrl: process.env.OLLAMA_BASE_URL,
  ollamaModel: process.env.OLLAMA_MODEL,

  portfolioRepoPath: process.env.PORTFOLIO_REPO_PATH,
  labRepoPath: process.env.LAB_REPO_PATH,
  inputNotePath: process.env.INPUT_NOTE_PATH,

  gitRemote: process.env.GIT_REMOTE,
  gitBranch: process.env.GIT_BRANCH,
});
