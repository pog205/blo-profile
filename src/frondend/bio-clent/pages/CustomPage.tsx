import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GripVertical } from "lucide-react";
import { ProfileState } from "../types";
import Canvas from "../components/Canvas";
import AssetsSection from "../components/custom/AssetsSection";
import GeneralSettingsSection from "../components/custom/GeneralSettingsSection";
import ColorThemeSection from "../components/custom/ColorThemeSection";

// --- Main Component: CustomPage ---
const CustomPage: React.FC = () => {
  const { t } = useTranslation();

  // 1. State cho Profile
  const [profile, setProfile] = useState<ProfileState>({
    description: t("custom.defaultDescription"),
    backgroundEffect: "None",
    profileOpacity: 50,
    profileBlur: 20,
    accentColor: "#ff3366",
    textColor: "#ffffff",
    backgroundColor: "#000000",
    iconColor: "#9ca3af",
    usernameEffects: [],
    location: "Ho Chi Minh City",
  });

  // 2. State cho Resizing
  const [leftWidth, setLeftWidth] = useState(500); // Độ rộng mặc định 500px
  const [isResizing, setIsResizing] = useState(false);

  // Logic xử lý kéo thả: dùng mousedown để gắn listener trực tiếp
  const startResizing = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = leftWidth;

      setIsResizing(true);
      document.body.style.cursor = "col-resize";

      const handleMouseMove = (event: MouseEvent) => {
        const delta = event.clientX - startX;
        // Giới hạn: tối thiểu 350px, tối đa 800px
        const newWidth = Math.min(Math.max(350, startWidth + delta), 800);
        setLeftWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.body.style.cursor = "default";
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [leftWidth]
  );

  const updateProfile = (key: keyof ProfileState, value: string | number) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div
      className={`flex h-full bg-[#050505] ${isResizing ? "select-none" : ""}`}
    >
      {/* ── Left: Canvas Preview ── */}
      <div
        style={{ width: `${leftWidth}px` }}
        className="shrink-0 border-r border-white/5 bg-black sticky top-0 h-[calc(100vh-64px)] overflow-hidden"
      >
        <Canvas profile={profile} />
      </div>

      {/* ── Resizer Bar: Thanh kéo giữa ── */}
      <div
        onMouseDown={startResizing}
        className={`group relative w-1 hover:w-1.5 transition-all cursor-col-resize flex items-center justify-center
          ${
            isResizing ? "bg-blue-600 w-1.5" : "bg-white/5 hover:bg-blue-500/40"
          }`}
      >
        {/* Icon chỉ dẫn nhỏ xuất hiện khi hover */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 p-1 rounded-full shadow-lg">
          <GripVertical className="size-3 text-white" />
        </div>
      </div>

      {/* ── Right: Customization Controls ── */}
      <div className="flex-1 overflow-y-auto p-8 space-y-12 bg-[#050505]">
        {/* Assets Section */}
        <AssetsSection />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* General Customization */}
          <GeneralSettingsSection
            profile={profile}
            updateProfile={updateProfile}
          />

          {/* Color Customization */}
          <ColorThemeSection
            profile={profile}
            updateProfile={updateProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPage;
