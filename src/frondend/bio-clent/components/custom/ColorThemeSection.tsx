import React from "react";
import { Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";
import ColorInput from "./ColorInput";
import { useProfile } from "../../contexts/ProfileContext";

const ColorThemeSection: React.FC = () => {
  const { t } = useTranslation();
  const { profile, handleProfileChange } = useProfile();

  return (
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
          onChange={(v) => handleProfileChange("accentColor", v, true)}
        />
        <ColorInput
          label={t("custom.text")}
          value={profile.textColor}
          onChange={(v) => handleProfileChange("textColor", v, true)}
        />
        <ColorInput
          label={t("custom.background")}
          value={profile.backgroundColor}
          onChange={(v) => handleProfileChange("backgroundColor", v, true)}
        />
        <ColorInput
          label={t("custom.icons")}
          value={profile.iconColor}
          onChange={(v) => handleProfileChange("iconColor", v, true)}
        />
      </div>
    </section>
  );
};

export default ColorThemeSection;
