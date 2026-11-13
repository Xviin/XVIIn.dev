"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

export const INTRO_KEY = "xviin:intro-seen";
const PENDING_CLASS = "intro-pending";
const AUTO_DISMISS_MS = 6000;
const FADE_MS = 500;

/**
 * Runs in <head> before first paint. Only a hard load of the home page by a visitor
 * who has not seen the intro this session gets the `intro-pending` class; CSS shows
 * the server-rendered overlay only under that class, so there is no content flash,
 * no-JS visitors see the site, and client navigation never pops the intro.
 */
export const introBootScript = `(function(){try{var p=location.pathname.replace(/\\/$/,"")||"/";if((p==="/"||p==="/tr")&&sessionStorage.getItem("${INTRO_KEY}")!=="1"){document.documentElement.classList.add("${PENDING_CLASS}")}}catch(e){}})();`;

const noopSubscribe = () => () => {};
const readPending = () => document.documentElement.classList.contains(PENDING_CLASS);

function finish() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* storage unavailable: intro simply shows again next time */
  }
}

/** Full-screen intro. Placeholder visuals — the real intro replaces the inner content later. */
export function IntroGate() {
  const t = useTranslations("intro");
  // Server snapshot = pending, so the overlay markup is in the HTML (hidden by CSS unless pending).
  const pending = useSyncExternalStore(noopSubscribe, readPending, () => true);
  const [phase, setPhase] = useState<"idle" | "leaving" | "done">("idle");

  const dismiss = useCallback(() => {
    finish();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const end = () => {
      document.documentElement.classList.remove(PENDING_CLASS);
      setPhase("done");
    };
    if (reduce) return end();
    setPhase("leaving");
    window.setTimeout(end, FADE_MS);
  }, []);

  const active = pending && phase === "idle";

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    const onKey = () => dismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, dismiss]);

  if (phase === "done" || (!pending && phase === "idle")) return null;

  return (
    <div
      data-testid="intro-gate"
      data-intro-gate=""
      role="button"
      tabIndex={0}
      aria-label={t("hint")}
      onClick={dismiss}
      className={`fixed inset-0 z-50 cursor-pointer items-center justify-center bg-bg px-4 transition-opacity duration-500 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand-rozet.svg" alt="XVIIn" width={760} height={380} className="mx-auto w-full max-w-2xl h-auto" />
        <span className="sr-only">XVIIn</span>
        <div className="mt-8 h-px w-full bg-fg/80" />
        <div className="mt-4 font-mono text-sm text-muted">{t("hint")}</div>
      </div>
    </div>
  );
}
