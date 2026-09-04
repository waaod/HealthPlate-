import React from 'react';
import { Logo } from './Logo';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Heart, 
  Mail, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  onOpenRecipes: () => void;
  onOpenMealPlanner: () => void;
  onOpenDelivery: () => void;
  onOpenNutritionists: () => void;
  onOpenBlog: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRecipes,
  onOpenMealPlanner,
  onOpenDelivery,
  onOpenNutritionists,
  onOpenBlog,
  onOpenAbout,
}) => {
  return (
    <footer className="bg-[#FDFCF8] border-t border-[#E8E6E0] pt-14 pb-12 text-[#1F291B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#4A5043] leading-relaxed max-w-sm">
              Making healthy eating personalized, practical, accessible, and affordable. HealthPlate bridges nutritional science with everyday household grocery budgets.
            </p>

            {/* Newsletter input */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-[#1F291B] block uppercase tracking-wider">
                Weekly Wholesome Bites
              </span>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="px-3.5 py-2 text-xs rounded-l-full border border-r-0 border-[#E8E6E0] bg-white text-[#1F291B] focus:outline-none focus:border-[#7AA95C] flex-1"
                />
                <button
                  type="button"
                  onClick={() => alert('Subscribed to HealthPlate weekly nutrition digest!')}
                  className="px-4 py-2 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-r-full transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E6E0] text-[#4A5043] hover:text-[#7AA95C] hover:border-[#7AA95C] flex items-center justify-center transition-colors"
                aria-label="HealthPlate on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E6E0] text-[#4A5043] hover:text-[#7AA95C] hover:border-[#7AA95C] flex items-center justify-center transition-colors"
                aria-label="HealthPlate on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E6E0] text-[#4A5043] hover:text-[#7AA95C] hover:border-[#7AA95C] flex items-center justify-center transition-colors"
                aria-label="HealthPlate on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-white border border-[#E8E6E0] text-[#4A5043] hover:text-[#7AA95C] hover:border-[#7AA95C] flex items-center justify-center transition-colors"
                aria-label="HealthPlate on YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A5043]">
              <li>
                <button onClick={onOpenRecipes} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  Recipes & Fridge Matcher
                </button>
              </li>
              <li>
                <button onClick={onOpenMealPlanner} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  Meal Planner & Budgeting
                </button>
              </li>
              <li>
                <button onClick={onOpenDelivery} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  Healthy Food Delivery
                </button>
              </li>
              <li>
                <button onClick={onOpenNutritionists} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  Talk to a Nutritionist
                </button>
              </li>
              <li>
                <button onClick={onOpenBlog} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  Nutrition Blog & Education
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Trust (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A5043]">
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#7AA95C] transition-colors cursor-pointer">
                  About HealthPlate
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert('HealthPlate Support: contact@healthplate.org'); }} className="hover:text-[#7AA95C] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => e.preventDefault()} className="hover:text-[#7AA95C] transition-colors">
                  Careers (Hiring RDs)
                </a>
              </li>
              <li>
                <a href="#press" onClick={(e) => e.preventDefault()} className="hover:text-[#7AA95C] transition-colors">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#1F291B] uppercase tracking-wider">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A5043]">
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('HealthPlate Privacy: Your dietary & personal information is confidential and never sold to third parties.'); }} className="hover:text-[#7AA95C] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert('HealthPlate Terms: General wellness guidance. Always consult your personal physician for clinical diagnoses.'); }} className="hover:text-[#7AA95C] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#medical" onClick={(e) => e.preventDefault()} className="hover:text-[#7AA95C] transition-colors">
                  Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:text-[#7AA95C] transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8E6E0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7264]">
          <p>© {new Date().getFullYear()} HealthPlate Inc. All rights reserved. Healthy eating, made possible.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7AA95C]" />
            <span>Science-Backed Nutrition • Budget Optimized</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
