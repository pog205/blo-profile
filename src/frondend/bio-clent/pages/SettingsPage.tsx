import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  LogOut,
} from "lucide-react";
import { authService } from "../services/auth.service";
import { authToast } from "../utils/toast";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authService.logout();
    } finally {
      authToast.logoutSuccess();
      navigate("/auth");
    }
  };
  const settingsSections = [
    {
      icon: User,
      label: t("settings.profile"),
      description: t("settings.profileDesc"),
    },
    {
      icon: Bell,
      label: t("settings.notifications"),
      description: t("settings.notificationsDesc"),
    },
    {
      icon: Shield,
      label: t("settings.privacySecurity"),
      description: t("settings.privacySecurityDesc"),
    },
    {
      icon: Palette,
      label: t("settings.appearance"),
      description: t("settings.appearanceDesc"),
    },
    {
      icon: Globe,
      label: t("settings.languageRegion"),
      description: t("settings.languageRegionDesc"),
    },
    {
      icon: CreditCard,
      label: t("settings.billing"),
      description: t("settings.billingDesc"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="size-5 text-blue-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
          {t("settings.title")}
        </h3>
      </div>

      <div className="space-y-3">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.label}
              className="w-full flex items-center gap-4 bg-[#0d1117] border border-white/5 rounded-xl p-4 hover:bg-[#12161d] hover:border-white/10 transition-all group"
            >
              <div className="flex items-center justify-center size-10 rounded-lg bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                <Icon className="size-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">
                  {section.label}
                </p>
                <p className="text-xs text-slate-500">{section.description}</p>
              </div>
              <div className="text-slate-600 group-hover:text-slate-400 transition-colors">
                →
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="size-4" />
          <span className="text-sm font-medium">{t("settings.signOut")}</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
