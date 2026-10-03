import {
  PrismaClient,
  UserRole,
  ProjectRole,
  ProjectStatus,
  TestCasePriority,
  TestCaseType,
  TestCaseStatus,
  BugSeverity,
  BugPriority,
  BugStatus,
  TestRunStatus,
  TestExecutionStatus,
  NotificationType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting QAFlow database seeding...");

  // 1. Clear existing data in correct dependency order
  await prisma.notification.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.bugComment.deleteMany();
  await prisma.bug.deleteMany();
  await prisma.testExecution.deleteMany();
  await prisma.testRun.deleteMany();
  await prisma.testCaseTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.testStep.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.testSuite.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Existing records cleaned.");

  // 2. Create Users
  const defaultPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@qaflow.dev",
      name: "Alex Vance",
      passwordHash: defaultPassword,
      role: UserRole.ADMIN,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: "manager@qaflow.dev",
      name: "Sarah Jenkins",
      passwordHash: defaultPassword,
      role: UserRole.QA_MANAGER,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  });

  const engineer = await prisma.user.create({
    data: {
      email: "engineer@qaflow.dev",
      name: "Bonsa Tesfaye",
      passwordHash: defaultPassword,
      role: UserRole.QA_ENGINEER,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bonsa",
    },
  });

  const john = await prisma.user.create({
    data: {
      email: "john@qaflow.dev",
      name: "John Doe",
      passwordHash: defaultPassword,
      role: UserRole.QA_ENGINEER,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  });

  const viewer = await prisma.user.create({
    data: {
      email: "viewer@qaflow.dev",
      name: "Elena Rostova",
      passwordHash: defaultPassword,
      role: UserRole.VIEWER,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
  });

  console.log("👤 Created 5 initial users.");

  // 3. Create Projects
  const ecomProject = await prisma.project.create({
    data: {
      name: "E-Commerce Platform",
      key: "ECOM",
      description:
        "Modern cloud-native retail e-commerce platform with microservices checkout, inventory, and payment gateways.",
      status: ProjectStatus.ACTIVE,
      ownerId: admin.id,
      members: {
        create: [
          { userId: admin.id, role: ProjectRole.PROJECT_ADMIN },
          { userId: manager.id, role: ProjectRole.QA_MANAGER },
          { userId: engineer.id, role: ProjectRole.QA_ENGINEER },
          { userId: john.id, role: ProjectRole.QA_ENGINEER },
          { userId: viewer.id, role: ProjectRole.VIEWER },
        ],
      },
    },
  });

  const bankProject = await prisma.project.create({
    data: {
      name: "Banking Portal",
      key: "BANK",
      description:
        "High-security digital banking core handling multi-currency accounts, wire transfers, and regulatory compliance.",
      status: ProjectStatus.ACTIVE,
      ownerId: manager.id,
      members: {
        create: [
          { userId: manager.id, role: ProjectRole.PROJECT_ADMIN },
          { userId: engineer.id, role: ProjectRole.QA_ENGINEER },
          { userId: viewer.id, role: ProjectRole.VIEWER },
        ],
      },
    },
  });

  const pharmProject = await prisma.project.create({
    data: {
      name: "Pharmacy Management System",
      key: "PHARM",
      description:
        "Prescription verification, hospital dispensary tracking, and automated stock reordering platform.",
      status: ProjectStatus.ACTIVE,
      ownerId: admin.id,
      members: {
        create: [
          { userId: admin.id, role: ProjectRole.PROJECT_ADMIN },
          { userId: manager.id, role: ProjectRole.QA_MANAGER },
          { userId: john.id, role: ProjectRole.QA_ENGINEER },
        ],
      },
    },
  });

  console.log("📁 Created 3 active projects.");

  // 4. Create Tags for E-Commerce
  const tagSmoke = await prisma.tag.create({
    data: { projectId: ecomProject.id, name: "smoke", color: "#ef4444" },
  });
  const tagCritical = await prisma.tag.create({
    data: {
      projectId: ecomProject.id,
      name: "critical-path",
      color: "#f97316",
    },
  });
  const tagPayment = await prisma.tag.create({
    data: { projectId: ecomProject.id, name: "payment", color: "#10b981" },
  });
  const tagAuth = await prisma.tag.create({
    data: { projectId: ecomProject.id, name: "auth", color: "#3b82f6" },
  });

  // 5. Create Test Suites for E-Commerce
  const authSuite = await prisma.testSuite.create({
    data: {
      projectId: ecomProject.id,
      name: "Authentication & Security",
      description:
        "User registration, login, JWT token renewal, MFA, and OAuth workflows.",
      orderIndex: 1,
    },
  });

  const loginSubSuite = await prisma.testSuite.create({
    data: {
      projectId: ecomProject.id,
      parentId: authSuite.id,
      name: "Login & MFA",
      description: "Standard credential login, remember me, 2FA prompt.",
      orderIndex: 1,
    },
  });

  const checkoutSuite = await prisma.testSuite.create({
    data: {
      projectId: ecomProject.id,
      name: "Shopping & Checkout",
      description:
        "Cart calculations, discounts, inventory locks, and one-page checkout.",
      orderIndex: 2,
    },
  });

  const paymentSuite = await prisma.testSuite.create({
    data: {
      projectId: ecomProject.id,
      name: "Payment Gateways",
      description:
        "Credit Card, Telebirr, Stripe, and Webhook callback integrity.",
      orderIndex: 3,
    },
  });

  // Test Suites for Banking & Pharmacy Projects
  const bankTransferSuite = await prisma.testSuite.create({
    data: {
      projectId: bankProject.id,
      name: "Funds Transfers & Wire",
      description: "Inter-bank clearing and SWIFT wire transfer workflows.",
      orderIndex: 1,
    },
  });

  const pharmPrescriptionSuite = await prisma.testSuite.create({
    data: {
      projectId: pharmProject.id,
      name: "Prescription Verification",
      description: "Doctor signature validation and dosage limits.",
      orderIndex: 1,
    },
  });

  console.log("📦 Created hierarchical test suites across projects.");

  // 6. Create Test Cases for E-Commerce
  const tcLogin = await prisma.testCase.create({
    data: {
      projectId: ecomProject.id,
      suiteId: loginSubSuite.id,
      key: "TC-AUTH-001",
      title: "Login with valid email and password",
      description:
        "Verify that an active user can authenticate and access the main dashboard.",
      preconditions: "User has a verified account in the database.",
      expectedResult:
        "User is authenticated and redirected to /dashboard with an active JWT session.",
      priority: TestCasePriority.CRITICAL,
      type: TestCaseType.SMOKE,
      status: TestCaseStatus.ACTIVE,
      severity: BugSeverity.BLOCKER,
      assigneeId: engineer.id,
      createdById: manager.id,
      steps: {
        create: [
          {
            stepNumber: 1,
            action: "Navigate to /login in browser",
            expectedResult:
              "Login form renders with email, password, and submit button.",
          },
          {
            stepNumber: 2,
            action: "Enter valid registered email: 'engineer@qaflow.dev'",
            expectedResult:
              "Input field accepts email with green validation indicator.",
          },
          {
            stepNumber: 3,
            action: "Enter valid password 'password123'",
            expectedResult: "Password field is masked.",
          },
          {
            stepNumber: 4,
            action: "Click 'Sign In' button",
            expectedResult:
              "Redirects to /dashboard and displays user profile avatar.",
          },
        ],
      },
      tags: {
        create: [{ tagId: tagSmoke.id }, { tagId: tagAuth.id }],
      },
    },
  });

  const tcMfa = await prisma.testCase.create({
    data: {
      projectId: ecomProject.id,
      suiteId: loginSubSuite.id,
      key: "TC-AUTH-002",
      title: "MFA code verification timeout",
      description:
        "Ensure that entering an expired 6-digit TOTP code rejects authentication gracefully.",
      preconditions: "User has MFA enabled on account.",
      expectedResult:
        "Error banner displays 'Code expired. Please request a new code.'",
      priority: TestCasePriority.HIGH,
      type: TestCaseType.SECURITY,
      status: TestCaseStatus.ACTIVE,
      severity: BugSeverity.CRITICAL,
      assigneeId: engineer.id,
      createdById: manager.id,
      steps: {
        create: [
          {
            stepNumber: 1,
            action: "Submit valid username and password for MFA user",
            expectedResult: "Prompted with 6-digit TOTP challenge input.",
          },
          {
            stepNumber: 2,
            action: "Wait 95 seconds for TOTP code window to expire",
            expectedResult: "Timer indicator updates.",
          },
          {
            stepNumber: 3,
            action: "Enter expired TOTP code and submit",
            expectedResult:
              "System rejects authentication with 401 Unauthorized warning.",
          },
        ],
      },
      tags: {
        create: [{ tagId: tagAuth.id }],
      },
    },
  });

  const tcTelebirr = await prisma.testCase.create({
    data: {
      projectId: ecomProject.id,
      suiteId: paymentSuite.id,
      key: "TC-PAY-021",
      title: "Payment transaction via Telebirr gateway",
      description:
        "Verify end-to-end checkout with Telebirr mobile wallet redirect and callback.",
      preconditions:
        "Cart has items totaling > 0 ETB. Valid test mobile number provided.",
      expectedResult:
        "Order is marked as PAID and invoice receipt is generated.",
      priority: TestCasePriority.CRITICAL,
      type: TestCaseType.E2E,
      status: TestCaseStatus.ACTIVE,
      severity: BugSeverity.BLOCKER,
      assigneeId: engineer.id,
      createdById: manager.id,
      steps: {
        create: [
          {
            stepNumber: 1,
            action: "Add 2 items to shopping cart and proceed to checkout",
            expectedResult: "Order summary displays correct total and taxes.",
          },
          {
            stepNumber: 2,
            action:
              "Select 'Telebirr' as payment provider and enter phone '+251911223344'",
            expectedResult: "Payment modal triggers USSD push request.",
          },
          {
            stepNumber: 3,
            action:
              "Confirm PIN on simulator and await server webhook response",
            expectedResult: "Webhook updates order status to COMPLETED.",
          },
        ],
      },
      tags: {
        create: [{ tagId: tagPayment.id }, { tagId: tagCritical.id }],
      },
    },
  });

  const tcEmptyCart = await prisma.testCase.create({
    data: {
      projectId: ecomProject.id,
      suiteId: checkoutSuite.id,
      key: "TC-CHK-014",
      title: "Prevent checkout button action on empty cart",
      description:
        "Verify that user cannot trigger checkout when item count is 0.",
      preconditions: "User cart has 0 items.",
      expectedResult:
        "Checkout button is disabled with tooltip 'Cart is empty'.",
      priority: TestCasePriority.MEDIUM,
      type: TestCaseType.FUNCTIONAL,
      status: TestCaseStatus.ACTIVE,
      severity: BugSeverity.MINOR,
      assigneeId: john.id,
      createdById: manager.id,
      steps: {
        create: [
          {
            stepNumber: 1,
            action: "Clear all cart items",
            expectedResult: "Cart badge shows 0.",
          },
          {
            stepNumber: 2,
            action: "Inspect Checkout button state",
            expectedResult:
              "Button has disabled attribute and greyed-out opacity.",
          },
        ],
      },
    },
  });

  // Additional Test Cases for Bank & Pharm
  await prisma.testCase.create({
    data: {
      projectId: bankProject.id,
      suiteId: bankTransferSuite.id,
      key: "TC-BNK-101",
      title: "International Wire Transfer limit check",
      description:
        "Verify wire transfers > $50,000 trigger secondary manager approval prompt.",
      expectedResult: "Transfer status transitions to PENDING_APPROVAL.",
      priority: TestCasePriority.HIGH,
      type: TestCaseType.REGRESSION,
      status: TestCaseStatus.ACTIVE,
      createdById: manager.id,
    },
  });

  await prisma.testCase.create({
    data: {
      projectId: pharmProject.id,
      suiteId: pharmPrescriptionSuite.id,
      key: "TC-PHM-005",
      title: "Controlled substance digital prescription counter-signature",
      description:
        "Verify Schedule II drugs require dual medical license verification.",
      expectedResult:
        "System blocks dispensing until second doctor token provided.",
      priority: TestCasePriority.CRITICAL,
      type: TestCaseType.SECURITY,
      status: TestCaseStatus.ACTIVE,
      createdById: admin.id,
    },
  });

  console.log("🧪 Created detailed test cases with steps and tags.");

  // 7. Create Test Run #1
  const testRun1 = await prisma.testRun.create({
    data: {
      projectId: ecomProject.id,
      runNumber: 24,
      name: "Sprint 42 - Regression Test Run",
      description:
        "Full regression suite covering Auth, Shopping, and Payment before staging release.",
      environment: "Staging",
      browser: "Chrome 128 (Desktop)",
      status: TestRunStatus.COMPLETED,
      createdById: manager.id,
      startedAt: new Date(Date.now() - 3600 * 1000 * 4),
      completedAt: new Date(Date.now() - 3600 * 1000 * 1),
      executions: {
        create: [
          {
            testCaseId: tcLogin.id,
            executedById: engineer.id,
            status: TestExecutionStatus.PASS,
            actualResult:
              "User authenticated in 180ms and redirected to dashboard successfully.",
            notes: "Verified on Chrome and Firefox.",
            executedAt: new Date(Date.now() - 3600 * 1000 * 3),
          },
          {
            testCaseId: tcMfa.id,
            executedById: engineer.id,
            status: TestExecutionStatus.PASS,
            actualResult:
              "Expired token correctly returned 401 with informative error message.",
            executedAt: new Date(Date.now() - 3600 * 1000 * 2.5),
          },
          {
            testCaseId: tcTelebirr.id,
            executedById: engineer.id,
            status: TestExecutionStatus.FAIL,
            actualResult:
              "Webhook callback timed out for amounts > 10,000 ETB, resulting in stuck pending state.",
            failureReason:
              "Gateway webhook timeout HTTP 504 on large volume transactions.",
            notes: "Reproduced consistently 3 out of 3 times.",
            executedAt: new Date(Date.now() - 3600 * 1000 * 2),
          },
          {
            testCaseId: tcEmptyCart.id,
            executedById: john.id,
            status: TestExecutionStatus.PASS,
            actualResult: "Checkout button correctly disabled.",
            executedAt: new Date(Date.now() - 3600 * 1000 * 1.5),
          },
        ],
      },
    },
  });

  const failedExecution = await prisma.testExecution.findFirst({
    where: { testRunId: testRun1.id, testCaseId: tcTelebirr.id },
  });

  // 8. Create Linked Bug
  const bug1 = await prisma.bug.create({
    data: {
      projectId: ecomProject.id,
      key: "BUG-104",
      title:
        "Telebirr webhook drops callback when transaction exceeds 10,000 ETB",
      description:
        "During checkout with Telebirr, if the cart total exceeds 10,000 ETB, the payment gateway webhook fails with a 504 gateway timeout, leaving the order in an orphaned PENDING status.",
      stepsToReproduce:
        "1. Add high-value items to cart (> 10,000 ETB)\n2. Select Telebirr payment option\n3. Authorize transaction on USSD simulator\n4. Observe order state in backend database",
      expectedResult:
        "Webhook responds 200 OK within 500ms and updates order status to COMPLETED.",
      actualResult:
        "Webhook hangs for 30s and throws 504 timeout; user sees eternal spinner.",
      severity: BugSeverity.BLOCKER,
      priority: BugPriority.CRITICAL,
      status: BugStatus.OPEN,
      assigneeId: engineer.id,
      reporterId: engineer.id,
      environment: "Staging",
      browser: "Chrome 128",
      linkedTestCaseId: tcTelebirr.id,
      linkedTestRunId: testRun1.id,
      linkedTestExecutionId: failedExecution?.id,
      comments: {
        create: [
          {
            userId: manager.id,
            content:
              "Flagged this as high priority blocker for tomorrow's release. Notified backend team.",
          },
          {
            userId: engineer.id,
            content:
              "Attached backend gateway logs showing timeout on microservice callback endpoint.",
          },
        ],
      },
    },
  });

  console.log("🐛 Created Bug with full test case & execution traceability.");

  // 9. Create Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: engineer.id,
        title: "Test Case Assigned",
        message: "You were assigned TC-AUTH-001 by Sarah Jenkins.",
        link: `/projects/${ecomProject.id}/test-cases/${tcLogin.id}`,
        type: NotificationType.ASSIGNED_TEST_CASE,
      },
      {
        userId: engineer.id,
        title: "Bug Assigned",
        message:
          "BUG-104 'Telebirr webhook drops callback' was assigned to you.",
        link: `/projects/${ecomProject.id}/bugs/${bug1.id}`,
        type: NotificationType.ASSIGNED_BUG,
      },
      {
        userId: manager.id,
        title: "Test Run Completed",
        message: "Regression Test Run #24 completed with 1 failure.",
        link: `/projects/${ecomProject.id}/test-runs/${testRun1.id}`,
        type: NotificationType.TEST_RUN_COMPLETED,
      },
    ],
  });

  console.log("🔔 Created user notifications.");
  console.log("🎉 Seed finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
