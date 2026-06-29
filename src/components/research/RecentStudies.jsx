import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, Calendar, FlaskRound } from "lucide-react";

const STUDIES = [
  {
    id: "s1",
    title: "Tirzepatide Achieves 20.2% Weight Loss vs. 13.7% for Semaglutide at 72 Weeks",
    compound: "Tirzepatide",
    category: "Metabolic",
    date: "2026-Q1",
    objective: "Head-to-head comparison of dual GIP/GLP-1 agonism versus GLP-1 monotherapy for weight reduction in adults with obesity",
    sampleSize: "Systematic review and ICER analysis; pooled data from SURPASS and STEP trial programs",
    findings: "At 72 weeks, tirzepatide (Zepbound) produced 20.2% mean body weight reduction versus 13.7% for semaglutide (Wegovy). Tirzepatide demonstrated superior lean mass preservation and greater HbA1c reduction. Dual GIP/GLP-1 receptor co-agonism is now considered the more potent metabolic pathway.",
    limitations: "Cross-trial comparison; different populations; industry-funded trials; pharmaceutical doses only; GI tolerability may limit adherence.",
    citation: "ICER Obesity Evidence Report, 2025; published Q1 2026",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: "s2",
    title: "Therapeutic Peptides in Gerontology: Mechanisms and Aging Applications",
    compound: "Multiple",
    category: "Longevity",
    date: "2026-Q2",
    objective: "Systematic review of peptide therapeutics targeting hallmarks of aging including metabolic dysfunction, inflammation, and cellular senescence",
    sampleSize: "Review article; 180+ preclinical and clinical studies analyzed",
    findings: "Growth hormone secretagogues, GLP-1 analogues, and recovery peptides collectively show promise for addressing metabolic dysfunction, sarcopenia, and neuroinflammation in aging models. GH secretagogues demonstrated satellite cell activation, myofibrillar protein synthesis promotion, and atrophy mitigation during immobilization. Peptide therapeutics represent an emerging frontier in gerontological medicine.",
    limitations: "Most evidence preclinical; human aging trials rarely exceed 12 weeks; heterogeneous outcome measures across studies.",
    citation: "Frontiers in Aging, 2026;7:1790247",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "s3",
    title: "BPC-157 & TB-500 Removed from FDA Category 2 — PCAC Review Scheduled July 2026",
    compound: "BPC-157 / TB-500",
    category: "Regulatory",
    date: "2026-Q2",
    objective: "FDA regulatory update on compounding eligibility of 12 peptides previously classified as Category 2 under 503A bulks framework",
    sampleSize: "N/A — regulatory action; affects all compounding pharmacies and clinical researchers",
    findings: "On April 22, 2026, FDA removed BPC-157, TB-500, MOTS-c, Semax, Selank, GHK-Cu, and 6 others from Category 2, making them eligible for PCAC review. A Pharmacy Compounding Advisory Committee (PCAC) meeting is scheduled for July 23–24, 2026, to evaluate reclassification to Category 1, which would allow licensed pharmacy compounding with a prescription. Removal from Category 2 does NOT confer Category 1 status — formal rulemaking remains required.",
    limitations: "Regulatory process only; not an approval; distribution for human consumption remains illegal pending completion of formal rulemaking; WADA prohibitions unchanged.",
    citation: "FDA PCAC Meeting Notice, April 15, 2026 (HHS/SecKennedy); FDA Category 2 Update, April 22, 2026",
    categoryColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "s4",
    title: "Retatrutide Phase 3 Trials Ongoing — Approval Projected Late 2027/2028",
    compound: "Retatrutide",
    category: "Metabolic",
    date: "2026-Q2",
    objective: "Track Phase 3 clinical development of Eli Lilly's triple agonist (GLP-1/GIP/glucagon receptor) for obesity and metabolic disease",
    sampleSize: "Phase 3 program enrollment ongoing; Phase 2 included n=338 adults with obesity",
    findings: "Retatrutide demonstrated up to 24.2% body weight reduction at 48 weeks in Phase 2 (highest reported for any anti-obesity agent to date). Phase 3 trials are actively recruiting as of mid-2026. Regulatory approval projected for late 2027 or early 2028. Triple receptor agonism represents the next frontier beyond dual GIP/GLP-1 therapy.",
    limitations: "Phase 2 data only published; Phase 3 results pending; long-term safety profile not yet established.",
    citation: "N Engl J Med. 2023;389:514–526; BSCG Peptide Regulation Report, 2026",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    id: "s5",
    title: "Oral GLP-1 Market Projected to Reach $137 Billion by 2035",
    compound: "Semaglutide (Oral)",
    category: "Metabolic",
    date: "2026-Q1",
    objective: "Market analysis and clinical assessment of oral GLP-1 receptor agonists following FDA approval of Oral Wegovy for chronic weight management",
    sampleSize: "Industry market report; clinical basis from OASIS trial program (Oral Wegovy in obesity)",
    findings: "Oral Wegovy (semaglutide 50 mg tablet) received FDA approval for chronic weight management in eligible adults. The oral GLP-1 market is projected to reach $137.36 billion by 2035 as daily tablet options expand access. Oral formulations offer adherence benefits for those who avoid injections, with comparable but slightly lower efficacy to injectable semaglutide.",
    limitations: "Market projections are speculative; oral bioavailability lower than injectable; must be taken on empty stomach with water only.",
    citation: "Toward Healthcare Oral GLP-1 Market Report, 2026; OASIS Trial Program data",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    id: "s6",
    title: "IGF-1 LR3 Restores Satellite Cell Proliferation in Aged Human Muscle Explants",
    compound: "IGF-1 LR3",
    category: "Muscle",
    date: "2026-Q1",
    objective: "Determine whether long-acting IGF-1 analogue restores impaired satellite cell proliferation in aged skeletal muscle ex vivo",
    sampleSize: "Human vastus lateralis biopsies, n=22 donors (aged 65–78)",
    findings: "IGF-1 LR3 treatment of aged muscle explants increased MyoD+ satellite cell count by 67% and Ki-67 proliferation index by 3.1-fold vs. untreated aged tissue. Effect comparable to young donor baseline. PI3K/Akt pathway upregulation confirmed by Western blot.",
    limitations: "Ex vivo explant model; cannot account for systemic IGF-binding protein interactions in vivo; no functional force measurement.",
    citation: "Journal of Cachexia, Sarcopenia and Muscle, 2026;17(1):e13301",
    categoryColor: "bg-red-100 text-red-800",
  },
  {
    id: "s7",
    title: "Semaglutide Associated with 33% Reduced Alzheimer's Risk in 1.8M Patient Cohort",
    compound: "Semaglutide",
    category: "Cognitive",
    date: "2026-Q1",
    objective: "Assess whether GLP-1 receptor agonist use is associated with reduced incidence of Alzheimer's disease in a large real-world cohort",
    sampleSize: "Retrospective cohort, n=1.8 million patients (US insurance claims data)",
    findings: "GLP-1 RA users showed a 33% lower hazard ratio for new Alzheimer's diagnosis vs. matched non-users over 5 years. Effect was consistent across age and BMI subgroups. Mechanistic hypothesis centers on reduced neuroinflammation and improved central insulin signaling. This builds on earlier observational data and has prompted active investigation into GLP-1 agents for neurodegenerative disease.",
    limitations: "Observational design; confounding by indication likely; pharmaceutical doses used; no mechanistic confirmation in humans.",
    citation: "Alzheimer's & Dementia, 2026;22(2):e14112",
    categoryColor: "bg-purple-100 text-purple-800",
  },
  {
    id: "s8",
    title: "Peptide Supplement Market Reaches $4.1B in 2025 — Grey-Market Contamination Rate ~30%",
    compound: "Multiple",
    category: "Safety",
    date: "2026-Q1",
    objective: "Assess quality control and contamination risks in the unregulated peptide supplement and research chemical market",
    sampleSize: "Independent laboratory analysis of grey-market peptide samples (BSCG data); global market analysis",
    findings: "The global peptide supplement market reached $4.1 billion in 2025, projected to reach $11.2 billion by 2035. Independent analysis identified mislabeling, improper dosing, or contamination in approximately 30% of grey-market peptide samples. Major e-commerce platforms including Amazon, Alibaba, and Walmart were found distributing unapproved peptides. FDA import alerts and warning letters regarding BPC-157 and TB-500 remain active.",
    limitations: "Sample selection methodology not fully disclosed; market scope definitions vary; evolving regulatory landscape affects grey-market size estimates.",
    citation: "BSCG Peptide Regulation Report 2026; STAT News, April 2026; SMRE Market Analysis 2025",
    categoryColor: "bg-amber-100 text-amber-800",
  },
];

function StudyCard({ study, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-border/60 rounded-xl bg-white overflow-hidden hover:border-primary/30 transition-colors"
    >
      {/* Header */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${study.categoryColor}`}>
                {study.category}
              </span>
              <span className="text-[9px] font-semibold text-muted-foreground flex items-center gap-0.5">
                <Calendar className="w-2.5 h-2.5" aria-hidden="true" /> {study.date}
              </span>
              <span className="text-[9px] font-semibold text-primary/70 flex items-center gap-0.5">
                <FlaskRound className="w-2.5 h-2.5" aria-hidden="true" /> {study.compound}
              </span>
            </div>
            <h3 className="text-sm font-bold text-foreground leading-snug">{study.title}</h3>
          </div>
        </div>

        {/* One-line summary */}
        <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{study.findings}</p>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={`study-detail-${study.id}`}
        className="w-full flex items-center justify-between px-5 py-2.5 border-t border-border/40 bg-secondary/20 hover:bg-secondary/40 transition-colors text-[11px] text-muted-foreground font-semibold"
      >
        {expanded ? "Hide details" : "Show full summary"}
        {expanded
          ? <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
          : <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        }
      </button>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          id={`study-detail-${study.id}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden"
        >
          <dl className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 bg-white">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Objective</dt>
              <dd className="text-[11px] text-foreground leading-relaxed">{study.objective}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Sample Size</dt>
              <dd className="text-[11px] text-foreground">{study.sampleSize}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Key Findings</dt>
              <dd className="text-[11px] text-foreground leading-relaxed">{study.findings}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Limitations</dt>
              <dd className="text-[11px] text-amber-700 bg-amber-50 rounded-lg px-2.5 py-1.5 leading-relaxed">{study.limitations}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Citation</dt>
              <dd>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(study.citation)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-primary/70 italic font-medium hover:text-primary hover:underline transition-colors"
                >
                  {study.citation} ↗
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function RecentStudies() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? STUDIES : STUDIES.slice(0, 3);

  return (
    <section aria-labelledby="recent-studies-heading">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2 id="recent-studies-heading" className="text-sm font-bold uppercase tracking-widest text-foreground">
            Recent Studies — One-Minute Summaries
          </h2>
        </div>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          {STUDIES.length} studies
        </span>
      </div>
      <div className="space-y-3">
        {displayed.map((study, i) => <StudyCard key={study.id} study={study} index={i} />)}
      </div>
      {STUDIES.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full py-2.5 text-xs font-semibold text-primary border border-primary/25 rounded-xl hover:bg-primary/5 transition-colors"
        >
          {showAll ? "Show fewer" : `Show all ${STUDIES.length} studies`}
        </button>
      )}
    </section>
  );
}