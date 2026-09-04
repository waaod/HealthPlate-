export interface UserPreferences {
  name: string;
  age: number;
  dietaryPreference: 'balanced' | 'mediterranean' | 'plant-based' | 'high-protein' | 'pescatarian' | 'low-carb';
  allergies: string[];
  healthConsiderations: string[];
  goals: string[];
  householdSize: number;
  weeklyBudget: number;
  caloricGoal: number;
  macroTargets: {
    protein: number; // in grams
    carbs: number;   // in grams
    fat: number;     // in grams
    fiber: number;   // in grams
  };
}

export interface MealItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  costEstimate: number;
  portion: string;
  time?: string;
  ingredients?: string[];
  image?: string;
}

export interface DailyLog {
  date: string;
  waterGlasses: number; // target 8
  meals: MealItem[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: string;
  costPerServing: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  difficulty: 'Easy' | 'Medium' | 'Quick';
  tags: string[];
  ingredients: string[];
  instructions: string[];
  matchCount?: number;
  image: string;
}

export interface Nutritionist {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialty: string;
  experienceYears: number;
  bio: string;
  rating: number;
  reviewsCount: number;
  availableSlot: string;
  pricePerSession: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  content: string[];
  takeaways: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: 'Produce' | 'Grains & Pantry' | 'Proteins' | 'Dairy & Alternatives' | 'Spices & Oils';
  quantity: string;
  estimatedPrice: number;
  checked: boolean;
  notes?: string;
}
