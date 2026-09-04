import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Clock, 
  DollarSign, 
  ChefHat, 
  Sparkles, 
  Check, 
  Plus, 
  ArrowRight,
  Flame,
  Zap,
  Filter
} from 'lucide-react';
import { Recipe, MealItem } from '../types';
import { mockRecipes } from '../data/mockData';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogMeal: (meal: MealItem) => void;
  initialMode?: 'all' | 'cookWithWhatYouHave';
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  onLogMeal,
  initialMode = 'cookWithWhatYouHave',
}) => {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [userIngredients, setUserIngredients] = useState<string[]>([
    'Chickpeas (canned or soaked)',
    'Fresh spinach or kale',
    'Garlic cloves',
    'Extra virgin olive oil',
  ]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  if (!isOpen) return null;

  const commonPantryIngredients = [
    'Farm eggs',
    'Fresh spinach or kale',
    'Cooked quinoa',
    'Firm tofu',
    'Brown lentils',
    'Sweet potatoes',
    'Ripe avocado',
    'Canned diced tomatoes',
    'Broccoli florets',
    'Garlic cloves',
    'Extra virgin olive oil',
    'Chickpeas (canned or soaked)',
  ];

  const togglePantryItem = (item: string) => {
    if (userIngredients.includes(item)) {
      setUserIngredients(userIngredients.filter((i) => i !== item));
    } else {
      setUserIngredients([...userIngredients, item]);
    }
  };

  const handleAddCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientInput.trim()) return;
    if (!userIngredients.includes(ingredientInput.trim())) {
      setUserIngredients([...userIngredients, ingredientInput.trim()]);
    }
    setIngredientInput('');
  };

  // Rank recipes by how many user ingredients match
  const scoredRecipes = mockRecipes.map((r) => {
    const matches = r.ingredients.filter((ing) =>
      userIngredients.some((ui) => ing.toLowerCase().includes(ui.toLowerCase()) || ui.toLowerCase().includes(ing.toLowerCase()))
    ).length;
    return { ...r, matchCount: matches };
  }).sort((a, b) => (b.matchCount || 0) - (a.matchCount || 0));

  const tags = ['All', 'Affordable', 'High Protein', 'Mediterranean', 'Quick', 'Plant Protein'];

  const filteredRecipes = scoredRecipes.filter((r) => {
    if (selectedTag === 'All') return true;
    return r.tags.includes(selectedTag);
  });

  const handleLogToPlate = (recipe: Recipe) => {
    const newMeal: MealItem = {
      id: `meal-rec-${Date.now()}`,
      name: recipe.title,
      category: 'lunch',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      fiber: recipe.fiber,
      costEstimate: recipe.costPerServing,
      portion: '1 serving',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onLogMeal(newMeal);
    setActiveRecipe(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <ChefHat className="w-4 h-4" />
              <span>Cook With What You Have • Recipe Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F291B]">
              {activeRecipe ? activeRecipe.title : 'Find Recipes Matching Your Fridge'}
            </h2>
          </div>
          <button
            onClick={() => {
              if (activeRecipe) setActiveRecipe(null);
              else onClose();
            }}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 flex-1 space-y-6">
          
          {activeRecipe ? (
            /* Single Recipe Detail View */
            <div className="space-y-6 animate-fadeIn">
              <button
                onClick={() => setActiveRecipe(null)}
                className="text-xs font-bold text-[#7AA95C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Back to matching recipes
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-5 rounded-2xl overflow-hidden aspect-4/3 bg-[#F5F5F0] relative border border-[#E8E6E0]">
                  <img
                    src={activeRecipe.image}
                    alt={activeRecipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-mono font-bold text-[#1F291B] border border-[#E8E6E0]">
                    ${activeRecipe.costPerServing.toFixed(2)} / serving
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {activeRecipe.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D9E9D3] text-[#1F291B]">
                        {t}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF2DC] text-[#785E1A]">
                      ⏱ {activeRecipe.cookingTime}
                    </span>
                  </div>

                  <p className="text-sm text-[#4A5043] leading-relaxed">
                    {activeRecipe.description}
                  </p>

                  {/* Nutrition Highlights */}
                  <div className="grid grid-cols-4 gap-2 text-center p-3 bg-[#FDFCF8] rounded-xl border border-[#E8E6E0]">
                    <div>
                      <span className="text-[10px] text-[#6B7264] block">Calories</span>
                      <span className="text-sm font-bold text-[#1F291B] font-mono">{activeRecipe.calories}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7264] block">Protein</span>
                      <span className="text-sm font-bold text-[#7AA95C] font-mono">{activeRecipe.protein}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7264] block">Carbs</span>
                      <span className="text-sm font-bold text-[#1F291B] font-mono">{activeRecipe.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#6B7264] block">Healthy Fat</span>
                      <span className="text-sm font-bold text-[#1F291B] font-mono">{activeRecipe.fat}g</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLogToPlate(activeRecipe)}
                    className="w-full py-3 bg-[#7AA95C] hover:bg-[#6A964D] text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#7AA95C]/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Log this meal to My Plate Tracker</span>
                  </button>
                </div>
              </div>

              {/* Ingredients & Preparation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E8E6E0]">
                <div>
                  <h4 className="font-bold text-sm text-[#1F291B] mb-3">Ingredients Needed</h4>
                  <ul className="space-y-2">
                    {activeRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#1F291B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7AA95C]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[#1F291B] mb-3">Cooking Instructions</h4>
                  <ol className="space-y-2.5 text-xs text-[#4A5043]">
                    {activeRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#F5F5F0] border border-[#E8E6E0] flex items-center justify-center font-mono font-bold text-[10px] text-[#1F291B] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            /* Fridge Ingredient Input + Recipe Gallery View */
            <div className="space-y-6">
              
              {/* Ingredient Builder Box */}
              <div className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1F291B] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#7AA95C]" />
                    <span>Select what you have in your fridge or pantry:</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#7AA95C] font-bold">
                    {userIngredients.length} ingredients selected
                  </span>
                </div>

                {/* Popular Clickable Staples */}
                <div className="flex flex-wrap gap-1.5">
                  {commonPantryIngredients.map((item) => {
                    const active = userIngredients.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => togglePantryItem(item)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#7AA95C] text-white border-[#7AA95C]'
                            : 'bg-white text-[#1F291B] border-[#E8E6E0] hover:bg-[#D9E9D3]'
                        }`}
                      >
                        {active ? `✓ ${item}` : `+ ${item}`}
                      </button>
                    );
                  })}
                </div>

                {/* Add custom text ingredient */}
                <form onSubmit={handleAddCustomIngredient} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Type another ingredient (e.g. Greek yogurt, walnuts)..."
                    className="flex-1 px-3 py-2 text-xs rounded-full border border-[#E8E6E0] bg-white text-[#1F291B] focus:outline-none focus:border-[#7AA95C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1F291B] hover:bg-[#343F2F] text-white text-xs font-bold rounded-full cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Tag filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-bold text-[#6B7264] flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTag(t)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedTag === t
                        ? 'bg-[#1F291B] text-white'
                        : 'bg-[#F5F5F0] text-[#4A5043] hover:bg-[#E8E6E0]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Recipe Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => setActiveRecipe(recipe)}
                    className="group bg-white rounded-2xl border border-[#E8E6E0] hover:border-[#7AA95C] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-16/10 bg-[#F5F5F0] overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-[#2E3726] border border-[#E8E6E0]">
                          {recipe.matchCount && recipe.matchCount > 0 ? (
                            <span>{recipe.matchCount} matched ingredients</span>
                          ) : (
                            <span>{recipe.cookingTime}</span>
                          )}
                        </div>
                        <div className="absolute top-2.5 right-2.5 bg-[#1F291B]/85 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-white font-mono">
                          ${recipe.costPerServing.toFixed(2)}
                        </div>
                      </div>

                      <div className="p-4 space-y-1.5">
                        <h4 className="font-bold text-sm text-[#1F291B] group-hover:text-[#7AA95C] transition-colors leading-snug">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-[#6B7264] line-clamp-2">
                          {recipe.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="pt-2.5 border-t border-[#E8E6E0] flex items-center justify-between text-[11px] text-[#4A5043] font-mono">
                        <span>{recipe.calories} kcal</span>
                        <span>{recipe.protein}g Protein</span>
                        <span className="text-[#7AA95C] font-sans font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
