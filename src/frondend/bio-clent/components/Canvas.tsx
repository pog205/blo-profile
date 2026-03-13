import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Heart,
  MapPin,
  SkipBack,
  SkipForward,
  Pause,
  Play,
  Music,
} from 'lucide-react';
import { ProfileState } from '../types';

/* ─── tiny inline SVG social icons ─── */
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
);

/* ─── Component props ─── */
interface CanvasProps {
  profile: ProfileState;
}

const Canvas: React.FC<CanvasProps> = ({ profile }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(350);
  const [currentTime, setCurrentTime] = useState('0:03');
  const [duration] = useState('3:28');

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505] rounded-xl">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('/placeholder-bg.jpg')`,
            filter: `blur(${profile.profileBlur / 10}px)`,
            opacity: profile.profileOpacity / 100,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      {/* ── Sound Toggle ── */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all"
      >
        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>

      {/* ── Main Profile Card ── */}
      <div className="relative z-10 w-full max-w-[420px] mx-auto flex flex-col items-center gap-4 px-4 animate-fade-in">

        {/* Glass Card */}
        <div
          className="w-full rounded-2xl p-6 flex flex-col items-center gap-4"
          style={{
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Avatar + floating emojis */}
          <div className="relative flex items-center justify-center">
            {/* Floating emoji - left */}
            <span className="absolute -left-6 -top-3 text-xl animate-float" style={{ animationDelay: '0s' }}>💗</span>
            {/* Floating emoji - top */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-base animate-float" style={{ animationDelay: '1s' }}>✨</span>
            {/* Floating emoji - right */}
            <span className="absolute -right-6 -top-2 text-xl animate-float" style={{ animationDelay: '2s' }}>⭐</span>

            {/* Avatar ring with glow */}
            <div
              className="w-24 h-24 rounded-full p-[3px] animate-glow"
              style={{
                background: `linear-gradient(135deg, ${profile.accentColor || '#ff3366'}, #ff336680)`,
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-black/80">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
              </div>
            </div>
          </div>

          {/* Username */}
          <h1
            className="text-2xl font-bold font-serif tracking-wide"
            style={{
              color: profile.accentColor || '#ff3366',
              textShadow: `0 0 8px ${profile.accentColor || '#ff3366'}80, 0 0 12px ${profile.accentColor || '#ff3366'}40`,
            }}
          >
            ChangChang
          </h1>

          {/* Description */}
          <p
            className="text-sm font-light text-center leading-relaxed"
            style={{ color: profile.textColor || '#ffffff' }}
          >
            {profile.description || 'Equality is the purest form of love'}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: `${profile.accentColor || '#ff3366'}CC` }}>
            <MapPin className="size-3" />
            <span>{profile.location || 'Ho Chi Minh City'}</span>
          </div>

          {/* Discord Presence */}
          <div
            className="w-full rounded-xl p-3 flex items-center gap-3 mt-1"
            style={{
              background: `linear-gradient(135deg, ${profile.accentColor || '#ff3366'}15, ${profile.accentColor || '#ff3366'}08)`,
              border: `1px solid ${profile.accentColor || '#ff3366'}25`,
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
              <span className="text-lg">🎮</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">..chang..</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
                <span className="text-green-400">●</span> Fall in love
              </p>
            </div>
            <div
              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
              style={{
                color: profile.accentColor || '#ff3366',
                backgroundColor: `${profile.accentColor || '#ff3366'}20`,
              }}
            >
              AuT
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-2">
            {[DiscordIcon, SpotifyIcon, FacebookIcon, InstagramIcon, TikTokIcon].map((Icon, i) => (
              <button
                key={i}
                className="text-white/70 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ color: profile.iconColor || '#9ca3af' }}
              >
                <Icon />
              </button>
            ))}
          </div>

          {/* Like Counter */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
              }}
              className="transition-all duration-200"
            >
              <Heart
                className="size-4"
                style={{
                  color: profile.accentColor || '#ff3366',
                  fill: liked ? (profile.accentColor || '#ff3366') : 'transparent',
                }}
              />
            </button>
            <span className="text-xs" style={{ color: profile.accentColor || '#ff3366' }}>
              {likeCount}
            </span>
          </div>
        </div>

        {/* ── Music Player ── */}
        <div
          className="w-full rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Album art */}
          <div
            className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${profile.accentColor || '#ff3366'}30, ${profile.accentColor || '#ff3366'}10)`,
              border: `1px solid ${profile.accentColor || '#ff3366'}30`,
            }}
          >
            <Music className="size-4" style={{ color: profile.accentColor || '#ff3366' }} />
          </div>

          {/* Song info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Berlin</p>
          </div>

          {/* Time */}
          <span className="text-[10px] text-slate-500 font-mono shrink-0">
            {currentTime} / {duration}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button className="p-1 text-slate-400 hover:text-white transition-colors">
              <SkipBack className="size-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-md transition-all"
              style={{
                color: profile.accentColor || '#ff3366',
                backgroundColor: `${profile.accentColor || '#ff3366'}20`,
              }}
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
            </button>
            <button className="p-1 text-slate-400 hover:text-white transition-colors">
              <SkipForward className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── CSS Keyframes (injected via style tag) ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes glow {
          from { box-shadow: 0 0 10px -5px ${profile.accentColor || '#ff3366'}80; }
          to { box-shadow: 0 0 20px 5px ${profile.accentColor || '#ff3366'}50; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Canvas;
