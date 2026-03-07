import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Palette,
  Image as ImageIcon,
  MapPin,
  Lock,
  Sparkles,
  Droplets,
  Pipette,
} from "lucide-react";
import { ProfileState } from "../types";
import AssetUploader from "../components/AssetUploader";

const ColorInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative flex items-center group">
      <div
        className="absolute left-3 w-5 h-5 rounded-full border border-white/20 shadow-inner cursor-pointer"
        style={{ backgroundColor: value }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-[11px] font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all"
      />
      <Pipette className="absolute right-3 size-4 text-slate-500 group-hover:text-white transition-colors cursor-pointer" />
    </div>
  </div>
);

const CustomPage: React.FC = () => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<ProfileState>({
    description: t("custom.defaultDescription"),
    backgroundEffect: "None",
    profileOpacity: 50,
    profileBlur: 20,
    accentColor: "#0c0c0c",
    textColor: "#ffffff",
    backgroundColor: "#000000",
    iconColor: "#9ca3af",
    usernameEffects: [],
    location: "My Location",
  });

  const updateProfile = (key: keyof ProfileState, value: string | number) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Assets Section - 100% width uploader */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="size-5 text-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">
            {t("custom.assetsUploader")}
          </h3>
        </div>
        <AssetUploader />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* General Customization */}
        <section className="space-y-8 bg-[#0d1117] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="size-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              {t("custom.generalSettings")}
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">
                {t("custom.description")}
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 italic font-serif text-lg leading-none">
                  A
                </div>
                <input
                  type="text"
                  value={profile.description}
                  onChange={(e) => updateProfile("description", e.target.value)}
                  className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
                  placeholder={t("custom.descriptionPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">
                {t("custom.backgroundEffects")}
              </label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <select
                  value={profile.backgroundEffect}
                  onChange={(e) =>
                    updateProfile("backgroundEffect", e.target.value)
                  }
                  className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm appearance-none focus:outline-none focus:border-blue-500/50 text-white"
                >
                  <option value="None">{t("custom.effects.none")}</option>
                  <option value="Rain Drops">
                    {t("custom.effects.rainDrops")}
                  </option>
                  <option value="Starfield">
                    {t("custom.effects.starfield")}
                  </option>
                  <option value="Matrix Code">
                    {t("custom.effects.matrixCode")}
                  </option>
                  <option value="Floating Orbs">
                    {t("custom.effects.floatingOrbs")}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase">
                    {t("custom.profileOpacity")}
                  </label>
                  <span className="text-xs text-blue-400 font-mono">
                    {profile.profileOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  value={profile.profileOpacity}
                  min="0"
                  max="100"
                  onChange={(e) =>
                    updateProfile("profileOpacity", Number(e.target.value))
                  }
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-400 uppercase">
                    {t("custom.profileBlur")}
                  </label>
                  <span className="text-xs text-blue-400 font-mono">
                    {profile.profileBlur}px
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  value={profile.profileBlur}
                  min="0"
                  max="100"
                  onChange={(e) =>
                    updateProfile("profileBlur", Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">
                {t("custom.location")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-white"
                  placeholder={t("custom.locationPlaceholder")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Color Customization */}
        <section className="space-y-8 bg-[#0d1117] border border-white/5 p-8 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="size-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              {t("custom.colorsTheme")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ColorInput
              label={t("custom.accent")}
              value={profile.accentColor}
              onChange={(v) => updateProfile("accentColor", v)}
            />
            <ColorInput
              label={t("custom.text")}
              value={profile.textColor}
              onChange={(v) => updateProfile("textColor", v)}
            />
            <ColorInput
              label={t("custom.background")}
              value={profile.backgroundColor}
              onChange={(v) => updateProfile("backgroundColor", v)}
            />
            <ColorInput
              label={t("custom.icons")}
              value={profile.iconColor}
              onChange={(v) => updateProfile("iconColor", v)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomPage;
