import React from "react";
import { GripVertical } from "lucide-react";
import AssetsSection from "./AssetsSection";
import GeneralSettingsSection from "./GeneralSettingsSection";
import ColorThemeSection from "./ColorThemeSection";

interface CustomPanelViewProps {
  showCanvas: boolean;
  showCustom: boolean;
  isResizing: boolean;
  isCustomNarrow: boolean;
  startResizing: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CustomPanelView: React.FC<CustomPanelViewProps> = ({
  showCanvas,
  showCustom,
  isResizing,
  isCustomNarrow,
  startResizing,
}) => {
  return (
    <>
      {/* Chỉ hiển thị thanh kéo khi cả hai panel cùng hiển thị */}
      {showCanvas && showCustom && (
        <div
          onMouseDown={startResizing}
          className={`group relative w-1 hover:w-1.5 transition-all cursor-col-resize flex items-center justify-center
            ${
              isResizing
                ? "bg-blue-600 w-1.5"
                : "bg-white/5 hover:bg-blue-500/40"
            }`}
        >
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 p-1 rounded-full shadow-lg">
            <GripVertical className="size-3 text-white" />
          </div>
        </div>
      )}

      {showCustom && (
        <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-[#050505]">
          {/* Assets Section */}
          <AssetsSection isNarrow={isCustomNarrow} />

          <div
            className={`grid gap-12 ${
              isCustomNarrow ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-2"
            }`}
          >
            {/* General Customization — tự lấy data từ useProfile() */}
            <GeneralSettingsSection />

            {/* Color Customization — tự lấy data từ useProfile() */}
            <ColorThemeSection />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPanelView;
