import React, { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, FlaskRound, Package, Syringe, BookOpen, ShieldCheck } from "lucide-react";

// ─── Per-peptide guide data ───────────────────────────────────────────────────
export const GUIDES = {
  bpc157: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (29-31G, 0.5mL)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sterile Vial Caps / Crimp Seals", url: "https://www.amazon.com/s?k=vial+crimp+caps+sterile", img: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL of bacteriostatic water slowly down the inner wall of the vial (do not inject directly onto powder). Gently swirl — never shake. Allow 5–10 minutes for full dissolution. Standard concentration: 250–500 mcg/mL.",
    dosingProtocol: "Research protocols commonly explored: 250–500 mcg once or twice daily (subcutaneous). Cycles of 4–12 weeks with 2–4 week breaks. Exact dose depends on research context.",
    storage: "Lyophilized (unreconstituted): Store at −20°C, protected from light. Reconstituted: Refrigerate at 2–8°C. Use within 28 days. Do not freeze reconstituted solution.",
    safetyNotes: "Always use sterile technique. Inject into clean, swabbed skin. Rotate injection sites. Discard bent or contaminated needles immediately. Never reuse syringes.",
    benefits: "Preclinical research has explored potential roles in soft-tissue repair, gastric cytoprotection, nitric oxide modulation, and vascular signaling.",
    sideEffects: "Animal studies report generally favorable tolerability. Anecdotal reports (non-controlled) include transient nausea, dizziness, and injection-site redness.",
    dailyLife: "No controlled human data on lifestyle impact. Preclinical findings relate to healing and gut signaling — translational relevance to daily function is unestablished.",
    injectionTechnique: "1. Wash hands thoroughly. 2. Swab vial top and injection site with alcohol pad; let dry 30 sec. 3. Draw correct volume into syringe. 4. Pinch skin (abdomen or thigh subcutaneous fat). 5. Insert at 45–90° angle. 6. Inject slowly. 7. Withdraw, apply gentle pressure. 8. Dispose needle in sharps container.",
    references: [
      { label: "Sikiric P et al., World J Gastroenterol. 2014", url: "https://pubmed.ncbi.nlm.nih.gov/24616573/" },
      { label: "Brcic L et al., J Orthop Res. 2009", url: "https://pubmed.ncbi.nlm.nih.gov/18975330/" },
      { label: "PubMed — BPC-157 Research Collection", url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 250–500 mcg SC injection once or twice daily → refrigerate between uses → 4–12 week research cycle.",
  },
  tb500: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (29-31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL bacteriostatic water gently down the vial wall. Swirl slowly. TB-500 may take 10–15 minutes to fully dissolve — do not shake. Standard concentration: 2.5 mg/mL.",
    dosingProtocol: "Common research protocols: 2–5 mg twice weekly for an initial 4–6 week loading phase, followed by 2–2.5 mg weekly maintenance. Exact protocol varies by research objective.",
    storage: "Lyophilized: −20°C, away from light. Reconstituted: 2–8°C. Stable up to 30 days refrigerated. Avoid freeze-thaw cycles on reconstituted solution.",
    safetyNotes: "Strict aseptic technique required. Rotate injection sites to avoid lipodystrophy. Never inject into veins. Discard unused reconstituted solution after 30 days.",
    benefits: "Preclinical research investigates roles in cellular migration, angiogenesis, inflammatory modulation, and wound healing cascade signaling.",
    sideEffects: "Rodent studies show no consistent adverse findings. No controlled human adverse event data for TB-500 specifically.",
    dailyLife: "No established human data. Parent molecule thymosin beta-4 has been explored in early clinical settings without significant quality-of-life reports.",
    injectionTechnique: "1. Wash hands. 2. Swab vial septum and injection site, allow to dry. 3. Draw volume slowly. 4. Subcutaneous injection preferred (abdomen, outer thigh). 5. 45° angle, slow plunge. 6. Remove, apply light pressure. 7. Sharps container disposal.",
    references: [
      { label: "Smart N et al., J Cardiovasc Transl Res. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20560013/" },
      { label: "Sosne G et al., Arch Ophthalmol. 2002", url: "https://pubmed.ncbi.nlm.nih.gov/12049573/" },
      { label: "PubMed — Thymosin Beta-4 Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+beta-4" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 2–5 mg SC twice weekly (loading) → 2 mg weekly (maintenance) → refrigerate → 4–6 week cycle.",
  },
  semaglutide: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G ultra-fine)", url: "https://www.amazon.com/s?k=insulin+syringes+31g+ultra+fine", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL bacteriostatic water slowly. Swirl gently — do not shake. Semaglutide is a long-acting peptide; dissolution may take several minutes. Common concentration: 0.5–1 mg/mL.",
    dosingProtocol: "Research escalation protocol commonly referenced: 0.25 mg weekly for 4 weeks → 0.5 mg weekly for 4 weeks → 1 mg weekly thereafter. Dose titration reduces GI side effects.",
    storage: "Lyophilized: 2–8°C or −20°C for long-term. Reconstituted: 2–8°C, use within 28 days. Heat and UV light sensitive — avoid direct sunlight.",
    safetyNotes: "GI side effects (nausea, vomiting) are common especially at initiation. Dose escalate slowly. Contraindicated with personal or family history of medullary thyroid carcinoma. Not for use in pregnant subjects.",
    benefits: "GLP-1 receptor agonist studied for glucose-dependent insulin secretion, satiety signaling, delayed gastric emptying, and emerging neuroprotective cardiovascular pathways.",
    sideEffects: "Nausea, vomiting, diarrhea, constipation are most common (especially early). Rare: pancreatitis, gallbladder disease. Thyroid C-cell effects observed in rodent carcinogenicity studies.",
    dailyLife: "In pharmaceutical trial contexts, subjects reported reduced appetite and food intake significantly altering eating patterns. GI discomfort can affect daily comfort particularly in early weeks.",
    injectionTechnique: "1. Wash hands. 2. Swab vial and injection site. 3. Abdomen preferred (2 inches from navel). 4. Pinch 1–2 inches of skin. 5. Insert at 90° for adequate SC fat. 6. Inject slowly over 5–10 seconds. 7. Remove and apply pressure. 8. Sharps disposal.",
    references: [
      { label: "Wilding JPH et al. (STEP 1), N Engl J Med. 2021", url: "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
      { label: "Marso SP et al. (SUSTAIN 6), N Engl J Med. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/27633148/" },
      { label: "PubMed — Semaglutide Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=semaglutide" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 0.25 mg SC weekly (weeks 1–4) → 0.5 mg (weeks 5–8) → 1 mg thereafter → refrigerate → once-weekly dosing.",
  },
  tirzepatide: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G ultra-fine)", url: "https://www.amazon.com/s?k=insulin+syringes+31g+ultra+fine", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Refrigerator Thermometer", url: "https://www.amazon.com/s?k=refrigerator+thermometer", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add bacteriostatic water gently down vial wall. Swirl — do not shake. Allow full dissolution. Typical concentration: 5 mg/mL (1 mg/0.2 mL for precision dosing).",
    dosingProtocol: "Research escalation: 2.5 mg weekly for 4 weeks → 5 mg weekly for 4 weeks → 7.5–15 mg weekly as tolerated. Titrate based on GI tolerance.",
    storage: "Lyophilized: 2–8°C. Reconstituted: 2–8°C, use within 28 days. Avoid repeated freeze-thaw. Do not store above 25°C.",
    safetyNotes: "Same class precautions as GLP-1 agonists. Dose escalate slowly to minimize GI events. Contraindicated with personal/family history of thyroid C-cell tumors. Monitor for signs of pancreatitis.",
    benefits: "Dual GIP/GLP-1 receptor co-agonism investigated for enhanced metabolic signaling, superior weight reduction, and potential lean mass preservation advantages over GLP-1 monotherapy.",
    sideEffects: "Nausea, vomiting, decreased appetite, injection site reactions. Rare: pancreatitis. Thyroid tumor signal in rodent studies.",
    dailyLife: "Pharmaceutical trial subjects experienced significant appetite reduction. GI effects most pronounced in early escalation weeks — may affect social eating and routine.",
    injectionTechnique: "Same as semaglutide — abdomen, upper arm, or outer thigh. Rotate sites weekly. 90° angle into adequate subcutaneous fat. Slow, steady injection.",
    references: [
      { label: "Frías JP et al. (SURPASS-2), N Engl J Med. 2021", url: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
      { label: "Jastreboff AM et al. (SURMOUNT-1), N Engl J Med. 2022", url: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
      { label: "PubMed — Tirzepatide Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=tirzepatide" },
    ],
    protocolSummary: "Reconstitute with BAC water → 2.5 mg SC weekly (weeks 1–4) → 5 mg (weeks 5–8) → up to 15 mg as tolerated → once-weekly dosing → refrigerate.",
  },
  pt141: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (29G, 0.5mL)", url: "https://www.amazon.com/s?k=insulin+syringes+29g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Nasal Atomizer (if intranasal)", url: "https://www.amazon.com/s?k=nasal+atomizer+mucosal", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Reconstitute with 1 mL bacteriostatic water per 10 mg vial. Swirl gently. Standard concentration: 1 mg/mL (1000 mcg/mL). Keep refrigerated after reconstitution.",
    dosingProtocol: "Research protocols commonly reference: 1–2 mg SC, administered 30–60 min prior to the research time-window. Onset ~30 min, duration ~6–12 hours. Limit use to avoid receptor desensitization.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, use within 14 days. Moisture-sensitive — keep cap on when not in use.",
    safetyNotes: "Transient blood pressure elevation documented in clinical trials. Not for use in subjects with cardiovascular conditions. Nausea is the most common effect. Monitor BP during research.",
    benefits: "Melanocortin MC3R/MC4R agonist studied for central motivational pathways. FDA-approved pharmaceutical version (Vyleesi) exists for HSDD, providing a unique human clinical data context.",
    sideEffects: "Nausea (most common), flushing, transient hypertension, hyperpigmentation with repeated use, headache.",
    dailyLife: "FDA trial subjects reported onset of effects within 30–60 minutes. Flushing and nausea can temporarily impact comfort and routine activities.",
    injectionTechnique: "Subcutaneous to abdomen or outer thigh. 45° angle. Small volume injection (0.5–2 mL). Slow, steady plunge. Rotate sites between uses.",
    references: [
      { label: "Clayton AH et al., J Sex Med. 2016", url: "https://pubmed.ncbi.nlm.nih.gov/27394884/" },
      { label: "PubMed — Bremelanotide Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide" },
    ],
    protocolSummary: "Reconstitute with 1 mL BAC water → 1–2 mg SC, 30–60 min pre-study → refrigerate (14-day limit) → use as-needed, not daily.",
  },
  cjc1295: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL bacteriostatic water slowly to vial. Gently swirl. Do not foam. Standard: 1 mg/mL. CJC-1295 with DAC has a long half-life (~8 days) — low frequency dosing required.",
    dosingProtocol: "With DAC: 1–2 mg once or twice weekly SC. Without DAC: 100–200 mcg daily or 3× per week. Often paired with ipamorelin at time of injection for synergistic GH release.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, use within 28 days. Protect from light. Stable lyophilized for 24+ months at −20°C.",
    safetyNotes: "GH axis dysregulation risk with prolonged use. Do not use with history of cancer or active neoplasia. Fluid retention possible. Not for use during pregnancy.",
    benefits: "Long-acting GHRH analogue researched for sustained GH and IGF-1 elevation, potential improvements in body composition, nitrogen retention, and lipolytic signaling.",
    sideEffects: "Transient flushing, water retention, headache, injection site reactions. Long-term axis suppression theoretical with extended use.",
    dailyLife: "Human research (limited) suggests improved sleep quality and energy in some subjects, attributed to GH pulse normalization. Effects are gradual over weeks.",
    injectionTechnique: "SC injection to abdomen. Pinch 1–2 inches of fat. 45° or 90° angle. Inject slowly. Rotate sites with each injection to prevent tissue buildup.",
    references: [
      { label: "Jetté L et al., J Clin Endocrinol Metab. 2005", url: "https://pubmed.ncbi.nlm.nih.gov/15998702/" },
      { label: "PubMed — CJC-1295 Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=CJC-1295" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 1–2 mg SC 1–2×/week (with DAC) or 100–200 mcg daily (no DAC) → refrigerate → often paired with Ipamorelin.",
  },
  ipamorelin: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Refrigerator Thermometer", url: "https://www.amazon.com/s?k=refrigerator+thermometer", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL bacteriostatic water. Swirl gently — allow 10 minutes for full dissolution. Standard concentration: 1–2.5 mg/mL. Reconstituted solution degrades rapidly at room temperature.",
    dosingProtocol: "Common research protocol: 200–300 mcg SC, 1–3× daily (typically upon waking, pre-workout, and before sleep). Often co-administered with CJC-1295 for synergistic pulsatile GH release.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, use within 28 days. Do not leave at room temperature. Light-sensitive.",
    safetyNotes: "Selective GH secretagogue with minimal cortisol/prolactin co-stimulation noted in animal studies. GH axis overstimulation possible with chronic high-frequency use. Not for use in oncology research contexts.",
    benefits: "Ghrelin receptor agonist researched for selective GH release, potential muscle and recovery signaling, and sleep architecture improvement without significant cortisol elevation.",
    sideEffects: "Transient headache, lightheadedness, and water retention reported anecdotally. Generally favorable preclinical tolerability profile.",
    dailyLife: "Pre-sleep dosing is common in research protocols to align with natural GH release patterns. Improved sleep quality reported in limited observations.",
    injectionTechnique: "SC to abdomen or outer thigh. 45° angle preferred for lower-fat areas. Small volumes (typically 0.1–0.3 mL). Rotate sites for each injection. Always use a new syringe.",
    references: [
      { label: "Raun K et al., Eur J Endocrinol. 1998", url: "https://pubmed.ncbi.nlm.nih.gov/9749682/" },
      { label: "PubMed — Ipamorelin Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ipamorelin" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 200–300 mcg SC up to 3×/day → refrigerate → commonly paired with CJC-1295 → 8–12 week cycle.",
  },
  igf1lr3: {
    supplies: {
      items: [
        { name: "0.6% Acetic Acid Solution", url: "https://www.amazon.com/s?k=acetic+acid+0.6+percent+sterile", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "PBS + 0.1% BSA (for dilution)", url: "https://www.amazon.com/s?k=PBS+BSA+solution+sterile", img: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G ultra-fine)", url: "https://www.amazon.com/s?k=insulin+syringes+31g+ultra+fine", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "IMPORTANT: Do NOT use plain water. Reconstitute with 0.6% acetic acid (1 mL per 1 mg). After dissolution, dilute further with PBS + 0.1% BSA for storage stability. Avoid agitation.",
    dosingProtocol: "Research protocols vary widely: 20–100 mcg SC or IM post-exercise or split AM/PM. Lower end of dosing is generally studied first given insulin-like hypoglycemia risk.",
    storage: "Lyophilized: −80°C ideal, −20°C acceptable. Reconstituted: 4°C, use within 14 days. Do not freeze reconstituted solution. Highly sensitive to temperature changes.",
    safetyNotes: "HYPOGLYCEMIA RISK — IGF-1 has insulin-like signaling. Administer with food or carbohydrate source nearby. Monitor for dizziness, sweating, or confusion after administration. Theoretical proliferative concern in pre-existing neoplastic states.",
    benefits: "Long-acting IGF-1 analogue studied for enhanced PI3K/Akt and MAPK/ERK signaling pathways regulating cellular proliferation, protein synthesis, and metabolic regulation.",
    sideEffects: "Hypoglycemia, headache, joint pain, jaw/facial bone growth reported in case reports with IGF-1 analogues. Not from controlled IGF-1 LR3 trials specifically.",
    dailyLife: "Hypoglycemic episodes can significantly impact daily function. Research protocols often time administration around meals to mitigate glucose effects.",
    injectionTechnique: "SC or IM injection. If IM, target lateral deltoid or vastus lateralis with appropriate needle length. SC: standard insulin technique. Always have fast-acting carbohydrates nearby before injecting.",
    references: [
      { label: "Tomas FM et al., J Endocrinol. 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8254575/" },
      { label: "Baker J et al., J Biol Chem. 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8428931/" },
      { label: "PubMed — IGF-1 LR3 Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=IGF-1+LR3" },
    ],
    protocolSummary: "Reconstitute with 0.6% acetic acid → dilute in PBS+BSA → 20–100 mcg SC/IM post-activity → refrigerate (14-day limit) → have carbohydrates nearby.",
  },
  ghrp6: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Reconstitute with 1 mL bacteriostatic water per 5 mg vial. Swirl gently. Standard concentration: 1–2.5 mg/mL. Use within 14 days of reconstitution.",
    dosingProtocol: "Research protocols commonly studied: 100–300 mcg SC, 2–3× daily (fasted state). Administer 30 minutes before food for appetite signaling research. Often combined with CJC-1295.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, 14 days. More sensitive than ipamorelin to reconstitution handling. Keep capped between uses.",
    safetyNotes: "GHRP-6 co-stimulates cortisol and prolactin — unlike ipamorelin. Hunger-stimulating (ghrelin mimicry) which can significantly increase appetite. Not ideal if cortisol elevation is a concern.",
    benefits: "Ghrelin receptor agonist studied for GH pulsatility, appetite regulation, gastric motility research, and potential cytoprotective signaling alongside BPC-157.",
    sideEffects: "Increased appetite (significant), transient cortisol elevation, water retention, mild hypoglycemia, flushing.",
    dailyLife: "Intense hunger stimulation is a very common experience in research contexts — plan meals accordingly. Cortisol elevation may affect energy and mood transiently.",
    injectionTechnique: "SC injection to abdomen, fasted state for maximum GH release effect. 45° angle. Small volume (0.1–0.3 mL typically). Rotate sites each use.",
    references: [
      { label: "Ghigo E et al., Eur J Endocrinol. 1996", url: "https://pubmed.ncbi.nlm.nih.gov/8921869/" },
      { label: "Bowers CY et al., Endocrinology. 1984", url: "https://pubmed.ncbi.nlm.nih.gov/6547088/" },
      { label: "PubMed — GHRP-6 Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=GHRP-6" },
    ],
    protocolSummary: "Reconstitute with 1 mL BAC water → 100–300 mcg SC, 2–3×/day fasted → refrigerate (14-day limit) → often paired with CJC-1295.",
  },
  selank: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Nasal Atomizer / Nebulizer", url: "https://www.amazon.com/s?k=nasal+atomizer+mucosal", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G, if SC)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Reconstitute with bacteriostatic water or PBS (for intranasal use). Standard: 0.15 mg/mL for intranasal research. For SC: 1–2.5 mg/mL. Swirl gently. Extremely light and moisture sensitive.",
    dosingProtocol: "Common research protocol (intranasal): 250–500 mcg per nostril, 1–3× daily. SC protocols: 250–500 mcg daily. Research cycle: 10–14 days on, followed by break.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, 14 days max. Light-sensitive — store in amber vial or wrapped in foil.",
    safetyNotes: "No major safety signals in available research. Western clinical data is very limited. Long-term effects completely unstudied. No serious adverse events documented in current literature.",
    benefits: "Heptapeptide (tuftsin-derived) investigated for anxiolytic signaling, potential BDNF expression modulation, IL-6 cytokine regulation, and GABA-A receptor pathway interaction.",
    sideEffects: "Mild transient sedation in some animal studies. Human anecdotal reports suggest favorable tolerability. No serious adverse events in available literature.",
    dailyLife: "Anecdotal research community reports describe calming/anxiolytic quality during use periods. No controlled human data on functional daily life impact.",
    injectionTechnique: "If intranasal: use atomizer, one spray per nostril, sniff gently. If SC: standard insulin technique to abdomen. Do not exceed recommended volumes per nostril.",
    references: [
      { label: "Semenova TP et al., Bull Exp Biol Med. 2010", url: "https://pubmed.ncbi.nlm.nih.gov/20848599/" },
      { label: "Zozulya AA et al., Bull Exp Biol Med. 2001", url: "https://pubmed.ncbi.nlm.nih.gov/11785902/" },
      { label: "PubMed — Selank Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=selank" },
    ],
    protocolSummary: "Reconstitute with BAC water or PBS → 250–500 mcg intranasal or SC, 1–3×/day → refrigerate (14-day limit) → 10–14 day cycle with break.",
  },
  sermorelin: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 0.5–1 mL bacteriostatic water to vial. Swirl gently — do not shake. More labile than CJC-1295 when reconstituted. Standard concentration: 1 mg/mL.",
    dosingProtocol: "Research protocol: 200–500 mcg SC nightly (before sleep, to align with natural GH pulse). Some protocols use 3× weekly. Cycles of 3–6 months researched.",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, use within 14 days. More labile than CJC-1295. Protect from light and heat.",
    safetyNotes: "Historical FDA approval data (pediatric GHD) provides broader safety context than most research peptides. Pituitary axis overstimulation is theoretical with chronic use. Not for use in active cancer research.",
    benefits: "First 29 AA of GHRH — stimulates pulsatile GH release via pituitary feedback axis. Investigated for GH deficiency, age-related GH decline, sleep architecture, and sarcopenia models.",
    sideEffects: "Flushing, headache, injection site reactions documented in historical clinical data. Generally well-tolerated in historical trials (pediatric GHD context).",
    dailyLife: "Historical trial subjects reported gradual improvements in energy and sleep quality attributed to restored GH pulses. Effects developed over weeks of research.",
    injectionTechnique: "SC to abdomen, nightly before sleep. Pinch skin, 45–90° angle. Small volume (0.2–0.5 mL). Rotate sites. Avoid eating 1–2 hours before injection to maximize GH response.",
    references: [
      { label: "Walker JL et al., J Clin Endocrinol Metab. 1996", url: "https://pubmed.ncbi.nlm.nih.gov/8772607/" },
      { label: "Prakash A & Goa KL, BioDrugs. 1999", url: "https://pubmed.ncbi.nlm.nih.gov/18031135/" },
      { label: "PubMed — Sermorelin Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=sermorelin" },
    ],
    protocolSummary: "Reconstitute with 0.5–1 mL BAC water → 200–500 mcg SC nightly before sleep → refrigerate (14-day limit) → 3–6 month research cycle.",
  },
  hexarelin: {
    supplies: {
      items: [
        { name: "Bacteriostatic Water (30mL)", url: "https://www.amazon.com/s?k=bacteriostatic+water+30ml", img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=80&h=80&fit=crop" },
        { name: "Insulin Syringes (31G)", url: "https://www.amazon.com/s?k=insulin+syringes+31g", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Alcohol Prep Pads", url: "https://www.amazon.com/s?k=alcohol+prep+pads", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop" },
        { name: "Sharps Disposal Container", url: "https://www.amazon.com/s?k=sharps+container", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop" },
      ]
    },
    reconstitution: "Add 1–2 mL bacteriostatic water. Swirl gently. Standard concentration: 1–2 mg/mL. Hexarelin is highly potent — precise dilution is important for accurate dosing.",
    dosingProtocol: "Research protocols: 100–200 mcg SC, 2–3× daily (fasted). Known to cause GH desensitization with chronic daily use — cycling is particularly important (e.g., 8 weeks on, 4 weeks off).",
    storage: "Lyophilized: −20°C. Reconstituted: 4°C, 14 days. Avoid heat and light. High potency compound — handle with precision.",
    safetyNotes: "Most potent GHRP studied — desensitization occurs faster than with ipamorelin or GHRP-6. Co-stimulates cortisol and prolactin. GH axis recovery period required after each cycle. Not for use in neoplasia research contexts.",
    benefits: "Potent ghrelin receptor agonist and GHS investigated for maximum GH release, cardioprotective signaling research, and anti-apoptotic pathway investigation in cardiac tissue models.",
    sideEffects: "Water retention, elevated cortisol and prolactin, rapid GH desensitization with chronic use, increased hunger, flushing.",
    dailyLife: "Very high appetite stimulation and potential for significant water retention can noticeably affect daily comfort and energy levels.",
    injectionTechnique: "SC injection to abdomen in fasted state. Very small volumes (0.05–0.2 mL). Use the most precisely calibrated syringe available given high potency. Rotate sites each injection.",
    references: [
      { label: "Ghigo E et al., J Clin Endocrinol Metab. 1994", url: "https://pubmed.ncbi.nlm.nih.gov/8175990/" },
      { label: "Muccioli G et al., Eur J Pharmacol. 2004", url: "https://pubmed.ncbi.nlm.nih.gov/15041469/" },
      { label: "PubMed — Hexarelin Research", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hexarelin" },
    ],
    protocolSummary: "Reconstitute with 1–2 mL BAC water → 100–200 mcg SC 2–3×/day fasted → refrigerate (14-day limit) → strict 8-week on / 4-week off cycle to prevent desensitization.",
  },
};

const SECTIONS = [
  { key: "supplies",          label: "Supplies Needed",             icon: Package,    color: "text-blue-600" },
  { key: "reconstitution",    label: "Reconstitution Guide",        icon: FlaskRound, color: "text-purple-600" },
  { key: "injectionTechnique",label: "Safest Injection Technique",  icon: Syringe,    color: "text-indigo-600" },
  { key: "safetyNotes",       label: "Safety Notes",                icon: ShieldCheck,color: "text-red-600" },
];

function AccordionSection({ sectionKey, label, icon: Icon, color, guide, open, onToggle }) {
  const content = guide[sectionKey];
  if (!content) return null;

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/20 hover:bg-secondary/40 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          <Icon className={`w-3.5 h-3.5 ${color}`} aria-hidden="true" />
          <span className="text-xs font-semibold text-foreground">{label}</span>
        </span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>

      {open && (
        <div className="px-4 py-3 bg-white text-[12px] text-foreground leading-relaxed">
          {sectionKey === "supplies" && (
            <div className="grid grid-cols-2 gap-3">
              {content.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 border border-border/50 rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-colors group"
                >
                  <img src={item.img} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0 bg-secondary" />
                  <span className="text-[11px] font-medium text-foreground group-hover:text-primary transition-colors leading-tight">{item.name}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto flex-shrink-0" />
                </a>
              ))}
            </div>
          )}
          {sectionKey === "references" && (
            <ul className="space-y-2">
              {content.map((ref) => (
                <li key={ref.label}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-1.5 text-primary/80 hover:text-primary underline-offset-2 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{ref.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {sectionKey === "safetyNotes" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
              {content}
            </div>
          )}
          {sectionKey === "protocolSummary" && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 font-mono text-[11px] text-primary/90">
              {content}
            </div>
          )}
          {!["supplies", "references", "safetyNotes", "protocolSummary"].includes(sectionKey) && (
            <p>{content}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function PeptideQuickGuide({ productId }) {
  const guide = GUIDES[productId];
  const [openSections, setOpenSections] = useState({});
  const [expanded, setExpanded] = useState(false);

  if (!guide) return null;

  const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="mt-3 border border-border/60 rounded-xl overflow-hidden bg-white">
      {/* Master toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary/5 hover:bg-primary/10 transition-colors border-b border-border/40"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Quick Start Guide</span>
        </span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5 text-primary" /> : <ChevronDown className="w-3.5 h-3.5 text-primary" />}
      </button>

      {expanded && (
        <div className="p-3 space-y-2">
          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[10px] text-amber-800 font-medium leading-relaxed">
            ⚠️ <strong>Educational purposes only.</strong> This guide is not medical advice. For research use only. Not for human consumption. Always follow applicable laws and institutional guidelines.
          </div>

          {SECTIONS.map((s) => (
            <AccordionSection
              key={s.key}
              sectionKey={s.key}
              label={s.label}
              icon={s.icon}
              color={s.color}
              guide={guide}
              open={!!openSections[s.key]}
              onToggle={() => toggle(s.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}