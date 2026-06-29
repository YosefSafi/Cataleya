import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronUp, ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";

const NEWS = [
  {
    id: "n1",
    date: "Apr 22, 2026",
    status: "update",
    headline: "FDA Removes BPC-157, TB-500, Semax, Selank & 8 Others from Category 2",
    summary: "12 peptides previously restricted under FDA Category 2 compounding rules were removed, making them eligible for PCAC review. Removal does NOT grant compounding rights — formal rulemaking is still required.",
    detail: "On April 22, 2026, the FDA removed a number of unapproved peptides from Category 2 status under the 503A bulk drug substance framework. Compounds removed include BPC-157, TB-500, MOTS-c, GHK-Cu (injectable), Melanotan II, Semax, Selank, Epitalon, KPV, AOD-9604, DSIP (Emideltide), and PEG-MGF. These compounds are now eligible for individual Pharmacy Compounding Advisory Committee (PCAC) review before potential reclassification to Category 1.",
    badge: "Regulatory",
    badgeColor: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
    iconColor: "text-blue-500",
    source: "FDA PCAC Notice, April 2026",
    sourceUrl: "https://www.fda.gov/media/94155/download",
  },
  {
    id: "n2",
    date: "Apr 15, 2026",
    status: "scheduled",
    headline: "PCAC Meeting Scheduled July 23–24, 2026 — Compounding Reclassification Review",
    summary: "FDA confirmed a Pharmacy Compounding Advisory Committee meeting to evaluate specific peptides for potential Category 1 inclusion. Even with favorable outcomes, formal rulemaking still takes additional time.",
    detail: "HHS Secretary Robert F. Kennedy Jr. confirmed the PCAC meeting scheduled for July 23–24, 2026. The committee will begin evaluating peptides removed from Category 2 for potential placement on the 503A Bulks List (Category 1). Scott Brunner of the Alliance for Pharmacy Compounding described the meeting as 'the initiation of a long regulatory process.' Category 1 status would allow licensed compounding pharmacies to produce these peptides for individual patients with a valid prescription — it is NOT equivalent to FDA drug approval.",
    badge: "Upcoming",
    badgeColor: "bg-amber-100 text-amber-800",
    icon: Clock,
    iconColor: "text-amber-500",
    source: "HHS / SecKennedy Twitter, Apr 15, 2026",
    sourceUrl: "https://x.com/SecKennedy/status/2044478939897221219",
  },
  {
    id: "n3",
    date: "Feb 27, 2026",
    status: "announcement",
    headline: "RFK Jr. Announces Intent to Reclassify Most Category 2 Peptides",
    summary: "HHS Secretary Kennedy announced on the Joe Rogan Experience that most of the 19 Category 2 peptides would be reconsidered for Category 1 status, signaling a shift in the administration's approach to peptide compounding.",
    detail: "In a widely covered appearance, HHS Secretary Kennedy stated that most peptides on the FDA's Category 2 restricted list would be considered for reclassification to Category 1. This announcement preceded the formal April actions. It does not constitute a regulatory change on its own — the FDA still requires a full PCAC review and formal rulemaking process before any compounding pharmacy can legally produce these compounds.",
    badge: "Policy",
    badgeColor: "bg-purple-100 text-purple-800",
    icon: AlertCircle,
    iconColor: "text-purple-500",
    source: "Joe Rogan Experience / HHS, Feb 2026",
    sourceUrl: "https://finance.yahoo.com/sectors/healthcare/articles/formblends-publishes-2026-state-peptides-112500373.html",
  },
  {
    id: "n4",
    date: "Jan 1, 2026",
    status: "active",
    headline: "2026 WADA Prohibited List: BPC-157 & TB-500 Remain Banned for Athletes",
    summary: "FDA reclassification discussions have no bearing on WADA anti-doping rules. BPC-157 remains under S0 (Non-Approved Substances) and TB-500 under Growth Factors — both prohibited at all times in sport.",
    detail: "The 2026 WADA Prohibited List took effect January 1, 2026 with all relevant peptide restrictions maintained. BPC-157 falls under S0 (Non-Approved Substances), which acts as a catch-all for any unapproved drug. TB-500 is classified as a Growth Factor and Growth Factor Modulator under S2. CJC-1295 appears under S2.2.4 as a Growth Hormone Releasing Factor. A Canadian athlete received a four-year ineligibility period in 2025 after non-analytical evidence confirmed BPC-157 and TB-500 use. Athletes, military personnel, and competitive sports participants should note that WADA's prohibited status is entirely independent of FDA compounding regulation.",
    badge: "Anti-Doping",
    badgeColor: "bg-red-100 text-red-800",
    icon: XCircle,
    iconColor: "text-red-500",
    source: "WADA Prohibited List 2026 / BSCG",
    sourceUrl: "https://www.bscg.org/blogs/single/whats-changing-with-peptide-regulation-in-2026",
  },
];

function NewsCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-border/60 rounded-xl bg-white overflow-hidden hover:border-primary/30 transition-colors"
    >
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.iconColor}`} aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground">{item.date}</span>
            </div>
            <h3 className="text-sm font-bold text-foreground leading-snug mb-1">{item.headline}</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{item.summary}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-2.5 border-t border-border/40 bg-secondary/20 hover:bg-secondary/40 transition-colors text-[11px] text-muted-foreground font-semibold"
      >
        {open ? "Hide details" : "Read full update"}
        {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 border-t border-border/40 bg-white space-y-3">
              <p className="text-[11px] text-foreground/80 leading-relaxed">{item.detail}</p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary/70 hover:text-primary hover:underline underline-offset-2"
              >
                <ExternalLink className="w-3 h-3" />
                {item.source}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RegulatoryNews() {
  return (
    <section aria-labelledby="reg-news-heading">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2 id="reg-news-heading" className="text-sm font-bold uppercase tracking-widest text-foreground">
            Regulatory & Industry News — 2026
          </h2>
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Updated Jun 2026
        </span>
      </div>
      <div className="space-y-3">
        {NEWS.map((item, i) => (
          <NewsCard key={item.id} item={item} index={i} />
        ))}
      </div>
      <p className="mt-4 text-[10px] text-muted-foreground text-center leading-relaxed">
        ⚠️ Regulatory information is provided for educational awareness only and does not constitute legal or medical advice. Always consult qualified legal and healthcare professionals.
      </p>
    </section>
  );
}