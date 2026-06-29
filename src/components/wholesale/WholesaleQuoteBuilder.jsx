import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PEPTIDES = [
  { id: "bpc157",     name: "BPC-157",     doses: ["2mg", "5mg", "10mg"], retailPrice: { "2mg": 24.99, "5mg": 49.99, "10mg": 94.99 } },
  { id: "tb500",      name: "TB-500",      doses: ["2mg", "5mg", "10mg"], retailPrice: { "2mg": 22.99, "5mg": 44.99, "10mg": 84.99 } },
  { id: "semaglutide",name: "Semaglutide", doses: ["2mg", "5mg", "10mg"], retailPrice: { "2mg": 44.99, "5mg": 89.99, "10mg": 169.99 } },
  { id: "tirzepatide",name: "Tirzepatide", doses: ["2mg", "5mg", "10mg"], retailPrice: { "2mg": 49.99, "5mg": 99.99, "10mg": 189.99 } },
  { id: "pt141",      name: "PT-141",      doses: ["5mg", "10mg"],        retailPrice: { "5mg": 29.99, "10mg": 54.99 } },
  { id: "cjc1295",    name: "CJC-1295",    doses: ["2mg", "5mg"],         retailPrice: { "2mg": 29.99, "5mg": 59.99 } },
  { id: "ipamorelin", name: "Ipamorelin",  doses: ["2mg", "5mg"],         retailPrice: { "2mg": 19.99, "5mg": 39.99 } },
  { id: "igf1lr3",    name: "IGF-1 LR3",   doses: ["0.5mg", "1mg"],       retailPrice: { "0.5mg": 44.99, "1mg": 79.99 } },
  { id: "ghrp6",      name: "GHRP-6",      doses: ["2mg", "5mg"],         retailPrice: { "2mg": 17.99, "5mg": 34.99 } },
  { id: "selank",     name: "Selank",      doses: ["2mg", "5mg"],         retailPrice: { "2mg": 24.99, "5mg": 49.99 } },
  { id: "sermorelin", name: "Sermorelin",  doses: ["2mg", "5mg"],         retailPrice: { "2mg": 27.99, "5mg": 54.99 } },
];

const DISCOUNT_TIERS = [
  { min: 0,    max: 499,   pct: 10, label: "10% off" },
  { min: 500,  max: 1999,  pct: 15, label: "15% off" },
  { min: 2000, max: 4999,  pct: 20, label: "20% off" },
  { min: 5000, max: 9999,  pct: 25, label: "25% off" },
  { min: 10000, max: Infinity, pct: 30, label: "30% off — contact for custom" },
];

function getDiscount(subtotal) {
  return DISCOUNT_TIERS.find(t => subtotal >= t.min && subtotal <= t.max) || DISCOUNT_TIERS[0];
}

export default function WholesaleQuoteBuilder() {
  const [items, setItems] = useState([{ peptideId: "bpc157", dose: "5mg", qty: 10 }]);
  const [showQuote, setShowQuote] = useState(false);

  const addItem = () => setItems([...items, { peptideId: "bpc157", dose: "5mg", qty: 10 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, field, value) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    if (field === "peptideId") {
      const p = PEPTIDES.find(p => p.id === value);
      updated[i].dose = p?.doses[0] || "5mg";
    }
    setItems(updated);
  };

  const lineTotal = (item) => {
    const p = PEPTIDES.find(p => p.id === item.peptideId);
    const unitPrice = p?.retailPrice[item.dose] || 0;
    return unitPrice * item.qty;
  };
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
  const discount = getDiscount(subtotal);
  const savings = subtotal * (discount.pct / 100);
  const total = subtotal - savings;

  return (
    <section id="quote" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">Instant Quote</span>
          <h2 className="font-display text-3xl font-light text-foreground mb-3">
            Bulk Quote <span className="text-primary italic">Builder</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Select your peptides, vial sizes, and quantities — get a live wholesale price instantly.
          </p>
        </motion.div>

        <div className="bg-white border border-border/60 rounded-2xl overflow-hidden shadow-sm">
          {/* Discount bar */}
          <div className="bg-primary/6 border-b border-primary/20 px-6 py-3">
            <div className="flex flex-wrap gap-3 justify-center">
              {DISCOUNT_TIERS.map((t) => (
                <span key={t.pct} className={`text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${subtotal >= t.min && subtotal <= t.max ? "bg-primary text-white" : "bg-white text-muted-foreground border border-border/60"}`}>
                  ${t.min === 0 ? "0" : t.min.toLocaleString()}+ → {t.label}
                </span>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="p-6 space-y-3">
            {/* Header */}
            <div className="grid grid-cols-12 gap-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              <div className="col-span-5">Peptide</div>
              <div className="col-span-2">Vial Size</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2 text-right">Subtotal</div>
              <div className="col-span-1" />
            </div>

            <AnimatePresence>
              {items.map((item, i) => {
                const p = PEPTIDES.find(p => p.id === item.peptideId);
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5">
                      <select value={item.peptideId} onChange={e => updateItem(i, "peptideId", e.target.value)}
                        className="w-full h-9 rounded-lg border border-input bg-transparent px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                        {PEPTIDES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <select value={item.dose} onChange={e => updateItem(i, "dose", e.target.value)}
                        className="w-full h-9 rounded-lg border border-input bg-transparent px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                        {p?.doses.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Input type="number" min={1} value={item.qty}
                        onChange={e => updateItem(i, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                        className="h-9 text-xs" />
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-sm font-semibold text-foreground">${lineTotal(item).toFixed(2)}</span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button onClick={() => removeItem(i)} disabled={items.length === 1}
                        className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button onClick={addItem}
              className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors mt-2">
              <Plus className="w-3.5 h-3.5" /> Add another peptide
            </button>
          </div>

          {/* Totals */}
          <div className="border-t border-border/60 bg-secondary/30 px-6 py-5">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Retail subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-green-700">
                <span>Wholesale discount ({discount.pct}%)</span>
                <span>−${savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground border-t border-border/60 pt-2 mt-2">
                <span>Estimated Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5 justify-end">
              <Button variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/5" onClick={() => setShowQuote(true)}>
                <Calculator className="w-3.5 h-3.5 mr-1.5" /> Generate Quote
              </Button>
              <a href="#apply">
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs">
                  Apply for This Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showQuote && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-6 bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-foreground">Quote Summary</p>
                <p className="text-[11px] text-muted-foreground">Valid for 7 days</p>
              </div>
              <div className="space-y-1.5 mb-4">
                {items.map((item, i) => {
                  const p = PEPTIDES.find(p => p.id === item.peptideId);
                  const unit = (p?.retailPrice[item.dose] || 0) * (1 - discount.pct / 100);
                  return (
                    <div key={i} className="flex justify-between text-xs text-foreground">
                      <span>{p?.name} {item.dose} × {item.qty}</span>
                      <span>${(unit * item.qty).toFixed(2)} <span className="text-muted-foreground">(${unit.toFixed(2)}/vial)</span></span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-primary/20 pt-3 flex justify-between text-sm font-bold text-primary">
                <span>Total ({discount.pct}% wholesale discount applied)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Prices are estimates. Final pricing confirmed upon account approval. Contact <strong>wholesale@cattleyalabs.com</strong> to proceed.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}