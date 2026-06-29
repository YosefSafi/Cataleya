import React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { GOALS } from "./peptideData";

const HALF_LIFE_OPTIONS = [
  { id: "all",   label: "Any Half-Life" },
  { id: "short", label: "Short (hours)" },
  { id: "long",  label: "Long (days+)" },
];

const PRICE_OPTIONS = [
  { id: "all",    label: "Any Price" },
  { id: "under50", label: "Under $50" },
  { id: "50to80",  label: "$50–$80" },
  { id: "over80",  label: "Over $80" },
];

export default function CompoundFilters({ activeGoal, setActiveGoal, halfLifeFilter, setHalfLifeFilter, priceFilter, setPriceFilter }) {
  const hasActiveFilters = activeGoal !== "all" || halfLifeFilter !== "all" || priceFilter !== "all";

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => { setActiveGoal("all"); setHalfLifeFilter("all"); setPriceFilter("all"); }}
            className="text-[10px] font-semibold text-primary/70 hover:text-primary flex items-center gap-0.5 transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-3 h-3" aria-hidden="true" /> Clear all
          </button>
        )}
      </div>

      {/* Research goal pills */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Research Goal</p>
        <nav aria-label="Research goal filter" className="flex flex-wrap gap-1.5">
          {GOALS.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setActiveGoal(goal.id)}
              aria-pressed={activeGoal === goal.id}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 border ${
                activeGoal === goal.id
                  ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                  : "bg-white text-primary/70 border-primary/25 hover:border-primary hover:text-primary"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Secondary filters row */}
      <div className="flex flex-wrap gap-4">
        {/* Half-life filter */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Half-Life</p>
          <div className="flex gap-1.5" role="group" aria-label="Half-life filter">
            {HALF_LIFE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setHalfLifeFilter(opt.id)}
                aria-pressed={halfLifeFilter === opt.id}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                  halfLifeFilter === opt.id
                    ? "bg-foreground text-white border-foreground"
                    : "bg-white text-muted-foreground border-border/60 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price filter */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Price Range</p>
          <div className="flex gap-1.5" role="group" aria-label="Price filter">
            {PRICE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPriceFilter(opt.id)}
                aria-pressed={priceFilter === opt.id}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                  priceFilter === opt.id
                    ? "bg-foreground text-white border-foreground"
                    : "bg-white text-muted-foreground border-border/60 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}