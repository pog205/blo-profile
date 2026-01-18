import React from "react";
import {
  ArrowRight,
  Play,
  User,
  Link as LinkIcon,
  Share2,
  Rocket,
  Zap,
  Shield,
  ChevronRight,
  MessageSquare,
  Globe,
  Send,
} from "lucide-react";

const ShopPage: React.FC = () => {
  return (
    <div className="w-full bg-[#0a0a0b] text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 overflow-hidden">
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #2a364d 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            V2.0 is Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            Craft Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
              Digital Identity
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            The ultimate link-in-bio tool for creators and professionals.
            Consolidate your online presence into one stunning, shareable page.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="group flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all shadow-xl shadow-cyan-400/20">
              Start Now{" "}
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
              <Play className="size-5 fill-current" /> Watch Demo
            </button>
          </div>

          <div className="pt-12 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">
              Trusted by creators from
            </p>
            <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
              <Zap className="size-6" />
              <Rocket className="size-6" />
              <Shield className="size-6" />
              <Zap className="size-6 rotate-180" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How it Works
            </h2>
            <p className="text-slate-400 max-w-md">
              Three simple steps to establish your unified digital presence. No
              coding required.
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
            View all features <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-gradient-to-b from-[#12161d] to-[#0a0a0b] border border-white/5 rounded-[2.5rem] p-10 overflow-hidden hover:border-white/10 transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="size-1 w-1 bg-cyan-400 rounded-full blur-[2px]" />
            </div>
            <div className="size-14 flex items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400 mb-8">
              <User className="size-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Personalize</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Customize your profile to match your unique brand identity with
              custom themes, fonts, and layouts.
            </p>
            <div className="aspect-[16/10] bg-slate-800/20 rounded-2xl border border-white/5 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-800/50 to-transparent" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-gradient-to-b from-[#12161d] to-[#0a0a0b] border border-white/5 rounded-[2.5rem] p-10 overflow-hidden hover:border-white/10 transition-all">
            <div className="size-14 flex items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 mb-8">
              <LinkIcon className="size-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Connect</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Aggregate all your important links, music, videos, and social
              profiles in one secure, accessible place.
            </p>
            <div className="aspect-[16/10] bg-slate-800/20 rounded-2xl border border-white/5 overflow-hidden">
              <div className="w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-gradient-to-b from-[#12161d] to-[#0a0a0b] border border-white/5 rounded-[2.5rem] p-10 overflow-hidden hover:border-white/10 transition-all">
            <div className="size-14 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 mb-8">
              <Share2 className="size-6" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Share</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Share your unique bio link across Instagram, TikTok, Twitter, and
              everywhere else you exist online.
            </p>
            <div className="aspect-[16/10] bg-slate-800/20 rounded-2xl border border-white/5 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-white/5 bg-[#050505] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-cyan-400 flex items-center justify-center">
                  <Zap className="size-5 text-black fill-current" />
                </div>
                <h2 className="text-xl font-bold tracking-tighter">
                  BioProfile
                </h2>
              </div>
              <p className="text-slate-400 max-w-xs text-sm font-medium">
                The modern standard for digital identity. Built for the future
                of creator economy.
              </p>
              <div className="flex items-center gap-3">
                <button className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <MessageSquare className="size-4" />
                </button>
                <button className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <Send className="size-4" />
                </button>
                <button className="size-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <Globe className="size-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Product
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Features
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Pricing
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Showcase
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Changelog
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  About
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Blog
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Contact
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Legal
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Privacy
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Terms
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Security
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-slate-600 font-medium border-t border-white/5 pt-8">
            <p>© 2025 Bio Profile Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500"></span>
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;
