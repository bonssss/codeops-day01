"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, AtSign, Globe, MapPin, Image as ImageIcon, Plus, Trash2, Save, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { updateProfileAction, addSocialLinkAction, deleteSocialLinkAction } from "@/actions/profile";
import { useToast } from "@/components/ui/toast";

interface SocialLinkData {
  id: string;
  platform: string;
  url: string;
  label: string | null;
}

interface ProfileData {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  socialLinks: SocialLinkData[];
}

export function ProfileManagerClient({ initialProfile }: { initialProfile: ProfileData }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const [displayName, setDisplayName] = React.useState(initialProfile.displayName);
  const [username, setUsername] = React.useState(initialProfile.username);
  const [avatarUrl, setAvatarUrl] = React.useState(initialProfile.avatarUrl || "");
  const [bio, setBio] = React.useState(initialProfile.bio || "");
  const [location, setLocation] = React.useState(initialProfile.location || "");
  const [website, setWebsite] = React.useState(initialProfile.website || "");
  const [github, setGithub] = React.useState(initialProfile.github || "");
  const [linkedin, setLinkedin] = React.useState(initialProfile.linkedin || "");
  const [twitter, setTwitter] = React.useState(initialProfile.twitter || "");

  // Social link creation state
  const [socialLinks, setSocialLinks] = React.useState<SocialLinkData[]>(initialProfile.socialLinks);
  const [newPlatform, setNewPlatform] = React.useState("youtube");
  const [newUrl, setNewUrl] = React.useState("");
  const [newLabel, setNewLabel] = React.useState("");
  const [addingLink, setAddingLink] = React.useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateProfileAction({
        displayName,
        username,
        avatarUrl: avatarUrl || null,
        bio: bio || null,
        location: location || null,
        website: website || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
      });

      if (res.success) {
        toast({ title: "Profile Saved", description: "Your creator profile has been updated", type: "success" });
        router.refresh();
      } else {
        toast({ title: "Error", description: res.error || "Failed to update profile", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "Could not save profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSocialLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setAddingLink(true);
    try {
      const res = await addSocialLinkAction({
        platform: newPlatform,
        url: newUrl,
        label: newLabel || newPlatform,
      });

      if (res.success && res.link) {
        setSocialLinks((prev) => [...prev, res.link]);
        setNewUrl("");
        setNewLabel("");
        toast({ title: "Link Added", description: "Social link added to your page", type: "success" });
      } else {
        toast({ title: "Error", description: res.error || "Failed to add link", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred", type: "error" });
    } finally {
      setAddingLink(false);
    }
  };

  const handleDeleteSocialLink = async (id: string) => {
    try {
      const res = await deleteSocialLinkAction(id);
      if (res.success) {
        setSocialLinks((prev) => prev.filter((l) => l.id !== id));
        toast({ title: "Link Removed", description: "Social link removed", type: "success" });
      } else {
        toast({ title: "Error", description: res.error || "Failed to delete link", type: "error" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to delete link", type: "error" });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Profile Live Card Preview */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar src={avatarUrl} name={displayName} size="xl" className="ring-2 ring-amber-500/30" />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground">{displayName}</h2>
            <p className="text-xs font-mono text-amber-500 dark:text-amber-400">tipjar.io/tip/{username}</p>
            {location && <p className="text-xs text-muted-foreground">{location}</p>}
          </div>
        </div>

        <a
          href={`/tip/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-xs font-semibold text-foreground border border-border transition-colors"
        >
          <span>Preview Public Page</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
        </a>
      </div>

      {/* Main Profile Form */}
      <div className="rounded-2xl border border-border bg-card p-7 space-y-6 shadow-sm">
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-bold text-foreground">General Information</h3>
          <p className="text-xs text-muted-foreground">Update how your name, avatar, and bio appear on your tipping page</p>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Display Name *</label>
              <Input
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                icon={<User className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Username (@handle) *</label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                icon={<AtSign className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Avatar Image URL</label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                icon={<ImageIcon className="h-4 w-4" />}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Location</label>
              <Input
                placeholder="e.g. Addis Ababa, Ethiopia"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<MapPin className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">About / Bio</label>
            <Textarea
              placeholder="Tell your supporters about yourself, your projects, or what you create..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
            <span className="text-[11px] text-muted-foreground">{bio.length}/500 characters</span>
          </div>

          <div className="border-t border-border pt-5">
            <h4 className="text-sm font-semibold text-foreground mb-3">Primary Social Profiles</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Website URL</label>
                <Input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  icon={<Globe className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">GitHub Username</label>
                <Input
                  placeholder="github_username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">LinkedIn Username</label>
                <Input
                  placeholder="linkedin_username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">X / Twitter Handle</label>
                <Input
                  placeholder="twitter_username"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="gap-2 font-bold px-6"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? "Saving Profile..." : "Save Profile Changes"}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Additional Social Links Manager */}
      <div className="rounded-2xl border border-border bg-card p-7 space-y-6 shadow-sm">
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-bold text-foreground">Custom Social & Portfolio Links</h3>
          <p className="text-xs text-muted-foreground">Add YouTube, Twitch, Substack, Telegram, or custom project links</p>
        </div>

        {/* Existing Links List */}
        {socialLinks.length > 0 ? (
          <div className="space-y-2">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs uppercase">
                    {link.platform.substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-foreground">{link.label || link.platform}</div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-muted-foreground hover:text-amber-500 truncate max-w-xs block"
                    >
                      {link.url}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSocialLink(link.id)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                  title="Remove link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">No additional links added yet.</p>
        )}

        {/* Add New Link Form */}
        <form onSubmit={handleAddSocialLink} className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
          <h4 className="text-xs font-bold text-foreground">Add New Link</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="h-11 rounded-xl border border-input bg-background px-3 text-xs text-foreground"
            >
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="telegram">Telegram</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="discord">Discord</option>
              <option value="other">Custom URL</option>
            </select>

            <Input
              placeholder="Display Label (e.g. YouTube Channel)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />

            <Input
              type="url"
              required
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={addingLink || !newUrl}
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>{addingLink ? "Adding..." : "Add Link"}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
