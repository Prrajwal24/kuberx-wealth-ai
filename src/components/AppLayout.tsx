import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wallet, Target, PieChart, ShoppingBag,
  TrendingUp, BarChart3, Shield, GraduationCap, Bot, LogOut, Settings, User as UserIcon
} from "lucide-react";
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
  { to: "/allocation", icon: Wallet, label: "Salary Split" },
  { to: "/expenses", icon: PieChart, label: "Expenses" },
  { to: "/goals", icon: Target, label: "Goals" },
  { to: "/buy-check", icon: ShoppingBag, label: "Buy Check" },
  { to: "/wealth-sim", icon: TrendingUp, label: "Wealth Sim" },
  { to: "/market", icon: BarChart3, label: "Markets" },
  { to: "/emergency", icon: Shield, label: "Emergency" },
  { to: "/learn", icon: GraduationCap, label: "Academy" },
  { to: "/advisor", icon: Bot, label: "AI Advisor" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-[1600px] h-full mx-auto px-6 flex items-center justify-between gap-8">
          {/* Branding */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-primary-foreground font-display font-bold text-xl">K</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-xl text-foreground leading-tight">KuberX</h1>
              <p className="text-[9px] text-muted-foreground tracking-widest uppercase opacity-60">Wealth Intelligence</p>
            </div>
          </div>

          {/* Horizontal Menu */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                                        relative group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap
                                        ${isActive
                      ? "text-violet-400 bg-violet-600/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"}
                                    `}
                >
                  <item.icon size={16} className={isActive ? "text-violet-400" : "group-hover:text-white"} />
                  <span>{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Section: User Profile */}
          <div className="flex items-center gap-4 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full gold-gradient shadow-lg flex items-center justify-center text-sm font-bold text-primary-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/20 transition-all hover:scale-105 active:scale-95">
                  {user?.name?.substring(0, 2).toUpperCase() || "UX"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mt-2 glass-card border-white/10" align="end">
                <DropdownMenuLabel className="font-display p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-foreground">{user?.name}</span>
                    <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-widest">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem className="gap-3 p-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors mx-2 rounded-lg">
                  <UserIcon size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 p-3 focus:bg-primary/10 focus:text-primary cursor-pointer transition-colors mx-2 rounded-lg">
                  <Settings size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem
                  className="gap-3 p-3 focus:bg-destructive/10 focus:text-destructive cursor-pointer text-destructive transition-colors mx-2 rounded-lg"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <LogOut size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu (Visible only under LG) */}
        <div className="lg:hidden h-12 border-t border-white/5 overflow-x-auto no-scrollbar bg-[#0a0a0c]/40 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4 h-full min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                                    px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all
                                    ${isActive ? "text-violet-400 bg-violet-600/10" : "text-muted-foreground"}
                                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <YakshaMascot />
    </div>
  );
}
