import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wallet, Target, PieChart, ShoppingBag,
  TrendingUp, BarChart3, Shield, GraduationCap, Bot, Menu, X,
  LogOut, Settings, User as UserIcon
} from "lucide-react";
import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">KuberX</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Wealth Intelligence</p>
          </div>
          <button className="ml-auto lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-primary/10 text-primary glow-gold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
              >
                <item.icon size={18} className={isActive ? "text-primary" : ""} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
          <button className="lg:hidden text-muted-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-full gold-gradient shadow-lg flex items-center justify-center text-xs font-bold text-primary-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary/20 transition-all active:scale-95">
                  {user?.name?.substring(0, 2).toUpperCase() || "UX"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 glass-card border-white/10" align="end">
                <DropdownMenuLabel className="font-display">
                  <div className="flex flex-col">
                    <span className="text-sm">{user?.name}</span>
                    <span className="text-[10px] font-normal text-muted-foreground">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary cursor-pointer">
                  <UserIcon size={16} /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 focus:bg-primary/10 focus:text-primary cursor-pointer">
                  <Settings size={16} /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem
                  className="gap-2 focus:bg-destructive/10 focus:text-destructive cursor-pointer text-destructive"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
      <YakshaMascot />
    </div>
  );
}
