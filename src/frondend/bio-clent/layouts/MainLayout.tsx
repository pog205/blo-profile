import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
            <button className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
              {t("common.save")}
            </button>
          </div>
        </header>

        {/* The Content Area - Renders matched route */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0b]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
