import { Recipe, Nutritionist, Article, ShoppingItem, UserPreferences, MealItem } from '../types';

export const defaultUserPreferences: UserPreferences = {
  name: 'Alex Rivera',
  age: 31,
  dietaryPreference: 'mediterranean',
  allergies: [],
  healthConsiderations: ['Heart health', 'Sustained energy'],
  goals: ['Energy & Vitality', 'Affordable nutrition', 'High protein balance'],
  householdSize: 2,
  weeklyBudget: 75,
  caloricGoal: 2050,
  macroTargets: {
    protein: 135,
    carbs: 215,
    fat: 65,
    fiber: 32,
  },
};

export const sampleDailyMeals: MealItem[] = [
  {
    id: 'meal-1',
    name: 'Warm Berry & Chia Steel-Cut Oats with Greek Yogurt',
    category: 'breakfast',
    calories: 420,
    protein: 26,
    carbs: 58,
    fat: 9,
    fiber: 11,
    costEstimate: 1.85,
    portion: '1 bowl (350g)',
    time: '8:15 AM',
    ingredients: ['Steel-cut oats', 'Greek yogurt', 'Chia seeds', 'Blueberries', 'Cinnamon'],
  },
  {
    id: 'meal-2',
    name: 'Lemon Herb Chickpea & Mediterranean Quinoa Bowl',
    category: 'lunch',
    calories: 540,
    protein: 24,
    carbs: 68,
    fat: 16,
    fiber: 14,
    costEstimate: 2.95,
    portion: '1 large bowl',
    time: '12:45 PM',
    ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Kalamata olives', 'Olive oil'],
  },
  {
    id: 'meal-3',
    name: 'Pan-Seared Salmon Fillet with Roasted Sweet Potato & Garlic Spinach',
    category: 'dinner',
    calories: 580,
    protein: 44,
    carbs: 45,
    fat: 22,
    fiber: 7,
    costEstimate: 4.80,
    portion: '1 plate',
    time: '7:15 PM',
    ingredients: ['Wild salmon', 'Sweet potato', 'Baby spinach', 'Garlic', 'Extra virgin olive oil'],
  },
  {
    id: 'meal-4',
    name: 'Crisp Honeycrisp Apple Slices with Creamy Almond Butter & Flaxseed',
    category: 'snack',
    calories: 210,
    protein: 6,
    carbs: 24,
    fat: 11,
    fiber: 5,
    costEstimate: 1.20,
    portion: '1 medium apple + 1.5 tbsp nut butter',
    time: '4:10 PM',
    ingredients: ['Apple', 'Almond butter', 'Ground flaxseed'],
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Warm Mediterranean Chickpea & Wilted Greens Skillet',
    description: 'A deeply comforting 20-minute plant-forward skillet rich in plant protein, iron, and antioxidant olive polyphenols.',
    cookingTime: '20 mins',
    costPerServing: 2.15,
    calories: 430,
    protein: 19,
    carbs: 54,
    fat: 14,
    fiber: 13,
    difficulty: 'Easy',
    tags: ['Affordable', 'High Fiber', 'Mediterranean', 'Gluten-Free'],
    ingredients: ['Chickpeas (canned or soaked)', 'Fresh spinach or kale', 'Garlic cloves', 'Canned diced tomatoes', 'Extra virgin olive oil', 'Smoked paprika', 'Lemon juice', 'Crumbled feta (optional)'],
    instructions: [
      'Warm extra virgin olive oil in a wide skillet over medium heat. Add thinly sliced garlic and bloom for 1 minute until fragrant.',
      'Add rinsed chickpeas and smoked paprika; sauté for 3-4 minutes until lightly crisped.',
      'Pour in diced tomatoes, lower heat, and simmer gently for 8 minutes to meld flavors.',
      'Fold in handfuls of fresh greens until tenderly wilted. Finish with fresh lemon juice and sea salt.'
    ],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rec-2',
    title: 'Herb-Crusted Lentil & Roasted Root Vegetable Bowl',
    description: 'Budget-friendly brown lentils tossed with caramelized roasted carrots, beets, and tahini lemon dressing.',
    cookingTime: '30 mins',
    costPerServing: 1.95,
    calories: 490,
    protein: 22,
    carbs: 68,
    fat: 12,
    fiber: 16,
    difficulty: 'Easy',
    tags: ['Under $2', 'Heart Healthy', 'High Protein', 'Meal Prep'],
    ingredients: ['Brown lentils', 'Carrots', 'Red onion', 'Baby arugula or spinach', 'Sesame tahini', 'Lemon', 'Cumin', 'Parsley'],
    instructions: [
      'Preheat oven to 400°F (200°C). Dice carrots and red onion, toss with olive oil and cumin, roast for 22 minutes.',
      'Simmer lentils with a pinch of salt and bay leaf for 20 minutes until al dente; drain well.',
      'Whisk tahini with lemon juice, warm water, and garlic to create a velvety dressing.',
      'Combine warm lentils, roasted roots, and arugula in bowls, drizzling generously with tahini dressing.'
    ],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rec-3',
    title: 'Golden Turmeric Egg & Avocado Quinoa Power Plate',
    description: 'Fluffy whole grain quinoa topped with soft poached eggs, sliced avocado, and a pinch of chili crisp.',
    cookingTime: '15 mins',
    costPerServing: 2.85,
    calories: 520,
    protein: 24,
    carbs: 46,
    fat: 26,
    fiber: 9,
    difficulty: 'Quick',
    tags: ['High Protein', 'Brain Health', 'Quick Breakfast', 'Vegetarian'],
    ingredients: ['Farm eggs (2)', 'Cooked quinoa', 'Ripe avocado', 'Ground turmeric', 'Baby spinach', 'Extra virgin olive oil', 'Toasted pumpkin seeds'],
    instructions: [
      'Warm cooked quinoa in a pan with a pinch of turmeric and olive oil.',
      'Lightly fry or poach 2 fresh eggs to desired yolk runny consistency.',
      'Plate quinoa with sliced avocado and baby greens.',
      'Top with warm eggs, toasted pumpkin seeds, and cracked black pepper.'
    ],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rec-4',
    title: 'One-Pot Black Bean & Sweet Potato Chili',
    description: 'Slow-simmered smoky chili loaded with fiber, potassium, and complex carbohydrates for sustained all-day stamina.',
    cookingTime: '25 mins',
    costPerServing: 1.60,
    calories: 410,
    protein: 18,
    carbs: 69,
    fat: 5,
    fiber: 18,
    difficulty: 'Easy',
    tags: ['Affordable', 'Batch Cooking', 'Freezer Friendly', 'Low Fat'],
    ingredients: ['Black beans', 'Sweet potatoes', 'Crushed tomatoes', 'Bell peppers', 'Cumin', 'Chili powder', 'Garlic', 'Lime'],
    instructions: [
      'Sauté diced onions, bell peppers, and garlic in a Dutch oven with olive oil.',
      'Add peeled cubed sweet potato, cumin, and chili powder; cook for 4 minutes.',
      'Pour in crushed tomatoes, black beans, and vegetable stock. Simmer for 20 minutes.',
      'Ladle into warm bowls with a squeeze of fresh lime.'
    ],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rec-5',
    title: 'Crispy Lemon Garlic Tofu with Stir-Fried Broccoli & Brown Rice',
    description: 'Crispy golden tofu cubes tossed with crisp-tender broccoli florets in a zesty ginger-garlic reduction.',
    cookingTime: '25 mins',
    costPerServing: 2.40,
    calories: 480,
    protein: 28,
    carbs: 52,
    fat: 16,
    fiber: 8,
    difficulty: 'Medium',
    tags: ['Plant Protein', 'High Calcium', 'Dairy-Free'],
    ingredients: ['Firm tofu', 'Broccoli florets', 'Brown rice', 'Low-sodium soy sauce or tamari', 'Fresh ginger', 'Garlic', 'Sesame oil', 'Cornstarch'],
    instructions: [
      'Press tofu, cut into cubes, toss with 1 tsp cornstarch, and pan-sear until crispy and golden.',
      'In the same wok, stir-fry broccoli with minced ginger and garlic for 3 minutes.',
      'Whisk soy sauce, lemon, and a splash of sesame oil, then coat tofu and greens.',
      'Serve hot over steamed brown rice.'
    ],
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rec-6',
    title: 'Herb-Roasted Salmon with Asparagus & Garlic Herb Couscous',
    description: 'Omega-3 rich wild salmon baked alongside spring asparagus spears and whole grain couscous.',
    cookingTime: '22 mins',
    costPerServing: 4.90,
    calories: 560,
    protein: 42,
    carbs: 41,
    fat: 22,
    fiber: 6,
    difficulty: 'Easy',
    tags: ['High Omega-3', 'Lean Muscle', 'Anti-Inflammatory'],
    ingredients: ['Wild salmon fillets', 'Fresh asparagus', 'Whole grain couscous', 'Fresh dill', 'Lemon slices', 'Olive oil', 'Garlic'],
    instructions: [
      'Arrange salmon fillets and trimmed asparagus on a baking sheet lined with parchment.',
      'Drizzle with olive oil, minced garlic, sea salt, and fresh dill sprigs.',
      'Roast at 400°F (200°C) for 12-14 minutes until salmon flakes tenderly.',
      'Pair with steamy whole grain couscous.'
    ],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  }
];

export const mockNutritionists: Nutritionist[] = [
  {
    id: 'nut-1',
    name: 'Dr. Elena Rostova, RD, PhD',
    title: 'Clinical Dietitian & Metabolic Health Specialist',
    credentials: 'PhD Nutrition, MS RD Registered Dietitian',
    specialty: 'Metabolic Health, Insulin Sensitivity & Heart Wellness',
    experienceYears: 12,
    bio: 'Specializing in evidence-based nutrition protocols that fit real-life family budgets. Passionate about de-mystifying food science without restrictive diet traps.',
    rating: 4.98,
    reviewsCount: 142,
    availableSlot: 'Tomorrow at 2:00 PM',
    pricePerSession: '$45 / 45-min consultation',
    avatar: 'https://images.unsplash.com/photo-1594824813598-963d37a2f5ff?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'nut-2',
    name: 'Marcus Chen, MS, CSSD',
    title: 'Performance Nutritionist & Meal Budget Strategist',
    credentials: 'Certified Specialist in Sports Dietetics (CSSD)',
    specialty: 'High Protein Living, Budget Meal Planning & Endurance',
    experienceYears: 9,
    bio: 'Helps everyday athletes and busy professionals hit their daily macro goals with affordable, easy-to-batch grocery plans.',
    rating: 4.95,
    reviewsCount: 98,
    availableSlot: 'Friday at 11:30 AM',
    pricePerSession: '$40 / 45-min consultation',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'nut-3',
    name: 'Amina Diallo, MPH, RD',
    title: 'Holistic Gut Health & Family Nutrition Coach',
    credentials: 'Master of Public Health (MPH), Registered Dietitian',
    specialty: 'Gut Microbiome, Food Sensitivities & Family Meal Planning',
    experienceYears: 11,
    bio: 'Believes healthy eating should feel joyful and culturally resonant. Expert in microbiome diversity and feeding multi-person households affordably.',
    rating: 4.99,
    reviewsCount: 187,
    availableSlot: 'Saturday at 10:00 AM',
    pricePerSession: '$45 / 45-min consultation',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
  },
];

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'The Real Science of Macro Balance: Why Restriction Backfires',
    category: 'Nutritional Science',
    readTime: '5 min read',
    excerpt: 'How carbohydrates, proteins, and healthy dietary fats work synergistically to stabilize blood glucose and fuel mental clarity.',
    author: 'Dr. Elena Rostova',
    authorRole: 'Clinical Dietitian, PhD',
    date: 'Updated September 2026',
    takeaways: [
      'Protein preserves lean muscle mass and stimulates satiety peptides GLP-1 & PYY.',
      'Complex carbohydrates paired with dietary fiber prevent insulin spikes.',
      'Unsaturated fats are essential for steroid hormone production and vitamin absorption (A, D, E, K).'
    ],
    content: [
      'For decades, fad diet trends cycled through villainizing fats in the 1990s, carbohydrates in the 2010s, and food groups at random. Modern nutritional science reveals that balance, rather than exclusion, creates sustainable health.',
      'When your plate includes 25-35% high quality protein, 45-50% complex carbohydrates with dietary fiber, and 20-30% healthy fats, your body experiences steady energy release rather than turbulent glycemic crashes.',
      'HealthPlate empowers you to monitor these macros without obsessive restriction, focusing on nutrient density and total dietary satisfaction.'
    ]
  },
  {
    id: 'art-2',
    title: 'Healthy Eating on $5 a Day: The Nutrient-Dense Pantry Guide',
    category: 'Budget & Practical Living',
    readTime: '6 min read',
    excerpt: 'Smart shopping strategies, cost-effective protein staples, and how to build 21 wholesome meals a week without overspending.',
    author: 'Marcus Chen',
    authorRole: 'Performance Dietitian, MS',
    date: 'Updated August 2026',
    takeaways: [
      'Dried legumes (lentils, black beans, chickpeas) cost under $0.30 per serving while providing 12-18g protein.',
      'Frozen vegetables retain identical (or superior) micronutrient content compared to fresh produce shipped long distances.',
      'Buying intact whole grains (oats, brown rice, barley) in bulk cuts grain costs by 60%.'
    ],
    content: [
      'One of the most persistent myths in wellness is that eating well requires high-end specialty grocery stores and expensive supplements. In truth, the world’s longest-living populations eat humble, affordable staples.',
      'By prioritizing versatile staples like dried beans, eggs, whole oats, frozen dark berries, and seasonal root vegetables, a two-person household can easily eat balanced, antioxidant-rich meals for under $75 weekly.',
      'Planning before stepping into the supermarket prevents impulse spending and cuts household food waste by an estimated 34%.'
    ]
  },
  {
    id: 'art-3',
    title: 'The "Cook With What You Have" Mindset: Eliminating Food Waste',
    category: 'Kitchen Skills',
    readTime: '4 min read',
    excerpt: 'Transform random fridge leftovers into satisfying culinary plates using simple flavor formulas and basic kitchen prep.',
    author: 'Amina Diallo',
    authorRole: 'Registered Dietitian, MPH',
    date: 'Updated September 2026',
    takeaways: [
      'The Universal Plate Formula: 1 base grain + 1 protein + 2 colorful veggies + 1 acid/fat dressing.',
      'Revive wilting leafy greens into pestos, frittatas, and warm broths.',
      'Keep a "freezer scrap bag" for vegetable broth to squeeze maximum nutritional value from every purchase.'
    ],
    content: [
      'Every week, the average household throws away up to $35 worth of edible groceries because ingredients do not match a rigid recipe. HealthPlate flips this dynamic upside down.',
      'When you view cooking through modular components rather than rigid ingredient lists, a lone zucchini, half a block of tofu, and leftover brown rice instantly become a high-protein stir-fry.',
      'Discovering recipes based on what is already chilling in your crisper drawer saves money and delivers spontaneous kitchen joy.'
    ]
  }
];

export const sampleShoppingList: ShoppingItem[] = [
  { id: 'shop-1', name: 'Rolled Oats (Bulk 2 lb)', category: 'Grains & Pantry', quantity: '1 bag', estimatedPrice: 3.49, checked: true },
  { id: 'shop-2', name: 'Dry Brown Lentils', category: 'Grains & Pantry', quantity: '1 lb', estimatedPrice: 1.69, checked: true },
  { id: 'shop-3', name: 'Garbanzo Beans (3 cans)', category: 'Grains & Pantry', quantity: '3 cans', estimatedPrice: 2.85, checked: false },
  { id: 'shop-4', name: 'Organic Baby Spinach (16 oz)', category: 'Produce', quantity: '1 tub', estimatedPrice: 3.99, checked: true },
  { id: 'shop-5', name: 'Sweet Potatoes', category: 'Produce', quantity: '3 lbs', estimatedPrice: 3.20, checked: false },
  { id: 'shop-6', name: 'Avocados', category: 'Produce', quantity: '4 pack', estimatedPrice: 3.99, checked: false },
  { id: 'shop-7', name: 'Lemons & Garlic Bulbs', category: 'Produce', quantity: '1 bag', estimatedPrice: 2.50, checked: true },
  { id: 'shop-8', name: 'Pasture-Raised Eggs (Dozen)', category: 'Proteins', quantity: '1 dozen', estimatedPrice: 4.80, checked: false },
  { id: 'shop-9', name: 'Organic Extra Firm Tofu', category: 'Proteins', quantity: '2 blocks', estimatedPrice: 4.50, checked: false },
  { id: 'shop-10', name: 'Plain Greek Yogurt (32 oz)', category: 'Dairy & Alternatives', quantity: '1 tub', estimatedPrice: 4.29, checked: true },
  { id: 'shop-11', name: 'Cold-Pressed Extra Virgin Olive Oil', category: 'Spices & Oils', quantity: '1 bottle', estimatedPrice: 8.90, checked: false },
  { id: 'shop-12', name: 'Chia Seeds', category: 'Grains & Pantry', quantity: '1 bag', estimatedPrice: 3.75, checked: false }
];

export const mockDeliveryPartners = [
  {
    id: 'del-1',
    name: 'Harvest & Hearth Kitchens',
    tagline: 'Farm-direct whole food bowls with verified macro labels',
    deliveryTime: '25-35 min',
    minimumOrder: '$15',
    rating: 4.9,
    dietaryFocus: ['Gluten-Free', 'High Protein', 'Whole30'],
    discount: '15% off first order with HealthPlate'
  },
  {
    id: 'del-2',
    name: 'Verdant Greens & Grain Co.',
    tagline: 'Affordable plant-forward nutrient dense meal preps',
    deliveryTime: '30-40 min',
    minimumOrder: '$12',
    rating: 4.85,
    dietaryFocus: ['Vegan', 'Low Sodium', 'High Fiber'],
    discount: 'Free delivery on orders over $25'
  },
  {
    id: 'del-3',
    name: 'Fisherman & Farmer Bento',
    tagline: 'Clean wild fish, lean poultry, and seasonal heirloom produce',
    deliveryTime: '35-50 min',
    minimumOrder: '$20',
    rating: 4.95,
    dietaryFocus: ['Pescatarian', 'Keto-Friendly', 'Mediterranean'],
    discount: 'Exclusive HealthPlate subscriber perk'
  }
];

export const mockHealthPlateFoods = [
  {
    id: 'hpf-1',
    name: 'Ancient Sprouted 5-Grain & Seed Blend',
    description: 'Quinoa, millet, amaranth, flax, and chia. 10g protein & 8g fiber per serving.',
    price: '$4.29 / 16 oz',
    status: 'Launching Q1 2027',
    badge: 'Pantry Essential'
  },
  {
    id: 'hpf-2',
    name: 'Cold-Pressed California Olive & Herb Elixir',
    description: 'Single-origin unfiltered extra virgin olive oil with rich polyphenol counts.',
    price: '$8.99 / 500ml',
    status: 'Launching Q1 2027',
    badge: 'Cold Pressed'
  },
  {
    id: 'hpf-3',
    name: 'Golden Turmeric & Roasted Chickpea Crunch',
    description: 'High-fiber roasted snack seasoned with black pepper, sea salt, and smoked paprika.',
    price: '$2.99 / 6 oz',
    status: 'Launching Q2 2027',
    badge: 'Wholesome Snack'
  }
];
