import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  ArrowRight, 
  TrendingDown, 
  Sparkles, 
  Check, 
  Leaf, 
  Scale, 
  Coins 
} from 'lucide-react';

interface AffordabilitySectionProps {
  onBuildMealPlan: (budget: number, household: number) => void;
}

export const AffordabilitySection: React.FC<AffordabilitySectionProps> = ({
  onBuildMealPlan,
}) => {
  const [householdSize, setHouseholdSize] = useState<number>(2);
  const [weeklyBudget, setWeeklyBudget] = useState<number>(75);

  // Dynamic calculations based on household and budget
  const mealsPerWeek = householdSize * 21; // 3 meals/day * 7 days
  const costPerMeal = (weeklyBudget / mealsPerWeek).toFixed(2);
  const estimatedSavings = Math.max(80, Math.round(householdSize * 95));

  const sampleStaples = [
    { name: 'Dry Brown Lentils & Chickpeas', cost: '$0.28 / serving', macro: '18g Protein' },
    { name: 'Rolled Oats & Chia Seeds', cost: '$0.35 / serving', macro: '11g Fiber' },
    { name: 'Local Seasonal Squash & Sweet Potato', cost: '$0.45 / serving', macro: 'Vitamins A & C' },
    { name: 'Dark Leafy Greens & Farm Eggs', cost: '$0.85 / serving', macro: 'Choline & Iron' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FDFCF8] relative overflow-hidden border-b border-[#E8E6E0]">
      
      {/* Subtle organic decorative backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-[#D9E9D3] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 right-0 translate-x-1/4 w-80 h-80 bg-[#E8E6E0] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Emotional, Brand-Driven Copy - Styled with High Density card banner */}
          <div className="lg:col-span-6 bg-[#D9E9D3] rounded-3xl p-6 sm:p-8 border border-[#7AA95C]/25 flex flex-col justify-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#2D3325] text-xs font-bold uppercase tracking-wider border border-[#7AA95C]/20 w-fit mb-4">
              <Coins className="w-3.5 h-3.5 text-[#7AA95C]" />
              <span>Core Philosophy</span>
            </div>

            {/* Headline as specified in brief */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F291B] tracking-tight leading-[1.15] mb-4">
              Healthy shouldn't <br />
              <span className="text-[#7AA95C]">mean expensive.</span>
            </h2>

            {/* Exact copy block from brief */}
            <div className="space-y-1.5 text-lg sm:text-xl font-semibold text-[#1F291B] border-l-4 border-[#7AA95C] pl-4 py-1 mb-4">
              <p>Tell us your budget.</p>
              <p>Tell us who you're feeding.</p>
              <p className="text-[#7AA95C] font-bold">We'll help you plan the rest.</p>
            </div>

            <p className="text-sm text-[#4A5043] leading-relaxed mb-6">
              Too many wellness apps assume you have an unlimited budget for boutique superfoods and exotic powders. HealthPlate takes the opposite approach. We design nutrient-dense, scientifically balanced meal plans around real grocery store prices — proving that deeply nourishing whole foods can cost less than convenience food.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-[#E8E6E0]">
                <div className="w-7 h-7 rounded-lg bg-[#D9E9D3] flex items-center justify-center text-[#2D3325] shrink-0">
                  <TrendingDown className="w-4 h-4 text-[#7AA95C]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#1F291B]">Save ~$180+ monthly</p>
                  <p className="text-[#6B7264]">By avoiding waste & markup</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-[#E8E6E0]">
                <div className="w-7 h-7 rounded-lg bg-[#F5F5F0] flex items-center justify-center text-[#2D3325] shrink-0">
                  <Scale className="w-4 h-4 text-[#7AA95C]" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#1F291B]">100% Nutrient Harmony</p>
                  <p className="text-[#6B7264]">Amino acids, vitamins & fiber</p>
                </div>
              </div>
            </div>

            {/* The strong CTA requested in brief */}
            <div>
              <button
                id="btn-build-meal-plan-philosophy"
                onClick={() => onBuildMealPlan(weeklyBudget, householdSize)}
                className="px-7 py-3 bg-[#1F291B] hover:bg-[#2D3325] text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2 cursor-pointer group"
              >
                <span>Build My Meal Plan</span>
                <ArrowRight className="w-4 h-4 text-[#7AA95C] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Real-time Affordability Calculator */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E8E6E0] relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E0]">
                <div>
                  <h3 className="text-lg font-bold text-[#1F291B]">Affordable Plate Calculator</h3>
                  <p className="text-xs text-[#6B7264]">Adjust sliders to preview your realistic weekly meal costs</p>
                </div>
                <span className="px-2.5 py-1 bg-[#D9E9D3] text-[#2D3325] rounded-full text-xs font-bold">
                  Live Calculator
                </span>
              </div>

              {/* Household size selector */}
              <div className="py-4 border-b border-[#E8E6E0] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F291B] flex items-center gap-2 uppercase tracking-wide">
                    <Users className="w-3.5 h-3.5 text-[#7AA95C]" />
                    <span>Who are you feeding?</span>
                  </label>
                  <span className="text-xs font-bold text-[#7AA95C]">
                    {householdSize === 1 ? 'Just me' : householdSize === 4 ? 'Family of 4' : `${householdSize} people`}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 5].map((size) => (
                    <button
                      key={size}
                      id={`calc-household-${size}`}
                      onClick={() => setHouseholdSize(size)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                        householdSize === size
                          ? 'bg-[#7AA95C] text-white shadow-xs'
                          : 'bg-[#F5F5F0] text-[#2D3325] hover:bg-[#D9E9D3] border border-[#E8E6E0]'
                      }`}
                    >
                      {size === 1 ? '1 Person' : size === 5 ? '5+ Family' : `${size} People`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Budget Slider */}
              <div className="py-4 border-b border-[#E8E6E0] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F291B] flex items-center gap-2 uppercase tracking-wide">
                    <DollarSign className="w-3.5 h-3.5 text-[#7AA95C]" />
                    <span>Weekly Budget Target:</span>
                  </label>
                  <span className="text-base font-extrabold text-[#1F291B] font-mono">
                    ${weeklyBudget} <span className="text-xs font-normal text-[#6B7264]">/ week</span>
                  </span>
                </div>

                <input
                  id="calc-budget-slider"
                  type="range"
                  min="35"
                  max="220"
                  step="5"
                  value={weeklyBudget}
                  onChange={(e) => setWeeklyBudget(Number(e.target.value))}
                  className="w-full h-2 bg-[#F5F5F0] rounded-lg appearance-none cursor-pointer accent-[#7AA95C]"
                />

                <div className="flex justify-between text-[10px] text-[#6B7264] font-mono font-medium">
                  <span>$35 (Ultra Thrifty)</span>
                  <span>$120 (Comfortable)</span>
                  <span>$220 (Abundant Family)</span>
                </div>
              </div>

              {/* Calculated Results Banner */}
              <div className="my-4 p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] grid grid-cols-2 gap-3 text-center">
                <div className="border-r border-[#E8E6E0] pr-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7264]">Est. Cost Per Meal</span>
                  <p className="text-xl sm:text-2xl font-black text-[#1F291B] font-mono mt-0.5">
                    ${costPerMeal}
                  </p>
                  <span className="text-[10px] text-[#7AA95C] font-semibold">100% whole nutrient food</span>
                </div>

                <div className="pl-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7264]">Est. Monthly Savings</span>
                  <p className="text-xl sm:text-2xl font-black text-[#7AA95C] font-mono mt-0.5">
                    ${estimatedSavings}
                  </p>
                  <span className="text-[10px] text-[#7AA95C] font-semibold">vs takeout & markups</span>
                </div>
              </div>

              {/* Sample High-Nutrient Low-Cost Staples */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
                  Sample Low-Cost Staples in Your Plan:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {sampleStaples.map((staple, i) => (
                    <div key={i} className="p-2 bg-[#FDFCF8] rounded-xl border border-[#E8E6E0] flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#1F291B] text-[11px]">{staple.name}</p>
                        <p className="text-[10px] text-[#7AA95C] font-mono font-semibold">{staple.macro}</p>
                      </div>
                      <span className="text-[10px] font-bold text-[#2D3325] bg-white px-1.5 py-0.5 rounded border border-[#E8E6E0]">
                        {staple.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button inside calculator */}
              <button
                id="calc-apply-btn"
                onClick={() => onBuildMealPlan(weeklyBudget, householdSize)}
                className="w-full mt-5 py-3 bg-[#7AA95C] hover:bg-[#6A964D] text-white font-bold text-xs rounded-full transition-all shadow-md shadow-[#7AA95C]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Customize Plan for {householdSize} {householdSize === 1 ? 'person' : 'people'} at ${weeklyBudget}/wk →</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
