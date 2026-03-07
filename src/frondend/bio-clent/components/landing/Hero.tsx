import React from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Play,
  Box,
  Rocket,
  Diamond,
  ShieldCheck,
} from "lucide-react";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-grid-pattern grid-bg"></div>
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-primary/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t("shop.badge")}
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
          {t("shop.heroTitle")} <br />
          <span className="neon-text">{t("shop.heroTitleHighlight")}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl leading-relaxed mt-4">
          {t("shop.heroDescription")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full max-w-lg">
          <button className="group w-full sm:w-auto flex-1 px-8 py-4 bg-primary text-background text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-white shadow-[0_0_30px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2">
            {t("shop.startNow")}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button className="w-full sm:w-auto flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white text-base font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
            <Play size={20} className="text-primary" />
            {t("shop.watchDemo")}
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <p className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] font-bold opacity-80">
            {t("shop.trustedBy")}
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <Box size={32} />
            <Rocket size={32} />
            <Diamond size={32} />
            <ShieldCheck size={32} />
          </div>
        </div>
      </div>

      {/* Hero Bottom Line Decor */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </section>
  );
};

export default Hero;
