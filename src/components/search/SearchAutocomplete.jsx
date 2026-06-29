import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { getAutocompleteSuggestions } from "@/lib/searchKnowledge";
import { getRecentSearches, getTrendingSearches } from "@/lib/searchStorage";

export default function SearchAutocomplete({ query, onSelect, onClose }) {
  const ref = useRef(null);
  const suggestions = query?.trim() ? getAutocompleteSuggestions(query) : [];
  const recent = getRecentSearches().slice(0, 4);
  const trending = getTrendingSearches().slice(0, 4);

  useEffect(() => {
    const handleClick = (e) => { if (!ref.current?.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const show = suggestions.length > 0 || recent.length > 0 || trending.length > 0;
  if (!show) return null;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border/60 shadow-xl z-50 overflow-hidden">

      {suggestions.length > 0 && (
        <div className="p-2">
          {suggestions.map((s) => {
            const isAlias = s.includes("→");
            return (
              <button key={s} onMouseDown={() => onSelect(s.split(" → ")[0])}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors text-left">
                <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground flex-1">{isAlias ? <><span className="text-primary font-semibold">{s.split(" → ")[0]}</span><span className="text-muted-foreground"> → {s.split(" → ")[1]}</span></> : s}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground opacity-40" />
              </button>
            );
          })}
        </div>
      )}

      {!query && (
        <>
          {recent.length > 0 && (
            <div className="border-t border-border/40 p-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-1">Recent</p>
              {recent.map((s) => (
                <button key={s} onMouseDown={() => onSelect(s)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/60 transition-colors text-left">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground">{s}</span>
                </button>
              ))}
            </div>
          )}
          <div className="border-t border-border/40 p-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-1">Trending</p>
            {trending.map((s) => (
              <button key={s} onMouseDown={() => onSelect(s)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-secondary/60 transition-colors text-left">
                <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{s}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}