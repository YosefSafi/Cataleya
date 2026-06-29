import React, { useState } from "react";
import { Star, Minus, Plus, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProductInfo({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted-foreground font-body">
        <span className="hover:text-foreground cursor-pointer">Home</span>
        <span>/</span>
        <span className="hover:text-foreground cursor-pointer">Shop</span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Title */}
      <h1 className="font-display text-3xl lg:text-4xl font-light tracking-tight text-foreground">
        {product.name}
      </h1>

      {/* Price & Rating */}
      <div className="flex items-center justify-between">
        <span className="text-3xl font-body font-semibold text-primary">
          ${product.price.toFixed(2)}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(5.0)</span>
          <span className="text-sm text-muted-foreground">55 reviews</span>
        </div>
      </div>

      {product.inStock === false && (
        <div className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          Currently out of stock — preorder now. {product.preorderEta || "Ships when restocked."}
        </div>
      )}

      <div className="h-px bg-border" />

      {/* Research Studies */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Research Studies
        </h3>
        <ul className="space-y-2">
          {product.studies.map((study, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
              {study}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px bg-border" />

      {/* Quantity & Add to Cart */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Quantity
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => onAddToCart({ ...product, qty, preorder: product.inStock === false })}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold uppercase tracking-wider text-sm"
            >
              {product.inStock === false ? "Preorder Now" : "Add to Cart"}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs font-semibold">Secure Checkout</p>
            <p className="text-[10px] text-muted-foreground">SSL Encrypted</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50">
          <Truck className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs font-semibold">Free Shipping</p>
            <p className="text-[10px] text-muted-foreground">Orders over $200</p>
          </div>
        </div>
      </div>
    </div>
  );
}