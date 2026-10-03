import * as React from "react";
import { ShieldCheck, Bug, GitBranch } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Left Branding Side - Visible on Large Screens */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
            Q
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight">QAFlow</span>
            <span className="block text-[11px] text-slate-400 font-medium tracking-wider uppercase">
              Test Ops Platform
            </span>
          </div>
        </div>

        {/* Center Feature Highlights */}
        <div className="space-y-8 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-800/60">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            Built for Modern QA & SDET Teams
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 leading-snug">
            Streamline test design, execution sessions, and bug traceability.
          </h2>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3 text-slate-300 text-sm">
              <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-blue-400">
                <GitBranch className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">
                  Hierarchical Test Suites
                </p>
                <p className="text-xs text-slate-400">
                  Organize smoke, regression, and security tests with
                  step-by-step actions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-300 text-sm">
              <div className="h-7 w-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-rose-400">
                <Bug className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">
                  End-to-End Bug Traceability
                </p>
                <p className="text-xs text-slate-400">
                  Instantly link failing runs to tickets with stack traces and
                  attachments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-500 relative z-10">
          &copy; {new Date().getFullYear()} QAFlow Systems Inc. All rights
          reserved.
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base">
              Q
            </div>
            <span className="font-bold text-xl">QAFlow</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
