# ADR 0002: Local SQLite database and content packages

- Status: accepted
- Date: 2026-11-20

## Context

Everyone runs their own instance locally and must be able to add, edit and delete learning resources freely,
while all instances share one data format so resources can move between them.

## Decision

- Resources are described by versioned JSON Schemas in `content/schema/` (`schemaVersion: 1`).
- A **resource package** (`manifest.json` + one file per resource type) is the unit that is imported, exported and shared.
- The repository ships an example package (`content/packages/a1-starter`). On first start it is loaded into an
  empty SQLite database; from then on the database belongs to the user and updates to the code never overwrite it.
- Import v1 accepts already-structured files (JSON in the common format, CSV with a fixed template).
  Assisted import from free text or web pages comes in v1.1 through a local tool.

## Consequences

- Zero installation: SQLite is a file. Moving to PostgreSQL later is a provider change in EF Core.
- The schema is the contract between instances; breaking changes need a new `schemaVersion` and a migration on import.
- The skeleton uses `EnsureCreated`; EF Core migrations will replace it before the schema of the database changes.
