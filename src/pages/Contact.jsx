import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="font-display text-3xl lg:text-4xl font-light">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          Have questions about our products or need research support?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">support@cattleyalabs.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">United States</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {sent ? (
            <div className="text-center py-16 bg-secondary/30 rounded-xl">
              <Send className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-medium mb-2">Message Sent</h3>
              <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Name</Label>
                  <Input placeholder="Your name" required className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Email</Label>
                  <Input type="email" placeholder="you@example.com" required className="h-11" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Subject</Label>
                <Input placeholder="How can we help?" required className="h-11" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Message</Label>
                <Textarea placeholder="Tell us more..." rows={5} required />
              </div>
              <Button type="submit" className="h-11 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}