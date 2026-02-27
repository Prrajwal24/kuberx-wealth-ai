import { motion } from "framer-motion";
import { mockMarketData } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const mockWeekly = (base: number) =>
  Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    price: Math.round(base * (1 + (Math.random() - 0.5) * 0.02)),
  }));

const marketCards = [
  { key: 'gold', label: 'Gold', color: 'hsl(43, 96%, 56%)', data: mockWeekly(7245) },
  { key: 'silver', label: 'Silver', color: 'hsl(220, 10%, 70%)', data: mockWeekly(89500) },
  { key: 'nifty', label: 'Nifty 50', color: 'hsl(142, 71%, 45%)', data: mockWeekly(24580) },
  { key: 'sensex', label: 'Sensex', color: 'hsl(217, 91%, 60%)', data: mockWeekly(81250) },
];

export default function Market() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Market Intelligence</h1>
        <p className="text-muted-foreground mt-1">Live market indicators and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketCards.map((m, idx) => {
          const mktData = mockMarketData[m.key as keyof typeof mockMarketData];
          const isUp = mktData.change >= 0;

          return (
            <motion.div key={m.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="glass-card rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</p>
                  <p className="text-2xl font-display font-bold text-foreground mt-1">
                    {m.key === 'nifty' || m.key === 'sensex' ? mktData.price.toLocaleString() : `₹${mktData.price.toLocaleString()}`}
                    {mktData.unit && <span className="text-xs text-muted-foreground font-normal ml-1">{mktData.unit}</span>}
                  </p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${isUp ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'}`}>
                  {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(mktData.change)}%
                </div>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={m.data}>
                  <defs>
                    <linearGradient id={`grad-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="hsl(220, 10%, 55%)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip contentStyle={{ background: 'hsl(220, 18%, 10%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: '8px', color: 'hsl(40, 20%, 95%)' }} />
                  <Area type="monotone" dataKey="price" stroke={m.color} fill={`url(#grad-${m.key})`} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
