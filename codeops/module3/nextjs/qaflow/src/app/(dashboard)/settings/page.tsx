import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-2 border-b">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="h-6 w-6 text-slate-600" />
          Settings & Workspace Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal profile, notification triggers, and API tokens
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Profile Information
            </CardTitle>
            <CardDescription className="text-xs">
              Update your display name and email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Bonsa Tesfaye" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="engineer@qaflow.dev" disabled />
              </div>
            </div>
            <Button size="sm" className="text-xs">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Key className="h-4 w-4 text-blue-600" />
              API & Webhook Integrations
            </CardTitle>
            <CardDescription className="text-xs">
              Personal access tokens for CI/CD Playwright & GitHub Actions
              integration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-900 font-mono text-xs flex items-center justify-between">
              <span>qaflow_pat_9a8f7b6c5d4e3f2a1b0c</span>
              <Button size="sm" variant="outline" className="text-xs">
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
