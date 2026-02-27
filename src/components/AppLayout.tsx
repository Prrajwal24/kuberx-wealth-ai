import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wallet, Target, PieChart, ShoppingBag,
  TrendingUp, BarChart3, Shield, GraduationCap, Bot, Menu, X
} from "lucide-react";
import { useState } from "react";

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
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
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
            <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
              AS
            </div>
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
