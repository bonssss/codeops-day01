"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Wallet,
  Bell,
  Lock,
  ChevronRight,
  ShieldCheck,
  Save,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { updateTipSettingsAction } from "@/actions/profile";
import { changePasswordAction, deleteAccountAction } from "@/actions/auth";
import { useToast } from "@/components/ui/toast";

interface SettingsData {
  currency: string;
  customTipMessage: string | null;
  suggestedAmounts: number[];
  allowAnonymous: boolean;
  showSupporterWall: boolean;
}

export function SettingsClient({ initialSettings }: { initialSettings: SettingsData }) {
  const router = useRouter();
  const { toast } = useToast();

  const [activeSection, setActiveSection] = React.useState<
    "overview" | "payment" | "payout" | "notifications" | "security" | "tipping"
  >("overview");

  // Tip Settings
  const [currency, setCurrency] = React.useState<"ETB" | "USD" | "EUR">(
    (initialSettings.currency as "ETB" | "USD" | "EUR") || "ETB"
  );
  const [customTipMessage, setCustomTipMessage] = React.useState(
    initialSettings.customTipMessage || ""
  );
  const [amountsStr, setAmountsStr] = React.useState(
    initialSettings.suggestedAmounts.join(", ")
  );
  const [allowAnonymous, setAllowAnonymous] = React.useState(initialSettings.allowAnonymous);
  const [showSupporterWall, setShowSupporterWall] = React.useState(
    initialSettings.showSupporterWall
  );
  const [savingTips, setSavingTips] = React.useState(false);

  // Security Form
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [changingPass, setChangingPass] = React.useState(false);

  // Notifications
  const [notifyTips, setNotifyTips] = React.useState(true);
  const [notifyGoals, setNotifyGoals] = React.useState(true);
  const [notifyWeekly, setNotifyWeekly] = React.useState(false);

  const handleSaveTipSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingTips(true);

    try {
      const parsedAmounts = amountsStr
        .split(",")
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n) && n > 0);

      if (parsedAmounts.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please specify at least one valid amount (e.g. 5, 10, 20)",
          type: "error",
        });
        setSavingTips(false);
        return;
      }

      const res = await updateTipSettingsAction({
        currency,
        customTipMessage: customTipMessage || null,
        suggestedAmounts: parsedAmounts,
        allowAnonymous,
        showSupporterWall,
      });

      if (res.success) {
        toast({
          title: "Settings Saved",
          description: "Preferences updated successfully",
          type: "success",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: res.error || "Failed to update settings",
          type: "error",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setSavingTips(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "New passwords do not match", type: "error" });
      return;
    }

    setChangingPass(true);
    try {
      const res = await changePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        toast({ title: "Password Updated", description: "Your password has been changed", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast({ title: "Error", description: res.error || "Failed to change password", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to update password", type: "error" });
    } finally {
      setChangingPass(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "WARNING: Are you sure you want to delete your account? All your profile data, tips history, and goals will be permanently erased."
      )
    ) {
      return;
    }

    try {
      const res = await deleteAccountAction();
      if (res.success) {
        router.push("/");
      } else {
        toast({ title: "Error", description: res.error || "Failed to delete account", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "Could not delete account", type: "error" });
    }
  };

  const menuItems = [
    {
      id: "profile",
      title: "Profile",
      description: "Update your personal information and profile details.",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      id: "payment",
      title: "Payment methods",
      description: "Manage your cards and payment options.",
      icon: CreditCard,
      onClick: () => setActiveSection("payment"),
    },
    {
      id: "payout",
      title: "Payout settings",
      description: "Set up how you want to receive your earnings.",
      icon: Wallet,
      onClick: () => setActiveSection("payout"),
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Choose what notifications you want to receive.",
      icon: Bell,
      onClick: () => setActiveSection("notifications"),
    },
    {
      id: "security",
      title: "Security",
      description: "Change your password and enable two-factor authentication.",
      icon: Lock,
      onClick: () => setActiveSection("security"),
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Settings Navigation Menu Matching Screen 5 */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-emerald-500/40 transition-all cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          }

          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={`flex items-center justify-between p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all cursor-pointer shadow-xs ${
                activeSection === item.id
                  ? "border-emerald-600 ring-1 ring-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20"
                  : "border-border hover:border-emerald-500/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${activeSection === item.id ? "rotate-90 text-emerald-600" : "text-muted-foreground"}`} />
            </div>
          );
        })}
      </div>

      {/* Expanded Section Details */}
      {activeSection === "payment" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-base text-foreground">Payment Methods</h3>
            <span className="text-xs text-emerald-600 font-semibold">Active Engine: Mock / Telebirr</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Supporters can tip you using Card, Telebirr, CBE Birr, or Chapa. Simulated transactions are verified instantly.
          </p>
          <div className="p-4 rounded-xl bg-muted/60 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-foreground">Instant Payment Simulator</p>
                <p className="text-[11px] text-muted-foreground">Default development & demo mode</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">Connected</span>
          </div>
        </div>
      )}

      {activeSection === "payout" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-base text-foreground">Payout Settings</h3>
            <span className="text-xs text-muted-foreground">Weekly automatic payouts</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Earnings are deposited to your configured mobile wallet or bank account on request or every Monday.
          </p>
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Mobile Wallet or Bank Account Number</label>
              <Input placeholder="e.g. 0911223344 or 100012345678" defaultValue="0911456789" />
            </div>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Payout Details</Button>
          </div>
        </div>
      )}

      {activeSection === "notifications" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
          <h3 className="font-bold text-base text-foreground border-b border-border pb-3">Notification Preferences</h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border cursor-pointer">
              <span>Email notification for every tip received</span>
              <input type="checkbox" checked={notifyTips} onChange={(e) => setNotifyTips(e.target.checked)} className="h-4 w-4 accent-emerald-600" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border cursor-pointer">
              <span>Goal milestone alerts (50%, 100% funded)</span>
              <input type="checkbox" checked={notifyGoals} onChange={(e) => setNotifyGoals(e.target.checked)} className="h-4 w-4 accent-emerald-600" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border cursor-pointer">
              <span>Weekly earnings summary digest</span>
              <input type="checkbox" checked={notifyWeekly} onChange={(e) => setNotifyWeekly(e.target.checked)} className="h-4 w-4 accent-emerald-600" />
            </label>
          </div>
        </div>
      )}

      {activeSection === "security" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Change Password</h3>
              <p className="text-xs text-muted-foreground">Keep your account secure with a strong password</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Current Password</label>
              <Input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">New Password</label>
                <Input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Confirm New Password</label>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={changingPass}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
            >
              {changingPass ? "Updating Password..." : "Update Password"}
            </Button>
          </form>

          <div className="pt-6 border-t border-border">
            <h4 className="font-bold text-xs text-destructive mb-1">Danger Zone</h4>
            <p className="text-xs text-muted-foreground mb-3">Permanently remove your profile and all tip history.</p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDeleteAccount}
              className="text-xs font-semibold"
            >
              Delete Account
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
