import React from "react";
import {
  Image as ImageIcon,
  FolderOpen,
  MousePointer2,
  Music,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageUpload from "./image-upload";

const AssetUploader: React.FC = () => {
  const { t } = useTranslation();

  const assets = [
    {
      label: t("custom.assets.profileBackground"),
      icon: ImageIcon,
      text: t("custom.assets.profileBackgroundText"),
      type: "image",
      name: "profileBackground",
    },
    {
      label: t("custom.assets.backgroundAudio"),
      icon: Music,
      text: t("custom.assets.backgroundAudioText"),
      type: "audio",
      name: "backgroundAudio",
    },
    {
      label: t("custom.assets.profileAvatar"),
      icon: ImageIcon,
      text: t("custom.assets.profileAvatarText"),
      type: "image",
      name: "profileAvatar",
    },
    {
      label: t("custom.assets.customCursor"),
      icon: MousePointer2,
      text: t("custom.assets.customCursorText"),
      type: "image",
      name: "customCursor",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {assets.map((asset, i) => {
        return (

          <ImageUpload asset={asset} i={i} />
        );
      })}
    </div>
  );
};

export default AssetUploader;
