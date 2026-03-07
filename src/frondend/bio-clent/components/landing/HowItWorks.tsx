import React from "react";
import { User, Link2, Share2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const StepCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  imgSrc: string;
  glowColor: string;
  iconColor: string;
}> = ({ icon, title, description, imgSrc, glowColor, iconColor }) => {
  return (
    <div className="group relative bg-card rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden hover:-translate-y-2 flex flex-col">
      {/* Dynamic Glow Effect */}
      <div
        className={`absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 ${glowColor}`}
      ></div>

      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-xl bg-gray-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${iconColor}`}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-muted leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        {/* Abstract Card Image Representation */}
        <div className="mt-auto h-40 w-full rounded-xl overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
        </div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section
      className="relative py-24 px-6 md:px-20 bg-background"
      id="features"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {t("shop.howItWorks")}
            </h2>
            <p className="text-muted text-lg md:text-xl">
              {t("shop.howItWorksDesc")}
            </p>
          </div>
          <div className="pb-2">
            <a
              href="#"
              className="text-primary hover:text-accent font-bold inline-flex items-center gap-2 group transition-colors text-lg"
            >
              {t("shop.viewAllFeatures")}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<User size={28} />}
            title={t("shop.personalize")}
            description={t("shop.personalizeDesc")}
            imgSrc="https://picsum.photos/seed/p1/400/300"
            glowColor="bg-primary"
            iconColor="text-primary"
          />
          <StepCard
            icon={<Link2 size={28} />}
            title={t("shop.connect")}
            description={t("shop.connectDesc")}
            imgSrc="https://picsum.photos/seed/p2/400/300"
            glowColor="bg-accent"
            iconColor="text-accent"
          />
          <StepCard
            icon={<Share2 size={28} />}
            title={t("shop.share")}
            description={t("shop.shareDesc")}
            imgSrc="https://picsum.photos/seed/p3/400/300"
            glowColor="bg-purple-500"
            iconColor="text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
