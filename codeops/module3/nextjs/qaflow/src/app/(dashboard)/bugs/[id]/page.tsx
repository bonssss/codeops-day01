"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { updateBugStatus, addBugComment } from "@/actions/bugs";
import {
  ArrowLeft,
  Link2,
  PlaySquare,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";

export default function BugDetailPage() {
  const params = useParams();
  const bugKey = (params?.id as string) || "BUG-104";

  const [status, setStatus] = React.useState<
    "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
  >("OPEN");
  const [commentText, setCommentText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [comments, setComments] = React.useState([
    {
      id: "c-1",
      user: "Sarah Jenkins (QA Manager)",
      time: "2 hours ago",
      text: "Flagged this as high priority blocker for tomorrow's release. Notified backend team.",
    },
    {
      id: "c-2",
      user: "Bonsa Tesfaye (Senior SDET)",
      time: "1 hour ago",
      text: "Attached backend gateway logs showing timeout on microservice callback endpoint.",
    },
  ]);

  const bug = {
    key: bugKey,
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
    severity: "BLOCKER",
    priority: "CRITICAL",
    environment: "Staging",
    browser: "Chrome 128",
    reporter: "Bonsa Tesfaye",
    assignee: "Bonsa Tesfaye",
    linkedTestCase: "TC-PAY-021",
    linkedTestRun: "RUN #24",
  };

  const handleStatusChange = async (
    newStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
  ) => {
    setStatus(newStatus);
    await updateBugStatus(bug.key, newStatus);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        user: "Bonsa Tesfaye",
        time: "Just now",
        text: commentText,
      },
    ]);

    await addBugComment(bug.key, commentText);
    setCommentText("");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Link & Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/bugs"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Bug Tracker
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Status:</span>
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(
                e.target.value as
                  "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
              )
            }
            className="h-8 rounded-md border border-input bg-transparent px-2.5 py-0 text-xs font-semibold shadow-sm"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Main Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                  {bug.key}
                </span>
                <Badge
                  variant="destructive"
                  className="text-[10px] uppercase font-bold"
                >
                  {bug.severity}
                </Badge>
                <Badge variant="secondary" className="text-[10px] uppercase">
                  {bug.priority}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {bug.title}
              </CardTitle>
              <CardDescription className="text-xs">
                {bug.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-xs text-slate-700 dark:text-slate-300">
                  Steps to Reproduce:
                </h3>
                <pre className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border font-sans text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {bug.stepsToReproduce}
                </pre>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border text-xs space-y-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Expected Result:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    {bug.expectedResult}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs space-y-1">
                  <span className="font-semibold text-rose-800 dark:text-rose-200">
                    Actual Result:
                  </span>
                  <p className="text-rose-700 dark:text-rose-300">
                    {bug.actualResult}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments & Activity Thread */}
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                Comments & Investigation ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {c.user}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleAddComment}
                className="flex gap-2 pt-2 border-t"
              >
                <input
                  type="text"
                  required
                  placeholder="Add a comment or paste gateway log trace..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 rounded-md border border-input bg-transparent px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting || !commentText.trim()}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-3 w-3 mr-1" />
                      Post
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Traceability Sidebar */}
        <div className="space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Traceability Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg border bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Linked Test Case
                </span>
                <Link
                  href={`/test-cases`}
                  className="font-mono font-bold text-blue-600 flex items-center gap-1.5 mt-0.5 hover:underline"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  {bug.linkedTestCase}
                </Link>
              </div>

              <div className="p-2.5 rounded-lg border bg-purple-50/50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">
                  Originating Test Run
                </span>
                <Link
                  href={`/test-runs/run-24`}
                  className="font-mono font-bold text-purple-600 flex items-center gap-1.5 mt-0.5 hover:underline"
                >
                  <PlaySquare className="h-3.5 w-3.5" />
                  {bug.linkedTestRun}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ticket Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Reporter:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {bug.reporter}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Assignee:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {bug.assignee}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Environment:</span>
                <span>{bug.environment}</span>
              </div>
              <div className="flex justify-between">
                <span>Browser:</span>
                <span>{bug.browser}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
