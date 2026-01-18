import React from "react";
import { Fingerprint, MessageSquare, Send, Globe, Github } from "lucide-react";

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Showcase", "Changelog"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Contact"],
    },
    {
      title: "Resources",
      links: ["Help Center", "API Docs", "Community", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Cookies"],
    },
  ];

  return (
    <footer className="bg-[#0b0c12] border-t border-white/5 pt-20 pb-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background">
                <Fingerprint size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold">BioProfile</span>
            </div>
            <p className="text-muted text-base leading-relaxed max-w-sm">
              The modern standard for digital identity. Built for the future of
              the creator economy. Join thousands of creators today.
            </p>
            <div className="flex gap-4">
              {[MessageSquare, Send, Globe, Github].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:bg-primary hover:text-background hover:border-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted text-sm font-medium order-2 md:order-1">
            © {new Date().getFullYear()} Bio Profile Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8 order-1 md:order-2">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
