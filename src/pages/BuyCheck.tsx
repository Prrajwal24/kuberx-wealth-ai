import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, AlertTriangle, CheckCircle, Clock,
  Smartphone, Gamepad2, Car, Palmtree, Shirt,
  BookOpen, Home, PiggyBank, Plus, Info
} from "lucide-react";
import { mockUser, evaluatePurchase, purchaseCategories, PurchaseItem } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function BuyCheck() {
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [customItemName, setCustomItemName] = useState<string>("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<ReturnType<typeof evaluatePurchase> | null>(null);
  const [isCustom, setIsCustom] = useState(false);

  const allItems = useMemo(() => {
    return purchaseCategories.flatMap(cat => cat.items);
  }, []);

  const selectedMetadata = useMemo(() => {
    if (isCustom) return undefined;
    return allItems.find(item => item.name === selectedItemName);
  }, [selectedItemName, allItems, isCustom]);

  const handleItemChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setSelectedItemName("");
      setPrice("");
    } else {
      setIsCustom(false);
      setSelectedItemName(value);
      const item = allItems.find(i => i.name === value);
      if (item) {
        setPrice(item.avgPrice.toString());
      }
    }
    setResult(null);
  };

  const handleQuickPick = (name: string, priceVal: number) => {
    const item = allItems.find(i => i.name.includes(name));
    if (item) {
      setIsCustom(false);
      setSelectedItemName(item.name);
      setPrice(priceVal.toString());
      setResult(evaluatePurchase(priceVal, mockUser, item));
    } else {
      setIsCustom(true);
      setCustomItemName(name);
      setPrice(priceVal.toString());
      setResult(evaluatePurchase(priceVal, mockUser));
    }
  };

  const handleCheck = () => {
    const finalPrice = Number(price);
    if (!finalPrice) return;
    setResult(evaluatePurchase(finalPrice, mockUser, selectedMetadata));
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict.includes('Approved')) return <CheckCircle className="text-success" size={32} />;
    if (verdict.includes('Delay')) return <Clock className="text-warning" size={32} />;
    return <AlertTriangle className="text-destructive" size={32} />;
  };

  const getCategoryIcon = (category: string) => {
    const cat = purchaseCategories.find(c => c.category === category || c.items.some(i => i.category === category));
    if (!cat) return <ShoppingBag size={18} />;
    switch (cat.icon) {
      case 'Smartphone': return <Smartphone size={18} />;
      case 'Gamepad2': return <Gamepad2 size={18} />;
      case 'Car': return <Car size={18} />;
      case 'Palmtree': return <Palmtree size={18} />;
      case 'Shirt': return <Shirt size={18} />;
      case 'BookOpen': return <BookOpen size={18} />;
      case 'Home': return <Home size={18} />;
      case 'PiggyBank': return <PiggyBank size={18} />;
      default: return <ShoppingBag size={18} />;
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <ShoppingBag className="text-primary h-10 w-10" /> Should I Buy This?
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Kuber's real-time financial regret prevention engine</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Picks</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full bg-secondary/50 border-primary/20 hover:bg-primary/10" onClick={() => handleQuickPick("iPhone", 80000)}>
              <Smartphone className="w-4 h-4 mr-1.5 text-primary" /> Buy iPhone
            </Button>
            <Button size="sm" variant="outline" className="rounded-full bg-secondary/50 border-primary/20 hover:bg-primary/10" onClick={() => handleQuickPick("Trip", 150000)}>
              <Palmtree className="w-4 h-4 mr-1.5 text-primary" /> Int. Trip
            </Button>
            <Button size="sm" variant="outline" className="rounded-full bg-secondary/50 border-primary/20 hover:bg-primary/10" onClick={() => handleQuickPick("Console", 50000)}>
              <Gamepad2 className="w-4 h-4 mr-1.5 text-primary" /> PS5/Xbox
            </Button>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8 border border-border/50 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <ShoppingBag size={120} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                What are you eyeing?
              </label>
              <Select onValueChange={handleItemChange} value={isCustom ? "custom" : selectedItemName}>
                <SelectTrigger className="h-14 bg-secondary/50 border-border text-foreground rounded-xl focus:ring-primary/20">
                  <SelectValue placeholder="Select an item..." />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  {purchaseCategories.map((cat) => (
                    <SelectGroup key={cat.category}>
                      <SelectLabel className="flex items-center gap-2 text-primary font-bold px-2 py-2">
                        {getCategoryIcon(cat.category)} {cat.category}
                      </SelectLabel>
                      {cat.items.map((item) => (
                        <SelectItem key={item.name} value={item.name} className="py-2.5">
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                  <SelectSeparator />
                  <SelectItem value="custom" className="font-semibold text-primary">
                    <div className="flex items-center gap-2">
                      <Plus size={16} /> Something else...
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isCustom && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Custom Entry</label>
                <Input
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  placeholder="What's this item called?"
                  className="h-14 bg-secondary/50 border-border text-foreground rounded-xl"
                />
              </motion.div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Price (₹)</label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="How much does it cost?"
                type="number"
                className="h-14 bg-secondary/50 border-border text-foreground rounded-xl text-xl font-bold"
              />
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Info size={18} />
                <span>Purchase Insight</span>
              </div>
              {selectedMetadata ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 p-3 rounded-lg border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Category</p>
                      <p className="text-sm font-semibold truncate">{selectedMetadata.category}</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Impact</p>
                      <Badge variant="outline" className={`mt-1 border-none p-0 text-sm font-bold ${selectedMetadata.financialImpact === 'High' ? 'text-destructive' :
                        selectedMetadata.financialImpact === 'Medium' || selectedMetadata.financialImpact === 'Medium-High' ? 'text-warning' : 'text-success'
                        }`}>
                        {selectedMetadata.financialImpact}
                      </Badge>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Type</p>
                      <p className="text-sm font-semibold capitalize">{selectedMetadata.type}</p>
                    </div>
                    <div className="bg-background/50 p-3 rounded-lg border border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Depreciation</p>
                      <p className="text-sm font-semibold">{selectedMetadata.depreciation}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Select a predefined item to see its financial characteristics, or enter price manually for custom analysis.
                </p>
              )}
            </div>

            <Button onClick={handleCheck} disabled={!price} className="w-full gold-gradient text-primary-foreground font-bold text-lg py-7 rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]">
              Evaluate with AI
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 20 }}>
            <Card className={`overflow-hidden border-2 p-0 rounded-3xl bg-secondary/30 backdrop-blur-xl ${result.verdict.includes('Approved') ? 'border-success/40' :
              result.verdict.includes('Delay') ? 'border-warning/40' : 'border-destructive/40'
              }`}>
              <div className={`p-8 ${result.verdict.includes('Approved') ? 'bg-success/5' :
                result.verdict.includes('Delay') ? 'bg-warning/5' : 'bg-destructive/5'
                }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl ${result.verdict.includes('Approved') ? 'bg-success/15' :
                      result.verdict.includes('Delay') ? 'bg-warning/15' : 'bg-destructive/15'
                      }`}>
                      {getVerdictIcon(result.verdict)}
                    </div>
                    <div>
                      <h2 className="font-display text-3xl font-bold text-foreground">{result.verdict.split(' ')[0]}</h2>
                      <p className="text-muted-foreground mt-1 flex items-center gap-2">
                        {isCustom ? customItemName : selectedItemName} <span className="text-primary font-bold">₹{Number(price).toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border min-w-[100px]">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Risk Level</p>
                      <p className={`text-lg font-bold ${result.regretProbability > 50 ? 'text-destructive' : 'text-success'}`}>
                        {result.regretProbability > 65 ? 'High' : result.regretProbability > 40 ? 'Medium' : 'Low'}
                      </p>
                    </div>
                    <div className="text-center px-4 py-2 bg-background/50 rounded-xl border border-border min-w-[100px]">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Impact</p>
                      <p className={`text-lg font-bold ${result.impactLevel === 'High' ? 'text-destructive' : 'text-success'}`}>
                        {result.impactLevel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-semibold text-foreground uppercase tracking-wider">Regret Probability</p>
                      <span className={`text-2xl font-display font-bold ${result.regretProbability > 60 ? 'text-destructive' : result.regretProbability > 40 ? 'text-warning' : 'text-success'}`}>
                        {result.regretProbability}%
                      </span>
                    </div>
                    <div className="h-4 bg-secondary rounded-full overflow-hidden p-1 border border-border/50">
                      <motion.div
                        className={`h-full rounded-full ${result.regretProbability > 60 ? 'bg-destructive' : result.regretProbability > 40 ? 'bg-warning' : 'bg-success'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.regretProbability}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">This score is based on your current savings (₹{mockUser.currentSavings.toLocaleString()}) and EMI burden.</p>
                  </div>

                  <div className="bg-secondary/40 rounded-2xl p-6 border border-border relative">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <Info size={20} />
                    </div>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-3">AI Explanation</p>
                    <p className="text-sm text-foreground leading-relaxed font-medium italic">
                      "{result.reasoning}"
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
