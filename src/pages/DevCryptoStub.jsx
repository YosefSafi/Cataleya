import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bitcoin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/api/apiClient";

// Local-dev stand-in for Coinbase Commerce's hosted checkout page. Only reachable when
// the backend has CRYPTO_PROVIDER unset/stub — lets the full crypto checkout flow be
// tested without a real Coinbase Commerce account.
export default function DevCryptoStub() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      await api.orders.simulatePaid(id);
      navigate(`/order/${id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
        <Bitcoin className="w-7 h-7 text-amber-700" />
      </div>
      <h1 className="font-display text-xl font-light mb-2">Dev Crypto Checkout (Stub)</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This page stands in for Coinbase Commerce's hosted checkout while
        <code className="mx-1 px-1.5 py-0.5 bg-secondary rounded text-xs">CRYPTO_PROVIDER</code>
        is unset on the backend. Set it to <code className="px-1.5 py-0.5 bg-secondary rounded text-xs">coinbase</code> with real
        API keys to go live.
      </p>
      <Button onClick={handleSimulate} disabled={loading} className="h-11 px-6">
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Simulate Payment Confirmed
      </Button>
    </div>
  );
}
