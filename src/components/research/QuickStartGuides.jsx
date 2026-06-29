import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, FlaskRound, Thermometer, Droplets, AlertTriangle } from "lucide-react";

const GUIDES = [
  {
    id: "getting-started",
    title: "Getting Started with Research Peptides",
    icon: FlaskRound,
    color: "bg-primary/10 text-primary",
    steps: [
      { step: "Verify your batch", desc: "Use the COA Search to confirm purity %, testing lab, and batch date before any lab work." },
      { step: "Review the compound profile", desc: "Visit the Research Hub and read the mechanism of action, storage requirements, and safety notes for your specific compound." },
      { step: "Prepare your workspace", desc: "Ensure your lab environment is clean, temperature-controlled, and properly equipped for handling lyophilized peptides." },
      { step: "Follow reconstitution guidance", desc: "Each compound requires specific diluents. IGF-1 LR3, for example, requires acetic acid — not bacteriostatic water. Always verify before proceeding." },
      { step: "Document your protocol", desc: "Record compound name, batch ID, date of reconstitution, concentration, and storage location for traceability." },
    ],
  },
  {
    id: "storage",
    title: "Peptide Storage Best Practices",
    icon: Thermometer,
    color: "bg-blue-100 text-blue-700",
    steps: [
      { step: "Lyophilized (dry) powder", desc: "Store at −20 °C in a sealed container, protected from light. Most compounds are stable for 12–24 months under these conditions." },
      { step: "Reconstituted solutions", desc: "Store at 2–8 °C (refrigerator). Use within 14–28 days depending on the compound. Avoid repeated freeze-thaw cycles." },
      { step: "Ultra-cold requirements", desc: "IGF-1 LR3 and similar analogues benefit from −80 °C storage for long-term stability. Degradation is faster at −20 °C." },
      { step: "Light sensitivity", desc: "Many peptides, including Selank and Semax, are sensitive to UV light. Use amber vials or opaque containers where possible." },
      { step: "Avoid agitation", desc: "Do not vortex or shake reconstituted solutions — gentle swirling only. Mechanical agitation can break peptide bonds and reduce purity." },
    ],
  },
  {
    id: "reconstitution",
    title: "Reconstitution Protocol Guide",
    icon: Droplets,
    color: "bg-purple-100 text-purple-700",
    steps: [
      { step: "Choose the correct diluent", desc: "Most peptides use bacteriostatic water (0.9% benzyl alcohol in sterile water). IGF-1 LR3 requires dilute acetic acid (0.6%). Check the compound profile." },
      { step: "Prepare sterile technique", desc: "Wipe vial septa with 70% isopropyl alcohol. Use sterile syringes and needles. Work in a clean environment." },
      { step: "Add diluent gently", desc: "Inject the diluent slowly down the inner wall of the vial — do not shoot directly onto the powder. This minimizes foaming and mechanical stress." },
      { step: "Allow complete dissolution", desc: "Swirl gently for 1–2 minutes. Some peptides (e.g., TB-500) may take 5–10 minutes to fully dissolve. Do not heat to accelerate." },
      { step: "Label and date", desc: "Immediately label the vial with the compound name, batch ID, concentration, reconstitution date, and your initials. Store appropriately." },
    ],
  },
  {
    id: "safety",
    title: "Research Safety Considerations",
    icon: AlertTriangle,
    color: "bg-amber-100 text-amber-700",
    steps: [
      { step: "Research use only", desc: "All Cattleya Labs compounds are strictly for in vitro and laboratory research. They are not intended for human or veterinary administration." },
      { step: "Review the literature first", desc: "Before beginning any research protocol, read available peer-reviewed literature on your compounds. The Research Hub provides study summaries and citations." },
      { step: "Understand mechanism interactions", desc: "Some compounds share pathways (e.g., GH axis compounds like CJC-1295 + GHRP-6 + Ipamorelin may have additive effects). Use the Stack Analyzer to identify overlaps." },
      { step: "Endotoxin awareness", desc: "Verify endotoxin testing results on your COA. High endotoxin levels in research reagents can confound cell culture and animal model results." },
      { step: "Proper disposal", desc: "Dispose of unused peptide solutions and sharps according to your institutional and local biohazard waste regulations." },
    ],
  },
];

function GuideCard({ guide }) {
  const [open, setOpen] = useState(false);
  const Icon = guide.icon;

  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`guide-${guide.id}`}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-secondary/30 transition-colors text-left"
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${guide.color}`}>
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">{guide.title}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{guide.steps.length} steps</p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
        }
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`guide-${guide.id}`}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-border/60"
          >
            <ol className="px-5 py-4 space-y-4" role="list">
              {guide.steps.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.step}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuickStartGuides() {
  return (
    <section aria-labelledby="quickstart-heading">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 id="quickstart-heading" className="text-sm font-bold uppercase tracking-widest text-foreground">
          Quick-Start Guides
        </h2>
      </div>
      <div className="space-y-3">
        {GUIDES.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
      </div>
    </section>
  );
}