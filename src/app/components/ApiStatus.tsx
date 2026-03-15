import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ApiStatus() {
  const [status, setStatus] = useState<{
    backend: "checking" | "ok" | "error";
    apiKey: "checking" | "ok" | "error";
    liveData: "checking" | "ok" | "error";
    details?: any;
  }>({
    backend: "checking",
    apiKey: "checking",
    liveData: "checking",
  });

  const checkStatus = async () => {
    setStatus({
      backend: "checking",
      apiKey: "checking",
      liveData: "checking",
    });

    try {
      // Check backend health
      const healthRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/health`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const backendStatus = healthRes.ok ? "ok" : "error";

      // Check API key
      const apiKeyRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/test-api`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const apiKeyData = await apiKeyRes.json();
      const apiKeyStatus = apiKeyData.apiKeySet ? "ok" : "error";

      // Check live data
      const liveDataRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ed1dd9fb/matches/live`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      const liveDataStatus = liveDataRes.ok ? "ok" : "error";
      const liveData = await liveDataRes.json();

      setStatus({
        backend: backendStatus,
        apiKey: apiKeyStatus,
        liveData: liveDataStatus,
        details: {
          apiKeyPrefix: apiKeyData.apiKeyPrefix,
          liveDataResponse: liveData,
        },
      });
    } catch (error) {
      console.error("Error checking API status:", error);
      setStatus({
        backend: "error",
        apiKey: "error",
        liveData: "error",
        details: { error: String(error) },
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getStatusIcon = (state: "checking" | "ok" | "error") => {
    switch (state) {
      case "checking":
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />;
      case "ok":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (state: "checking" | "ok" | "error") => {
    switch (state) {
      case "checking":
        return <Badge className="bg-yellow-500/20 text-yellow-500">Checking</Badge>;
      case "ok":
        return <Badge className="bg-emerald-500/20 text-emerald-500">OK</Badge>;
      case "error":
        return <Badge className="bg-red-500/20 text-red-500">Error</Badge>;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">API Status</h3>
        <button
          onClick={checkStatus}
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          title="Refresh status"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.backend)}
            <span className="text-sm text-slate-300">Backend Server</span>
          </div>
          {getStatusBadge(status.backend)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.apiKey)}
            <span className="text-sm text-slate-300">RapidAPI Key</span>
          </div>
          {getStatusBadge(status.apiKey)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(status.liveData)}
            <span className="text-sm text-slate-300">Live Data Feed</span>
          </div>
          {getStatusBadge(status.liveData)}
        </div>
      </div>

      {status.details && (
        <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
          <p className="text-xs text-slate-400 mb-1">Debug Info:</p>
          <pre className="text-xs text-slate-300 overflow-auto">
            {JSON.stringify(status.details, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
