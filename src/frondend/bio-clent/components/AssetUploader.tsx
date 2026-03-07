import React from "react";
import {
  Image as ImageIcon,
  FolderOpen,
  MousePointer2,
  Music,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const AssetUploader: React.FC = () => {
  const { t } = useTranslation();

  const assets = [
    {
      label: t("custom.assets.profileBackground"),
      icon: ImageIcon,
      text: t("custom.assets.profileBackgroundText"),
    },
    {
      label: t("custom.assets.backgroundAudio"),
      icon: Music,
      text: t("custom.assets.backgroundAudioText"),
    },
    {
      label: t("custom.assets.profileAvatar"),
      icon: ImageIcon,
      text: t("custom.assets.profileAvatarText"),
    },
    {
      label: t("custom.assets.customCursor"),
      icon: MousePointer2,
      text: t("custom.assets.customCursorText"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {assets.map((asset, i) => {
        const Icon = asset.icon;
        return (
          <div key={i} className="space-y-3 group">
            <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-widest">
              {asset.label}
            </label>
            <button className="w-full h-32 bg-[#0d1117] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all shadow-lg">
              <div className="size-10 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                <Icon className="size-5" />
              </div>
              <span className="text-[10px] text-slate-400 font-medium px-4 text-center">
                {asset.text}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AssetUploader;
