import React from "react";

export default function DisclaimerBanner() {
  return (
    <div className="mt-8 p-4 bg-secondary/50 rounded-md border border-border/50">
      <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-wide">
        All articles and product information provided on this website are for informational and educational purposes only.
        The products offered on this website are intended solely for research and laboratory use. These products are not
        intended for human or animal consumption. They are not medicines or drugs and have not been evaluated or approved
        by the FDA to diagnose, treat, cure, or prevent any disease or medical condition.
      </p>
    </div>
  );
}