import React from 'react';
import { 
  Refrigerator, 
  ShoppingCart, 
  Truck, 
  HeartPulse, 
  GraduationCap, 
  Sparkles, 
  ArrowUpRight, 
  Leaf, 
  CheckCircle, 
  Clock, 
  BadgePercent 
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenCookWithWhatYouHave: () => void;
  onOpenShoppingList: () => void;
  onOpenDelivery: () => void;
  onOpenNutritionists: () => void;
  onOpenBlog: () => void;
  onOpenFoodsWaitlist: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenCookWithWhatYouHave,
  onOpenShoppingList,
  onOpenDelivery,
  onOpenNutritionists,
  onOpenBlog,
  onOpenFoodsWaitlist,
}) => {
  const features = [
    {
      id: 'feature-cook',
      title: 'Cook With What You Have',
      tagline: 'Zero food waste, maximum nourishment',
      description:
        'Enter the ingredients already sitting in your fridge and pantry. HealthPlate suggests wholesome, delicious recipes tailored directly to your ingredients and personalized nutritional targets.',
      icon: Refrigerator,
      accentColor: '#6E932B',
      accentBg: '#F0F6E5',
      badge: 'Popular Feature',
      actionText: 'Try Ingredient Matcher',
      action: onOpenCookWithWhatYouHave,
      perks: ['Reduces grocery waste by 34%', 'Instant macro calculation', 'Substitutions for missing items'],
    },
    {
      id: 'feature-shopping',
      title: 'Smart Shopping List',
      tagline: 'Budget-aware, aisle-optimized',
      description:
        'Plan nutritious meals while balancing your precise weekly budget, family household size, and macro requirements — then auto-generate an organized, aisle-by-aisle grocery list.',
      icon: ShoppingCart,
      accentColor: '#4F6824',
      accentBg: '#EFF5E1',
      badge: 'Cost Optimizer',
      actionText: 'Generate Smart List',
      action: onOpenShoppingList,
      perks: ['Predicts total checkout cost', 'Grouped by supermarket aisle', 'Family portion scaling'],
    },
    {
      id: 'feature-delivery',
      title: 'Healthy Food Delivery',
      tagline: 'Vetted kitchens around you',
      description:
        'Discover healthy, wholesome food options from rigorously screened culinary partners in your local area. Every menu item includes verified caloric and macronutrient disclosures.',
      icon: Truck,
      accentColor: '#84A93D',
      accentBg: '#F5F9ED',
      badge: 'Clean Kitchens',
      actionText: 'Discover Local Partners',
      action: onOpenDelivery,
      perks: ['Verified calorie & macro labels', 'Dietary filter tags', 'HealthPlate subscriber discounts'],
    },
    {
      id: 'feature-nutritionists',
      title: 'Talk to a Nutritionist',
      tagline: 'Licensed clinical & sports dietitians',
      description:
        'Connect directly with accredited registered dietitians and nutrition professionals for personalized 1-on-1 consultations, lab review, and realistic lifestyle habit guidance.',
      icon: HeartPulse,
      accentColor: '#6E932B',
      accentBg: '#F0F6E5',
      badge: '1-on-1 Care',
      actionText: 'Browse Nutritionists',
      action: onOpenNutritionists,
      perks: ['Tailored dietary protocols', 'Chronic condition support', 'Affordable 45-min sessions'],
    },
    {
      id: 'feature-learn',
      title: 'Learn & Grow',
      tagline: 'Science-backed, myth-free education',
      description:
        'Access reliable, accessible nutrition and health guides authored by licensed clinicians. Learn the biology of macros, grocery budgeting strategies, and long-term metabolic health.',
      icon: GraduationCap,
      accentColor: '#4F6824',
      accentBg: '#EFF5E1',
      badge: 'Evidence Based',
      actionText: 'Read Free Guides',
      action: onOpenBlog,
      perks: ['Zero sensationalized fad diets', 'Practical kitchen techniques', '5-minute micro reads'],
    },
    {
      id: 'feature-foods',
      title: 'HealthPlate Foods',
      tagline: 'Wholesome pantry ecosystem',
      description:
        'An upcoming HealthPlate product ecosystem of affordable, minimally processed pantry staples, sprouted grains, cold-pressed oils, and functional whole food essentials under our verified brand.',
      icon: Sparkles,
      accentColor: '#96C243',
      accentBg: '#F7FBEF',
      badge: 'Future Ecosystem',
      actionText: 'Preview & Join Waitlist',
      action: onOpenFoodsWaitlist,
      perks: ['Single-origin clean ingredients', 'Priced for real families', 'Early-access sampling'],
    },
  ];

  return (
    <section id="features-section" className="py-14 sm:py-18 bg-white border-y border-[#E8E6E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9E9D3] text-[#2D3325] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#7AA95C]" />
            <span>The HealthPlate Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F291B] tracking-tight">
            Everything you need for a healthier life.
          </h2>

          <p className="text-sm sm:text-base text-[#4A5043] leading-relaxed max-w-2xl mx-auto">
            Healthy living isn’t about rigid rules or luxury price tags. HealthPlate brings together the six essential pillars to make everyday nutrition intuitive, sustainable, and empowering.
          </p>
        </div>

        {/* 6 Core Feature Cards - High Density Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                className="group relative bg-[#FDFCF8] rounded-2xl p-5 sm:p-6 border border-[#E8E6E0] hover:border-[#7AA95C] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F0] group-hover:bg-[#D9E9D3] text-[#2D3325] flex items-center justify-center transition-colors">
                      <IconComponent className="w-5 h-5 text-[#7AA95C]" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-[#4A5043] border border-[#E8E6E0]">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1F291B] group-hover:text-[#7AA95C] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7AA95C]">
                      {feature.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4A5043] leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Bullet perks */}
                  <ul className="space-y-1.5 mb-5 pt-3 border-t border-[#E8E6E0]">
                    {feature.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#2D3325]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#7AA95C] shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA button */}
                <button
                  id={`btn-${feature.id}`}
                  onClick={feature.action}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#7AA95C] hover:text-white text-[#1F291B] font-bold text-xs rounded-xl border border-[#E8E6E0] hover:border-[#7AA95C] transition-all duration-200 flex items-center justify-between cursor-pointer group/btn shadow-xs"
                >
                  <span>{feature.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7AA95C] group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
