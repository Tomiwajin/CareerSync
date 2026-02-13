"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, CheckCircle2, AlertCircle, Zap } from "lucide-react";

type ModelStatus = "idle" | "waking" | "ready" | "error";

interface ModelStatusBannerProps {
  onStatusChange?: (status: ModelStatus, isReady: boolean) => void;
}

export function ModelStatusBanner({ onStatusChange }: ModelStatusBannerProps) {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const warmupModels = useCallback(async () => {
    setStatus("waking");
    setMessage("Waking up AI models... This may take 30-60 seconds on first use.");
    setIsVisible(true);

    try {
      const response = await fetch("/api/warmup");
      const data = await response.json();

      if (response.ok && data.status === "ready") {
        setStatus("ready");
        setMessage(
          data.wasColdStart
            ? `Models loaded! (took ${Math.round(data.responseTime / 1000)}s)`
            : "Models are ready!"
        );

        // Hide the banner after 3 seconds if models are ready
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to wake up models");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Could not connect to AI models. They may still be starting up.");
    }
  }, []);

  useEffect(() => {
    warmupModels();
  }, [warmupModels]);

  useEffect(() => {
    onStatusChange?.(status, status === "ready");
  }, [status, onStatusChange]);

  if (!isVisible) return null;

  const statusConfig = {
    idle: {
      icon: null,
      bgColor: "bg-gray-50 dark:bg-gray-900",
      borderColor: "border-gray-200 dark:border-gray-700",
      textColor: "text-gray-600 dark:text-gray-400",
    },
    waking: {
      icon: <Loader2 className="h-4 w-4 animate-spin" />,
      bgColor: "bg-amber-50 dark:bg-amber-950",
      borderColor: "border-amber-200 dark:border-amber-800",
      textColor: "text-amber-700 dark:text-amber-300",
    },
    ready: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      textColor: "text-green-700 dark:text-green-300",
    },
    error: {
      icon: <AlertCircle className="h-4 w-4" />,
      bgColor: "bg-red-50 dark:bg-red-950",
      borderColor: "border-red-200 dark:border-red-800",
      textColor: "text-red-700 dark:text-red-300",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 border-b ${config.bgColor} ${config.borderColor} ${config.textColor} text-sm transition-all duration-300`}
    >
      {config.icon}
      <span className="flex-1">{message}</span>
      {status === "waking" && (
        <span className="flex items-center gap-1 text-xs opacity-75">
          <Zap className="h-3 w-3" />
          Fine-tuned models loading
        </span>
      )}
      {status === "error" && (
        <button
          onClick={warmupModels}
          className="text-xs underline hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function useModelStatus() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>("idle");

  const handleStatusChange = useCallback(
    (status: ModelStatus, isReady: boolean) => {
      setModelStatus(status);
      setIsModelReady(isReady);
    },
    []
  );

  return {
    isModelReady,
    modelStatus,
    handleStatusChange,
  };
}
