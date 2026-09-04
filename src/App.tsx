import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { AffordabilitySection } from './components/AffordabilitySection';
import { Dashboard } from './components/Dashboard';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

// Modals
import { OnboardingModal } from './components/OnboardingModal';
import { RecipeModal } from './components/RecipeModal';
import { ShoppingListModal } from './components/ShoppingListModal';
import { DeliveryModal } from './components/DeliveryModal';
import { NutritionistModal } from './components/NutritionistModal';
import { ArticleModal } from './components/ArticleModal';
import { FoodsWaitlistModal } from './components/FoodsWaitlistModal';
import { SignInModal } from './components/SignInModal';

// Data & types
import { UserPreferences, MealItem } from './types';
import { defaultUserPreferences, sampleDailyMeals } from './data/mockData';
import { PieChart, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  // User preferences with localStorage persistence
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('healthplate_preferences');
      return saved ? JSON.parse(saved) : defaultUserPreferences;
    } catch {
      return defaultUserPreferences;
    }
  });

  // Daily logged meals with localStorage persistence
  const [loggedMeals, setLoggedMeals] = useState<MealItem[]>(() => {
    try {
      const saved = localStorage.getItem('healthplate_meals');
      return saved ? JSON.parse(saved) : sampleDailyMeals;
    } catch {
      return sampleDailyMeals;
    }
  });

  // Water hydration tracker
  const [waterCount, setWaterCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('healthplate_water');
      return saved ? JSON.parse(saved) : 6;
    } catch {
      return 6;
    }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('healthplate_preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('healthplate_meals', JSON.stringify(loggedMeals));
  }, [loggedMeals]);

  useEffect(() => {
    localStorage.setItem('healthplate_water', JSON.stringify(waterCount));
  }, [waterCount]);

  // Modals state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isNutritionistModalOpen, setIsNutritionistModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isFoodsWaitlistOpen, setIsFoodsWaitlistOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Meal management
  const handleAddMeal = (meal: MealItem) => {
    setLoggedMeals((prev) => [meal, ...prev]);
    showToast(`Added "${meal.name}" (${meal.calories} kcal) to today's plate!`);
  };

  const handleRemoveMeal = (mealId: string) => {
    setLoggedMeals((prev) => prev.filter((m) => m.id !== mealId));
    showToast('Meal removed from today’s log.');
  };

  const handleIncrementWater = () => {
    if (waterCount < 16) {
      setWaterCount((prev) => prev + 1);
      showToast('Hydration logged: +250ml water 💧');
    }
  };

  const handleDecrementWater = () => {
    if (waterCount > 0) {
      setWaterCount((prev) => prev - 1);
    }
  };

  // Total daily calories for quick pill in navbar
  const totalCaloriesLogged = loggedMeals.reduce((sum, m) => sum + m.calories, 0);

  const handleBuildMealPlanFromPhilosophy = (budget: number, household: number) => {
    setPreferences((prev) => ({
      ...prev,
      weeklyBudget: budget,
      householdSize: household,
    }));
    setIsOnboardingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1F291B] flex flex-col selection:bg-[#7AA95C]/25 selection:text-[#1F291B]">
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onOpenDashboard={() => setCurrentView(currentView === 'dashboard' ? 'home' : 'dashboard')}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onOpenRecipes={() => setIsRecipeModalOpen(true)}
        onOpenMealPlanner={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('features-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenDelivery={() => setIsDeliveryModalOpen(true)}
        onOpenNutritionists={() => setIsNutritionistModalOpen(true)}
        onOpenBlog={() => setIsArticleModalOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
        dailyCaloriesLogged={totalCaloriesLogged}
        dailyCalorieGoal={preferences.caloricGoal || 2050}
      />

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F291B] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#7AA95C]/40 text-xs font-semibold flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-[#7AA95C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'dashboard' ? (
          /* Caloric Intake & Macro Progress Dashboard */
          <Dashboard
            preferences={preferences}
            meals={loggedMeals}
            waterCount={waterCount}
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
            onIncrementWater={handleIncrementWater}
            onDecrementWater={handleDecrementWater}
            onBackToHome={() => setCurrentView('home')}
            onOpenRecipeExplorer={() => setIsRecipeModalOpen(true)}
          />
        ) : (
          /* HealthPlate Homepage View */
          <div>
            {/* 1. Hero Section */}
            <Hero
              onGetStarted={() => setIsOnboardingOpen(true)}
              onExploreFeatures={() => {
                const el = document.getElementById('features-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenDashboard={() => setCurrentView('dashboard')}
            />

            {/* Seamless Dashboard Quick Glance Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
              <div 
                onClick={() => setCurrentView('dashboard')}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-sm border border-[#E8E6E0] hover:border-[#7AA95C] transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D9E9D3]/40 text-[#7AA95C] flex items-center justify-center shrink-0 border border-[#E8E6E0]">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#7AA95C] uppercase tracking-wider">Today's Progress</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7AA95C]" />
                      <span className="text-xs text-[#6B7264]">{loggedMeals.length} meals logged</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1F291B]">
                      {totalCaloriesLogged} / {preferences.caloricGoal || 2050} kcal consumed
                    </h3>
                    <p className="text-xs text-[#4A5043] mt-0.5">
                      Protein: {loggedMeals.reduce((s, m) => s + m.protein, 0)}g • Carbs: {loggedMeals.reduce((s, m) => s + m.carbs, 0)}g • Fats: {loggedMeals.reduce((s, m) => s + m.fat, 0)}g • Water: {waterCount}/8 glasses
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-[#7AA95C] flex items-center gap-1">
                    Open Full Tracker & Macros →
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Main 6 Features Section */}
            <FeaturesSection
              onOpenCookWithWhatYouHave={() => setIsRecipeModalOpen(true)}
              onOpenShoppingList={() => setIsShoppingListOpen(true)}
              onOpenDelivery={() => setIsDeliveryModalOpen(true)}
              onOpenNutritionists={() => setIsNutritionistModalOpen(true)}
              onOpenBlog={() => setIsArticleModalOpen(true)}
              onOpenFoodsWaitlist={() => setIsFoodsWaitlistOpen(true)}
            />

            {/* 3. Core Philosophy: Affordability Section */}
            <AffordabilitySection
              onBuildMealPlan={handleBuildMealPlanFromPhilosophy}
            />

            {/* 4. Final CTA */}
            <FinalCta
              onGetStarted={() => setIsOnboardingOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenRecipes={() => setIsRecipeModalOpen(true)}
        onOpenMealPlanner={() => {
          if (currentView !== 'home') setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('features-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenDelivery={() => setIsDeliveryModalOpen(true)}
        onOpenNutritionists={() => setIsNutritionistModalOpen(true)}
        onOpenBlog={() => setIsArticleModalOpen(true)}
        onOpenAbout={() => {
          showToast('HealthPlate: Making healthy eating personalized, practical, and affordable.');
        }}
      />

      {/* Interactive Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialPreferences={preferences}
        onSavePreferences={(updated) => {
          setPreferences(updated);
          showToast('Nutritional profile & macro targets personalized!');
        }}
        onOpenDashboardAfterSave={() => setCurrentView('dashboard')}
      />

      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onLogMeal={handleAddMeal}
      />

      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        householdSize={preferences.householdSize || 2}
        weeklyBudget={preferences.weeklyBudget || 75}
      />

      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />

      <NutritionistModal
        isOpen={isNutritionistModalOpen}
        onClose={() => setIsNutritionistModalOpen(false)}
      />

      <ArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
      />

      <FoodsWaitlistModal
        isOpen={isFoodsWaitlistOpen}
        onClose={() => setIsFoodsWaitlistOpen(false)}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignInSuccess={(name) => {
          setPreferences((prev) => ({ ...prev, name }));
          showToast(`Welcome back, ${name}!`);
        }}
      />

    </div>
  );
}
