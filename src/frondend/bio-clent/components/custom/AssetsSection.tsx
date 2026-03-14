import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import AssetUploader from "../AssetUploader";

interface AssetsSectionProps {
  isNarrow?: boolean;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ isNarrow }) => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="size-5 text-blue-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
          {t("custom.assetsUploader")}
        </h3>
      </div>
      <AssetUploader isNarrow={isNarrow} />
    </section>
  );
};

export default AssetsSection;

