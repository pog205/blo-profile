/**
 * i18n entry point — backed by react-i18next
 * Import this to get the configured i18next instance.
 * Use `useTranslation()` from 'react-i18next' in components.
 *
 * For backward-compat the `useI18n` hook is kept so Sidebar / Navbar
 * don't need to change: it exposes `{ language, setLanguage, toggleLanguage }`.
 */

import "./config";
import i18n from "./config";
import { useTranslation } from "react-i18next";

export type Language = "en" | "vi";

// Backward-compat hook used in Sidebar / Navbar
export function useI18n() {
  const { i18n: instance } = useTranslation();
  const language = (instance.language?.slice(0, 2) ?? "en") as Language;

  const setLanguage = (lang: Language) => {
    instance.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  return { language, setLanguage, toggleLanguage };
}

export default i18n;
