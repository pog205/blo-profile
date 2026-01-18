import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bolt,
  LayoutGrid,
  Link as LinkIcon,
  BarChart3,
  Settings,
  User,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

interface NavItemConfig {
  to: string;
  icon: LucideIcon;
  label: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items: NavItemConfig[] = [
    { to: "/custom", icon: LayoutGrid, label: "Custom" },
    { to: "/links", icon: LinkIcon, label: "Links" },
    { to: "/shop", icon: ShoppingBag, label: "Shop" },
    { to: "/analytics", icon: BarChart3, label: "Analytics" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-white/5 bg-[#101622] p-4 shrink-0 relative overflow-hidden`}
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

      {/* Footer & Collapse Toggle */}
      <div className="flex flex-col gap-4">
        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full h-10 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 group"
        >
          {isCollapsed ? (
            <ChevronRight className="size-5 group-hover:scale-110 transition-transform" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Collapse
              </span>
            </div>
          )}
        </button>

        {/* User Profile Footer */}
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
            <div className="flex flex-col overflow-hidden opacity-100 transition-opacity duration-300">
              <p className="truncate text-sm font-medium text-white">
                Alex Designer
              </p>
              <p className="truncate text-xs text-slate-400">user_88219</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
