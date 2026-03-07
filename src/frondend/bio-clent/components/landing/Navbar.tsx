import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18n } from "../../i18n";

interface LanguageOption {
  id: "en" | "vi";
  flag: string;
  label: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: LanguageOption[] = [
    { id: "en", flag: "🇺🇸", label: "EN" },
    { id: "vi", flag: "🇻🇳", label: "VI" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.id === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langId: "en" | "vi") => {
    setLanguage(langId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl shadow-black/40">
        {/* Logo */}
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/assets/pog-logo.png"
            alt="POG Logo"
            className="h-10 w-auto transform group-hover:scale-110 transition-transform"
          />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {[
            { key: "features", label: t("landing.features") },
            { key: "pricing", label: t("landing.pricing") },
            { key: "showcase", label: t("landing.showcase") },
          ].map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/5"
            >
              <Globe size={14} />
              <span>{currentLanguage.label}</span>
              <ChevronDown
                size={12}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 glass-panel rounded-lg shadow-xl shadow-black/40 border border-white/10 min-w-[120px] overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                      language === lang.id
                        ? "bg-primary/20 text-primary"
                        : "text-muted hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="hidden sm:block h-4 w-px bg-white/10 mx-1"></div>
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors px-2"
          >
            {t("nav.dashboard")}
          </button>
          <button
            onClick={() =>
              navigate(localStorage.getItem("token") ? "/custom" : "/auth")
            }
            className="bg-primary text-background text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            {t("landing.getStarted")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
