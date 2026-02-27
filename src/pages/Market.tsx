import { motion } from "framer-motion";
import { mockMarketData } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Cpu, Globe, Zap, Activity } from "lucide-react";

const mockWeekly = (base: number) =>
  Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    price: Math.round(base * (1 + (Math.random() - 0.5) * 0.02)),
  }));

const marketCards = [
  { key: 'gold', label: 'Gold', color: '#fbbf24', neonClass: 'neon-border-violet', data: mockWeekly(7245) },
  { key: 'silver', label: 'Silver', color: '#94a3b8', neonClass: 'neon-border-blue', data: mockWeekly(89500) },
  { key: 'nifty', label: 'Nifty 50', color: '#22c55e', neonClass: 'neon-border-success', data: mockWeekly(24580) },
  { key: 'sensex', label: 'Sensex', color: '#3b82f6', neonClass: 'neon-border-blue', data: mockWeekly(81250) },
];

export default function Market() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-4 relative">
      {/* Background Atmosphere */}
      <div className="absolute -top-40 -right-60 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20 font-bold tracking-widest uppercase">Live Pulse Active</div>
            <div className="h-[1px] w-12 bg-primary/20" />
          </div>
          <h1 className="text-5xl font-display font-black text-white tracking-tighter uppercase">Market <span className="glow-text-violet">Intelligence</span></h1>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl">Neural synchronization with global commodity and equity lattices.</p>
        </div>

        <div className="flex items-center gap-6 glass-cyber p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <Globe size={20} className="text-primary animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Global Status</p>
              <p className="text-sm font-bold text-success flex items-center gap-1">OPERATIONAL <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" /></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {marketCards.map((m, idx) => {
          const mktData = mockMarketData[m.key as keyof typeof mockMarketData];
          const isUp = mktData.change >= 0;

          return (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', damping: 20 }}
              className={`glass-cyber rounded-[2.5rem] p-8 border ${m.neonClass} relative overflow-hidden group hover:bg-white/5 transition-all outline-none`}
            >
              {/* Subtle Scanning Light */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div animate={{ left: ['-100%', '200%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: idx * 0.5 }} className="absolute inset-y-0 w-[30%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
              </div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isUp ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">{m.label} Sector</p>
                  </div>
                  <p className="text-4xl font-display font-black text-white tracking-tighter">
                    {m.key === 'nifty' || m.key === 'sensex' ? mktData.price.toLocaleString() : `₹${mktData.price.toLocaleString()}`}
                    {mktData.unit && <span className="text-xs text-muted-foreground font-bold ml-1">{mktData.unit.toUpperCase()}</span>}
                  </p>
                </div>

                <div className={`flex flex-col items-end gap-1 p-4 rounded-[1.5rem] border shadow-2xl ${isUp ? 'bg-success/10 border-success/20 text-success shadow-success/5' : 'bg-destructive/10 border-destructive/20 text-destructive shadow-destructive/5'
                  }`}>
                  <div className="flex items-center gap-1 font-display font-black text-xl">
                    {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    {Math.abs(mktData.change)}%
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-70">24H DELTA</p>
                </div>
              </div>

              <div className="h-44 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.data}>
                    <defs>
                      <linearGradient id={`grad-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={m.color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={m.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      stroke="rgba(255,255,255,0.2)"
                      fontSize={10}
                      className="font-bold uppercase tracking-widest"
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10, 10, 12, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        backdropBlur: '12px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                      }}
                      itemStyle={{ color: m.color, fontSize: '14px', fontWeight: 'black' }}
                      labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={m.color}
                      fill={`url(#grad-${m.key})`}
                      strokeWidth={3}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <p className="text-[9px] text-muted-foreground uppercase font-black">Volatility</p>
                    <p className="text-xs font-bold text-white">LOW-RES</p>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10" />
                  <div className="flex flex-col">
                    <p className="text-[9px] text-muted-foreground uppercase font-black">Sentiment</p>
                    <p className="text-xs font-bold text-primary">BULLISH</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
                  Neural Details <Activity size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Market News Section Placeholder/Enhanced */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass-cyber rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <Zap size={140} className="text-primary" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-widest">
              System Advisory
            </div>
            <h3 className="text-3xl font-display font-black text-white leading-tight uppercase">Automated Asset <span className="text-primary">Recalibration</span></h3>
            <p className="text-muted-foreground font-medium">The KuberX neural engine is detecting unusual turbulence in the commodity lattice. Recommendation: Maintain liquid reserves at 30% of total equity.</p>
          </div>

          <button className="h-20 px-10 rounded-[1.5rem] bg-white text-black font-display font-black uppercase tracking-tighter text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all active:scale-[0.98]">
            Execute Optimizer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
