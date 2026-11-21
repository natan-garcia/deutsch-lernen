# ADR 0001: React + TypeScript frontend, ASP.NET Core backend

- Status: accepted
- Date: 2026-11-20

## Context

The project is a portfolio piece aimed at the Swiss job market and a tool I use myself to learn German.
React with TypeScript appears in most Swiss frontend job ads. On the backend, .NET is widely used in Swiss
banking, insurance and industry, and I already work with C#.

## Decision

- Frontend: React 19, Vite, TypeScript, React Router, TanStack Query, Tailwind CSS.
- Backend: ASP.NET Core Minimal API on .NET 10 (LTS), EF Core.
- Python is kept for a later, separate microservice (assisted import, pronunciation scoring), not the core API.

## Consequences

- Learning effort goes into React, the new skill; the backend uses a stack I already know well.
- A future Python service sits behind interfaces (`IResourceImporter`, `SpeechService`), so it does not change the core.
