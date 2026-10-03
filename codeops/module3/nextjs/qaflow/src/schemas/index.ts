import { z } from "zod";

// ==========================================
// AUTH SCHEMAS
// ==========================================

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum(["ADMIN", "QA_MANAGER", "QA_ENGINEER", "VIEWER"])
    .default("QA_ENGINEER"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ==========================================
// PROJECT SCHEMAS
// ==========================================

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100),
  key: z
    .string()
    .min(2, "Project key must be at least 2 characters")
    .max(10)
    .regex(
      /^[A-Z0-9]+$/,
      "Project key must be uppercase alphanumeric (e.g. ECOM)",
    ),
  description: z.string().max(1000).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED"]).default("ACTIVE"),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ==========================================
// TEST SUITE SCHEMAS
// ==========================================

export const testSuiteSchema = z.object({
  name: z.string().min(2, "Suite name must be at least 2 characters").max(100),
  description: z.string().max(1000).optional(),
  parentId: z.string().uuid().optional().nullable(),
  orderIndex: z.number().int().default(0),
});

export type TestSuiteInput = z.infer<typeof testSuiteSchema>;

// ==========================================
// TEST CASE & STEP SCHEMAS
// ==========================================

export const testStepSchema = z.object({
  stepNumber: z.number().int().min(1),
  action: z.string().min(1, "Step action is required"),
  expectedResult: z.string().optional().nullable(),
});

export const testCaseSchema = z.object({
  key: z.string().min(2, "Test case key is required"),
  suiteId: z.string().uuid().optional().nullable(),
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().optional().nullable(),
  preconditions: z.string().optional().nullable(),
  expectedResult: z.string().optional().nullable(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  type: z
    .enum([
      "FUNCTIONAL",
      "REGRESSION",
      "SMOKE",
      "SANITY",
      "INTEGRATION",
      "E2E",
      "PERFORMANCE",
      "SECURITY",
    ])
    .default("FUNCTIONAL"),
  status: z.enum(["DRAFT", "READY", "ACTIVE", "DEPRECATED"]).default("ACTIVE"),
  severity: z
    .enum(["TRIVIAL", "MINOR", "MAJOR", "CRITICAL", "BLOCKER"])
    .default("MAJOR"),
  assigneeId: z.string().uuid().optional().nullable(),
  steps: z.array(testStepSchema).optional(),
  tagIds: z.array(z.string().uuid()).optional(),
});

export type TestCaseInput = z.infer<typeof testCaseSchema>;

// ==========================================
// TEST RUN & EXECUTION SCHEMAS
// ==========================================

export const testRunSchema = z.object({
  name: z.string().min(3, "Test run name is required"),
  description: z.string().optional().nullable(),
  environment: z.string().min(1, "Environment is required").default("Staging"),
  browser: z.string().min(1, "Browser is required").default("Chrome"),
  testCaseIds: z
    .array(z.string().uuid())
    .min(1, "Select at least one test case"),
});

export type TestRunInput = z.infer<typeof testRunSchema>;

export const executionResultSchema = z.object({
  testExecutionId: z.string().uuid(),
  status: z.enum(["PASS", "FAIL", "BLOCKED", "NOT_RUN"]),
  actualResult: z.string().optional().nullable(),
  failureReason: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type ExecutionResultInput = z.infer<typeof executionResultSchema>;

// ==========================================
// BUG SCHEMAS
// ==========================================

export const bugSchema = z.object({
  key: z.string().min(2, "Bug key is required"),
  title: z.string().min(3, "Bug title must be at least 3 characters").max(200),
  description: z.string().optional().nullable(),
  stepsToReproduce: z.string().optional().nullable(),
  expectedResult: z.string().optional().nullable(),
  actualResult: z.string().optional().nullable(),
  severity: z
    .enum(["TRIVIAL", "MINOR", "MAJOR", "CRITICAL", "BLOCKER"])
    .default("MAJOR"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  status: z
    .enum(["OPEN", "IN_PROGRESS", "RESOLVED", "REOPENED", "CLOSED", "WONT_FIX"])
    .default("OPEN"),
  assigneeId: z.string().uuid().optional().nullable(),
  environment: z.string().optional().nullable(),
  browser: z.string().optional().nullable(),
  linkedTestCaseId: z.string().uuid().optional().nullable(),
  linkedTestRunId: z.string().uuid().optional().nullable(),
  linkedTestExecutionId: z.string().uuid().optional().nullable(),
});

export type BugInput = z.infer<typeof bugSchema>;
