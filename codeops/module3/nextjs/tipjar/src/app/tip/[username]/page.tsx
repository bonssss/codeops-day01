import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PublicTipPageClient } from "@/components/tip/PublicTipPageClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await db.profile.findUnique({
    where: { username },
  });

  if (!profile) {
    return {
      title: "Creator Not Found - TipJar",
    };
  }

  return {
    title: `Tip ${profile.displayName} (@${profile.username}) on TipJar`,
    description: profile.bio || `Support ${profile.displayName} with quick, direct tips on TipJar.`,
    openGraph: {
      title: `Support ${profile.displayName} on TipJar`,
      description: profile.bio || `Leave a tip and support ${profile.displayName}'s journey.`,
      images: profile.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}

export default async function PublicTipPage({ params }: Props) {
  const { username } = await params;

  const profile = await db.profile.findUnique({
    where: { username },
    include: {
      socialLinks: true,
      user: {
        include: {
          goals: {
            where: { status: "ACTIVE" },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          tipsReceived: {
            where: { status: "COMPLETED" },
            orderBy: { createdAt: "desc" },
            take: 15,
          },
        },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  const activeGoal = profile.user.goals[0]
    ? {
        id: profile.user.goals[0].id,
        title: profile.user.goals[0].title,
        description: profile.user.goals[0].description,
        targetAmount: profile.user.goals[0].targetAmount,
        currentAmount: profile.user.goals[0].currentAmount,
        currency: profile.user.goals[0].currency,
        imageUrl: profile.user.goals[0].imageUrl,
        deadline: profile.user.goals[0].deadline
          ? profile.user.goals[0].deadline.toISOString()
          : null,
        status: profile.user.goals[0].status,
      }
    : null;

  const recentTips = profile.user.tipsReceived.map((t) => ({
    id: t.id,
    supporterName: t.isAnonymous ? "Anonymous" : t.supporterName || "Supporter",
    amount: t.amount,
    currency: t.currency,
    message: t.message,
    isAnonymous: t.isAnonymous,
    createdAt: t.createdAt.toISOString(),
  }));

  const creatorData = {
    id: profile.userId,
    username: profile.username,
    displayName: profile.displayName,
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    customTipMessage: profile.customTipMessage,
    currency: profile.currency,
    suggestedAmounts: (profile.suggestedAmounts || "50,100,200,500")
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n) && n > 0),
    allowAnonymous: profile.allowAnonymous,
    showSupporterWall: profile.showSupporterWall,
    socialLinks: profile.socialLinks.map((l) => ({
      id: l.id,
      platform: l.platform,
      url: l.url,
      label: l.label,
    })),
    activeGoal,
    recentTips,
  };

  return <PublicTipPageClient creator={creatorData} />;
}
