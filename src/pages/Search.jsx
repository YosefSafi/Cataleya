import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, X, Clock, TrendingUp, Sparkles, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchResults from "@/components/search/SearchResults";
import SearchFilters from "@/components/search/SearchFilters";
import SearchAutocomplete from "@/components/search/SearchAutocomplete";
import { useSearchEngine } from "@/hooks/useSearchEngine";
import { getRecentSearches, addRecentSearch, getTrendingSearches } from "@/lib/searchStorage";

export default function SearchPage() {
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  });
  const [inputValue, setInputValue] = useState(query);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filters, setFilters] = useState({ category: "all", purpose: "all", family: "all", admin: "all" });
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { results, featuredSnippet, relatedSearches, isLoading, aiAnswer, researchStudies } = useSearchEngine(query, filters);
  const recentSearches = getRecentSearches();
  const trending = getTrendingSearches();

  // Debounced query update
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(inputValue);
      if (inputValue) {
        navigate(`/search?q=${encodeURIComponent(inputValue)}`, { replace: true });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [inputValue]);

  const handleSubmit = (val) => {
    const v = (val || inputValue).trim();
    if (!v) return;
    addRecentSearch(v);
    setQuery(v);
    setInputValue(v);
    setShowAutocomplete(false);
    navigate(`/search?q=${encodeURIComponent(v)}`, { replace: true });
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice search is not supported in this browser.");
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInputValue(text);
      handleSubmit(text);
    };
    rec.start();
  };

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
    navigate("/search", { replace: true });
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top search bar hero */}
      <div className="bg-gradient-to-b from-secondary/50 to-white border-b border-border/40 pt-12 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary/70">AI-Powered</span>
          </div>
          <h1 className="font-display text-3xl font-light text-foreground mb-6">
            Cattleya <span className="text-primary italic">Search</span>
          </h1>

          {/* Main search input */}
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground z-10 pointer-events-none" />
              <Input
                ref={inputRef}
                autoFocus
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setShowAutocomplete(true); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); if (e.key === "Escape") setShowAutocomplete(false); }}
                onFocus={() => setShowAutocomplete(true)}
                placeholder='Try "BPC-157 for tendon recovery" or "best peptide for sleep"…'
                className="h-14 pl-12 pr-24 text-base rounded-2xl border-border/60 focus:border-primary/60 shadow-sm"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {inputValue && (
                  <button onClick={clearSearch} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button onClick={handleVoice}
                  className={`p-2 rounded-xl transition-colors ${isListening ? "text-primary bg-primary/10 animate-pulse" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                  title="Voice search">
                  <Mic className="w-4 h-4" />
                </button>
                <Button onClick={() => handleSubmit()} size="sm"
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl h-9 px-4 text-xs font-semibold">
                  Search
                </Button>
              </div>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showAutocomplete && (
                <SearchAutocomplete
                  query={inputValue}
                  onSelect={(v) => { handleSubmit(v); setShowAutocomplete(false); }}
                  onClose={() => setShowAutocomplete(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* No query: show recent + trending */}
          {!query && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 6).map((s) => (
                      <button key={s} onClick={() => handleSubmit(s)}
                        className="text-xs px-3 py-1.5 bg-secondary/60 rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-all border border-border/40">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Trending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trending.map((s, i) => (
                    <button key={s} onClick={() => handleSubmit(s)}
                      className="text-xs px-3 py-1.5 bg-secondary/60 rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-all border border-border/40 flex items-center gap-1.5">
                      <span className="text-[9px] font-bold text-primary/50">#{i + 1}</span>{s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results area */}
      {query && (
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8">
          {/* Filters toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching…</span>
              ) : (
                <span>Results for <strong className="text-foreground">"{query}"</strong></span>
              )}
            </p>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}
              className="text-xs gap-2 h-8 border-border/60">
              <Filter className="w-3.5 h-3.5" />
              Filters
              {Object.values(filters).some(v => v !== "all") && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                <SearchFilters filters={filters} onChange={setFilters} />
              </motion.div>
            )}
          </AnimatePresence>

          <SearchResults
            query={query}
            results={results}
            featuredSnippet={featuredSnippet}
            relatedSearches={relatedSearches}
            aiAnswer={aiAnswer}
            researchStudies={researchStudies}
            isLoading={isLoading}
            onRelatedClick={(s) => { handleSubmit(s); setInputValue(s); }}
          />
        </div>
      )}
    </div>
  );
}