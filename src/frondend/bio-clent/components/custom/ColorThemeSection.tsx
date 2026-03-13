import React from "react";
import { Droplets } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProfileState } from "../../types";
import ColorInput from "./ColorInput";

interface ColorThemeSectionProps {
  profile: ProfileState;
  updateProfile: (key: keyof ProfileState, value: string | number) => void;
}

const ColorThemeSection: React.FC<ColorThemeSectionProps> = ({
  profile,
  updateProfile,
}) => {
  const { t } = useTranslation();

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
  );
};

export default ColorThemeSection;

