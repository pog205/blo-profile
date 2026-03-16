import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { ProfileState } from "../types";
import Canvas from "../components/Canvas";
import CustomPanelView from "../components/custom/CustomPanelView";
import { useQuery } from "@tanstack/react-query";
import { bioProfileService } from "@/services/bioprofile.service";
import LoadingScreen from "../components/ui/LoadingScreen";

// --- Main Component: CustomPage ---
const CustomPage: React.FC = () => {
  const { t } = useTranslation();

  const { showCanvas = true, showCustom = true } = useOutletContext<{
    showCanvas: boolean;
    showCustom: boolean;
  }>();

  // 1. State cho Profile (default values)
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    description: t("custom.defaultDescription"),
    location: "",
    avatarUrl: "",
    backgroundUrl: "",
    fontFamily: "Inter",
    accentColor: "#ff3366",
    textColor: "#ffffff",
    backgroundColor: "#000000",
    iconColor: "#9ca3af",
    profileOpacity: 50,
    profileBlur: 20,
    backgroundEffect: "None",
    mouseEffectUrl: "",
    usernameEffects: [],
  });

  // Lấy userId từ object 'user' trong localStorage (lưu sau khi login)
  const userId = JSON.parse(localStorage.getItem("user") || "{}").idUser as string | undefined;

  // 2. Fetch profile theo userId
  const { data: bioProfile, isLoading } = useQuery({
    queryKey: ["bioProfile", userId],
    queryFn: async () => await bioProfileService.getById(userId!),
    enabled: !!userId,
  });
  useEffect(() => {
    console.log("Fetched bioProfile:", bioProfile);
  }, [bioProfile]);
  // 3. Populate form state từ API data
  useEffect(() => {
    if (!bioProfile) return;
    setProfile({
      name: bioProfile.name ?? "",
      description: bioProfile.description ?? t("custom.defaultDescription"),
      location: bioProfile.location ?? "",
      avatarUrl: bioProfile.avatarUrl ?? "",
      backgroundUrl: bioProfile.backgroundUrl ?? "",
      fontFamily: bioProfile.fontFamily ?? "Inter",
      accentColor: bioProfile.accentColor ?? "#ff3366",
      textColor: bioProfile.textColor ?? "#ffffff",
      backgroundColor: bioProfile.backgroundColor ?? "#000000",
      iconColor: bioProfile.iconsColor ?? "#9ca3af",
      // entity lưu 0.0–1.0 (opacity), UI dùng 0–100
      profileOpacity: bioProfile.profileOpacity != null
        ? Math.round(bioProfile.profileOpacity * 100)
        : 50,
      profileBlur: bioProfile.profileBlur ?? 20,
      backgroundEffect: "None",
      mouseEffectUrl: bioProfile.mouseEffectUrl ?? "",
      usernameEffects: [],
    });
  }, [bioProfile, t]);

  // 4. State cho Resizing
  const [leftWidth, setLeftWidth] = useState(800); // Độ rộng mặc định 800px
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

  const isCustomNarrow = showCanvas && leftWidth > 500;

  if (isLoading) {
    return <LoadingScreen message="Loading profile..." />;
  }

  return (
    <div
      className={`flex h-full bg-[#050505] ${isResizing ? "select-none" : ""}`}
    >
      {showCanvas && (
        <div
          style={{ width: showCustom ? `${leftWidth}px` : "100%" }}
          className="shrink-0 border-r border-white/5 bg-black sticky top-0 h-[calc(100vh-64px)] overflow-hidden"
        >
          <Canvas profile={profile} />
        </div>
      )}

      <CustomPanelView
        showCanvas={showCanvas}
        showCustom={showCustom}
        isResizing={isResizing}
        isCustomNarrow={isCustomNarrow}
        profile={profile}
        updateProfile={updateProfile}
        startResizing={startResizing}
      />
    </div>
  );
};

export default CustomPage;
