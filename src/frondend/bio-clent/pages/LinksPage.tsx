import React from "react";
import {
  Link as LinkIcon,
  Youtube,
  Instagram,
  Twitter,
  Music2,
  Globe,
  Mail,
  MessageSquare,
  Play,
  Send,
  Heart,
  ShoppingCart,
  Cloud,
  Code,
  Gamepad2,
  DollarSign,
  Briefcase,
  Music,
  Share2,
  Lock,
  PlusCircle,
  LucideIcon,
} from "lucide-react";

interface SocialIcon {
  id: string;
  icon: LucideIcon;
  color: string;
  label: string;
}

const LinksPage: React.FC = () => {
  const socialIcons: SocialIcon[] = [
    { id: "smile", icon: Heart, color: "text-yellow-400", label: "Reaction" },
    { id: "youtube", icon: Youtube, color: "text-red-500", label: "YouTube" },
    {
      id: "chat",
      icon: MessageSquare,
      color: "text-indigo-400",
      label: "Discord",
    },
    { id: "play", icon: Play, color: "text-green-500", label: "Spotify" },
    {
      id: "instagram",
      icon: Instagram,
      color: "text-pink-500",
      label: "Instagram",
    },
    { id: "x", icon: Twitter, color: "text-slate-300", label: "X" },
    { id: "music", icon: Music2, color: "text-cyan-400", label: "TikTok" },
    { id: "send", icon: Send, color: "text-blue-400", label: "Telegram" },
    { id: "cloud", icon: Cloud, color: "text-orange-400", label: "SoundCloud" },
    { id: "wallet", icon: DollarSign, color: "text-blue-600", label: "PayPal" },
    { id: "code", icon: Code, color: "text-slate-300", label: "GitHub" },
    { id: "game", icon: Gamepad2, color: "text-slate-400", label: "Twitch" },
    {
      id: "finance",
      icon: DollarSign,
      color: "text-emerald-500",
      label: "Finance",
    },
    {
      id: "music-library",
      icon: Music,
      color: "text-pink-400",
      label: "Apple Music",
    },
    { id: "activity", icon: Share2, color: "text-orange-500", label: "Strava" },
    {
      id: "chat-alt",
      icon: MessageSquare,
      color: "text-purple-400",
      label: "Twitch",
    },
    { id: "reddit", icon: Globe, color: "text-orange-600", label: "Reddit" },
    { id: "web", icon: Globe, color: "text-blue-500", label: "Website" },
    { id: "grid", icon: Share2, color: "text-slate-400", label: "Other" },
    { id: "travel", icon: Globe, color: "text-blue-300", label: "Trip" },
    {
      id: "briefcase",
      icon: Briefcase,
      color: "text-blue-700",
      label: "LinkedIn",
    },
    {
      id: "store",
      icon: ShoppingCart,
      color: "text-slate-300",
      label: "Shopify",
    },
    { id: "box", icon: PlusCircle, color: "text-emerald-400", label: "Box" },
    { id: "pin", icon: LinkIcon, color: "text-red-600", label: "Pinterest" },
    { id: "radio", icon: Music2, color: "text-red-400", label: "Radio" },
    { id: "heart-alt", icon: Heart, color: "text-blue-400", label: "Support" },
    {
      id: "coffee",
      icon: Music,
      color: "text-yellow-600",
      label: "Buy Coffee",
    },
    { id: "brew", icon: Music, color: "text-slate-200", label: "Brew" },
    { id: "medal", icon: PlusCircle, color: "text-blue-500", label: "Patreon" },
    { id: "at", icon: Mail, color: "text-slate-400", label: "Email" },
    {
      id: "tag",
      icon: ShoppingCart,
      color: "text-orange-600",
      label: "Product",
    },
    {
      id: "bubble",
      icon: MessageSquare,
      color: "text-blue-400",
      label: "Chat",
    },
    {
      id: "bitcoin",
      icon: DollarSign,
      color: "text-yellow-500",
      label: "Crypto",
    },
    { id: "diamond", icon: Lock, color: "text-blue-200", label: "OnlyFans" },
    {
      id: "money-alt",
      icon: DollarSign,
      color: "text-blue-400",
      label: "CashApp",
    },
    {
      id: "server",
      icon: PlusCircle,
      color: "text-purple-500",
      label: "Server",
    },
    { id: "atom", icon: PlusCircle, color: "text-slate-400", label: "React" },
    { id: "shield", icon: Lock, color: "text-orange-400", label: "Secure" },
    { id: "email-alt", icon: Mail, color: "text-white", label: "Email" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-12 space-y-10">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-white">
          <LinkIcon className="size-6 text-slate-400" />
          <h1 className="text-2xl font-bold">
            Link your social media profiles.
          </h1>
        </div>
        <p className="text-slate-400 text-sm">
          Pick a social media to add to your profile.
        </p>
      </div>

      <div className="bg-[#0d1117] border border-white/5 rounded-3xl p-10 shadow-2xl">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 mb-8">
          {socialIcons.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                title={item.label}
                className="aspect-square flex items-center justify-center rounded-xl bg-[#12161d] border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group relative"
              >
                <Icon
                  className={`size-6 ${item.color} group-hover:scale-110 transition-transform`}
                />
              </button>
            );
          })}
        </div>

        <button className="w-full mt-6 group">
          <div className="flex items-center gap-4 p-5 bg-[#12161d] border border-white/5 rounded-2xl hover:border-blue-500/50 transition-all text-left">
            <div className="size-10 flex items-center justify-center rounded-lg bg-white/5 text-slate-400 group-hover:text-blue-400">
              <Globe className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                Add Custom URL
              </p>
              <p className="text-xs text-slate-500">
                Use your own URL and choose an icon to match.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LinksPage;
