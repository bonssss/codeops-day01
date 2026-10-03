import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TipsHistoryClient } from "@/components/dashboard/TipsHistoryClient";

export const metadata = {
  title: "Transaction History - TipJar Dashboard",
};

export default async function DashboardTipsPage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      profile: true,
      tipsReceived: {
        orderBy: { createdAt: "desc" },
        include: { payment: true },
      },
    },
  });

  const currency = user?.profile?.currency || "ETB";

  const formattedTips = (user?.tipsReceived || []).map((t) => ({
    id: t.id,
    transactionRef: t.payment?.transactionReference || `TX-${t.id.substring(0, 8).toUpperCase()}`,
    supporterName: t.isAnonymous ? "Anonymous" : t.supporterName || "Supporter",
    supporterEmail: t.isAnonymous ? null : t.supporterEmail,
    amount: t.amount,
    currency: t.currency,
    message: t.message,
    status: t.status,
    paymentMethod: t.payment?.paymentMethod || "Mock Pay",
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: user?.profile?.username || null }}
        title="Transaction History"
        description="Search, filter, and inspect all tips and payment records"
      />

      <div className="px-6 max-w-7xl">
        <TipsHistoryClient tips={formattedTips} currency={currency} />
      </div>
    </div>
  );
}
