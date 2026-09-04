import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Users, 
  DollarSign, 
  Heart, 
  ShieldAlert, 
  Target, 
  Salad 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserPreferences } from '../types';
import { Logo } from './Logo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
  onOpenDashboardAfterSave?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialPreferences,
  onSavePreferences,
  onOpenDashboardAfterSave,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<UserPreferences>({ ...initialPreferences });

  if (!isOpen) return null;

  // Diet options
  const dietOptions = [
    { id: 'balanced', label: 'Balanced & Intuitive', desc: 'Focus on whole foods, variety, and steady energy' },
    { id: 'mediterranean', label: 'Mediterranean', desc: 'Abundant olive oil, greens, legumes, and lean proteins' },
    { id: 'plant-based', label: 'Plant-Based / Vegan', desc: '100% plant foods, legumes, seeds, and grains' },
    { id: 'high-protein', label: 'High Protein', desc: 'Optimized for muscle preservation and athletic recovery' },
    { id: 'pescatarian', label: 'Pescatarian', desc: 'Plant-forward with wild fish and seafood' },
    { id: 'low-carb', label: 'Lower Carb', desc: 'Modest carbohydrates with healthy dietary fats' },
  ];

  // Health considerations
  const healthOptions = [
    'Heart health & blood pressure',
    'Blood sugar / insulin sensitivity',
    'Sustained all-day energy',
    'Gut microbiome & easy digestion',
    'Muscle maintenance & tone',
    'Joint & anti-inflammatory health',
  ];

  // Allergies
  const allergyOptions = [
    'Gluten-Free',
    'Dairy-Free / Lactose',
    'Peanut-Free',
    'Tree Nuts',
    'Shellfish',
    'Soy-Free',
    'Egg-Free',
  ];

  // Goals
  const goalOptions = [
    'Hit daily macro & protein goals',
    'Eat healthier on a tight budget',
    'Cook more meals with ingredients I have',
    'Consistent daily energy',
    'Feed family nutritious meals',
    'Lose excess body fat sustainably',
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate custom calorie & macro recommendations
      let baseCalories = 1900;
      if (formData.age < 30) baseCalories = 2150;
      else if (formData.age > 50) baseCalories = 1850;

      if (formData.dietaryPreference === 'high-protein') baseCalories += 100;
      if (formData.goals.includes('Lose excess body fat sustainably')) baseCalories -= 250;

      let protein = Math.round(baseCalories * 0.28 / 4);
      let carbs = Math.round(baseCalories * 0.45 / 4);
      let fat = Math.round(baseCalories * 0.27 / 9);
      let fiber = 32;

      if (formData.dietaryPreference === 'high-protein') {
        protein = Math.round(baseCalories * 0.35 / 4);
        carbs = Math.round(baseCalories * 0.38 / 4);
      } else if (formData.dietaryPreference === 'low-carb') {
        carbs = Math.round(baseCalories * 0.25 / 4);
        fat = Math.round(baseCalories * 0.45 / 9);
      }

      const finalized: UserPreferences = {
        ...formData,
        caloricGoal: baseCalories,
        macroTargets: {
          protein,
          carbs,
          fat,
          fiber,
        },
      };

      onSavePreferences(finalized);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7AA95C', '#FDFCF8', '#1F291B', '#D9E9D3'],
        });
      } catch (e) {
        // graceful fallback
      }

      onClose();
      if (onOpenDashboardAfterSave) {
        onOpenDashboardAfterSave();
      }
    }
  };

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const toggleHealth = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      healthConsiderations: prev.healthConsiderations.includes(item)
        ? prev.healthConsiderations.filter((h) => h !== item)
        : [...prev.healthConsiderations, item],
    }));
  };

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <h2 className="text-base font-bold text-[#1F291B]">Personalize Your HealthPlate</h2>
              <p className="text-xs text-[#6B7264]">Step {step} of 3 • Custom plan creation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F5F5F0] h-1.5">
          <div
            className="bg-[#7AA95C] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* STEP 1: Basic info & Household / Budget */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F291B]">Tell us about yourself & household</h3>
                <p className="text-sm text-[#4A5043] mt-1">
                  We use this to calibrate nutritional energy requirements and scale family grocery plans.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
                    Your First Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] text-sm focus:outline-none focus:border-[#7AA95C]"
                    placeholder="Alex"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
                    Your Age
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] text-sm focus:outline-none focus:border-[#7AA95C]"
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Household Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#7AA95C]" />
                  <span>Household / Family Size to Feed</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, householdSize: num })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        formData.householdSize === num
                          ? 'bg-[#7AA95C] text-white border-[#7AA95C] shadow-xs'
                          : 'bg-[#F5F5F0] text-[#1F291B] border-[#E8E6E0] hover:bg-[#D9E9D3]'
                      }`}
                    >
                      {num === 1 ? '1 (Solo)' : num === 5 ? '5+ People' : `${num} People`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Grocery Budget */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#7AA95C]" />
                    <span>Target Weekly Grocery Budget</span>
                  </label>
                  <span className="text-base font-extrabold text-[#7AA95C] font-mono">
                    ${formData.weeklyBudget} / week
                  </span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="220"
                  step="5"
                  value={formData.weeklyBudget}
                  onChange={(e) => setFormData({ ...formData, weeklyBudget: Number(e.target.value) })}
                  className="w-full h-2 bg-[#F5F5F0] rounded-lg appearance-none cursor-pointer accent-[#7AA95C]"
                />
                <div className="flex justify-between text-[11px] text-[#6B7264]">
                  <span>$35 / wk (Thrifty)</span>
                  <span>$120 / wk</span>
                  <span>$220+ / wk</span>
                </div>
              </div>

              {/* Primary Goals */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#7AA95C]" />
                  <span>Your Main Health & Lifestyle Goals (Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goalOptions.map((goal) => {
                    const active = formData.goals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`p-3 text-left rounded-xl text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? 'bg-[#D9E9D3] text-[#1F291B] border-[#7AA95C] font-bold'
                            : 'bg-[#FDFCF8] text-[#4A5043] border-[#E8E6E0] hover:bg-white'
                        }`}
                      >
                        <span>{goal}</span>
                        {active && <Check className="w-4 h-4 text-[#7AA95C] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Dietary Preferences & Health Considerations */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F291B]">Dietary preference & health focus</h3>
                <p className="text-sm text-[#4A5043] mt-1">
                  Tell us your preferred eating style so recipes and shopping plans match what you love.
                </p>
              </div>

              {/* Dietary styles */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <Salad className="w-4 h-4 text-[#7AA95C]" />
                  <span>Choose Your Preferred Style</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dietOptions.map((diet) => {
                    const active = formData.dietaryPreference === diet.id;
                    return (
                      <button
                        key={diet.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, dietaryPreference: diet.id as any })}
                        className={`p-3.5 text-left rounded-2xl border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#D9E9D3] text-[#1F291B] border-[#7AA95C] shadow-xs'
                            : 'bg-[#FDFCF8] text-[#1F291B] border-[#E8E6E0] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-xs">{diet.label}</p>
                          {active && <Check className="w-4 h-4 text-[#7AA95C]" />}
                        </div>
                        <p className="text-[11px] text-[#6B7264] mt-1 leading-snug">{diet.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nutrition-related health considerations */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#7AA95C]" />
                  <span>Health & Nutrition Considerations</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {healthOptions.map((item) => {
                    const active = formData.healthConsiderations.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleHealth(item)}
                        className={`p-2.5 text-left rounded-xl text-xs border transition-all flex items-center justify-between cursor-pointer ${
                          active
                            ? 'bg-[#D9E9D3] text-[#1F291B] border-[#7AA95C] font-bold'
                            : 'bg-[#FDFCF8] text-[#4A5043] border-[#E8E6E0] hover:bg-white'
                        }`}
                      >
                        <span>{item}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#7AA95C] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Allergies, Restrictions & Target Preview */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F291B]">Food allergies & dietary restrictions</h3>
                <p className="text-sm text-[#4A5043] mt-1">
                  We will automatically filter out any recipe or ingredient containing these tags.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#7AA95C]" />
                  <span>Do you have any food allergies or intolerances?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allergyOptions.map((allergy) => {
                    const active = formData.allergies.includes(allergy);
                    return (
                      <button
                        key={allergy}
                        type="button"
                        onClick={() => toggleAllergy(allergy)}
                        className={`p-2.5 text-center rounded-xl text-xs border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#1F291B] text-white border-[#1F291B] font-bold shadow-xs'
                            : 'bg-[#FDFCF8] text-[#1F291B] border-[#E8E6E0] hover:bg-white'
                        }`}
                      >
                        {allergy}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personalized Blueprint preview banner */}
              <div className="p-5 rounded-2xl bg-[#D9E9D3]/40 border border-[#7AA95C]/30 space-y-3">
                <div className="flex items-center gap-2 text-[#2D3325]">
                  <Sparkles className="w-4 h-4 text-[#7AA95C]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Your Personalized Daily Nutritional Blueprint
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-[#E8E6E0]">
                    <span className="text-[10px] text-[#6B7264] block font-medium">Daily Calories</span>
                    <span className="text-base font-extrabold text-[#1F291B] font-mono">~2,050 kcal</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#E8E6E0]">
                    <span className="text-[10px] text-[#6B7264] block font-medium">Protein Target</span>
                    <span className="text-base font-extrabold text-[#7AA95C] font-mono">135g / day</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#E8E6E0]">
                    <span className="text-[10px] text-[#6B7264] block font-medium">Carb Balance</span>
                    <span className="text-base font-extrabold text-[#1F291B] font-mono">215g / day</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-[#E8E6E0]">
                    <span className="text-[10px] text-[#6B7264] block font-medium">Healthy Fats</span>
                    <span className="text-base font-extrabold text-[#1F291B] font-mono">65g / day</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#4A5043] leading-relaxed">
                  ✓ Calculated for {formData.householdSize} person ({formData.name || 'Alex'}), tailored to {formData.dietaryPreference} eating, and capped under ${formData.weeklyBudget}/wk.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Buttons */}
        <div className="p-6 border-t border-[#E8E6E0] bg-[#FDFCF8] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-bold text-[#4A5043] hover:text-[#1F291B] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            id="onboarding-next-btn"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full shadow-sm shadow-[#7AA95C]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{step === 3 ? 'Complete & Open My Dashboard' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
