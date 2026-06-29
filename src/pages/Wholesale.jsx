import React from "react";
import { motion } from "framer-motion";
import WholesaleHero from "@/components/wholesale/WholesaleHero";
import WholesaleTiers from "@/components/wholesale/WholesaleTiers";
import WholesaleQuoteBuilder from "@/components/wholesale/WholesaleQuoteBuilder";
import WholesaleDocPortal from "@/components/wholesale/WholesaleDocPortal";
import WhiteLabelSection from "@/components/wholesale/WhiteLabelSection";
import WholesaleApplicationForm from "@/components/wholesale/WholesaleApplicationForm";

export default function Wholesale() {
  return (
    <div className="bg-white min-h-screen">
      <WholesaleHero />
      <WholesaleTiers />
      <WholesaleQuoteBuilder />
      <WholesaleDocPortal />
      <WhiteLabelSection />
      <WholesaleApplicationForm />
    </div>
  );
}