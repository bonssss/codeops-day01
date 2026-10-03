"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, Lock, AlertTriangle, Sliders, ShieldCheck } from "lucide-react";
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
          description: "Please specify at least one valid suggested amount (e.g. 50, 100, 200, 500)",
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
          description: "Tipping preferences updated successfully",
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

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Tip Settings Card */}
      <div className="glass-card rounded-3xl p-7 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Tipping Configuration</h3>
            <p className="text-xs text-neutral-400">Customize currencies, suggested amounts, and wall privacy</p>
          </div>
        </div>

        <form onSubmit={handleSaveTipSettings} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "ETB" | "USD" | "EUR")}
                className="h-11 w-full rounded-xl border border-white/10 bg-neutral-900 px-3 text-xs text-neutral-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="ETB">ETB - Ethiopian Birr (Default)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Suggested Tip Amounts (comma separated)
              </label>
              <Input
                placeholder="50, 100, 200, 500"
                value={amountsStr}
                onChange={(e) => setAmountsStr(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Custom Thank You / Note Message</label>
            <Textarea
              placeholder="Thanks for supporting my journey! Every birr fuels my work."
              value={customTipMessage}
              onChange={(e) => setCustomTipMessage(e.target.value)}
              rows={2}
            />
          </div>

          {/* Privacy Toggles */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-white">Allow Anonymous Tips</label>
                <p className="text-[11px] text-neutral-400">
                  Allow supporters to hide their name from public tipping lists
                </p>
              </div>
              <Switch checked={allowAnonymous} onCheckedChange={setAllowAnonymous} />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-white">Display Public Supporter Wall</label>
                <p className="text-[11px] text-neutral-400">
                  Show recent supporter notes and tips on your public tipping page
                </p>
              </div>
              <Switch checked={showSupporterWall} onCheckedChange={setShowSupporterWall} />
            </div>
          </div>

          <Button type="submit" variant="default" disabled={savingTips} className="gap-2 font-bold px-6">
            <Save className="h-4 w-4" />
            <span>{savingTips ? "Saving..." : "Save Tip Settings"}</span>
          </Button>
        </form>
      </div>

      {/* Account Security Card */}
      <div className="glass-card rounded-3xl p-7 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="h-10 w-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Account Security</h3>
            <p className="text-xs text-neutral-400">Change password and manage credentials</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Current Password</label>
            <Input
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">New Password</label>
              <Input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">Confirm New Password</label>
              <Input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
              />
            </div>
          </div>

          <Button type="submit" variant="outline" disabled={changingPass} className="gap-2 text-xs">
            <Lock className="h-3.5 w-3.5" />
            <span>{changingPass ? "Updating..." : "Update Password"}</span>
          </Button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-3xl p-7 border-rose-500/20 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-rose-300">Danger Zone</h3>
            <p className="text-xs text-neutral-400">Permanently delete your creator account and all associated tip data</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <p className="text-xs text-neutral-400 max-w-md">
            Once deleted, your tipping URL will become available to others and all records will be deleted.
          </p>
          <Button type="button" variant="destructive" size="sm" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
