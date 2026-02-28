import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  mockMarketData,
  mockUser
} from "@/lib/mockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";
import {
  TrendingUp, TrendingDown, Info, BarChart3, LineChart,
  PieChart, IndianRupee, Bitcoin, Coins, Gem, Zap,
  Bot, ArrowUpRight, ArrowDownRight, Lightbulb, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockWeekly = (base: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    price: Math.round(base * (1 + (Math.random() - 0.5) * (i > 7 ? 0.05 : 0.02))),
  }));

const ASSETS = [
  { id: 'gold', label: 'Gold', icon: Gem, color: '#facc15', base: 7245, unit: '₹/g', desc: 'The ultimate safe-haven asset for long-term stability.' },
  { id: 'silver', label: 'Silver', icon: Coins, color: '#94a3b8', base: 89500, unit: '₹/kg', desc: 'Industrial demand and financial hedge combined.' },
  { id: 'nifty', label: 'Nifty 50', icon: TrendingUp, color: '#22c55e', base: 24580, unit: '', desc: 'The pulse of India\'s top 50 blue-chip companies.' },
  { id: 'bitcoin', label: 'Bitcoin', icon: Bitcoin, color: '#f97316', base: 5245000, unit: '', desc: 'Digital gold and a high-risk, high-reward frontier.' },
];

const MARKET_INSIGHTS = [
  {
    title: "Gold vs Uncertainty",
    insight: "Gold prices rising often indicate economic uncertainty. It's the 'insurance' for your portfolio.",
    type: "Safe Haven"
  },
  {
    title: "Nifty Momentum",
    insight: "India's growth story is reflected in the Nifty 50. Consistent SIPs here average out market volatility.",
    type: "Equity"
  },
  {
    title: "Crypto Volatility",
    insight: "Bitcoin's high correlation with tech markets makes it a speculative asset. Keep exposure low (1-5%).",
    type: "Alternative"
  }
];

export default function Market() {
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[2]);
  const [timeframe, setTimeframe] = useState('1M');

  const assetData = useMemo(() => mockWeekly(selectedAsset.base), [selectedAsset, timeframe]);

  return (
    <div className="space-y-10 max-w-[1400px] mx-auto pb-20 px-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            Intel
          </h1>
          <p className="text-primary font-medium mt-3 text-lg">
            Smart financial intelligence & market insights
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
            <Zap className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Market Pulse</p>
            <p className="text-success font-bold flex items-center gap-1 text-sm">Real-time Analysis <ArrowUpRight size={14} /></p>
          </div>
        </div>
      </motion.div>

      {/* Market Snapshot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ASSETS.map((asset, idx) => {
          const mktData = mockMarketData[asset.id as keyof typeof mockMarketData] || { price: asset.base, change: 1.5 };
          const isSelected = selectedAsset.id === asset.id;
          const miniData = mockWeekly(asset.base).slice(-7);

          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedAsset(asset)}
              className={`glass-card rounded-2xl p-6 border-2 transition-all cursor-pointer group hover:scale-[1.02] relative overflow-hidden ${isSelected ? 'border-primary shadow-[0_0_30px_rgba(192,132,252,0.2)]' : 'border-white/5 hover:border-white/10'
                }`}
            >
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-primary'}`}>
                  <asset.icon size={20} />
                </div>
                <div className={`text-sm font-bold flex items-center gap-1 ${mktData.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {mktData.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(mktData.change)}%
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">{asset.label}</p>
                <p className="text-2xl font-display font-black text-foreground mt-1">
                  ₹{mktData.price.toLocaleString()}
                </p>
              </div>

              {/* Mini trend chart */}
              <div className="absolute inset-x-0 bottom-0 h-12 opacity-50 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniData}>
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={asset.color}
                      fill={asset.color}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Interactive Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-8 glass-card rounded-3xl p-8 border border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <selectedAsset.icon size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">{selectedAsset.label} Trend</h3>
                <p className="text-sm text-muted-foreground">{selectedAsset.desc}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '1Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-2 rounded-lg text-xs font-black border transition-all ${timeframe === t ? 'bg-primary text-primary-foreground border-primary' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[350px] w-100%">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={assetData}>
                <defs>
                  <linearGradient id="assetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedAsset.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={selectedAsset.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="day"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `Feb ${val}`}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(1)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a0c',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={selectedAsset.color}
                  fill="url(#assetGrad)"
                  strokeWidth={3}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Insights & Yaksha */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-primary/5">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-3 mb-4">
              <Lightbulb className="text-primary" size={24} /> AI Intel
            </h3>
            <div className="space-y-4">
              {MARKET_INSIGHTS.map((insight, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{insight.type}</p>
                  <h4 className="font-bold text-foreground mb-1 text-sm">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.insight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex items-start gap-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl gold-gradient shrink-0 flex items-center justify-center relative z-10">
              <Bot className="text-primary-foreground" size={20} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Yaksha Intel</p>
              <p className="text-sm font-medium text-foreground leading-tight italic">
                "The market is a device for transferring money from the impatient to the patient."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
