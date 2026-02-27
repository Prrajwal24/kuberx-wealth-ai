export interface AcademyLesson {
    id: string;
    title: string;
    content: string;
    xpValue: number;
}

export interface AcademyQuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface AcademyQuiz {
    xpValue: number;
    questions: AcademyQuizQuestion[];
}

export interface AcademyGame {
    id: string;
    name: string;
    type: 'coins' | 'simulation' | 'sorting' | 'investment' | 'maze';
    xpValue: number;
    description: string;
}

export interface AcademyLevel {
    level: number;
    title: string;
    icon: string;
    lessons: AcademyLesson[];
    game: AcademyGame;
    quiz: AcademyQuiz;
    rewardNodes: { xp: number; coins: number; badge?: string };
}

export const academyLevels: AcademyLevel[] = [
    {
        level: 1,
        title: "Money Basics",
        icon: "Coins",
        lessons: [
            { id: "1-1", title: "What is Money?", xpValue: 10, content: "Money is a medium of exchange. It can be physical (cash) or digital (bank balance). It has four main jobs: Medium of exchange, Unit of account, Store of value, and Standard of deferred payment." },
            { id: "1-2", title: "Income vs Expenses", xpValue: 10, content: "Income is money you receive (salary, gifts). Expenses are money you spend (rent, food). To build wealth, Income must be greater than Expenses!" },
            { id: "1-3", title: "Debit vs Credit", xpValue: 10, content: "Debit = Paying with your own money today. Credit = Borrowing money to pay back later. Credit helps build a score but must be used carefully to avoid debt." },
            { id: "1-4", title: "Interest Basics", xpValue: 10, content: "Interest is the cost of borrowing money or the reward for saving it. If you save, the bank pays you interest. If you borrow, you pay the bank interest." }
        ],
        game: {
            id: "coin-catch",
            name: "Catch the Falling Coins",
            type: "coins",
            xpValue: 50,
            description: "Move your basket to catch gold coins (income) while avoiding heavy bills (expenses)!"
        },
        quiz: {
            xpValue: 20,
            questions: [
                { question: "What is income?", options: ["Money you spend", "Money you receive", "A type of credit card"], correctAnswer: 1 },
                { question: "What is the main difference between Debit and Credit?", options: ["Debit is own money, Credit is borrowed", "Credit is own money, Debit is borrowed", "There is no difference"], correctAnswer: 0 },
                { question: "Why is Interest important?", options: ["It's only for banks", "It's the cost of borrowing or reward for saving", "It's the same as a monthly salary"], correctAnswer: 1 }
            ]
        },
        rewardNodes: { xp: 50, coins: 100, badge: "Finance Explorer" }
    },
    {
        level: 2,
        title: "Banking & Credit",
        icon: "Building2",
        lessons: [
            { id: "2-1", title: "How Banks Work", xpValue: 10, content: "Banks are financial intermediaries. They take deposits at a lower interest rate and lend to others at a higher rate. The difference is their profit." },
            { id: "2-2", title: "Savings Accounts", xpValue: 10, content: "A savings account is a safe place for your cash that earns a small amount of interest. It is liquid, meaning you can withdraw anytime." },
            { id: "2-3", title: "Loans & Credit Score", xpValue: 10, content: "Loans are borrowed money that must be repaid with interest. Your Credit Score (CIBIL in India) is a number (300-900) that tells banks how likely you are to pay back." }
        ],
        game: {
            id: "bank-manager",
            name: "Bank Manager Sim",
            type: "simulation",
            xpValue: 50,
            description: "Review loan applications. Analyze scores and decide who gets the money. Beware of bad debts!"
        },
        quiz: {
            xpValue: 20,
            questions: [
                { question: "What is a good range for a credit score in India?", options: ["0 - 100", "300 - 900", "1000+"], correctAnswer: 1 },
                { question: "How do banks mainly make profit?", options: ["Charging for ATM visits", "The difference between lending and deposit rates", "Government grants"], correctAnswer: 1 }
            ]
        },
        rewardNodes: { xp: 75, coins: 150, badge: "Credit Savvy" }
    },
    {
        level: 3,
        title: "Budgeting & Saving",
        icon: "LayoutDashboard",
        lessons: [
            { id: "3-1", title: "50/30/20 Rule", xpValue: 10, content: "A classic rule: 50% on Needs (Rent, food), 30% on Wants (Netflix, dining), and 20% on Savings/Investments." },
            { id: "3-2", title: "Emergency Funds", xpValue: 10, content: "An emergency fund should cover 3-6 months of your expenses. It's your safety net for unexpected events like job loss or medical needs." },
            { id: "3-3", title: "Expense Tracking", xpValue: 10, content: "You can't manage what you don't measure. Tracking every rupee helps identify leaks in your wallet." }
        ],
        game: {
            id: "expense-sort",
            name: "Expense Sorting Game",
            type: "sorting",
            xpValue: 50,
            description: "Drag items like 'Rent', 'Netflix', and 'Gold SIP' into the correct buckets: Needs, Wants, or Savings."
        },
        quiz: {
            xpValue: 20,
            questions: [
                { question: "In the 50/30/20 rule, what does 30 represent?", options: ["Savings", "Needs", "Wants"], correctAnswer: 2 },
                { question: "How much should an Emergency Fund ideally cover?", options: ["1 month", "3-6 months", "12 months"], correctAnswer: 1 }
            ]
        },
        rewardNodes: { xp: 100, coins: 200, badge: "Budget Master" }
    },
    {
        level: 4,
        title: "Investing",
        icon: "TrendingUp",
        lessons: [
            { id: "4-1", title: "Stocks vs Mutual Funds", xpValue: 10, content: "Stocks are individual company ownership. Mutual funds pool money from many investors and are managed by professionals." },
            { id: "4-2", title: "Gold & Risk vs Return", xpValue: 10, content: "Gold is a safe haven. Generally, higher potential returns come with higher risks (Volatility). Diversification is key!" }
        ],
        game: {
            id: "invest-sim",
            name: "Mini Investment Simulator",
            type: "investment",
            xpValue: 50,
            description: "Invest ₹10,000 virtual money across Stocks, Gold, and Funds. Watch the market cycles!"
        },
        quiz: {
            xpValue: 20,
            questions: [
                { question: "What is diversification?", options: ["Putting all money in one stock", "Spreading investments across different assets", "Spending all savings"], correctAnswer: 1 },
                { question: "Which generally has higher risk?", options: ["Fixed Deposit", "Direct Equity (Stocks)", "Gold"], correctAnswer: 1 }
            ]
        },
        rewardNodes: { xp: 150, coins: 300, badge: "Investment Beginner" }
    },
    {
        level: 5,
        title: "Wealth Building",
        icon: "Award",
        lessons: [
            { id: "5-1", title: "Compound Interest", xpValue: 10, content: "Compound interest is interest on your interest. Over long periods, it creates exponential growth!" },
            { id: "5-2", title: "Financial Independence", xpValue: 10, content: "Financial Independence (FIRE) is when your passive income from investments covers all your living expenses." }
        ],
        game: {
            id: "maze-game",
            name: "Escape Maze",
            type: "maze",
            xpValue: 50,
            description: "Navigate the financial maze by answering rapid-fire questions to unlock your path!"
        },
        quiz: {
            xpValue: 20,
            questions: [
                { question: "What is the 8th wonder of the world according to Einstein?", options: ["Bitcoin", "Compound Interest", "Credit Cards"], correctAnswer: 1 },
                { question: "What is passive income?", options: ["Salary from job", "Bribe", "Income earned without active work"], correctAnswer: 2 }
            ]
        },
        rewardNodes: { xp: 200, coins: 500, badge: "Finance Champ" }
    }
];
