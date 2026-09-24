"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface AdBannerProps {
  slot?: string;
  slotId?: string;
  format?: "leaderboard" | "sidebar" | "in-solution" | "in-article";
  className?: string;
}

export function AdBanner({
  slot,
  slotId,
  format = "leaderboard",
  className = "",
}: AdBannerProps) {
  const rawSlot = slotId || slot || "";
  const isNumericSlot = /^\d+$/.test(rawSlot.trim());
  const isProd = process.env.NODE_ENV === "production";
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-8023550227126773";
  const pushedRef = useRef(false);

  const formatStyles = {
    leaderboard: "w-full max-w-[728px] min-h-[90px]",
    sidebar: "w-full max-w-[300px] min-h-[250px] md:min-h-[400px]",
    "in-solution": "w-full max-w-[650px] min-h-[110px]",
    "in-article": "w-full max-w-[650px] min-h-[110px]",
  };

  useEffect(() => {
    if (isProd && adsenseId && !pushedRef.current) {
      try {
        if (typeof window !== "undefined") {
          ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
            (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        console.error("AdSense push error:", err);
      }
    }
  }, [isProd, adsenseId]);

  return (
    <div className={`my-4 flex items-center justify-center overflow-hidden transition-all ${className}`}>
      {adsenseId && isProd && (
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={adsenseId}
          {...(isNumericSlot ? { "data-ad-slot": rawSlot.trim() } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
