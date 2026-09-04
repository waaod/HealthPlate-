import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  Sparkles, 
  PieChart, 
  ShoppingBag, 
  Utensils, 
  Calendar, 
  Truck, 
  UserCheck, 
  BookOpen, 
  User
} from 'lucide-react';

interface NavbarProps {
  onOpenOnboarding: () => void;
  onOpenDashboard: () => void;
  onOpenRecipes: () => void;
  onOpenMealPlanner: () => void;
  onOpenDelivery: () => void;
  onOpenNutritionists: () => void;
  onOpenBlog: () => void;
  onOpenSignIn: () => void;
  currentView: 'home' | 'dashboard';
  onNavigateHome: () => void;
  dailyCaloriesLogged: number;
  dailyCalorieGoal: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOnboarding,
  onOpenDashboard,
  onOpenRecipes,
  onOpenMealPlanner,
  onOpenDelivery,
  onOpenNutritionists,
  onOpenBlog,
  onOpenSignIn,
  currentView,
  onNavigateHome,
  dailyCaloriesLogged,
  dailyCalorieGoal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', action: () => { onNavigateHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'Recipes', action: onOpenRecipes },
    { label: 'Meal Planner', action: onOpenMealPlanner },
    { label: 'Delivery', action: onOpenDelivery },
    { label: 'Nutritionists', action: onOpenNutritionists },
    { label: 'Blog', action: onOpenBlog },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E8E6E0] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => { onNavigateHome(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Logo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={link.action}
                className="px-3 py-1.5 text-sm font-medium text-[#4A5043] hover:text-[#7AA95C] hover:bg-[#F5F5F0] rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Macro Dashboard Switcher / Pill */}
            <button
              id="nav-btn-dashboard"
              onClick={onOpenDashboard}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                currentView === 'dashboard'
                  ? 'bg-[#2D3325] text-white border-[#2D3325] shadow-xs'
                  : 'bg-white hover:bg-[#F5F5F0] text-[#2D3325] border-[#E8E6E0] hover:border-[#7AA95C]'
              }`}
              title="Open Daily Caloric & Macro Tracker"
            >
              <PieChart className="w-3.5 h-3.5 text-[#7AA95C]" />
              <span className="font-bold">Daily Tracker</span>
              <span className="bg-[#F5F5F0] text-[#2D3325] px-2 py-0.5 rounded-full font-mono text-[11px] border border-[#E8E6E0]">
                {dailyCaloriesLogged} / {dailyCalorieGoal} kcal
              </span>
            </button>

            {/* Sign In */}
            <button
              id="nav-btn-signin"
              onClick={onOpenSignIn}
              className="px-3 py-2 text-sm font-semibold text-[#1F291B] hover:text-[#7AA95C] transition-colors"
            >
              Sign In
            </button>

            {/* Primary Get Started Green CTA */}
            <button
              id="nav-btn-get-started"
              onClick={onOpenOnboarding}
              className="bg-[#7AA95C] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm shadow-[#7AA95C]/20 hover:bg-[#6A964D] transition-all duration-150 active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-mobile-quick-tracker"
              onClick={onOpenDashboard}
              className="p-2 text-[#2D3325] bg-white rounded-lg border border-[#E8E6E0]"
              title="Daily Tracker"
            >
              <PieChart className="w-4 h-4 text-[#7AA95C]" />
            </button>

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D3325] hover:bg-[#F5F5F0] rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E6E0] bg-[#FDFCF8] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          {/* Dashboard Quick Card */}
          <div 
            onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }}
            className="p-3.5 bg-white rounded-2xl border border-[#E8E6E0] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D9E9D3] flex items-center justify-center text-[#2D3325]">
                <PieChart className="w-5 h-5 text-[#7AA95C]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F291B]">Daily Calorie & Macro Tracker</p>
                <p className="text-[11px] text-[#6B7264]">{dailyCaloriesLogged} / {dailyCalorieGoal} kcal consumed today</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#7AA95C]">View →</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="px-3.5 py-2.5 text-left text-sm font-medium text-[#2D3325] hover:bg-white hover:text-[#7AA95C] rounded-xl transition-colors border border-transparent hover:border-[#E8E6E0]"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8E6E0] flex flex-col gap-2">
            <button
              onClick={() => { onOpenOnboarding(); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-sm font-bold rounded-full text-center shadow-sm shadow-[#7AA95C]/20"
            >
              Get Started — It's Free
            </button>
            <button
              onClick={() => { onOpenSignIn(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-sm font-semibold text-[#2D3325] text-center hover:bg-white rounded-xl"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
