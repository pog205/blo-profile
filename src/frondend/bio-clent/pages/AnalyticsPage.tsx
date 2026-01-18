import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AnalyticsPage: React.FC = () => {
  const stats = [
    {
      label: "Total Views",
      value: "12,543",
      change: "+12.5%",
      isUp: true,
      icon: Eye,
    },
    {
      label: "Unique Visitors",
      value: "8,234",
      change: "+8.2%",
      isUp: true,
      icon: Users,
    },
    {
      label: "Avg. Time on Page",
      value: "2m 34s",
      change: "-3.1%",
      isUp: false,
      icon: Clock,
    },
    {
      label: "Link Clicks",
      value: "3,421",
      change: "+15.7%",
      isUp: true,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="size-5 text-purple-400" />
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">
          Analytics Overview
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#0d1117] border border-white/5 rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-slate-400" />
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.isUp ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.isUp ? (
                    <ArrowUpRight className="size-3" />
                  ) : (
                    <ArrowDownRight className="size-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#0d1117] border border-white/5 rounded-2xl p-8">
        <h4 className="text-sm font-semibold text-white mb-6">
          Traffic Overview
        </h4>
        <div className="h-64 flex items-center justify-center text-slate-500">
          <p>Chart visualization coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
