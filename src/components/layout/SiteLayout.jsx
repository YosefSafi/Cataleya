import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSlideIn from "./CartSlideIn";

export default function SiteLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    }
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + product.qty } : i
        );
      }
      return [...prev, product];
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.reduce((sum, i) => sum + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      <main id="main-content" tabIndex={-1} className="pt-16 lg:pt-20 outline-none">
        <Outlet context={{ addToCart, cartItems }} />
      </main>
      <Footer />
      <CartSlideIn
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onAddToCart={addToCart}
      />
    </div>
  );
}