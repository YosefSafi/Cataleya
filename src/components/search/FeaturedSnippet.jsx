import React from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle } from "lucide-react";

export default function FeaturedSnippet({ snippet, aiAnswer }) {
  if (!snippet) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/60 rounded-2xl border border-primary/20 p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary/70">AI Answer</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed font-medium mb-2">{snippet}</p>
      {aiAnswer && aiAnswer !== snippet && (
        <p className="text-xs text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-primary/10">{aiAnswer}</p>
      )}
      <div className="flex items-start gap-1.5 mt-3">
        <AlertCircle className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-muted-foreground">For research purposes only. Not medical advice.</p>
      </div>
    </motion.div>
  );
}