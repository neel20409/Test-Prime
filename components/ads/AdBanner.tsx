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
    <div
      className={`my-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/30 p-2 overflow-hidden transition-all ${className}`}
    >
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1">
        <span>Sponsored Educational Partner</span>
        <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
      </div>

      <div className={`flex items-center justify-center w-full ${formatStyles[format]}`}>
        {adsenseId && isProd ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: "60px" }}
            data-ad-client={adsenseId}
            {...(isNumericSlot ? { "data-ad-slot": rawSlot.trim() } : {})}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div
            className={`flex flex-col items-center justify-center text-center p-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 text-slate-400 text-xs shadow-inner w-full h-full`}
          >
            <div className="font-semibold text-slate-300">
              Ad Space ({format})
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
              Live ads will appear here once approved by Google AdSense
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
