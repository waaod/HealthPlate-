import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Heart, Zap, DollarSign, ChefHat } from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
  onOpenDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGetStarted,
  onExploreFeatures,
  onOpenDashboard,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>('quinoa');

  const ingredientsInfo: Record<string, { title: string; benefit: string; macro: string; cost: string }> = {
    avocado: {
      title: 'Hass Avocado Slices',
      benefit: 'Rich in monounsaturated oleic acid & potassium for cardiovascular health',
      macro: '12g healthy fats • 5g fiber',
      cost: '$0.85',
    },
    quinoa: {
      title: 'Tri-Color Sprouted Quinoa',
      benefit: 'Complete plant protein containing all 9 essential amino acids',
      macro: '9g protein • 34g slow carbs',
      cost: '$0.65',
    },
    spinach: {
      title: 'Tender Baby Spinach & Herbs',
      benefit: 'Abundant in non-heme iron, lutein, vitamin K, and folate',
      macro: 'High micronutrient density',
      cost: '$0.40',
    },
    salmon: {
      title: 'Pan-Roasted Wild Salmon / Tofu',
      benefit: 'Essential marine Omega-3 EPA/DHA reducing systemic cellular inflammation',
      macro: '28g bioavailable protein',
      cost: '$1.45',
    },
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:pt-10 md:pb-16">
      {/* Subtle organic background glow accents from High Density theme */}
      <div className="absolute top-0 right-1/4 -z-10 w-80 h-80 bg-[#D9E9D3] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-5 left-10 -z-10 w-72 h-72 bg-[#E8E6E0]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content - High Density Card Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E6E0] shadow-sm relative overflow-hidden flex flex-col justify-center">
            {/* Top right decorative circle from Design HTML */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D9E9D3] rounded-full -mr-12 -mt-12 opacity-50 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Brand Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9E9D3] border border-[#7AA95C]/30 text-[#2D3325] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#7AA95C] animate-pulse" />
                <span>Personalized Nutrition • Affordable Living</span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] text-[#1F291B] tracking-tight">
                  Healthy eating, <br />
                  <span className="text-[#7AA95C]">made possible.</span>
                </h1>
                {/* Supporting Text */}
                <p className="text-[#4A5043] text-base sm:text-lg max-w-md mt-4 leading-relaxed font-normal">
                  Personalized nutrition, affordable meal planning, and trusted health guidance — all in one place.
                </p>
              </div>

              {/* Value Highlights Pill Grid */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-[#4A5043] font-semibold pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7AA95C]" />
                  Budget-friendly meal plans
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7AA95C]" />
                  Real-time calorie & macro tracker
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7AA95C]" />
                  Science-backed dietitian tips
                </span>
              </div>

              {/* CTAs matching High Density theme */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="hero-btn-get-started"
                  onClick={onGetStarted}
                  className="bg-[#7AA95C] text-white px-7 py-3 rounded-full font-bold shadow-lg shadow-[#7AA95C]/30 hover:bg-[#6A964D] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer text-sm"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-btn-explore"
                  onClick={onExploreFeatures}
                  className="border-2 border-[#E8E6E0] px-6 py-3 rounded-full font-bold text-[#1F291B] hover:bg-[#F5F5F0] transition-colors text-sm text-center cursor-pointer"
                >
                  Explore Features
                </button>

                <button
                  id="hero-btn-tracker"
                  onClick={onOpenDashboard}
                  className="border-2 border-[#D9E9D3] bg-[#FDFCF8] hover:bg-[#D9E9D3]/40 text-[#2D3325] px-5 py-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#7AA95C]" />
                  <span>Track Today’s Plate</span>
                </button>
              </div>

              {/* Credibility statement */}
              <div className="flex items-center gap-3 pt-2 text-xs text-[#6B7264] border-t border-[#E8E6E0]">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Member"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Member"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80"
                    alt="Member"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <p>
                  Trusted by <strong className="font-bold text-[#1F291B]">+12k people</strong> planning today.
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero Plate Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Outer High Density Container */}
              <div className="relative p-5 sm:p-6 bg-white rounded-3xl shadow-sm border border-[#E8E6E0]">
                
                {/* Plate Composition Image Header */}
                <div className="relative rounded-2xl overflow-hidden bg-[#F5F5F0] aspect-4/3 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85"
                    alt="HealthPlate Mediterranean Balanced Plate"
                    className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F291B]/75 via-transparent to-black/10" />

                  {/* Logo Watermark in Corner */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs flex items-center gap-2 border border-[#E8E6E0]">
                    <Logo size="sm" iconOnly />
                    <span className="text-xs font-bold text-[#2D3325]">The Balanced Plate</span>
                  </div>

                  {/* Bottom Plate Summary Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-[#D9E9D3] tracking-wider uppercase">Today's Blueprint</p>
                        <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-xs">
                          Avocado, Quinoa & Greens Plate
                        </h3>
                      </div>
                      <div className="text-right bg-[#2D3325]/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
                        <span className="text-[10px] text-[#D9E9D3] block">Target Cost</span>
                        <span className="text-xs font-bold text-[#7AA95C] font-mono">$3.35 / meal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Ingredient Selector Pills */}
                <div className="mt-4 pt-3 border-t border-[#E8E6E0]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#2D3325] uppercase tracking-wider">
                      Plate Ingredients:
                    </span>
                    <span className="text-[11px] text-[#7AA95C] font-semibold">Click to inspect</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'quinoa', label: 'Sprouted Quinoa' },
                      { id: 'avocado', label: 'Hass Avocado' },
                      { id: 'spinach', label: 'Baby Spinach' },
                      { id: 'salmon', label: 'Wild Salmon/Tofu' },
                    ].map((ing) => (
                      <button
                        key={ing.id}
                        id={`hero-ing-${ing.id}`}
                        onClick={() => setSelectedIngredient(ing.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold text-center transition-all ${
                          selectedIngredient === ing.id
                            ? 'bg-[#7AA95C] text-white shadow-xs scale-102'
                            : 'bg-[#F5F5F0] text-[#2D3325] hover:bg-[#D9E9D3] hover:text-[#1F291B]'
                        }`}
                      >
                        {ing.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Selected Ingredient Detail Drawer Card */}
                  {selectedIngredient && ingredientsInfo[selectedIngredient] && (
                    <div className="mt-3 p-3 bg-[#FDFCF8] rounded-xl border border-[#E8E6E0] flex items-start justify-between text-xs animate-fadeIn">
                      <div className="space-y-0.5">
                        <p className="font-bold text-[#1F291B]">{ingredientsInfo[selectedIngredient].title}</p>
                        <p className="text-[#4A5043] leading-snug">{ingredientsInfo[selectedIngredient].benefit}</p>
                        <p className="text-[11px] font-mono font-bold text-[#7AA95C] pt-0.5">
                          {ingredientsInfo[selectedIngredient].macro}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] font-bold text-[#2D3325] bg-white px-2 py-0.5 rounded border border-[#E8E6E0]">
                        {ingredientsInfo[selectedIngredient].cost}
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating Micro Cards in High Density theme */}
                {/* 1. Macro Target Pill */}
                <div className="hidden sm:flex absolute -top-4 -right-3 bg-white rounded-2xl shadow-md border border-[#E8E6E0] p-2.5 items-center gap-2.5 animate-float">
                  <div className="w-8 h-8 rounded-xl bg-[#D9E9D3] flex items-center justify-center text-[#2D3325]">
                    <Zap className="w-4 h-4 text-[#7AA95C]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#6B7264]">Macro Harmony</p>
                    <p className="text-xs font-black text-[#1F291B]">32g P • 48g C • 18g F</p>
                    <p className="text-[10px] text-[#7AA95C] font-semibold">94% Target Reached</p>
                  </div>
                </div>

                {/* 2. Affordability Pill */}
                <div className="hidden sm:flex absolute -bottom-4 -left-3 bg-white rounded-2xl shadow-md border border-[#E8E6E0] p-2.5 items-center gap-2.5 animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="w-8 h-8 rounded-xl bg-[#F5F5F0] flex items-center justify-center text-[#2D3325]">
                    <DollarSign className="w-4 h-4 text-[#7AA95C]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#6B7264]">Affordable Eating</p>
                    <p className="text-xs font-black text-[#1F291B]">$3.35 / serving</p>
                    <p className="text-[10px] text-[#7AA95C] font-semibold">Under daily budget cap</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
