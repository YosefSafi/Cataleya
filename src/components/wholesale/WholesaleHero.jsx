import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FlaskRound, Building2, GraduationCap, Microscope, Store, Stethoscope, ShieldCheck, Truck, Clock, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHO_FOR = [
  { icon: Microscope,    label: "Research Companies",   desc: "Preclinical and in-vitro research organizations" },
  { icon: FlaskRound,    label: "Laboratories",          desc: "Private and institutional analytical labs" },
  { icon: GraduationCap, label: "Universities",          desc: "Academic research departments and faculty" },
  { icon: Store,         label: "Resellers",             desc: "Distributors and authorized retail partners" },
  { icon: Building2,     label: "Biotech Firms",         desc: "Emerging biotech and life-science companies" },
  { icon: Stethoscope,   label: "Clinics",               desc: "Licensed clinics operating under applicable regulations" },
];

const STATS = [
  { icon: ShieldCheck, value: "≥99%", label: "Guaranteed Purity" },
  { icon: FlaskRound,  value: "3rd Party", label: "Batch Testing" },
  { icon: Truck,       value: "2–5 Days", label: "Standard Lead Time" },
  { icon: Clock,       value: "24 hrs", label: "Quote Response SLA" },
];

export default function WholesaleHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-white to-secondary/40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary/70 mb-4 px-3 py-1.5 bg-primary/8 rounded-full border border-primary/20">
            <Building2 className="w-3 h-3" /> Wholesale Program
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-light text-foreground mb-4 leading-tight">
            Research-Grade Peptides<br />
            <span className="text-primary italic">At Scale</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Partner with Cattleya Labs for reliable bulk supply of ≥99% purity peptides. Dedicated account management, tiered pricing, and full documentation for every order.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#apply">
              <Button className="h-11 px-8 bg-primary hover:bg-primary/90 text-white font-semibold text-sm">
                Apply for Wholesale Account
              </Button>
            </a>
            <a href="#quote">
              <Button variant="outline" className="h-11 px-8 text-sm font-semibold border-primary/30 text-primary hover:bg-primary/5">
                Get Instant Quote
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-xl border border-border/60 p-4 text-center shadow-sm">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Who it's for */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground text-center mb-6">Who This Program Is For</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WHO_FOR.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-white hover:border-primary/30 hover:bg-primary/4 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}