# QAFlow — Professional Test Management Platform

**QAFlow** is an enterprise-grade test management and QA traceability platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, PostgreSQL, and Prisma ORM.

---

## 🚀 Phase 1 Foundation Overview

Phase 1 establishes the database schema, domain models, validation schemas, design tokens, and seed dataset.

### 🗄️ Normalized Database Schema (Prisma)

- **Users & Auth**: Multi-role RBAC (`ADMIN`, `QA_MANAGER`, `QA_ENGINEER`, `VIEWER`), Auth.js Account & Session tables.
- **Projects**: Multi-project tenancy with project keys (`ECOM`, `BANK`, `PHARM`), membership roles, and archiving.
- **Test Suites**: Hierarchical suite structure supporting nested folders and sub-suites.
- **Test Cases**: Full metadata including priorities, test types, execution status, preconditions, and dynamic ordered `TestStep` records.
- **Test Runs & Executions**: Session execution tracking with environment, browser, individual test outcomes (`PASS`, `FAIL`, `BLOCKED`, `NOT_RUN`), and failure diagnostics.
- **Bugs & Traceability**: Bidirectional linking between Bugs, Test Cases, and Test Executions. Comments and attachment tracking.
- **Notifications**: In-app notifications for assignments, status changes, and execution results.

---

## 🛠️ Tech Stack & Tooling

| Layer              | Technology                                        |
| ------------------ | ------------------------------------------------- |
| **Framework**      | Next.js 16 (App Router with Turbopack)            |
| **Language**       | TypeScript (Strict mode)                          |
| **Styling**        | Tailwind CSS + shadcn/ui tokens (Light/Dark mode) |
| **ORM & Database** | Prisma 6 + PostgreSQL                             |
| **Validation**     | Zod + React Hook Form                             |
| **Icons & Charts** | Lucide React + Recharts                           |

---

## 📋 Getting Started

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/qaflow?schema=public"
AUTH_SECRET="dev-secret-key-qaflow-auth-2026-production-testing-token"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Available NPM Scripts

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Start development server at `http://localhost:3000` |
| `npm run build`           | Build optimized production bundle                   |
| `npm run prisma:generate` | Generate type-safe Prisma client                    |
| `npm run prisma:push`     | Push schema directly to database                    |
| `npm run prisma:migrate`  | Run Prisma migration in dev mode                    |
| `npm run prisma:seed`     | Seed database with realistic QA dataset             |
| `npm run prisma:studio`   | Open Prisma Studio GUI                              |
| `npm run typecheck`       | Run TypeScript compiler verification                |
| `npm run lint`            | Run ESLint check                                    |
| `npm run format`          | Run Prettier formatter                              |

---

## 👥 Seed Credentials

When seeded via `npm run prisma:seed`, the database includes 5 accounts (password for all: `password123`):

| Name          | Email                 | Role          |
| ------------- | --------------------- | ------------- |
| Alex Vance    | `admin@qaflow.dev`    | `ADMIN`       |
| Sarah Jenkins | `manager@qaflow.dev`  | `QA_MANAGER`  |
| Bonsa Tesfaye | `engineer@qaflow.dev` | `QA_ENGINEER` |
| John Doe      | `john@qaflow.dev`     | `QA_ENGINEER` |
| Elena Rostova | `viewer@qaflow.dev`   | `VIEWER`      |
