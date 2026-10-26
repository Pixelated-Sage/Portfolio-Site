-- PostgreSQL Schema for Portfolio V2.1 Local AI Publishing Engine

CREATE TABLE IF NOT EXISTS checkpoints (
    id SERIAL PRIMARY KEY,
    repo_name VARCHAR(100) NOT NULL UNIQUE,
    repo_path TEXT NOT NULL,
    last_commit_hash VARCHAR(40) NOT NULL,
    last_commit_date TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS raw_notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    content_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS formatted_notes (
    id SERIAL PRIMARY KEY,
    raw_note_id INT REFERENCES raw_notes(id),
    day_number INT NOT NULL,
    date DATE NOT NULL,
    title TEXT NOT NULL,
    topic TEXT NOT NULL,
    key_learnings TEXT[] NOT NULL,
    formatted_markdown TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS publishing_records (
    id SERIAL PRIMARY KEY,
    entry_id VARCHAR(50) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    day_number INT NOT NULL,
    entry_date DATE NOT NULL,
    title TEXT NOT NULL,
    topic VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    approval_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    commit_hash VARCHAR(40),
    evidence_sources JSONB,
    audit_results JSONB,
    full_entry JSONB NOT NULL,
    raw_note_id INT REFERENCES raw_notes(id),
    formatted_note_id INT REFERENCES formatted_notes(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_publishing_records_day ON publishing_records(day_number);
CREATE INDEX IF NOT EXISTS idx_publishing_records_date ON publishing_records(entry_date);
CREATE UNIQUE INDEX IF NOT EXISTS idx_publishing_records_approved_slug ON publishing_records(slug) WHERE approval_status = 'APPROVED';
CREATE UNIQUE INDEX IF NOT EXISTS idx_publishing_records_approved_day ON publishing_records(day_number) WHERE approval_status = 'APPROVED';
