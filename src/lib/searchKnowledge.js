import { ALL_PEPTIDES } from "@/components/stack/peptideData";

// ── Synonym / abbreviation / misspelling map ────────────────────────────────
export const SYNONYM_MAP = {
  // Peptide name aliases
  "bpc": "bpc157", "bpc 157": "bpc157", "body protection compound": "bpc157",
  "tb500": "tb500", "tb 500": "tb500", "thymosin beta": "tb500", "thymosin beta-4": "tb500",
  "cjc": "cjc1295", "cjc 1295": "cjc1295", "ghrh": "cjc1295",
  "ipa": "ipamorelin", "ipamorlin": "ipamorelin",
  "igf": "igf1lr3", "igf1": "igf1lr3", "igf-1": "igf1lr3", "lr3": "igf1lr3",
  "ghrp": "ghrp6", "ghrp 6": "ghrp6",
  "pt141": "pt141", "pt 141": "pt141", "bremelanotide": "pt141",
  "semi": "semaglutide", "ozempic": "semaglutide", "wegovy": "semaglutide",
  "tirz": "tirzepatide", "mounjaro": "tirzepatide", "zepbound": "tirzepatide",
  "selank": "selank",
  "semax": "semax",
  "sermorelin": "sermorelin",

  // Common misspellings
  "bpc 157": "bpc157", "bpc-157": "bpc157", "bpc157": "bpc157",
  "semaglutid": "semaglutide", "semoglutide": "semaglutide",
  "tirzapatide": "tirzepatide", "tirzapatid": "tirzepatide",
  "ipamorlin": "ipamorelin", "ipomorelin": "ipamorelin",
  "sermorlin": "sermorelin",
};

// ── Goal / symptom / benefit → peptide IDs ──────────────────────────────────
export const GOAL_MAP = {
  recovery: { peptides: ["bpc157", "tb500", "ghrp6"], label: "Recovery & Healing" },
  healing: { peptides: ["bpc157", "tb500"], label: "Tissue Healing" },
  tendon: { peptides: ["bpc157", "tb500"], label: "Tendon & Ligament Research" },
  injury: { peptides: ["bpc157", "tb500", "ghrp6"], label: "Injury Recovery" },
  "gut health": { peptides: ["bpc157"], label: "Gut Health Research" },
  gut: { peptides: ["bpc157"], label: "Gut Health Research" },
  stomach: { peptides: ["bpc157"], label: "Gastric Research" },
  inflammation: { peptides: ["bpc157", "tb500", "selank"], label: "Anti-Inflammatory Research" },
  muscle: { peptides: ["igf1lr3", "cjc1295", "ipamorelin", "ghrp6"], label: "Muscle & Anabolism" },
  strength: { peptides: ["igf1lr3", "cjc1295", "ghrp6"], label: "Strength Research" },
  anabolic: { peptides: ["igf1lr3", "cjc1295", "ipamorelin"], label: "Anabolic Signaling" },
  "fat loss": { peptides: ["semaglutide", "tirzepatide", "igf1lr3"], label: "Fat Loss Research" },
  "weight loss": { peptides: ["semaglutide", "tirzepatide"], label: "Weight Management" },
  metabolic: { peptides: ["semaglutide", "tirzepatide", "igf1lr3"], label: "Metabolic Health" },
  obesity: { peptides: ["semaglutide", "tirzepatide"], label: "Obesity Research" },
  diabetes: { peptides: ["semaglutide", "tirzepatide"], label: "Metabolic / Glucose Research" },
  sleep: { peptides: ["ipamorelin", "sermorelin", "cjc1295"], label: "Sleep & Recovery" },
  insomnia: { peptides: ["ipamorelin", "sermorelin"], label: "Sleep Research" },
  cognition: { peptides: ["semax", "selank"], label: "Cognitive Research" },
  cognitive: { peptides: ["semax", "selank"], label: "Cognitive Research" },
  focus: { peptides: ["semax", "selank"], label: "Focus & Clarity Research" },
  brain: { peptides: ["semax", "selank"], label: "Neuroprotective Research" },
  anxiety: { peptides: ["selank"], label: "Anxiolytic Research" },
  stress: { peptides: ["selank", "semax"], label: "Stress Response Research" },
  mood: { peptides: ["selank", "semax", "pt141"], label: "Mood Research" },
  libido: { peptides: ["pt141"], label: "Melanocortin Research" },
  hormonal: { peptides: ["sermorelin", "cjc1295", "ipamorelin", "pt141"], label: "Hormonal Research" },
  "growth hormone": { peptides: ["sermorelin", "cjc1295", "ipamorelin", "ghrp6"], label: "GH Axis Research" },
  gh: { peptides: ["sermorelin", "cjc1295", "ipamorelin", "ghrp6"], label: "GH Secretagogue Research" },
  longevity: { peptides: ["sermorelin", "igf1lr3", "cjc1295"], label: "Longevity Research" },
  "anti aging": { peptides: ["sermorelin", "igf1lr3", "cjc1295"], label: "Anti-Aging Research" },
  "skin health": { peptides: ["bpc157", "tb500"], label: "Skin & Collagen Research" },
  "skin": { peptides: ["bpc157", "tb500"], label: "Skin Research" },
};

// ── Static content index ─────────────────────────────────────────────────────
export const CONTENT_INDEX = [
  { type: "page", title: "Beginner's Guide to Peptides", url: "/guide", tags: ["beginner", "guide", "intro", "start", "what are peptides", "education"], desc: "Complete introduction to research peptides — what they are, how they work, and how to get started." },
  { type: "page", title: "Protocol & Dosage Calculator", url: "/protocol", tags: ["dosage", "calculator", "reconstitution", "protocol", "how much", "dose", "units", "ml", "mg", "mcg"], desc: "Interactive calculator for reconstitution volumes, dosing conversions, and protocol planning." },
  { type: "page", title: "Certificate of Analysis (COA) Search", url: "/coa", tags: ["coa", "certificate", "purity", "third party", "lab", "test", "analysis", "quality"], desc: "Search and download third-party certificates of analysis for all batch numbers." },
  { type: "page", title: "Research Hub", url: "/research", tags: ["research", "studies", "science", "literature", "hub", "data"], desc: "Comprehensive database of peptide research summaries, regulatory news, and study comparisons." },
  { type: "page", title: "Peptide Glossary", url: "/glossary", tags: ["glossary", "terms", "definitions", "acronyms", "meaning", "what does", "what is"], desc: "Definitions of peptide research terms, acronyms, and scientific vocabulary." },
  { type: "page", title: "Wholesale & Bulk Ordering", url: "/wholesale", tags: ["wholesale", "bulk", "partner", "enterprise", "pricing", "business", "lab supply"], desc: "Tiered wholesale pricing, quote builder, white-label program, and account applications." },
  { type: "page", title: "Research Supplies Guide", url: "/supplies", tags: ["supplies", "syringes", "needles", "bacteriostatic water", "vials", "equipment", "bac water"], desc: "Everything you need to set up a peptide research lab — supplies, tools, and sourcing guide." },
  { type: "page", title: "Ambassador Program", url: "/ambassador", tags: ["ambassador", "affiliate", "partner", "referral", "commission", "program"], desc: "Join the Cattleya Labs ambassador program for exclusive benefits and referral commissions." },
  { type: "page", title: "FAQs", url: "/faqs", tags: ["faq", "question", "answer", "help", "support", "how to", "shipping", "returns"], desc: "Frequently asked questions about ordering, shipping, quality, and research use." },
  { type: "stack", title: "Recovery Foundation Stack", url: "/research", tags: ["bpc-157", "tb-500", "recovery", "healing", "tendon", "stack"], desc: "BPC-157 + TB-500 — most researched stack for soft-tissue and recovery signaling." },
  { type: "stack", title: "GH Axis Research Stack", url: "/research", tags: ["cjc-1295", "ipamorelin", "growth hormone", "gh", "stack", "sleep"], desc: "CJC-1295 + Ipamorelin — classic GHRH + GHRP combination for GH pulse research." },
  { type: "stack", title: "Metabolic Investigation Stack", url: "/research", tags: ["semaglutide", "igf-1", "fat loss", "metabolic", "weight", "stack"], desc: "Semaglutide + IGF-1 LR3 — dual-pathway metabolic signaling research combination." },
  { type: "stack", title: "Cognitive Exploration Stack", url: "/research", tags: ["semax", "selank", "cognition", "focus", "anxiety", "mood", "stack"], desc: "Semax + Selank — studied for nootropic and anxiolytic signaling pathways." },
  { type: "article", title: "BPC-157 vs TB-500: What's the Difference?", url: "/peptide/bpc157", tags: ["bpc-157", "tb-500", "difference", "compare", "vs", "comparison", "which is better"], desc: "A side-by-side comparison of BPC-157 and TB-500 — mechanisms, research, and use cases." },
  { type: "article", title: "How to Reconstitute Peptides", url: "/protocol", tags: ["reconstitute", "reconstitution", "bacteriostatic water", "mixing", "how to", "preparation"], desc: "Step-by-step guide to reconstituting lyophilized peptide powders for research use." },
  { type: "article", title: "GLP-1 Receptor Agonists Explained", url: "/peptide/semaglutide", tags: ["glp-1", "glp1", "semaglutide", "tirzepatide", "receptor", "explained", "how do they work"], desc: "Deep dive into GLP-1 and GIP receptor agonism — mechanisms and research findings." },
  { type: "article", title: "Peptide Storage & Stability Guide", url: "/guide", tags: ["storage", "stability", "freeze", "refrigerate", "lyophilized", "reconstituted", "how to store"], desc: "How to properly store lyophilized and reconstituted peptides to maintain potency." },
  { type: "faq", title: "What is bacteriostatic water and why is it used?", url: "/faqs", tags: ["bacteriostatic water", "bac water", "reconstitution", "why", "sterile water"], desc: "Bacteriostatic water contains 0.9% benzyl alcohol to prevent microbial growth in reconstituted peptides." },
  { type: "faq", title: "What does ≥99% purity mean?", url: "/faqs", tags: ["purity", "99%", "what does it mean", "quality", "hplc", "ms"], desc: "Explains HPLC and MS purity verification and what ≥99% purity means for research compounds." },
  { type: "faq", title: "How long do reconstituted peptides last?", url: "/faqs", tags: ["shelf life", "how long", "reconstituted", "expire", "stability", "days"], desc: "Most reconstituted peptides remain stable for 14–30 days at 2–8°C depending on the compound." },
];

// ── Resolve query to structured intent ──────────────────────────────────────
export function resolveQuery(rawQuery) {
  const q = rawQuery.toLowerCase().trim();
  const normalized = q.replace(/[-\s]+/g, "").replace(/[^a-z0-9]/g, "");

  // 1. Synonym resolution
  let resolvedId = null;
  for (const [alias, id] of Object.entries(SYNONYM_MAP)) {
    const aliasNorm = alias.replace(/[-\s]+/g, "").toLowerCase();
    if (aliasNorm === normalized || q.includes(alias)) { resolvedId = id; break; }
  }

  // 2. Goal detection
  let detectedGoal = null;
  for (const goal of Object.keys(GOAL_MAP)) {
    if (q.includes(goal)) { detectedGoal = goal; break; }
  }

  // 3. Direct peptide match
  const directPeptides = ALL_PEPTIDES.filter(p => {
    const nameLow = p.name.toLowerCase().replace(/[-\s]/g, "");
    const idLow = p.id.toLowerCase();
    return nameLow.includes(normalized) || idLow.includes(normalized) ||
      q.includes(p.name.toLowerCase()) || (resolvedId && p.id === resolvedId);
  });

  // 4. Broad text scoring
  const scored = ALL_PEPTIDES.map(p => {
    const blob = [
      p.name, p.id, p.tagline, p.mechanism, p.goals?.join(" "),
      p.sideEffects, p.safetyConcerns, p.ongoingResearch,
      p.knownCombinations?.join(" "),
      ...(p.animalStudies || []).map(s => s.title + " " + s.finding),
      ...(p.humanStudies || []).map(s => s.title + " " + s.finding),
      ...(p.studies || []).map(s => s.objective + " " + s.findings),
    ].join(" ").toLowerCase();

    let score = 0;
    const words = q.split(/\s+/);
    for (const word of words) {
      if (word.length < 2) continue;
      if (blob.includes(word)) score += 2;
    }
    if (blob.includes(q)) score += 10;
    if (p.name.toLowerCase().includes(q)) score += 15;
    if (p.id === resolvedId) score += 20;

    return { ...p, score };
  }).filter(p => p.score > 0).sort((a, b) => b.score - a.score);

  // 5. Content scoring
  const contentResults = CONTENT_INDEX.filter(item => {
    const blob = (item.title + " " + item.desc + " " + item.tags.join(" ")).toLowerCase();
    return q.split(/\s+/).some(w => w.length > 2 && blob.includes(w)) || blob.includes(q);
  });

  return {
    resolvedId,
    detectedGoal,
    directPeptides: directPeptides.length > 0 ? directPeptides : scored.slice(0, 5),
    contentResults: contentResults.slice(0, 8),
    goalData: detectedGoal ? GOAL_MAP[detectedGoal] : null,
    goalPeptides: detectedGoal
      ? ALL_PEPTIDES.filter(p => GOAL_MAP[detectedGoal]?.peptides.includes(p.id))
      : [],
  };
}

// ── Autocomplete suggestions ─────────────────────────────────────────────────
export function getAutocompleteSuggestions(query) {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase();
  const suggestions = new Set();

  // Peptide names
  ALL_PEPTIDES.forEach(p => {
    if (p.name.toLowerCase().includes(q)) suggestions.add(p.name);
  });

  // Aliases
  Object.keys(SYNONYM_MAP).forEach(alias => {
    if (alias.includes(q) && alias.length > 2) {
      const peptide = ALL_PEPTIDES.find(p => p.id === SYNONYM_MAP[alias]);
      if (peptide) suggestions.add(`${alias} → ${peptide.name}`);
    }
  });

  // Goals
  Object.keys(GOAL_MAP).forEach(goal => {
    if (goal.includes(q)) suggestions.add(`Peptides for ${goal}`);
  });

  // Content titles
  CONTENT_INDEX.forEach(item => {
    if (item.title.toLowerCase().includes(q)) suggestions.add(item.title);
  });

  // Common question patterns
  const QUESTION_TEMPLATES = [
    `What is ${query}?`,
    `${query} dosage protocol`,
    `${query} vs `,
    `Best peptide for ${query}`,
    `How does ${query} work?`,
  ];
  QUESTION_TEMPLATES.forEach(t => {
    if (t.toLowerCase().includes(q)) suggestions.add(t);
  });

  return Array.from(suggestions).slice(0, 8);
}