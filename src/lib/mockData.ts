export interface UserProfile {
  name: string;
  age: number;
  monthlySalary: number;
  monthlyExpenses: number;
  currentSavings: number;
  existingEMIs: number;
  riskAppetite: 'conservative' | 'balanced' | 'aggressive';
  financialGoals: string[];
  xp: number;
  coins: number;
  badges: string[];
  completedAcademyLevels: number[];
  completedLessons: string[];
}

export interface PurchaseItem {
  name: string;
  avgPrice: number;
  category: string;
  type: 'essential' | 'lifestyle' | 'investment';
  depreciation: 'High' | 'Medium' | 'Low' | 'N/A';
  financialImpact: 'High' | 'Medium-High' | 'Medium' | 'Low';
}

export interface PurchaseCategory {
  category: string;
  icon: string;
  items: PurchaseItem[];
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  timeline: number; // years
  monthlyRequired: number;
}

export const mockUser: UserProfile = {
  name: "Arjun Sharma",
  age: 26,
  monthlySalary: 85000,
  monthlyExpenses: 42000,
  currentSavings: 320000,
  existingEMIs: 8500,
  riskAppetite: 'balanced',
  financialGoals: ['house', 'car', 'retirement'],
  xp: 120,
  coins: 250,
  badges: ['Finance Explorer'],
  completedAcademyLevels: [],
  completedLessons: ['1-1', '1-2'],
};

export const mockExpenses: Expense[] = [
  { id: '1', name: 'Rent', amount: 15000, category: 'Housing', date: '2026-02-01' },
  { id: '2', name: 'Groceries', amount: 6000, category: 'Food', date: '2026-02-03' },
  { id: '3', name: 'Swiggy', amount: 4200, category: 'Food Delivery', date: '2026-02-05' },
  { id: '4', name: 'Netflix + Spotify', amount: 800, category: 'Subscriptions', date: '2026-02-01' },
  { id: '5', name: 'Electricity', amount: 2200, category: 'Utilities', date: '2026-02-10' },
  { id: '6', name: 'Fuel', amount: 3500, category: 'Transport', date: '2026-02-08' },
  { id: '7', name: 'Shopping', amount: 5500, category: 'Lifestyle', date: '2026-02-14' },
  { id: '8', name: 'Internet', amount: 999, category: 'Utilities', date: '2026-02-01' },
  { id: '9', name: 'Gym', amount: 2000, category: 'Health', date: '2026-02-01' },
  { id: '10', name: 'Zomato', amount: 1800, category: 'Food Delivery', date: '2026-02-12' },
];

export const mockGoals: Goal[] = [
  { id: '1', name: 'Dream Home', targetAmount: 5000000, currentAmount: 320000, timeline: 7, monthlyRequired: 48000 },
  { id: '2', name: 'New Car', targetAmount: 1200000, currentAmount: 150000, timeline: 3, monthlyRequired: 27000 },
  { id: '3', name: 'Retirement Fund', targetAmount: 30000000, currentAmount: 200000, timeline: 30, monthlyRequired: 15000 },
];

export const mockMarketData = {
  gold: { price: 7245, change: 1.2, unit: '₹/g' },
  silver: { price: 89500, change: -0.5, unit: '₹/kg' },
  nifty: { price: 24580, change: 0.8, unit: '' },
  sensex: { price: 81250, change: 0.6, unit: '' },
};

export const monthlyExpenseData = [
  { month: 'Sep', amount: 38000 },
  { month: 'Oct', amount: 41000 },
  { month: 'Nov', amount: 39500 },
  { month: 'Dec', amount: 45000 },
  { month: 'Jan', amount: 43000 },
  { month: 'Feb', amount: 42000 },
];

export const expenseByCategory = [
  { name: 'Housing', value: 15000, fill: 'hsl(43, 96%, 56%)' },
  { name: 'Food', value: 6000, fill: 'hsl(142, 71%, 45%)' },
  { name: 'Food Delivery', value: 6000, fill: 'hsl(0, 72%, 51%)' },
  { name: 'Transport', value: 3500, fill: 'hsl(217, 91%, 60%)' },
  { name: 'Utilities', value: 3199, fill: 'hsl(280, 65%, 60%)' },
  { name: 'Lifestyle', value: 5500, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Health', value: 2000, fill: 'hsl(180, 60%, 50%)' },
  { name: 'Subscriptions', value: 800, fill: 'hsl(320, 60%, 50%)' },
];

export const purchaseCategories: PurchaseCategory[] = [
  {
    category: "Gadgets & Tech",
    icon: "Smartphone",
    items: [
      { name: "iPhone / Premium Smartphone", avgPrice: 80000, category: "Luxury Gadget", type: "lifestyle", depreciation: "High", financialImpact: "Medium-High" },
      { name: "Android Flagship Phone", avgPrice: 70000, category: "Gadgets", type: "lifestyle", depreciation: "High", financialImpact: "Medium" },
      { name: "Laptop (MacBook / Windows)", avgPrice: 90000, category: "Work/Play", type: "essential", depreciation: "Medium", financialImpact: "High" },
      { name: "Tablet / iPad", avgPrice: 45000, category: "Gadgets", type: "lifestyle", depreciation: "Medium", financialImpact: "Medium" },
      { name: "Smartwatch", avgPrice: 25000, category: "Wearables", type: "lifestyle", depreciation: "High", financialImpact: "Low" },
      { name: "Wireless Earbuds", avgPrice: 15000, category: "Accessories", type: "lifestyle", depreciation: "High", financialImpact: "Low" },
      { name: "Mechanical Keyboard", avgPrice: 10000, category: "Accessories", type: "lifestyle", depreciation: "Low", financialImpact: "Low" },
      { name: "External Monitor", avgPrice: 20000, category: "Work Setup", type: "essential", depreciation: "Low", financialImpact: "Low" },
      { name: "Camera / GoPro", avgPrice: 40000, category: "Gadgets", type: "lifestyle", depreciation: "Medium", financialImpact: "Medium" }
    ]
  },
  {
    category: "Gaming & Entertainment",
    icon: "Gamepad2",
    items: [
      { name: "Gaming PC", avgPrice: 120000, category: "Entertainment", type: "lifestyle", depreciation: "High", financialImpact: "High" },
      { name: "PlayStation / Xbox", avgPrice: 50000, category: "Gaming", type: "lifestyle", depreciation: "Medium", financialImpact: "Medium" },
      { name: "Gaming Accessories", avgPrice: 8000, category: "Gaming", type: "lifestyle", depreciation: "Medium", financialImpact: "Low" },
      { name: "In-game Purchases", avgPrice: 2000, category: "Entertainment", type: "lifestyle", depreciation: "High", financialImpact: "Low" },
      { name: "Streaming Subscriptions", avgPrice: 1000, category: "Subscriptions", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" },
      { name: "Movie Tickets", avgPrice: 1000, category: "Entertainment", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" }
    ]
  },
  {
    category: "Vehicles & Transport",
    icon: "Car",
    items: [
      { name: "Bike / Motorcycle", avgPrice: 150000, category: "Transport", type: "essential", depreciation: "Medium", financialImpact: "High" },
      { name: "Electric Scooter", avgPrice: 120000, category: "Transport", type: "essential", depreciation: "Medium", financialImpact: "Medium-High" },
      { name: "Used Car", avgPrice: 400000, category: "Transport", type: "essential", depreciation: "Low", financialImpact: "High" },
      { name: "New Car", avgPrice: 800000, category: "Transport", type: "lifestyle", depreciation: "High", financialImpact: "High" }
    ]
  },
  {
    category: "Travel & Experiences",
    icon: "Palmtree",
    items: [
      { name: "Domestic Trip", avgPrice: 20000, category: "Travel", type: "lifestyle", depreciation: "N/A", financialImpact: "Medium" },
      { name: "International Trip", avgPrice: 150000, category: "Travel", type: "lifestyle", depreciation: "N/A", financialImpact: "High" },
      { name: "Weekend Getaway", avgPrice: 8000, category: "Travel", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" },
      { name: "Concert / Music Festival", avgPrice: 5000, category: "Leisure", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" },
      { name: "Adventure Activity", avgPrice: 3000, category: "Leisure", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" }
    ]
  },
  {
    category: "Fashion & Lifestyle",
    icon: "Shirt",
    items: [
      { name: "Premium Sneakers", avgPrice: 12000, category: "Fashion", type: "lifestyle", depreciation: "High", financialImpact: "Low" },
      { name: "Designer Clothes", avgPrice: 15000, category: "Fashion", type: "lifestyle", depreciation: "High", financialImpact: "Medium" },
      { name: "Gym Membership", avgPrice: 20000, category: "Health", type: "essential", depreciation: "N/A", financialImpact: "Low" },
      { name: "Fitness Equipment", avgPrice: 10000, category: "Health", type: "lifestyle", depreciation: "Medium", financialImpact: "Low" },
      { name: "Luxury Watch", avgPrice: 50000, category: "Fashion", type: "lifestyle", depreciation: "Low", financialImpact: "Medium" },
      { name: "Sunglasses", avgPrice: 8000, category: "Fashion", type: "lifestyle", depreciation: "Medium", financialImpact: "Low" }
    ]
  },
  {
    category: "Education & Skill Building",
    icon: "BookOpen",
    items: [
      { name: "Online Course", avgPrice: 5000, category: "Education", type: "investment", depreciation: "N/A", financialImpact: "Low" },
      { name: "Certification Program", avgPrice: 25000, category: "Education", type: "investment", depreciation: "N/A", financialImpact: "Medium" },
      { name: "Coding Bootcamp", avgPrice: 50000, category: "Education", type: "investment", depreciation: "N/A", financialImpact: "High" },
      { name: "Professional Workshop", avgPrice: 10000, category: "Education", type: "investment", depreciation: "N/A", financialImpact: "Low" }
    ]
  },
  {
    category: "Home & Living",
    icon: "Home",
    items: [
      { name: "Furniture Purchase", avgPrice: 30000, category: "Home", type: "essential", depreciation: "Medium", financialImpact: "Medium" },
      { name: "Home Office Setup", avgPrice: 40000, category: "Home", type: "essential", depreciation: "Medium", financialImpact: "Medium" },
      { name: "Kitchen Appliances", avgPrice: 15000, category: "Home", type: "essential", depreciation: "Medium", financialImpact: "Low" }
    ]
  },
  {
    category: "Financial Decisions",
    icon: "PiggyBank",
    items: [
      { name: "Start SIP Investment", avgPrice: 5000, category: "Investment", type: "investment", depreciation: "N/A", financialImpact: "Low" },
      { name: "Buy Gold", avgPrice: 20000, category: "Asset", type: "investment", depreciation: "Low", financialImpact: "Medium" },
      { name: "Buy Crypto", avgPrice: 10000, category: "Asset", type: "investment", depreciation: "N/A", financialImpact: "Low" },
      { name: "Credit Card Upgrade", avgPrice: 0, category: "Finance", type: "lifestyle", depreciation: "N/A", financialImpact: "Low" },
      { name: "Buy Now Pay Later", avgPrice: 10000, category: "Finance", type: "lifestyle", depreciation: "N/A", financialImpact: "Medium" },
      { name: "Take Personal Loan", avgPrice: 100000, category: "Finance", type: "lifestyle", depreciation: "N/A", financialImpact: "High" }
    ]
  },
];

export function calculateKuberScore(user: UserProfile): number {
  const savingsRate = (user.monthlySalary - user.monthlyExpenses) / user.monthlySalary;
  const emergencyMonths = user.currentSavings / user.monthlyExpenses;
  const dtiRatio = user.existingEMIs / user.monthlySalary;

  let score = 0;
  score += Math.min(savingsRate * 100, 30); // max 30
  score += Math.min(emergencyMonths * 5, 25); // max 25
  score += Math.max(0, (1 - dtiRatio * 3) * 25); // max 25
  score += 20; // base for investment consistency (mock)

  return Math.round(Math.min(100, Math.max(0, score)));
}

export function getScoreCategory(score: number): { label: string; color: string } {
  if (score < 40) return { label: 'Vulnerable', color: 'destructive' };
  if (score < 70) return { label: 'Stable', color: 'warning' };
  return { label: 'Wealth Builder', color: 'success' };
}

export function calculateSalaryAllocation(user: UserProfile) {
  const salary = user.monthlySalary;
  const emergencyMonths = user.currentSavings / user.monthlyExpenses;

  let essentials = 0.50;
  let investments = 0.20;
  let savings = 0.20;
  let lifestyle = 0.10;

  if (emergencyMonths < 6) {
    savings += 0.05;
    lifestyle -= 0.05;
  }

  if (user.existingEMIs / salary > 0.15) {
    lifestyle -= 0.03;
    savings += 0.03;
  }

  return {
    essentials: Math.round(salary * essentials),
    investments: Math.round(salary * investments),
    savings: Math.round(salary * savings),
    lifestyle: Math.round(salary * lifestyle),
  };
}

export function evaluatePurchase(
  price: number,
  user: UserProfile,
  metadata?: PurchaseItem
): { verdict: string; regretProbability: number; reasoning: string; impactLevel: string } {
  const monthlySurplus = user.monthlySalary - user.monthlyExpenses - user.existingEMIs;
  const emergencyMonths = user.currentSavings / user.monthlyExpenses;
  const priceToSavings = price / user.currentSavings;

  let regret = 20;
  let reasons: string[] = [];

  if (priceToSavings > 0.3) { regret += 30; reasons.push("This costs more than 30% of your savings."); }
  if (emergencyMonths < 6) { regret += 20; reasons.push("Your emergency fund covers only " + emergencyMonths.toFixed(1) + " months (below 6 month target)."); }
  if (price > monthlySurplus * 2) { regret += 15; reasons.push("This exceeds 2x your monthly surplus."); }
  if (user.existingEMIs > user.monthlySalary * 0.15) { regret += 10; reasons.push("Your EMI burden is already high."); }

  // Metadata-driven logic
  if (metadata) {
    if (metadata.type === 'investment') {
      regret -= 20; // Investments are generally approved
    } else if (metadata.type === 'essential' && price < monthlySurplus) {
      regret -= 10; // Essential items are prioritized
    } else if (metadata.type === 'lifestyle' && regret > 40) {
      regret += 10; // Defer non-essential if finances are tight
      reasons.push("Since this is a lifestyle purchase, prioritizing your financial goals might be better right now.");
    }

    if (metadata.depreciation === 'High') {
      regret += 5;
    }
  }

  regret = Math.min(95, Math.max(5, regret));

  let verdict = 'Approved ✅';
  if (regret > 65) verdict = 'Not Recommended ❌';
  else if (regret > 40) verdict = 'Delay Recommended ⏳';

  // Specific AI tailoring
  let impactLevel = "Low";
  if (price > user.monthlySalary * 0.5) impactLevel = "High";
  else if (price > user.monthlySalary * 0.2) impactLevel = "Medium";

  let reasoning = reasons.length > 0 ? reasons.join(' ') : 'Your finances look healthy for this purchase.';
  if (metadata?.type === 'lifestyle' && verdict.includes('Delay')) {
    reasoning = `Buying this ${metadata.name} right now may reduce your ability to achieve your long-term goals. ${reasoning}`;
  }

  return {
    verdict,
    regretProbability: regret,
    reasoning,
    impactLevel: metadata?.financialImpact || impactLevel
  };
}

export function calculateFutureWealth(
  salary: number,
  increment: number,
  monthlySIP: number,
  inflation: number,
  years: number
): { year: number; nominal: number; real: number }[] {
  const data = [];
  let currentSalary = salary;
  let totalInvested = 0;
  let portfolioValue = 0;
  const annualReturn = 0.12;

  for (let y = 1; y <= years; y++) {
    currentSalary *= (1 + increment / 100);
    const annualSIP = monthlySIP * 12;
    totalInvested += annualSIP;
    portfolioValue = (portfolioValue + annualSIP) * (1 + annualReturn);
    const realValue = portfolioValue / Math.pow(1 + inflation / 100, y);
    data.push({ year: y, nominal: Math.round(portfolioValue), real: Math.round(realValue) });
  }
  return data;
}
