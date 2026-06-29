import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const relatedProducts = [
  { id: "tb500",      name: "TB-500",      dose: "5mg",  price: 44.99, rating: 5.0 },
  { id: "semaglutide",name: "Semaglutide", dose: "5mg",  price: 89.99, rating: 5.0 },
  { id: "pt141",      name: "PT-141",      dose: "10mg", price: 54.99, rating: 5.0 },
  { id: "ipamorelin", name: "Ipamorelin",  dose: "5mg",  price: 39.99, rating: 5.0 },
];

export default function RelatedProducts({ productImage }) {
  return (
    <section className="py-16 lg:py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl lg:text-3xl font-light text-foreground">
            Related Products
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Consider these supplementary peptides for a comprehensive research approach.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-secondary/30 rounded-lg overflow-hidden aspect-square mb-3 relative">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-sm">{product.name} <span className="text-muted-foreground font-normal text-xs">{product.dose}</span></h3>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.rating})</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                <Button variant="outline" size="sm" className="text-xs h-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Add to cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}