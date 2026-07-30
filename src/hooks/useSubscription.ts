"use client";

import { useState, useEffect, useCallback } from "react";

export type PlanType = "free" | "basico" | "premium" | null;

interface SubscriptionData {
  plan: PlanType;
  planName: string;
  subscriptionId: string;
  activatedAt: string;
  expiresAt: string;
}

const STORAGE_KEY = "ipf_subscription";

function getStored(): SubscriptionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: SubscriptionData = JSON.parse(raw);
    // Check if expired
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSubscription(getStored());
    setLoading(false);
  }, []);

  const activate = useCallback(
    (planName: string, subscriptionId: string, expiresAt: string) => {
      let plan: PlanType = "basico";
      if (planName.toLowerCase().includes("premium")) plan = "premium";
      else if (planName.toLowerCase().includes("básico") || planName.toLowerCase().includes("basico")) plan = "basico";

      const data: SubscriptionData = {
        plan,
        planName,
        subscriptionId,
        activatedAt: new Date().toISOString(),
        expiresAt,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSubscription(data);
    },
    []
  );

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSubscription(null);
  }, []);

  const plan = subscription?.plan ?? "free";

  const canRead = true; // Todos pueden leer (incluso sin plan)
  const canDownload = plan === "premium" || plan === "free"; // Premium y free descargan, basico NO

  return {
    plan,
    subscription,
    loading,
    activate,
    clear,
    canRead,
    canDownload,
    isSubscribed: plan !== null,
    isPremium: plan === "premium",
    isBasic: plan === "basico",
  };
}
