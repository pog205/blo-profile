import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar";
import Tooltip from "antd/es/tooltip";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [showCanvas, setShowCanvas] = useState(true);
  const [showCustom, setShowCustom] = useState(true);

  const isCustomPage = location.pathname === "/custom";

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/custom":
        return t("header.customization");
      case "/dashboard":
        return t("header.dashboard");
      case "/links":
        return t("header.socialLinks");
      case "/shop":
        return t("header.ecommerce");
      case "/analytics":
        return t("header.analytics");
      case "/settings":
        return t("header.settings");
      default:
        return t("header.dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden text-slate-200 font-['Inter']">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <h2 className="text-lg font-semibold text-white">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            {isCustomPage ? (
              <div className="flex items-center gap-2">
                {/* Toggle Canvas (bên trái) - chỉ hiện khi Custom đang bật */}
                {showCustom && (
                  <Tooltip
                    label={
                      showCanvas
                        ? t("custom.hideCanvas")
                        : t("custom.showCanvas")
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setShowCanvas((prev) => !prev)}
                      className={`h-8 w-8 flex items-center justify-center rounded-md border text-xs transition-colors
                        ${
                          showCanvas
                            ? "border-white/10 hover:border-white/40"
                            : "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
                        }`}
                    >
                      <div className="flex h-3 w-4 overflow-hidden rounded-[2px]">
                        <div className="w-1/2 h-full bg-slate-300/90" />
                        <div className="w-1/2 h-full bg-slate-600/70" />
                      </div>
                    </button>
                  </Tooltip>
                )}

                {/* Toggle Custom panel (bên phải) - chỉ hiện khi Canvas đang bật */}
                {showCanvas && (
                  <Tooltip
                    label={
                      showCustom
                        ? t("custom.hideEditor")
                        : t("custom.showEditor")
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setShowCustom((prev) => !prev)}
                      className={`h-8 w-8 flex items-center justify-center rounded-md border text-xs transition-colors
                        ${
                          showCustom
                            ? "border-white/10 hover:border-white/40"
                            : "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
                        }`}
                    >
                      <div className="flex h-3 w-4 overflow-hidden rounded-[2px]">
                        <div className="w-1/2 h-full bg-slate-600/70" />
                        <div className="w-1/2 h-full bg-slate-300/90" />
                      </div>
                    </button>
                  </Tooltip>
                )}
              </div>
            ) : (
              <button className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                {t("common.save")}
              </button>
            )}
          </div>
        </header>

        {/* The Content Area - Renders matched route */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0b]">
          <Outlet context={{ showCanvas, showCustom }} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
