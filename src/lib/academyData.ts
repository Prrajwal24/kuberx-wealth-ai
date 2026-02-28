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

export interface AcademyLevel {
    level: number;
    title: string;
    icon: string;
    lessons: AcademyLesson[];
    quiz: AcademyQuiz;
    rewardNodes: { xp: number; coins: number; badge?: string };
}

export const academyLevels: AcademyLevel[] = [
    {
        level: 1,
        title: "Money Basics",
        icon: "Coins",
        lessons: [
            { id: "1-1", title: "Credit vs Debit", xpValue: 10, content: "Explain the difference between spending your own money vs borrowed money." },
            { id: "1-2", title: "Interest Basics", xpValue: 10, content: "Explain how banks charge or give interest." },
            { id: "1-3", title: "Income vs Expenses", xpValue: 10, content: "Explain how money flows in and out." }
        ],
        quiz: {
            xpValue: 20,
            questions: [
                { question: "What does a debit card use?", options: ["Borrowed money", "Your bank balance", "Bank loan"], correctAnswer: 1 },
                { question: "Interest is:", options: ["Money paid for borrowing", "Bank penalty", "Tax"], correctAnswer: 0 },
                { question: "Credit card spending uses:", options: ["Your own money", "Borrowed money", "Free money"], correctAnswer: 1 }
            ]
        },
        rewardNodes: { xp: 50, coins: 100, badge: "Finance Rookie" }
    },
    {
        level: 2,
        title: "Smart Money Habits",
        icon: "Building2",
        lessons: [
            { id: "2-1", title: "Budgeting", xpValue: 10, content: "Explain how to split income into needs, wants, and savings." },
            { id: "2-2", title: "Emergency Fund", xpValue: 10, content: "Explain why people should save 3–6 months of expenses." },
            { id: "2-3", title: "Debt Management", xpValue: 10, content: "Explain responsible loan usage." }
        ],
        quiz: {
            xpValue: 20,
            questions: [
                { question: "Recommended emergency fund size is:", options: ["1 month", "3–6 months", "1 year"], correctAnswer: 1 },
                { question: "Budgeting helps you:", options: ["Spend more", "Control money", "Avoid taxes"], correctAnswer: 1 },
                { question: "Good debt management means:", options: ["Paying loans on time", "Ignoring loans", "Taking more loans"], correctAnswer: 0 }
            ]
        },
        rewardNodes: { xp: 75, coins: 150, badge: "Money Manager" }
    },
    {
        level: 3,
        title: "Wealth Building",
        icon: "TrendingUp",
        lessons: [
            { id: "3-1", title: "Saving vs Investing", xpValue: 10, content: "Explain the difference between saving money and investing money." },
            { id: "3-2", title: "Compound Interest", xpValue: 10, content: "Explain how money grows faster over time." },
            { id: "3-3", title: "Financial Goals", xpValue: 10, content: "Explain planning for big goals like house, car, retirement." }
        ],
        quiz: {
            xpValue: 20,
            questions: [
                { question: "Compounding means:", options: ["Interest on interest", "Tax calculation", "Loan repayment"], correctAnswer: 0 },
                { question: "Investing helps:", options: ["Build long-term wealth", "Spend money", "Avoid banks"], correctAnswer: 0 },
                { question: "Financial goals help:", options: ["Plan the future", "Waste money", "Avoid saving"], correctAnswer: 0 }
            ]
        },
        rewardNodes: { xp: 100, coins: 200, badge: "Wealth Builder" }
    }
];
