"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const INTRO_KEY = "xviin:intro-seen";
const AUTO_DISMISS_MS = 6000;
const FADE_MS = 500;

function readSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* storage unavailable: intro simply shows again next time */
  }
}

/**
 * Full-screen intro shown once per session. Placeholder visuals — the real intro
 * replaces the inner content later; dismissal behaviour stays the same.
 * Mounted client-side only, so no-JS visitors and crawlers see the site directly.
 */
export function IntroGate() {
  const t = useTranslations("intro");
  const [state, setState] = useState<"hidden" | "shown" | "leaving">("hidden");

  useEffect(() => {
    if (!readSeen()) setState("shown");
  }, []);

  const dismiss = useCallback(() => {
    markSeen();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setState("hidden");
      return;
    }
    setState("leaving");
    window.setTimeout(() => setState("hidden"), FADE_MS);
  }, []);

  useEffect(() => {
    if (state !== "shown") return;
    const timer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, dismiss]);

  if (state === "hidden") return null;

  return (
    <div
      data-testid="intro-gate"
      role="button"
      tabIndex={0}
      aria-label={t("hint")}
      onClick={dismiss}
      className={`fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-bg px-4 transition-opacity duration-500 ${
        state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-3xl">
        <div className="text-7xl font-extrabold tracking-tight [text-shadow:0_0_30px_rgba(255,255,255,0.35)] sm:text-9xl">
          XVIIn
        </div>
        <div className="mt-8 h-px w-full bg-fg/80" />
        <div className="mt-4 font-mono text-sm text-muted">{t("hint")}</div>
      </div>
    </div>
  );
}
