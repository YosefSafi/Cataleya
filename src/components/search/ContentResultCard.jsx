import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, FileText, HelpCircle, Layers, Calculator, ArrowRight } from "lucide-react";

const TYPE_CONFIG = {
  page:    { icon: BookOpen,    color: "text-blue-600",   bg: "bg-blue-50",   label: "Guide" },
  article: { icon: FileText,    color: "text-emerald-600", bg: "bg-emerald-50", label: "Article" },
  faq:     { icon: HelpCircle,  color: "text-amber-600",  bg: "bg-amber-50",  label: "FAQ" },
  stack:   { icon: Layers,      color: "text-purple-600", bg: "bg-purple-50", label: "Stack" },
  calculator: { icon: Calculator, color: "text-primary",  bg: "bg-primary/5", label: "Tool" },
};

export default function ContentResultCard({ item, index = 0 }) {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.article;
  const Icon = cfg.icon;

  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
      <Link to={item.url}
        className="group flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-white hover:border-primary/30 hover:bg-primary/5 transition-all">
        <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
              <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 leading-snug">{item.title}</h3>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}