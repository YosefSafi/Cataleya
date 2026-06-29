import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIERS = [
  {
    icon: Zap,
    name: "Wholesale",
    level: "Entry Level",
    volume: "Any qualifying order",
    color: "border-border/80",
    badgeColor: "bg-secondary text-secondary-foreground",
    benefits: [
      "10–20% off retail pricing",
      "Priority order processing",
      "Batch COA included",
      "Net-30 payment terms",
      "Dedicated email support",
      "Bulk vial quantities",
    ],
    cta: "Apply Now",
  },
  {
    icon: Star,
    name: "Preferred Partner",
    level: "Mid Volume",
    volume: "$10k+ annual",
    color: "border-primary/60 shadow-lg shadow-primary/10",
    badgeColor: "bg-primary text-white",
    highlight: true,
    benefits: [
      "20–30% off retail pricing",
      "Dedicated account manager",
      "Custom batch scheduling",
      "Net-45 payment terms",
      "Priority phone & email support",
      "Early access to new compounds",
      "Co-branding opportunities",
    ],
    cta: "Apply for Preferred",
  },
  {
    icon: Crown,
    name: "Enterprise",
    level: "High Volume",
    volume: "$50k+ annual",
    color: "border-border/80",
    badgeColor: "bg-foreground text-white",
    benefits: [
      "Custom / negotiated pricing",
      "Dedicated senior account exec",
      "White-label options included",
      "Custom lead times & SLAs",
      "API inventory access",
      "Volume-locked pricing contracts",
      "On-site quality audits available",
      "Custom documentation packages",
    ],
    cta: "Contact Enterprise Team",
  },
];

export default function WholesaleTiers() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">Account Tiers</span>
          <h2 className="font-display text-3xl font-light text-foreground mb-3">
            Wholesale <span className="text-primary italic">Pricing Tiers</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Scale your benefits as your volume grows. All tiers include full documentation and third-party COAs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(({ icon: Icon, name, level, volume, color, badgeColor, highlight, benefits, cta }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 ${color} p-6 flex flex-col`}>
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? "bg-primary/15" : "bg-secondary"}`}>
                  <Icon className={`w-5 h-5 ${highlight ? "text-primary" : "text-foreground/70"}`} />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{level}</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mb-5 pb-5 border-b border-border/60">
                Volume: <strong className="text-foreground">{volume}</strong>
              </p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#apply">
                <Button className={`w-full text-sm font-semibold ${highlight ? "bg-primary hover:bg-primary/90 text-white" : "bg-secondary text-foreground hover:bg-secondary/80"}`}>
                  {cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}