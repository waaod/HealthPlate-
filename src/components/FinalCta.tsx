import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { Logo } from './Logo';

interface FinalCtaProps {
  onGetStarted: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFCF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Curved Card Container */}
        <div className="relative rounded-3xl sm:rounded-[32px] bg-[#1F291B] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl border border-[#2F3A2B]">
          
          {/* Subtle decorative leaf & ambient glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7AA95C]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#7AA95C]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            
            {/* HealthPlate Logo badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-xs font-semibold text-[#D9E9D3]">
              <Logo size="sm" iconOnly />
              <span>Nutrition • Planning • Guidance</span>
            </div>

            {/* Headline matching brief */}
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your health journey starts <br />
              <span className="text-[#A3C686] font-serif italic font-normal">with one plate.</span>
            </h2>

            {/* Supporting text matching brief */}
            <p className="text-base sm:text-lg text-[#D2DCB8] leading-relaxed max-w-2xl mx-auto font-normal">
              HealthPlate unites personalized nutrition science, realistic grocery budgeting, smart kitchen planning, and accredited expert guidance — all in one accessible, friendly platform.
            </p>

            {/* CTA matching brief */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="final-cta-btn-get-started"
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-base font-bold rounded-full shadow-lg shadow-[#7AA95C]/30 hover:scale-102 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Get Started — It's Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Reassurance items */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-[#AEC298]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7AA95C]" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#7AA95C]" />
                Calibrated to your local budget
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#7AA95C]" />
                Evidence-based dietitian guidelines
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
