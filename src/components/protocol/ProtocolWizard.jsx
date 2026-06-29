import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlaskRound, ArrowRight, ArrowLeft, CheckCircle2, Mail, Lock, Sparkles, Info } from "lucide-react";
import { base44 } from "@/api/base44Client";

const GOALS = ["Fat Loss", "Muscle Gain", "Recovery", "Cognition", "Longevity", "Sleep", "Hormonal Health", "General Wellness", "Other"];
const ACTIVITY = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Athlete"];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TRAINING_TYPES = ["Strength / Powerlifting", "Hypertrophy / Bodybuilding", "CrossFit / HIIT", "Endurance / Cardio", "Martial Arts", "Mixed / General Fitness", "Minimal / Rehab"];

function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-xs font-bold text-foreground block mb-1.5">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
        {!required && <span className="text-[9px] font-normal text-muted-foreground ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={onChange}
      className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring text-foreground">
      <option value="">{placeholder || "Select…"}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function TextArea({ placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
  );
}

function SectionHeader({ label }) {
  return (
    <div className="flex items-center gap-2 pt-3 pb-1 border-b border-border/40">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{label}</span>
    </div>
  );
}

const SLIDE = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ── Paywall screen ─────────────────────────────────────────────────────────────
function Paywall({ onPay }) {
  const [loading, setLoading] = useState(false);
  const handlePay = () => {
    setLoading(true);
    // Simulate payment — replace with real Stripe checkout when ready
    setTimeout(() => { setLoading(false); onPay(); }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
      className="px-6 py-8 text-center space-y-5">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        <Lock className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-foreground text-base mb-1">Your Custom Protocol is Ready</h3>
        <p className="text-[12px] text-muted-foreground leading-relaxed max-w-xs mx-auto">
          A personalised research protocol has been generated based on your inputs. Unlock it for a one-time fee of <strong className="text-foreground">$10</strong>.
        </p>
      </div>
      <div className="bg-secondary/50 rounded-xl p-4 text-left space-y-2 text-[11px] text-muted-foreground">
        <p className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> AI-generated protocol tailored to your subject data</p>
        <p className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> Compound selection, dosing windows & cycling guidance</p>
        <p className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> Safety flags based on your health screening answers</p>
        <p className="flex items-start gap-2"><Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> Sent to your inbox — yours to keep</p>
      </div>
      <Button onClick={handlePay} disabled={loading}
        className="w-full h-11 bg-primary hover:bg-primary/85 text-white font-bold text-sm">
        {loading ? "Processing…" : "Unlock My Protocol — $10"}
      </Button>
      <p className="text-[10px] text-muted-foreground">For research purposes only. Not medical advice.</p>
    </motion.div>
  );
}

// ── Protocol result screen ─────────────────────────────────────────────────────
function ProtocolResult({ allData }) {
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.integrations.Core.InvokeLLM({
      prompt: `You are an expert peptide research protocol designer. Generate a detailed, personalised research protocol based on the following subject data. 

IMPORTANT: This is for research purposes only, not medical advice.

Subject data:
${JSON.stringify(allData, null, 2)}

Provide:
1. Recommended compound(s) with rationale
2. Suggested dosing protocol (dose, frequency, timing, route)
3. Cycle length and off-cycle recommendation
4. Storage and reconstitution reminders
5. Key safety considerations based on health screening
6. Synergy notes if multiple compounds are relevant
7. Monitoring markers to track progress

Be specific, practical, and concise. Format with clear sections.`,
    }).then(res => {
      setProtocol(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-12 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground font-medium">Generating your protocol…</p>
        <p className="text-[11px] text-muted-foreground">This takes a few seconds</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="px-6 py-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <h3 className="font-bold text-foreground text-sm">Your Custom Protocol</h3>
      </div>
      <div className="bg-secondary/30 rounded-xl p-5 text-[12px] text-foreground leading-relaxed whitespace-pre-wrap border border-border/60">
        {protocol}
      </div>
      <p className="text-[10px] text-muted-foreground text-center border-t border-border/40 pt-3">
        For research purposes only. Not medical advice. Consult a qualified professional for therapeutic guidance.
      </p>
    </motion.div>
  );
}

// ── Main wizard ────────────────────────────────────────────────────────────────
export default function ProtocolWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paid, setPaid] = useState(false);

  const [basics, setBasics] = useState({ name: "", email: "", peptide: "" });
  const [subject, setSubject] = useState({ age: "", sex: "", height: "", weight: "", bodyFat: "", activityLevel: "", researchGoal: "" });
  const [health, setHealth] = useState({ medications: "", conditions: "", cancerHistory: "", cardiovascularRisk: "", liverKidney: "", allergies: "", pregnancy: "" });
  const [bio, setBio] = useState({ fastingGlucose: "", hba1c: "", fastingInsulin: "", lipidPanel: "", hormones: "", igf1: "", thyroid: "", crp: "", cbc: "" });
  const [experience, setExperience] = useState({ level: "", previousPeptides: "", responses: "", sideEffects: "", injectionExperience: "" });
  const [goalInputs, setGoalInputs] = useState({
    targetWeight: "", timeline: "", appetiteIssues: "", bloodSugar: "",
    trainingFrequency: "", trainingType: "", injuryHistory: "", recoveryQuality: "", sleepDuration: "",
    familyHistory: "", bloodPressure: "", cvMarkers: "", bioAge: "",
    sleepQuality: "", stressLevel: "", focusGoals: "", neurologicalConditions: "",
  });

  const upd = (setter) => (field) => (e) => setter(prev => ({ ...prev, [field]: e.target.value }));

  const step0Valid = basics.name.trim() && basics.email.trim() && basics.peptide.trim();
  const step1Valid = subject.age && subject.sex && subject.height && subject.weight && subject.activityLevel && subject.researchGoal;

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goBack = () => { setDir(-1); setStep(s => s - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!step1Valid) return;
    setShowPaywall(true);
  };

  const allData = { basics, subject, health, bio, experience, goalInputs };

  // After payment
  if (paid) {
    return (
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-border/60 bg-secondary/30">
          <div className="flex items-center gap-2">
            <FlaskRound className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Your Custom Protocol</h2>
          </div>
        </div>
        <ProtocolResult allData={allData} />
      </div>
    );
  }

  // Paywall
  if (showPaywall) {
    return (
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-border/60 bg-secondary/30">
          <div className="flex items-center gap-2">
            <FlaskRound className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Request a Custom Protocol</h2>
          </div>
        </div>
        <Paywall onPay={() => setPaid(true)} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border/60 bg-secondary/30">
        <div className="flex items-center gap-2">
          <FlaskRound className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Request a Custom Protocol</h2>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          {step === 0
            ? "Tell us your basics to get started."
            : "The more you share, the more accurate and tailored your protocol will be."}
        </p>
        <div className="flex gap-1.5 mt-3">
          {[0, 1].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? "w-6 bg-primary" : i < step ? "w-3 bg-primary/40" : "w-3 bg-border"}`} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">

          {/* ── STEP 0 ── */}
          {step === 0 && (
            <motion.div key="step0" custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" required>
                  <Input placeholder="Your name" value={basics.name} onChange={upd(setBasics)("name")} className="h-10" />
                </Field>
                <Field label="Email" required>
                  <Input type="email" placeholder="you@example.com" value={basics.email} onChange={upd(setBasics)("email")} className="h-10" />
                </Field>
              </div>
              <Field label="Peptide / Compound of Interest" required>
                <Input placeholder="e.g. BPC-157, CJC-1295 + Ipamorelin blend" value={basics.peptide} onChange={upd(setBasics)("peptide")} className="h-10" />
              </Field>

              <Button onClick={goNext} disabled={!step0Valid}
                className="w-full h-10 bg-primary hover:bg-primary/85 text-white text-sm font-bold mt-1">
                Next — Subject Details <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              {/* $10 fee note */}
              <div className="flex items-start gap-1.5 pt-1">
                <Info className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  A one-time <strong className="text-foreground">$10 protocol fee</strong> applies. You'll be prompted to pay after completing the questionnaire, before your personalised protocol is generated and sent to your inbox.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <motion.form key="step1" custom={dir} variants={SLIDE} initial="enter" animate="center" exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onSubmit={handleSubmit}
              className="px-6 py-6 space-y-5 max-h-[68vh] overflow-y-auto">

              {/* Accuracy banner */}
              <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-primary/80 leading-relaxed">
                  <strong>The more information you provide, the more accurate and personally suited your protocol will be.</strong> All fields beyond Subject Information are optional — fill in as much as you'd like.
                </p>
              </div>

              {/* Subject Information */}
              <SectionHeader label="Subject Information" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Age" required>
                  <Input type="number" placeholder="e.g. 34" value={subject.age} onChange={upd(setSubject)("age")} className="h-10" />
                </Field>
                <Field label="Sex" required>
                  <SelectField value={subject.sex} onChange={upd(setSubject)("sex")} options={["Male", "Female", "Other / Prefer not to say"]} placeholder="Select…" />
                </Field>
                <Field label="Height" required>
                  <Input placeholder="e.g. 5'11&quot; or 180cm" value={subject.height} onChange={upd(setSubject)("height")} className="h-10" />
                </Field>
                <Field label="Weight" required>
                  <Input placeholder="e.g. 185 lbs or 84 kg" value={subject.weight} onChange={upd(setSubject)("weight")} className="h-10" />
                </Field>
              </div>
              <Field label="Body Fat %">
                <Input placeholder="e.g. 18%" value={subject.bodyFat} onChange={upd(setSubject)("bodyFat")} className="h-10" />
              </Field>
              <Field label="Activity Level" required>
                <SelectField value={subject.activityLevel} onChange={upd(setSubject)("activityLevel")} options={ACTIVITY} placeholder="Select activity level…" />
              </Field>
              <Field label="Primary Research Goal" required>
                <SelectField value={subject.researchGoal} onChange={upd(setSubject)("researchGoal")} options={GOALS} placeholder="Select goal…" />
              </Field>

              {/* Health & Safety */}
              <SectionHeader label="Health & Safety Screening" />
              <Field label="Current Medications">
                <TextArea placeholder="List any current medications or supplements…" value={health.medications} onChange={upd(setHealth)("medications")} />
              </Field>
              <Field label="Existing Medical Conditions">
                <TextArea placeholder="e.g. hypertension, type 2 diabetes, hypothyroidism…" value={health.conditions} onChange={upd(setHealth)("conditions")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="History of Cancer">
                  <SelectField value={health.cancerHistory} onChange={upd(setHealth)("cancerHistory")} options={["No", "Yes — in remission", "Yes — active", "Family history only"]} />
                </Field>
                <Field label="Cardiovascular Risk Factors">
                  <SelectField value={health.cardiovascularRisk} onChange={upd(setHealth)("cardiovascularRisk")} options={["None known", "High blood pressure", "High cholesterol", "Diabetes", "Smoker", "Family history", "Multiple"]} />
                </Field>
                <Field label="Liver / Kidney Function">
                  <SelectField value={health.liverKidney} onChange={upd(setHealth)("liverKidney")} options={["Normal", "Mildly impaired", "Moderately impaired", "Unknown"]} />
                </Field>
                <Field label="Pregnancy / Breastfeeding">
                  <SelectField value={health.pregnancy} onChange={upd(setHealth)("pregnancy")} options={["Not applicable", "Currently pregnant", "Breastfeeding", "Planning pregnancy"]} />
                </Field>
              </div>
              <Field label="Allergies or Sensitivities">
                <Input placeholder="e.g. BAC water, latex, specific compounds…" value={health.allergies} onChange={upd(setHealth)("allergies")} className="h-10" />
              </Field>

              {/* Biomarker Data */}
              <SectionHeader label="Biomarker Data" />
              <p className="text-[10px] text-muted-foreground -mt-1">Provide what you have — even partial data improves protocol personalisation.</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Fasting Glucose"><Input placeholder="e.g. 92 mg/dL" value={bio.fastingGlucose} onChange={upd(setBio)("fastingGlucose")} className="h-10" /></Field>
                <Field label="HbA1c"><Input placeholder="e.g. 5.4%" value={bio.hba1c} onChange={upd(setBio)("hba1c")} className="h-10" /></Field>
                <Field label="Fasting Insulin"><Input placeholder="e.g. 7.2 µIU/mL" value={bio.fastingInsulin} onChange={upd(setBio)("fastingInsulin")} className="h-10" /></Field>
                <Field label="Lipid Panel"><Input placeholder="e.g. LDL 110, HDL 55" value={bio.lipidPanel} onChange={upd(setBio)("lipidPanel")} className="h-10" /></Field>
                <Field label="Testosterone / Estrogen"><Input placeholder="e.g. T: 540 ng/dL" value={bio.hormones} onChange={upd(setBio)("hormones")} className="h-10" /></Field>
                <Field label="IGF-1"><Input placeholder="e.g. 180 ng/mL" value={bio.igf1} onChange={upd(setBio)("igf1")} className="h-10" /></Field>
                <Field label="Thyroid (TSH / T3 / T4)"><Input placeholder="e.g. TSH 2.1, Free T4 1.1" value={bio.thyroid} onChange={upd(setBio)("thyroid")} className="h-10" /></Field>
                <Field label="CRP (Inflammation)"><Input placeholder="e.g. 0.8 mg/L" value={bio.crp} onChange={upd(setBio)("crp")} className="h-10" /></Field>
              </div>
              <Field label="CBC / CMP Notes"><Input placeholder="Notable labs from full blood panel…" value={bio.cbc} onChange={upd(setBio)("cbc")} className="h-10" /></Field>

              {/* Peptide Experience */}
              <SectionHeader label="Peptide Experience" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Experience Level">
                  <SelectField value={experience.level} onChange={upd(setExperience)("level")} options={EXPERIENCE_LEVELS} />
                </Field>
                <Field label="Injection Experience">
                  <SelectField value={experience.injectionExperience} onChange={upd(setExperience)("injectionExperience")} options={["None — first time", "Some experience", "Very comfortable"]} />
                </Field>
              </div>
              <Field label="Previous Peptides Used">
                <Input placeholder="e.g. BPC-157, Ipamorelin, Semaglutide…" value={experience.previousPeptides} onChange={upd(setExperience)("previousPeptides")} className="h-10" />
              </Field>
              <Field label="Responses to Previous Peptides">
                <TextArea placeholder="What worked well? What didn't?" value={experience.responses} onChange={upd(setExperience)("responses")} />
              </Field>
              <Field label="Side Effects Experienced">
                <TextArea placeholder="Any notable side effects from past use…" value={experience.sideEffects} onChange={upd(setExperience)("sideEffects")} rows={2} />
              </Field>

              {/* Goal-Specific */}
              <SectionHeader label="Goal-Specific Inputs" />

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fat Loss</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Target Weight"><Input placeholder="e.g. 165 lbs" value={goalInputs.targetWeight} onChange={upd(setGoalInputs)("targetWeight")} className="h-10" /></Field>
                <Field label="Timeline"><Input placeholder="e.g. 12 weeks" value={goalInputs.timeline} onChange={upd(setGoalInputs)("timeline")} className="h-10" /></Field>
                <Field label="Appetite Issues">
                  <SelectField value={goalInputs.appetiteIssues} onChange={upd(setGoalInputs)("appetiteIssues")} options={["None", "Hyperphagia / overeating", "Poor appetite", "Binge tendencies"]} />
                </Field>
                <Field label="Blood Sugar Concerns">
                  <SelectField value={goalInputs.bloodSugar} onChange={upd(setGoalInputs)("bloodSugar")} options={["None", "Pre-diabetic", "Type 2 diabetic", "Insulin resistant", "Hypoglycemia prone"]} />
                </Field>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-3">Muscle Growth / Recovery</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Training Frequency">
                  <SelectField value={goalInputs.trainingFrequency} onChange={upd(setGoalInputs)("trainingFrequency")} options={["1–2x / week", "3–4x / week", "5–6x / week", "Daily", "Not currently training"]} />
                </Field>
                <Field label="Training Type">
                  <SelectField value={goalInputs.trainingType} onChange={upd(setGoalInputs)("trainingType")} options={TRAINING_TYPES} />
                </Field>
                <Field label="Recovery Quality">
                  <SelectField value={goalInputs.recoveryQuality} onChange={upd(setGoalInputs)("recoveryQuality")} options={["Poor", "Below average", "Average", "Good", "Excellent"]} />
                </Field>
                <Field label="Sleep Duration">
                  <SelectField value={goalInputs.sleepDuration} onChange={upd(setGoalInputs)("sleepDuration")} options={["< 5 hrs", "5–6 hrs", "7–8 hrs", "8+ hrs"]} />
                </Field>
              </div>
              <Field label="Injury History">
                <TextArea placeholder="Current or past injuries relevant to your goal…" value={goalInputs.injuryHistory} onChange={upd(setGoalInputs)("injuryHistory")} rows={2} />
              </Field>

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-3">Longevity / Health Optimisation</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Blood Pressure"><Input placeholder="e.g. 118/76 mmHg" value={goalInputs.bloodPressure} onChange={upd(setGoalInputs)("bloodPressure")} className="h-10" /></Field>
                <Field label="Biological Age Metrics"><Input placeholder="e.g. VO2max, Horvath clock…" value={goalInputs.bioAge} onChange={upd(setGoalInputs)("bioAge")} className="h-10" /></Field>
              </div>
              <Field label="Family Disease History">
                <TextArea placeholder="e.g. heart disease, diabetes, cancer, Alzheimer's…" value={goalInputs.familyHistory} onChange={upd(setGoalInputs)("familyHistory")} rows={2} />
              </Field>

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-3">Cognitive Performance</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Sleep Quality">
                  <SelectField value={goalInputs.sleepQuality} onChange={upd(setGoalInputs)("sleepQuality")} options={["Poor", "Fair", "Good", "Excellent"]} />
                </Field>
                <Field label="Stress Level">
                  <SelectField value={goalInputs.stressLevel} onChange={upd(setGoalInputs)("stressLevel")} options={["Low", "Moderate", "High", "Chronic / Severe"]} />
                </Field>
              </div>
              <Field label="Focus / Productivity Goals">
                <Input placeholder="e.g. improve concentration, reduce brain fog…" value={goalInputs.focusGoals} onChange={upd(setGoalInputs)("focusGoals")} className="h-10" />
              </Field>
              <Field label="Existing Neurological Conditions">
                <Input placeholder="e.g. ADHD, anxiety disorder, TBI history…" value={goalInputs.neurologicalConditions} onChange={upd(setGoalInputs)("neurologicalConditions")} className="h-10" />
              </Field>

              {/* Nav */}
              <div className="flex gap-3 pt-2 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-border/40">
                <Button type="button" variant="outline" onClick={goBack} className="h-10 px-4">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button type="submit" disabled={!step1Valid}
                  className="flex-1 h-10 bg-primary hover:bg-primary/85 text-white text-sm font-bold">
                  <Lock className="w-4 h-4 mr-2" /> Continue to Payment — $10
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}