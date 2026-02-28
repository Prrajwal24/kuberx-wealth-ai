import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Plus, Calendar, CreditCard, Home, Zap, ShoppingBag, CheckCircle2, AlertCircle, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Reminder {
    id: string;
    title: string;
    amount: number;
    dueDate: string;
    category: 'Subscription' | 'Bill' | 'Rent' | 'Other';
    status: 'Upcoming' | 'Due Today' | 'Paid';
    icon: any;
}

const INITIAL_REMINDERS: Reminder[] = [
    { id: '1', title: 'Adobe Creative Cloud', amount: 1499, dueDate: '2026-03-05', category: 'Subscription', status: 'Upcoming', icon: Zap },
    { id: '2', title: 'HDFC Credit Card Bill', amount: 24500, dueDate: '2026-02-28', category: 'Bill', status: 'Due Today', icon: CreditCard },
    { id: '3', title: 'Apartment Rent', amount: 18000, dueDate: '2026-03-01', category: 'Rent', status: 'Upcoming', icon: Home },
    { id: '4', title: 'Netflix Subscription', amount: 649, dueDate: '2026-03-12', category: 'Subscription', status: 'Upcoming', icon: ShoppingBag },
    { id: '5', title: 'Electricity Bill', amount: 3200, dueDate: '2026-02-25', category: 'Bill', status: 'Paid', icon: AlertCircle },
];

export default function Ping() {
    const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
    const [isAdding, setIsAdding] = useState(false);

    // Sort reminders by due date
    const sortedReminders = [...reminders].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-success/20 text-success border-success/30';
            case 'Due Today': return 'bg-destructive/20 text-destructive border-destructive/30 animate-pulse';
            case 'Upcoming': return 'bg-primary/20 text-primary border-primary/30';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const markAsPaid = (id: string) => {
        setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'Paid' } : r));
    };

    const deleteReminder = (id: string) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-10 max-w-[1400px] mx-auto pb-20 px-4">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
                        Ping
                    </h1>
                    <p className="text-primary font-medium mt-3 text-lg">
                        Your Smart Money Reminder Assistant
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsAdding(true)} className="gold-gradient text-primary-foreground h-14 px-8 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-warning/20">
                        <Plus size={20} /> Add Reminder
                    </Button>
                </div>
            </motion.div>

            {/* Stats/Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Due Today</p>
                        <div className="p-2 bg-destructive/20 text-destructive rounded-lg">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-display font-black text-foreground">
                        ₹{reminders.filter(r => r.status === 'Due Today').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">1 urgent payment required</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Upcoming (7D)</p>
                        <div className="p-2 bg-primary/20 text-primary rounded-lg">
                            <Clock size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-display font-black text-foreground">
                        ₹{reminders.filter(r => r.status === 'Upcoming').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Next 7 days outlook</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Total Month</p>
                        <div className="p-2 bg-white/5 text-foreground rounded-lg">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <p className="text-4xl font-display font-black text-foreground">
                        ₹{reminders.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Total tracked reminders</p>
                </motion.div>
            </div>

            {/* Reminder List */}
            <div className="space-y-6">
                <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
                    <Bell className="text-primary" /> Upcoming Reminders
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                        {sortedReminders.map((reminder, idx) => (
                            <motion.div
                                key={reminder.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`glass-card p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/30 transition-all ${reminder.status === 'Due Today' ? 'border-destructive/30 bg-destructive/5' : 'border-white/5'}`}
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${reminder.status === 'Paid' ? 'bg-success/20 text-success' : 'bg-primary/10 text-primary'} group-hover:scale-110 transition-transform`}>
                                        <reminder.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">{reminder.title}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                            <span className="text-xs text-muted-foreground tracking-widest uppercase font-black">{reminder.category}</span>
                                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar size={12} /> {new Date(reminder.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                                    <div className="text-right">
                                        <p className="text-2xl font-display font-black text-foreground">₹{reminder.amount.toLocaleString()}</p>
                                        <Badge className={`mt-1 font-bold ${getStatusColor(reminder.status)}`}>
                                            {reminder.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {reminder.status !== 'Paid' && (
                                            <Button onClick={() => markAsPaid(reminder.id)} size="sm" className="bg-success hover:bg-success/80 text-white font-bold rounded-xl px-4 h-10">
                                                <CheckCircle2 size={16} className="mr-2" /> Mark Paid
                                            </Button>
                                        )}
                                        <Button onClick={() => deleteReminder(reminder.id)} variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors h-10 w-10">
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
