import React, { useState } from 'react';
import { 
  Plus, 
  Flame, 
  Zap, 
  Droplets, 
  DollarSign, 
  Calendar, 
  Trash2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Utensils, 
  ArrowLeft,
  CheckCircle2,
  Salad,
  Info
} from 'lucide-react';
import { UserPreferences, MealItem, Recipe } from '../types';
import { mockRecipes } from '../data/mockData';

interface DashboardProps {
  preferences: UserPreferences;
  meals: MealItem[];
  waterCount: number;
  onAddMeal: (meal: MealItem) => void;
  onRemoveMeal: (mealId: string) => void;
  onIncrementWater: () => void;
  onDecrementWater: () => void;
  onBackToHome: () => void;
  onOpenRecipeExplorer: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  preferences,
  meals,
  waterCount,
  onAddMeal,
  onRemoveMeal,
  onIncrementWater,
  onDecrementWater,
  onBackToHome,
  onOpenRecipeExplorer,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');

  // Custom meal input state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('450');
  const [customProtein, setCustomProtein] = useState('25');
  const [customCarbs, setCustomCarbs] = useState('45');
  const [customFat, setCustomFat] = useState('14');
  const [customFiber, setCustomFiber] = useState('8');
  const [customCost, setCustomCost] = useState('2.80');
  const [customPortion, setCustomPortion] = useState('1 plate');

  // Calorie calculations
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const calorieGoal = preferences.caloricGoal || 2050;
  const caloriesRemaining = Math.max(0, calorieGoal - totalCalories);
  const caloriePercent = Math.min(100, Math.round((totalCalories / calorieGoal) * 100));

  // Macro totals
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);
  const totalFiber = meals.reduce((sum, m) => sum + m.fiber, 0);
  const totalCost = meals.reduce((sum, m) => sum + (m.costEstimate || 0), 0);

  // Targets
  const targetProtein = preferences.macroTargets.protein || 135;
  const targetCarbs = preferences.macroTargets.carbs || 215;
  const targetFat = preferences.macroTargets.fat || 65;
  const targetFiber = preferences.macroTargets.fiber || 32;

  // Macro percentages
  const proteinPercent = Math.min(100, Math.round((totalProtein / targetProtein) * 100));
  const carbsPercent = Math.min(100, Math.round((totalCarbs / targetCarbs) * 100));
  const fatPercent = Math.min(100, Math.round((totalFat / targetFat) * 100));
  const fiberPercent = Math.min(100, Math.round((totalFiber / targetFiber) * 100));

  // Categorized meals
  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', icon: '🌙' },
    { id: 'snack', label: 'Snacks & Fuel', icon: '🍎' },
  ] as const;

  const handleAddCustomMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: customName.trim(),
      category: selectedCategory,
      calories: Number(customCalories) || 0,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fat: Number(customFat) || 0,
      fiber: Number(customFiber) || 0,
      costEstimate: Number(customCost) || 2.5,
      portion: customPortion || '1 serving',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddMeal(newMeal);
    setShowAddModal(false);
    setCustomName('');
  };

  const handleAddRecipeAsMeal = (recipe: Recipe) => {
    const newMeal: MealItem = {
      id: `meal-rec-${Date.now()}-${recipe.id}`,
      name: recipe.title,
      category: selectedCategory,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      fiber: recipe.fiber,
      costEstimate: recipe.costPerServing,
      portion: '1 serving',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ingredients: recipe.ingredients.slice(0, 4),
      image: recipe.image,
    };

    onAddMeal(newMeal);
    setShowAddModal(false);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FDFCF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top bar with user greeting and navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E6E0]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider mb-1">
              <button 
                onClick={onBackToHome}
                className="flex items-center gap-1 hover:text-[#6A964D] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Homepage</span>
              </button>
              <span>•</span>
              <span>Daily Plate Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F291B]">
              Hello, {preferences.name || 'Friend'} 👋
            </h1>
            <p className="text-sm text-[#4A5043]">
              Personalized for your <strong className="text-[#1F291B] capitalize">{preferences.dietaryPreference}</strong> lifestyle • ${preferences.weeklyBudget}/wk budget target.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="dashboard-btn-explore-recipes"
              onClick={onOpenRecipeExplorer}
              className="px-4 py-2 bg-white hover:bg-[#F5F5F0] text-[#1F291B] border border-[#E8E6E0] rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Salad className="w-4 h-4 text-[#7AA95C]" />
              <span>Browse Recipes</span>
            </button>

            <button
              id="dashboard-btn-add-food-top"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#7AA95C] hover:bg-[#6A964D] text-white rounded-full text-xs font-bold shadow-sm shadow-[#7AA95C]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Meal / Food</span>
            </button>
          </div>
        </div>

        {/* Core Metric Cards: Calorie Ring & Macro Progress Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Caloric Intake Gauge Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E8E6E0] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B7264] uppercase tracking-wider">Caloric Balance</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1F291B]">Daily Energy Intake</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D9E9D3] text-[#2D3325] text-xs font-bold font-mono">
                {caloriePercent}% of Target
              </span>
            </div>

            {/* Circular Visual & Stat Breakdown */}
            <div className="my-6 flex items-center justify-center gap-6 sm:gap-8 flex-wrap sm:flex-nowrap">
              {/* Ring meter */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F5F5F0"
                    strokeWidth="11"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#7AA95C"
                    strokeWidth="11"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * caloriePercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <Flame className="w-5 h-5 text-[#7AA95C] mb-0.5" />
                  <span className="text-2xl font-black text-[#1F291B] font-mono leading-none">
                    {totalCalories}
                  </span>
                  <span className="text-[10px] text-[#6B7264] uppercase font-bold mt-0.5">
                    kcal eaten
                  </span>
                </div>
              </div>

              {/* Stats column */}
              <div className="space-y-2.5 text-xs w-full">
                <div className="p-2.5 rounded-xl bg-[#FDFCF8] border border-[#E8E6E0] flex items-center justify-between">
                  <span className="text-[#6B7264] font-medium">Daily Goal:</span>
                  <span className="font-bold text-[#1F291B] font-mono text-sm">{calorieGoal} kcal</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FDFCF8] border border-[#E8E6E0] flex items-center justify-between">
                  <span className="text-[#6B7264] font-medium">Remaining:</span>
                  <span className={`font-bold font-mono text-sm ${caloriesRemaining === 0 ? 'text-[#B47C1C]' : 'text-[#7AA95C]'}`}>
                    {caloriesRemaining} kcal
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FDFCF8] border border-[#E8E6E0] flex items-center justify-between">
                  <span className="text-[#6B7264] font-medium">Est. Cost Today:</span>
                  <span className="font-bold text-[#1F291B] font-mono text-sm">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="pt-3 border-t border-[#E8E6E0] flex items-center justify-between text-xs text-[#4A5043]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7AA95C]" />
                {totalCalories <= calorieGoal ? 'Within balanced daily bounds' : 'Target reached for today'}
              </span>
              <span className="text-[#7AA95C] font-bold">{meals.length} meals logged</span>
            </div>
          </div>

          {/* Macro Progress Bars (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E8E6E0] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#6B7264] uppercase tracking-wider">Macronutrients</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1F291B]">Daily Macro Progress</h3>
              </div>
              <span className="text-xs text-[#6B7264] font-medium hidden sm:inline">
                Protein • Carbohydrates • Fats • Fiber
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Protein */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F291B] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7AA95C]" />
                    Protein (Muscle & Satiety)
                  </span>
                  <span className="font-mono font-bold text-[#1F291B]">
                    {totalProtein}g <span className="text-[#6B7264] font-normal">/ {targetProtein}g ({proteinPercent}%)</span>
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F0] h-2.5 rounded-full overflow-hidden border border-[#E8E6E0]">
                  <div
                    className="bg-[#7AA95C] h-full rounded-full transition-all duration-500"
                    style={{ width: `${proteinPercent}%` }}
                  />
                </div>
              </div>

              {/* Carbohydrates */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F291B] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D99426]" />
                    Carbohydrates (Sustained Energy)
                  </span>
                  <span className="font-mono font-bold text-[#1F291B]">
                    {totalCarbs}g <span className="text-[#6B7264] font-normal">/ {targetCarbs}g ({carbsPercent}%)</span>
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F0] h-2.5 rounded-full overflow-hidden border border-[#E8E6E0]">
                  <div
                    className="bg-[#D99426] h-full rounded-full transition-all duration-500"
                    style={{ width: `${carbsPercent}%` }}
                  />
                </div>
              </div>

              {/* Healthy Fats */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F291B] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D3325]" />
                    Healthy Fats (Cellular & Brain)
                  </span>
                  <span className="font-mono font-bold text-[#1F291B]">
                    {totalFat}g <span className="text-[#6B7264] font-normal">/ {targetFat}g ({fatPercent}%)</span>
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F0] h-2.5 rounded-full overflow-hidden border border-[#E8E6E0]">
                  <div
                    className="bg-[#2D3325] h-full rounded-full transition-all duration-500"
                    style={{ width: `${fatPercent}%` }}
                  />
                </div>
              </div>

              {/* Dietary Fiber */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F291B] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A3C686]" />
                    Dietary Fiber (Microbiome & Gut)
                  </span>
                  <span className="font-mono font-bold text-[#1F291B]">
                    {totalFiber}g <span className="text-[#6B7264] font-normal">/ {targetFiber}g ({fiberPercent}%)</span>
                  </span>
                </div>
                <div className="w-full bg-[#F5F5F0] h-2.5 rounded-full overflow-hidden border border-[#E8E6E0]">
                  <div
                    className="bg-[#A3C686] h-full rounded-full transition-all duration-500"
                    style={{ width: `${fiberPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Water Tracker integration */}
            <div className="pt-3 border-t border-[#E8E6E0] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-xs font-bold text-[#1F291B]">Hydration:</span>
                <span className="text-xs font-mono text-[#4A5043]">
                  {waterCount} / 8 glasses ({waterCount * 250} ml)
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  id="water-decrement-btn"
                  onClick={onDecrementWater}
                  className="w-7 h-7 rounded-lg bg-[#F5F5F0] border border-[#E8E6E0] text-xs font-bold text-[#1F291B] hover:bg-[#D9E9D3] cursor-pointer"
                  title="Remove glass"
                >
                  -
                </button>
                <button
                  id="water-increment-btn"
                  onClick={onIncrementWater}
                  className="px-2.5 py-1 rounded-lg bg-[#D9E9D3] border border-[#7AA95C]/30 text-xs font-bold text-[#2D3325] hover:bg-[#7AA95C] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Drink Glass</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Today's Logged Meals Breakdown by Category */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E8E6E0] space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1F291B]">Today's Meals & Nourishment</h2>
              <p className="text-xs sm:text-sm text-[#6B7264]">
                Track each plate to see how it contributes to your daily targets and grocery budget.
              </p>
            </div>

            <button
              id="dashboard-btn-add-meal-center"
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white rounded-full text-xs font-bold shadow-sm shadow-[#7AA95C]/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Meal to Today</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat) => {
              const categoryMeals = meals.filter((m) => m.category === cat.id);
              const catCalories = categoryMeals.reduce((sum, m) => sum + m.calories, 0);

              return (
                <div
                  key={cat.id}
                  className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E0] mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <h4 className="font-bold text-sm text-[#1F291B]">{cat.label}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#7AA95C] bg-white px-2 py-0.5 rounded border border-[#E8E6E0]">
                        {catCalories} kcal
                      </span>
                    </div>

                    {/* Meal Items inside Category */}
                    {categoryMeals.length === 0 ? (
                      <div className="py-6 text-center text-xs text-[#6B7264]">
                        <p>No meals logged for {cat.label} yet.</p>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setShowAddModal(true);
                          }}
                          className="mt-2 text-xs font-bold text-[#7AA95C] hover:underline cursor-pointer"
                        >
                          + Log {cat.label}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {categoryMeals.map((meal) => (
                          <div
                            key={meal.id}
                            className="p-3 bg-white rounded-xl border border-[#E8E6E0] shadow-2xs hover:border-[#7AA95C] transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h5 className="font-bold text-xs text-[#1F291B] leading-snug">
                                  {meal.name}
                                </h5>
                                <p className="text-[11px] text-[#6B7264] mt-0.5">
                                  {meal.portion} {meal.time ? `• ${meal.time}` : ''}
                                </p>
                              </div>
                              <button
                                onClick={() => onRemoveMeal(meal.id)}
                                className="text-[#6B7264] hover:text-red-600 transition-colors p-1 cursor-pointer"
                                title="Remove meal"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-[#F5F5F0] flex items-center justify-between text-[11px] text-[#4A5043]">
                              <span className="font-mono font-bold text-[#1F291B]">
                                {meal.calories} kcal
                              </span>
                              <div className="flex items-center gap-2 font-mono text-[10px]">
                                <span>{meal.protein}g P</span>
                                <span>•</span>
                                <span>{meal.carbs}g C</span>
                                <span>•</span>
                                <span>{meal.fat}g F</span>
                              </div>
                              <span className="font-mono font-bold text-[#7AA95C] bg-[#D9E9D3] px-1.5 py-0.5 rounded text-[10px]">
                                ${meal.costEstimate?.toFixed(2) || '2.50'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add button inside box */}
                  <div className="pt-3 mt-3 border-t border-[#E8E6E0]">
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowAddModal(true);
                      }}
                      className="w-full py-2 bg-white hover:bg-[#D9E9D3] text-[#1F291B] rounded-xl text-xs font-bold border border-[#E8E6E0] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#7AA95C]" />
                      <span>Add to {cat.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Affordability & Nutritionist Summary Banner */}
          <div className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D9E9D3] text-[#2D3325] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5 text-[#7AA95C]" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1F291B]">Grocery Budget Status</p>
                <p className="text-[#4A5043] mt-0.5 leading-relaxed">
                  Today’s tracked plates total <strong className="font-mono text-[#1F291B]">${totalCost.toFixed(2)}</strong>. At this pace, your 7-day spending will be approx. <strong>${(totalCost * 7).toFixed(2)}</strong>, right in line with your <strong>${preferences.weeklyBudget}/wk</strong> target!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5F5F0] text-[#7AA95C] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1F291B]">Dietitian Tip of the Day</p>
                <p className="text-[#4A5043] mt-0.5 leading-relaxed">
                  "Prioritizing plant protein (lentils, chickpeas, tofu) twice a week saves up to $18 on groceries while providing over 25g of gut-nourishing prebiotic fiber."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: Log Meal / Food */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] p-6 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E0]">
              <div>
                <h3 className="text-lg font-bold text-[#1F291B]">Log Food to Today's Plate</h3>
                <p className="text-xs text-[#6B7264]">Select a meal category and pick a recipe or enter custom items.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-[#6B7264] hover:text-[#1F291B] rounded-full cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Category picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">Meal Category</label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? 'bg-[#7AA95C] text-white border-[#7AA95C] shadow-xs'
                        : 'bg-[#F5F5F0] text-[#1F291B] border-[#E8E6E0] hover:bg-[#D9E9D3]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Pick vs Custom Tabs */}
            <div className="flex rounded-xl bg-[#F5F5F0] p-1 border border-[#E8E6E0]">
              <button
                type="button"
                onClick={() => setActiveTab('quick')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'quick' ? 'bg-white text-[#1F291B] shadow-xs' : 'text-[#6B7264]'
                }`}
              >
                Quick Pick HealthPlate Recipes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'custom' ? 'bg-white text-[#1F291B] shadow-xs' : 'text-[#6B7264]'
                }`}
              >
                Custom Food Entry
              </button>
            </div>

            {activeTab === 'quick' ? (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                <p className="text-xs text-[#6B7264]">Click any recipe to log it directly into {selectedCategory}:</p>
                {mockRecipes.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleAddRecipeAsMeal(r)}
                    className="p-3 bg-[#FDFCF8] hover:bg-[#D9E9D3]/40 rounded-xl border border-[#E8E6E0] hover:border-[#7AA95C] cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-[#1F291B]">{r.title}</h4>
                      <p className="text-[11px] font-mono text-[#4A5043] mt-0.5">
                        {r.calories} kcal • {r.protein}g Protein • {r.carbs}g Carbs • {r.fat}g Fat
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#7AA95C] font-mono block">
                        ${r.costPerServing.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-[#2D3325] font-bold">+ Log</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleAddCustomMeal} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#1F291B] block mb-1">Food / Dish Name</label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Scrambled Eggs with Sourdough & Avocado"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] text-sm focus:outline-none focus:border-[#7AA95C]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Calories (kcal)</label>
                    <input
                      type="number"
                      required
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Protein (g)</label>
                    <input
                      type="number"
                      required
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Carbs (g)</label>
                    <input
                      type="number"
                      required
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Fat (g)</label>
                    <input
                      type="number"
                      required
                      value={customFat}
                      onChange={(e) => setCustomFat(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Dietary Fiber (g)</label>
                    <input
                      type="number"
                      value={customFiber}
                      onChange={(e) => setCustomFiber(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#1F291B] block mb-1">Estimated Cost ($)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={customCost}
                      onChange={(e) => setCustomCost(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl border border-[#E8E6E0] bg-[#FDFCF8] font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7AA95C] hover:bg-[#6A964D] text-white font-bold rounded-full transition-colors cursor-pointer mt-2 shadow-sm shadow-[#7AA95C]/20"
                >
                  Save & Add to {selectedCategory}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
