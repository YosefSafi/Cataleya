import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import PeptideQuickGuide from "@/components/shop/PeptideQuickGuide";

const productImage = "https://media.base44.com/images/public/6a1f4949719273f90329fc44/71cdaa523_generated_8435cc3d.png";

const products = [
  { id: "bpc157",     name: "BPC-157",     dose: "5mg",  price: 49.99,  reviews: 55, inStock: true },
  { id: "tb500",      name: "TB-500",      dose: "5mg",  price: 44.99,  reviews: 48, inStock: true },
  { id: "semaglutide",name: "Semaglutide", dose: "5mg",  price: 89.99,  reviews: 41, inStock: false },
  { id: "tirzepatide",name: "Tirzepatide", dose: "5mg",  price: 99.99,  reviews: 33, inStock: false },
  { id: "pt141",      name: "PT-141",      dose: "10mg", price: 54.99,  reviews: 37, inStock: true },
  { id: "cjc1295",    name: "CJC-1295",    dose: "5mg",  price: 59.99,  reviews: 29, inStock: true },
  { id: "ipamorelin", name: "Ipamorelin",  dose: "5mg",  price: 39.99,  reviews: 44, inStock: true },
  { id: "igf1lr3",    name: "IGF-1 LR3",   dose: "1mg",  price: 79.99,  reviews: 26, inStock: false },
  { id: "ghrp6",      name: "GHRP-6",      dose: "5mg",  price: 34.99,  reviews: 31, inStock: true },
  { id: "selank",     name: "Selank",      dose: "5mg",  price: 49.99,  reviews: 22, inStock: true },
  { id: "sermorelin", name: "Sermorelin",  dose: "5mg",  price: 54.99,  reviews: 38, inStock: true },
  { id: "hexarelin",  name: "Hexarelin",   dose: "5mg",  price: 44.99,  reviews: 19, inStock: true },
];

export default function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-3 block">Full Catalog</span>
        <h1 className="font-display text-3xl lg:text-4xl font-light text-foreground">
          Peptide <span className="text-primary italic">Collection</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
          Research-grade peptides with ≥99% purity. Every batch third-party tested with full COA.
        </p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px w-16 bg-primary/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group"
          >
            <Link to="/product/bpc-157">
              <div className="bg-secondary/40 rounded-xl overflow-hidden aspect-square mb-3 relative border border-border/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:border-primary/30">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/90 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                  ≥99%
                </div>
                {!product.inStock && (
                  <div className="absolute top-2.5 right-2.5 bg-foreground/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Preorder
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {product.name} <span className="text-muted-foreground font-normal text-xs">{product.dose}</span>
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-primary text-primary" />
                ))}
                <span className="text-[11px] text-muted-foreground ml-1">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-primary font-bold text-sm">${product.price.toFixed(2)}</span>
                <span className="text-[11px] font-semibold text-primary/60 uppercase tracking-wider group-hover:text-primary transition-colors">
                  {product.inStock ? "Add →" : "Preorder →"}
                </span>
              </div>
            </Link>
            <PeptideQuickGuide productId={product.id} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}