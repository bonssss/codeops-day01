import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { GoalsManagerClient } from "@/components/goals/GoalsManagerClient";

export const metadata = {
  title: "Goals - TipJar Dashboard",
};

export default async function DashboardGoalsPage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      profile: true,
      goals: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const currency = user?.profile?.currency || "ETB";

  const formattedGoals = (user?.goals || []).map((g) => ({
    id: g.id,
    title: g.title,
    description: g.description,
    targetAmount: g.targetAmount,
    currentAmount: g.currentAmount,
    currency: g.currency,
    deadline: g.deadline ? g.deadline.toISOString() : null,
    imageUrl: g.imageUrl,
    status: g.status,
    createdAt: g.createdAt.toISOString(),
  }));

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: user?.profile?.username || null }}
        title="Creator Goals"
        description="Set, track, and accomplish project and equipment milestones"
      />

      <div className="px-6 max-w-7xl">
        <GoalsManagerClient goals={formattedGoals} currency={currency} />
      </div>
    </div>
  );
}
