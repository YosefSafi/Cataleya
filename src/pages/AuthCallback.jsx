import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "@/api/apiClient";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      api.auth.setToken(token);
      window.location.href = "/";
    } else {
      window.location.href = "/login?error=google_no_token";
    }
  }, [searchParams]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground font-body">Signing you in...</span>
      </div>
    </div>
  );
}
