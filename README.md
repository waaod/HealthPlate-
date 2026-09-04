HealthPlate
A personalized, practical, and affordable nutrition and meal-planning platform, built in an 18-hour hackathon. HealthPlate placed 1st among 10 teams.

Vision
Healthy living needs more than a nutrition plan to be practical. HealthPlate connects users to a full ecosystem around healthy eating: daily calorie/macro tracking, recipe discovery, budget-aware shopping lists, meal delivery, nutritionist consultations, and educational content — all in one place.

Core Features
Feature	Description
Onboarding	Captures dietary preference, allergies, health goals, household size, and weekly budget to personalize the experience.
Dashboard	Tracks daily calories, macros (protein/carbs/fat/fiber), and water intake against personalized targets. Persists between sessions via localStorage.
Recipe Explorer	Browse recipes with cost-per-serving, prep time, and nutrition info; log meals directly to the dashboard.
Shopping List	Generates a budget-aware grocery list scaled to household size and weekly budget.
Delivery	Interface for browsing healthy meal/grocery delivery options.
Nutritionist Booking	Browse and book sessions with nutrition professionals.
Articles / Blog	Educational nutrition content.
Sign In	Simulated authentication flow.
Tech Stack
React 19 + TypeScript
Vite 6 (build tool / dev server)
Tailwind CSS 4
Framer Motion (motion) for animation
Lucide React for icons
Project Status: Functional Frontend Prototype

This build is a client-side demo, intentionally scoped for a hackathon timeline:

All content (meals, recipes, nutritionists, articles, shopping items) is served from static mock data (src/data/mockData.ts) — there is no backend or database.
User state (preferences, logged meals, water intake) persists locally via browser localStorage, not a server.
Sign-in and booking flows are simulated (no real authentication or scheduling system).
Architecture
src/
├── App.tsx              # Root component, view routing, state, localStorage sync
├── types.ts              # Shared TypeScript interfaces (UserPreferences, MealItem, Recipe, etc.)
├── data/
│   └── mockData.ts       # Static demo data
└── components/
    ├── Navbar, Hero, FeaturesSection, AffordabilitySection, FinalCta, Footer
    ├── Dashboard.tsx      # Calorie/macro/water tracking view
    └── *Modal.tsx         # Onboarding, Recipe, ShoppingList, Delivery, Nutritionist, Article, Sign-in

State is managed with local React hooks (useState/useEffect) — no external state library. Components are cleanly separated by feature/modal rather than bundled into monoliths.

Running Locally
bash
npm install
npm run dev
Next Steps
Add AI-generated, budget-aware recipe recommendations
Replace mock data with a real backend and persistent user accounts
Real nutritionist scheduling and delivery-partner integrations



ومبني أصلاً من خلال أداة Google AI Studio.
