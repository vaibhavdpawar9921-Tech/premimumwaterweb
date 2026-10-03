import React from 'react';
import { UserCheck, Users, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/websiteData';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TeamSectionProps {
  language: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language].team;
  const isEn = language === 'en';

  return (
    <section id="team" className="py-20 md:py-28 bg-[#F5FAFC] relative border-t border-[#D9E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8F9FC] text-[#00A8C6] border border-[#D9E8F0] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#00A8C6]" />
            <span>People & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D5C] font-heading tracking-tight">
            {t.heading}
          </h2>
          <p className="text-[#536579] text-sm sm:text-base">
            {t.subheading}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => {
            const role = isEn ? member.roleEn : member.roleMr;
            const bio = isEn ? member.bioEn : member.bioMr;

            return (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-[#D9E8F0] shadow-[0_10px_30px_rgba(11,45,92,0.06)] hover:shadow-[0_15px_40px_rgba(11,45,92,0.12)] hover:border-[#00A8C6] transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Photo Placeholder Silhouette with Royal Crest Accents */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#071D3A] via-[#0B2D5C] to-[#1557A6] flex flex-col items-center justify-center text-white mb-5 relative overflow-hidden shadow-md">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#00A8C6] border border-white/20">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#D4AF37] mt-2 bg-black/40 px-2 py-0.5 rounded">
                    [TEAM PHOTO]
                  </span>
                </div>

                {/* Name Placeholder */}
                <h3 className="text-base font-bold text-[#0B2D5C] font-heading">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-xs font-semibold text-[#1557A6] mt-1 mb-3">
                  {role}
                </p>

                {/* Short Bio */}
                <p className="text-xs text-[#536579] leading-relaxed">
                  {bio}
                </p>
              </div>
            );
          })}
        </div>

        {/* Editorial Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#536579]/70 max-w-lg mx-auto">
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
};
