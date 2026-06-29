import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ExternalLink, FlaskRound, ChevronDown, ChevronUp, Microscope, Users, TestTube } from "lucide-react";

const STUDY_TYPE_CONFIG = {
  "Animal Model":    { color: "bg-amber-50 border-amber-200 text-amber-800",   icon: FlaskRound },
  "Human RCT":       { color: "bg-green-50 border-green-200 text-green-800",   icon: Users },
  "Human Clinical":  { color: "bg-blue-50 border-blue-200 text-blue-800",      icon: Users },
  "In Vitro":        { color: "bg-purple-50 border-purple-200 text-purple-800",icon: TestTube },
  "Review":          { color: "bg-slate-50 border-slate-200 text-slate-700",   icon: BookOpen },
  "Case Report":     { color: "bg-rose-50 border-rose-200 text-rose-800",      icon: Microscope },
  "Phase Trial":     { color: "bg-teal-50 border-teal-200 text-teal-800",      icon: Users },
};

function StudyCard({ study, index }) {
  const [expanded, setExpanded] = useState(false);
  const config = STUDY_TYPE_CONFIG[study.study_type] || STUDY_TYPE_CONFIG["Review"];
  const Icon = config.icon;

  const pubmedLink = study.pubmed_url ||
    (study.doi ? `https://doi.org/${study.doi}` : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-border/60 rounded-xl bg-white overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${config.color}`}>
              <Icon className="w-2.5 h-2.5" />
              {study.study_type}
            </span>
            {study.year && (
              <span className="text-[10px] text-muted-foreground font-semibold flex-shrink-0 mt-0.5">{study.year}</span>
            )}
          </div>
          {pubmedLink && (
            <a href={pubmedLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline flex-shrink-0"
              onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="w-3 h-3" />
              View Source
            </a>
          )}
        </div>

        <h3 className="text-xs font-bold text-foreground leading-snug mb-1.5">
          {study.title}
        </h3>

        {study.authors && (
          <p className="text-[10px] text-muted-foreground mb-1">
            {study.authors}{study.journal ? ` — ${study.journal}` : ""}
          </p>
        )}

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {study.summary}
        </p>

        {study.findings && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] font-semibold text-primary mt-2 hover:underline"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expanded ? "Hide findings" : "Show key findings"}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-primary/5 border border-primary/15 rounded-lg"
                >
                  <p className="text-[11px] text-foreground leading-relaxed font-medium">Key Findings:</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{study.findings}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {study.peptides?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {study.peptides.map((p) => (
              <span key={p} className="text-[9px] font-bold uppercase bg-secondary px-2 py-0.5 rounded text-foreground/70">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ResearchStudiesPanel({ studies, query }) {
  const [showAll, setShowAll] = useState(false);
  if (!studies || studies.length === 0) return null;

  const visible = showAll ? studies : studies.slice(0, 4);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Microscope className="w-3.5 h-3.5" />
          Published Research & Studies
          <span className="font-normal text-[10px] bg-secondary px-2 py-0.5 rounded-full">{studies.length}</span>
        </h2>
        <p className="text-[10px] text-muted-foreground">For research purposes only</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visible.map((study, i) => (
          <StudyCard key={i} study={study} index={i} />
        ))}
      </div>

      {studies.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2.5 text-xs font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all"
        >
          {showAll ? "Show fewer studies" : `Show all ${studies.length} studies`}
        </button>
      )}

      <p className="text-[10px] text-muted-foreground text-center">
        Studies sourced from published peer-reviewed literature. Verify citations independently. Not medical advice.
      </p>
    </motion.div>
  );
}