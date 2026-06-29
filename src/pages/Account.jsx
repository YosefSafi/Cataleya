import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Star, Gift, TrendingUp, Award, Clock, ChevronRight, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIER_CONFIG = {
  "Researcher": { min: 0, max: 500, color: "bg-blue-100 text-blue-700 border-blue-200", barColor: "bg-blue-500", next: "Senior Researcher" },
  "Senior Researcher": { min: 500, max: 1500, color: "bg-purple-100 text-purple-700 border-purple-200", barColor: "bg-purple-500", next: "Principal Investigator" },
  "Principal Investigator": { min: 1500, max: 1500, color: "bg-amber-100 text-amber-700 border-amber-200", barColor: "bg-amber-500", next: null },
};

const REDEMPTION_OPTIONS = [
  { points: 100, discount: "$5 off", code: "REDEEM5" },
  { points: 250, discount: "$15 off", code: "REDEEM15" },
  { points: 500, discount: "$35 off", code: "REDEEM35" },
  { points: 1000, discount: "$80 off", code: "REDEEM80" },
];

export default function Account() {
  const [user, setUser] = useState(null);
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const load = async () => {
      const me = await base44.auth.me();
      setUser(me);
      const accounts = await base44.entities.LoyaltyAccount.filter({ user_id: me.id });
      if (accounts.length > 0) {
        setLoyalty(accounts[0]);
      } else {
        // Create a starter account with sample history
        const created = await base44.entities.LoyaltyAccount.create({
          user_id: me.id,
          points: 150,
          lifetime_points: 150,
          tier: "Researcher",
          transactions: [
            { date: new Date().toISOString().split("T")[0], description: "Welcome bonus", points: 50, type: "earned" },
            { date: new Date().toISOString().split("T")[0], description: "First order — BPC-157 5mg", points: 100, type: "earned" },
          ]
        });
        setLoyalty(created);
      }
      setLoading(false);
    };
    load();
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const tier = loyalty?.tier || "Researcher";
  const tierCfg = TIER_CONFIG[tier];
  const points = loyalty?.points || 0;
  const lifetime = loyalty?.lifetime_points || 0;
  const progressPct = tierCfg.next
    ? Math.min(100, ((points - tierCfg.min) / (tierCfg.max - tierCfg.min)) * 100)
    : 100;
  const transactions = loyalty?.transactions || [];

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12 min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-1">Researcher Account</p>
        <h1 className="font-display text-3xl font-light text-foreground">
          Welcome, <span className="text-primary italic">{user?.full_name?.split(" ")[0] || "Researcher"}</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
      </motion.div>

      {/* Points hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary/70">Loyalty Points</span>
            </div>
            <p className="text-5xl font-bold text-primary">{points.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{lifetime.toLocaleString()} lifetime points earned</p>
          </div>
          <span className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full border ${tierCfg.color}`}>
            {tier}
          </span>
        </div>

        {/* Tier progress */}
        {tierCfg.next && (
          <div>
            <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
              <span>{tier}</span>
              <span>{tierCfg.next} at {tierCfg.max} pts</span>
            </div>
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${tierCfg.barColor}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">
              {tierCfg.max - points} more points to reach {tierCfg.next}
            </p>
          </div>
        )}
        {!tierCfg.next && (
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">Maximum tier achieved — enjoy exclusive benefits!</span>
          </div>
        )}
      </motion.div>

      {/* How to earn */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border/60 bg-white p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">How to Earn Points</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Every Order", value: "10 pts per $1 spent" },
            { label: "First Order", value: "+100 bonus pts" },
            { label: "Refer a Friend", value: "+200 pts each" },
          ].map((item) => (
            <div key={item.label} className="bg-secondary/40 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-foreground">{item.label}</p>
              <p className="text-[11px] text-primary font-semibold mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Redeem */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-2xl border border-border/60 bg-white p-5 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Redeem Points</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {REDEMPTION_OPTIONS.map((opt) => {
            const canRedeem = points >= opt.points;
            return (
              <div key={opt.code}
                className={`rounded-xl border p-4 flex items-center justify-between transition-all ${
                  canRedeem ? "border-primary/30 bg-primary/5" : "border-border/40 bg-secondary/20 opacity-60"
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-foreground">{opt.discount}</p>
                  <p className="text-[11px] text-muted-foreground">{opt.points} points</p>
                </div>
                {canRedeem ? (
                  <button
                    onClick={() => copyCode(opt.code)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copiedCode === opt.code ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedCode === opt.code ? "Copied!" : opt.code}
                  </button>
                ) : (
                  <span className="text-[11px] text-muted-foreground">Need {opt.points - points} more pts</span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border/60 bg-white p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Points History</h2>
        </div>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No transactions yet. Place your first order to start earning!</p>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-[11px] text-muted-foreground">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold ${tx.type === "earned" ? "text-green-600" : "text-red-500"}`}>
                  {tx.type === "earned" ? "+" : "−"}{Math.abs(tx.points)} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}