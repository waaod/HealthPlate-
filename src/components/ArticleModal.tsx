import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  Share2
} from 'lucide-react';
import { mockArticles } from '../data/mockData';
import { Article } from '../types';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose }) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col">
        
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Learn & Grow • Science-Backed Nutrition</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F291B]">
              {activeArticle ? 'Nutrition Science Guide' : 'Evidence-Based Articles & Guides'}
            </h2>
          </div>
          <button
            onClick={() => {
              if (activeArticle) setActiveArticle(null);
              else onClose();
            }}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {activeArticle ? (
            <div className="space-y-6 animate-fadeIn">
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs font-bold text-[#7AA95C] hover:underline cursor-pointer"
              >
                ← Back to all educational guides
              </button>

              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9E9D3]/50 text-[#1F291B] border border-[#7AA95C]/20">
                  {activeArticle.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#1F291B]">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#6B7264] pt-1">
                  <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              {/* Key Takeaways Callout */}
              <div className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] space-y-2.5">
                <h4 className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7AA95C]" />
                  <span>Key Clinical Takeaways</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#4A5043]">
                  {activeArticle.takeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7AA95C] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content */}
              <div className="space-y-4 text-sm text-[#343F2F] leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#6B7264]">
                Explore bite-sized nutrition education written by accredited dietitians. No fads, no sponsored detoxes.
              </p>

              {mockArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setActiveArticle(art)}
                  className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] hover:border-[#7AA95C] cursor-pointer transition-all space-y-2.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7AA95C]">
                      {art.category}
                    </span>
                    <span className="text-[11px] text-[#6B7264] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F291B] group-hover:text-[#7AA95C] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#4A5043] leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#6B7264] text-[11px]">
                      By {art.author}, {art.authorRole}
                    </span>
                    <span className="text-[#7AA95C] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read Guide →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="p-4 border-t border-[#E8E6E0] bg-[#FDFCF8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F291B] hover:bg-[#343F2F] text-white text-xs font-bold rounded-full cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
