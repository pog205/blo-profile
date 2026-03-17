import React from "react";
import { Palette, MapPin, Sparkles, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProfileState } from "../../types";
import CountryDropdown from "../react-flags-select";

interface GeneralSettingsSectionProps {
  profile: ProfileState;
  updateProfile: (key: keyof ProfileState, value: string | number) => void;
}

const GeneralSettingsSection: React.FC<GeneralSettingsSectionProps> = ({
  profile,
  updateProfile,
}) => {
  const { t } = useTranslation();

  return (
    <section className="space-y-8 bg-[#0d1117] border border-white/5 p-8 rounded-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="size-5 text-purple-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
          {t("custom.generalSettings")}
        </h3>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">
            {t("custom.name", "Name")}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile("name", e.target.value)}
              className="w-full bg-[#12161d] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white"
              placeholder={t("custom.namePlaceholder", "Your display name...")}
            />
          </div>
        </div>

        {/* Description */}
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
          <div className="relative ">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 z-10" />
              
              <CountryDropdown 
                className="w-full bg-[#12161d] border border-white/10 !h-12 !rounded-xl !py-3 !pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 text-white " 
                onChange={(countryName) => updateProfile("location", countryName)} 
              />
          </div>                
        </div>
      </div>
    </section>
  );
};

export default GeneralSettingsSection;

