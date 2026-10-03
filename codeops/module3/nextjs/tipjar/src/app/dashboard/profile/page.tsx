import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileManagerClient } from "@/components/profile/ProfileManagerClient";

export const metadata = {
  title: "Profile Settings - TipJar Dashboard",
};

export default async function DashboardProfilePage() {
  const session = await requireAuth();

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      profile: {
        include: { socialLinks: true },
      },
    },
  });

  const profile = user?.profile;

  const profileData = {
    username: profile?.username || "",
    displayName: profile?.displayName || user?.name || "",
    avatarUrl: profile?.avatarUrl || null,
    bio: profile?.bio || null,
    location: profile?.location || null,
    website: profile?.website || null,
    github: profile?.github || null,
    linkedin: profile?.linkedin || null,
    twitter: profile?.twitter || null,
    socialLinks: (profile?.socialLinks || []).map((l) => ({
      id: l.id,
      platform: l.platform,
      url: l.url,
      label: l.label,
    })),
  };

  return (
    <div className="flex-1 space-y-6 pb-16">
      <DashboardHeader
        user={{ name: user?.name || session.name, username: profile?.username || null }}
        title="Creator Profile"
        description="Manage your public profile identity, bio, and social connections"
      />

      <div className="px-6 max-w-7xl">
        <ProfileManagerClient initialProfile={profileData} />
      </div>
    </div>
  );
}
