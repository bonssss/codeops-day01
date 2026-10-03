import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SettingsClient } from "@/components/settings/SettingsClient";

export const metadata = {
  title: "Settings - TipJar Dashboard",
};

export default async function DashboardSettingsPage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: { profile: true },
  });

  const profile = user?.profile;

  const settingsData = {
    currency: profile?.currency || "ETB",
    customTipMessage: profile?.customTipMessage || null,
    suggestedAmounts: (profile?.suggestedAmounts || "50,100,200,500")
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n) && n > 0),
    allowAnonymous: profile?.allowAnonymous ?? true,
    showSupporterWall: profile?.showSupporterWall ?? true,
  };

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: profile?.username || null }}
        title="Settings"
        description="Configure your tipping currency, custom messages, and account credentials"
      />

      <div className="px-6 max-w-7xl">
        <SettingsClient initialSettings={settingsData} />
      </div>
    </div>
  );
}
