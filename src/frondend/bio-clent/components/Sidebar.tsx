import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bolt,
  LayoutGrid,
  Link as LinkIcon,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Home,
  MessageSquare,
  LogOut,
  ChevronDown,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useI18n } from "../i18n";
import { authService } from "../services/auth.service";
import { authToast } from "../utils/toast";

interface NavItemConfig {
  to: string;
  icon: LucideIcon;
  label: string;
}

interface LanguageOption {
  id: "en" | "vi";
  flag: string;
  label: string;
  fullLabel: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ bottom: 80, left: 16 });
  const quickMenuRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useI18n();

  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const username: string = user.username ?? "User";
  const email: string = user.email ?? "";

  const items: NavItemConfig[] = [
    { to: "/dashboard", icon: BarChart3, label: t("nav.dashboard") },
    { to: "/custom", icon: LayoutGrid, label: t("nav.custom") },
    { to: "/links", icon: LinkIcon, label: t("nav.links") },
    { to: "/settings", icon: Settings, label: t("nav.settings") },
  ];

  const languages: LanguageOption[] = [
    { id: "en", flag: "🇺🇸", label: "EN", fullLabel: "English (US)" },
    { id: "vi", flag: "🇻🇳", label: "VI", fullLabel: "Tiếng Việt" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.id === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quickMenuRef.current &&
        !quickMenuRef.current.contains(event.target as Node)
      ) {
        setIsQuickMenuOpen(false);
        setIsLanguageOpen(false);
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isQuickMenuOpen && menuButtonRef.current) {
      const buttonRect = menuButtonRef.current.getBoundingClientRect();
      const menuWidth = 224; // w-56 = 14rem = 224px
      const left = buttonRect.left + buttonRect.width / 2 - menuWidth / 2;
      const bottom = window.innerHeight - buttonRect.top + 8; // 8px spacing
      setMenuPosition({ bottom, left });
    }
  }, [isQuickMenuOpen, isCollapsed]);

  // Close Quick Menu when sidebar is collapsed
  useEffect(() => {
    if (isCollapsed && isQuickMenuOpen) {
      setIsQuickMenuOpen(false);
    }
  }, [isCollapsed]);

  const handleLanguageChange = (langId: "en" | "vi") => {
    setLanguage(langId);
    setIsLanguageOpen(false);
  };

  const handleLogout = async () => {
    setIsQuickMenuOpen(false);
    try {
      await authService.logout();
    } finally {
      authToast.logoutSuccess();
      navigate("/auth");
    }
  };

  return (
    <>
      <div
        onMouseEnter={(e) => e.currentTarget.querySelector<HTMLElement>('.sidebar-edge-btn')?.style.setProperty('opacity', '1')}
        onMouseLeave={(e) => e.currentTarget.querySelector<HTMLElement>('.sidebar-edge-btn')?.style.setProperty('opacity', '0')}
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-white/5 bg-[#101622] p-4 shrink-0 relative`}
      >
        <div className="flex flex-col gap-8">
          {/* Brand & Toggle */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } px-2 h-10`}
          >
            <NavLink to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
                <Bolt className="size-6 fill-current" />
              </div>
              {!isCollapsed && (
                <h1 className="text-xl font-bold tracking-tight text-white whitespace-nowrap opacity-100 transition-opacity duration-300">
                  NeonCard
                </h1>
              )}
            </NavLink>
          </div>

          {/* Navigation */}
          <div className="relative">
            {/* Edge Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-7 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-10 rounded-r-lg bg-[#161e2d] border border-l-0 border-white/10 text-slate-500 hover:text-white hover:border-blue-500/40 hover:bg-blue-600/20 transition-all shadow-lg group opacity-0 hover:opacity-100 focus:opacity-100 sidebar-edge-btn"
              style={{ outline: "none" }}
            >
              {isCollapsed ? (
                <ChevronRight className="size-3.5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
              )}
            </button>
            <nav className="flex flex-col gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={isCollapsed ? item.label : ""}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? "justify-center" : "gap-3"
                    } rounded-lg h-12 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/10 text-blue-500 ring-1 ring-blue-500/20 shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    } ${isCollapsed ? "px-0" : "px-3"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`size-5 shrink-0 ${
                          isActive ? "fill-blue-500/10" : ""
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="text-sm font-medium whitespace-nowrap opacity-100 transition-opacity duration-300">
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4">
          {/* User Profile Footer */}
          <div className="relative">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              } rounded-xl border border-white/5 bg-[#161e2d] ${
                isCollapsed ? "p-2" : "p-3"
              } shadow-lg transition-all`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700">
                <User className="size-5 text-slate-300" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden opacity-100 transition-opacity duration-300 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {username}
                  </p>
                  <p className="truncate text-xs text-slate-400">{email}</p>
                </div>
              )}
              {!isCollapsed && (
                <button
                  ref={menuButtonRef}
                  onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <MoreVertical className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Menu Modal - Fixed positioning outside sidebar */}
      {isQuickMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsQuickMenuOpen(false)}
          />
          {/* Modal */}
          <div
            className="fixed z-50 w-56"
            style={{
              bottom: `${menuPosition.bottom}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={quickMenuRef}
              className="glass-panel rounded-xl shadow-2xl border border-white/10 p-4 space-y-3"
            >
              <div className="space-y-1 pb-2 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">
                  {t("nav.quickMenu")}
                </h3>
              </div>

              {/* Language Selector */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-left"
                >
                  <span className="text-xl">{currentLanguage.flag}</span>
                  <span className="flex-1 text-sm font-medium text-white">
                    {currentLanguage.fullLabel}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${
                      isLanguageOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 glass-panel rounded-lg shadow-xl border border-white/10 overflow-hidden z-10">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => handleLanguageChange(lang.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                          language === lang.id
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.fullLabel}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Home Button */}
              <button
                onClick={() => {
                  navigate("/");
                  setIsQuickMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 transition-colors text-left"
              >
                <Home className="size-5 text-purple-400" />
                <span className="text-sm font-medium text-white">
                  {t("nav.home")}
                </span>
              </button>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition-colors text-left"
              >
                <LogOut className="size-5 text-red-400" />
                <span className="text-sm font-medium text-white">
                  {t("nav.logout")}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
