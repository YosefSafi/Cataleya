import React from "react";
import { motion } from "framer-motion";
import { Palette, Package, Tag, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { icon: Tag,     title: "Custom Labeling",    desc: "Your brand name, logo, and design on every vial and packaging insert." },
  { icon: Package, title: "Custom Packaging",   desc: "Branded boxes, mailers, and inserts designed to your specification." },
  { icon: Palette, title: "Label Design Support", desc: "Our team can help design compliant, professional labels for your brand." },
  { icon: Truck,   title: "Drop Shipping",       desc: "We ship directly to your end customers under your brand name." },
];

const INCLUDED = [
  "Minimum 50 vials per SKU",
  "Your logo and branding on all labels",
  "Custom COA with your company name",
  "NDAs and confidentiality agreements",
  "Same ≥99% purity standards",
  "Full batch documentation provided",
];

export default function WhiteLabelSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">White Label Program</span>
          <h2 className="font-display text-3xl font-light text-foreground mb-3">
            Your Brand. <span className="text-primary italic">Our Quality.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Focus on marketing and sales — let us handle sourcing, manufacturing, and quality control. Available to Preferred Partner and Enterprise accounts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 rounded-xl border border-border/60 bg-secondary/30">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs font-bold text-foreground mb-1">{title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <a href="#apply">
              <Button className="bg-primary hover:bg-primary/90 text-white text-sm font-semibold w-full">
                Inquire About White Label
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-secondary/40 rounded-2xl border border-border/60 p-8">
            <p className="text-sm font-bold text-foreground mb-1">What's Included</p>
            <p className="text-[11px] text-muted-foreground mb-5">All white-label orders include:</p>
            <ul className="space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-xs text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-border/60">
              <p className="text-[11px] text-muted-foreground">
                All white-label products carry the same ≥99% purity guarantee and full third-party batch documentation. NDAs are standard for all white-label arrangements.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}