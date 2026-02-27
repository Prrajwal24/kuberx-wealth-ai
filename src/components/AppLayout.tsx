import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wallet, Target, PieChart, ShoppingBag,
  TrendingUp, BarChart3, Shield, GraduationCap, Bot, Menu, X,
  LogOut, Settings, User as UserIcon, BrainCircuit
} from "lucide-react";
import { useState, useEffect } from "react";
import YakshaMascot from "./YakshaMascot";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/learn", icon: GraduationCap, label: "Academy" },
  { to: "/expenses", icon: PieChart, label: "Tracker" },
  { to: "/buy-check", icon: ShoppingBag, label: "Smart Spending" },
  { to: "/advisor", icon: Bot, label: "AI Advisor" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground font-body">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-black/40 backdrop-blur-xl border-b border-white/10" : "py-6 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px] shadow-[0_0_20px_rgba(192,132,252,0.3)] group-hover:shadow-[0_0_30px_rgba(192,132,252,0.5)] transition-all">
              <div className="w-full h-full rounded-xl bg-[#0a0a0c] flex items-center justify-center">
                <BrainCircuit className="text-primary" size={22} />
              </div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              KuberX
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                      ? "bg-primary/20 text-primary shadow-[inset_0_0_12px_rgba(192,132,252,0.2)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-foreground hover:bg-white/10 hover:border-primary/50 transition-all active:scale-95 shadow-lg">
                  {user?.name?.substring(0, 2).toUpperCase() || "UX"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-cyber border-white/10" align="end">
                <DropdownMenuLabel className="font-display">
                  <div className="flex flex-col">
                    <span className="text-sm">{user?.name}</span>
                    <span className="text-[10px] font-normal text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="gap-2 focus:bg-primary/20 focus:text-primary cursor-pointer transition-colors" onClick={() => navigate("/")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 focus:bg-primary/20 focus:text-primary cursor-pointer transition-colors">
                  Profile settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem
                  className="gap-2 focus:bg-destructive/20 focus:text-destructive cursor-pointer text-destructive transition-colors"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 p-4 bg-[#0a0a0c]/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-sm font-medium border border-white/10"
                >
                  <item.icon size={18} className="text-primary" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Yaksha Floating Assistant */}
      <YakshaMascot />
    </div>
  );
}
