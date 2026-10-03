import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TestCaseEditorDialog } from "@/components/test-cases/test-case-editor-dialog";
import { FileCode2 } from "lucide-react";

export default function TestCasesPage() {
  const testCases = [
    {
      id: "tc-1",
      key: "TC-AUTH-001",
      title: "Login with valid email and password",
      suite: "Authentication > Login & MFA",
      priority: "CRITICAL",
      type: "SMOKE",
      status: "ACTIVE",
    },
    {
      id: "tc-2",
      key: "TC-AUTH-002",
      title: "MFA code verification timeout",
      suite: "Authentication > Login & MFA",
      priority: "HIGH",
      type: "SECURITY",
      status: "ACTIVE",
    },
    {
      id: "tc-3",
      key: "TC-PAY-021",
      title: "Payment transaction via Telebirr gateway",
      suite: "Payment Gateways",
      priority: "CRITICAL",
      type: "E2E",
      status: "ACTIVE",
    },
    {
      id: "tc-4",
      key: "TC-CHK-014",
      title: "Prevent checkout button action on empty cart",
      suite: "Shopping & Checkout",
      priority: "MEDIUM",
      type: "FUNCTIONAL",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileCode2 className="h-6 w-6 text-indigo-600" />
            Test Cases Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Author, organize into suites, and maintain version-controlled test
            cases
          </p>
        </div>
        <TestCaseEditorDialog />
      </div>

      <div className="space-y-3">
        {testCases.map((tc) => (
          <Card
            key={tc.id}
            className="border shadow-sm hover:border-blue-500/40 transition-colors"
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                    {tc.key}
                  </span>
                  <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {tc.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{tc.suite}</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-mono"
                >
                  {tc.type}
                </Badge>
                <Badge
                  variant={
                    tc.priority === "CRITICAL" ? "destructive" : "secondary"
                  }
                  className="text-[10px] uppercase"
                >
                  {tc.priority}
                </Badge>
                <Badge variant="pass" className="text-[10px] uppercase">
                  {tc.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
