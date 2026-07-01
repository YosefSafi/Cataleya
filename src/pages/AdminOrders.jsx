import React, { useEffect, useState, useCallback } from "react";
import { Loader2, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/api/apiClient";

const STATUS_FILTERS = [
  { value: "pending_payment", label: "Pending Payment" },
  { value: "paid", label: "Paid" },
  { value: "", label: "All" },
];

export default function AdminOrders() {
  const { user, isLoadingAuth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending_payment");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingId, setMarkingId] = useState(null);

  const isAdmin = user?.role === "admin";

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.orders.adminList(statusFilter);
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const handleMarkPaid = async (id) => {
    setMarkingId(id);
    try {
      await api.orders.markPaid(id);
      await load();
    } catch (err) {
      setError(err.message || "Failed to mark order paid");
    } finally {
      setMarkingId(null);
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <ShieldAlert className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-light mb-2">Admin access required</h1>
        <p className="text-sm text-muted-foreground">
          You need an administrator account to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
      <h1 className="font-display text-3xl font-light mb-2">Order Management</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Confirm Zelle payments here once the funds land in your account (match by the
        memo, which is the order's short ID).
      </p>

      <div className="flex items-center gap-2 mb-6">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              statusFilter === f.value
                ? "bg-primary text-white border-primary"
                : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={load}
          className="ml-auto text-xs font-semibold text-primary hover:underline"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-border/40 bg-secondary/20">
          <p className="text-sm text-muted-foreground">No orders found for this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isPaid = order.status === "paid";
            return (
              <div
                key={order.id}
                className="rounded-xl border border-border/60 bg-white p-4 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                        order.payment_method === "zelle"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {order.payment_method}
                    </span>
                    {isPaid ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700">
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">
                    {order.full_name} · {order.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className="text-lg font-bold text-primary">
                    ${Number(order.total).toFixed(2)}
                  </span>
                  {!isPaid && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkPaid(order.id)}
                      disabled={markingId === order.id}
                      className="h-8 text-xs"
                    >
                      {markingId === order.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "Mark Paid"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
