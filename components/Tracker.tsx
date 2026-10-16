"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

const HUMAN_EVENTS = ["pointermove", "scroll", "touchstart", "keydown"] as const;

export const Tracker = () => {
  useEffect(() => {
    if (navigator.webdriver) return;
    track("view");

    const onHuman = () => {
      HUMAN_EVENTS.forEach((e) => window.removeEventListener(e, onHuman));
      track("human");
    };
    HUMAN_EVENTS.forEach((e) => window.addEventListener(e, onHuman, { passive: true }));
    return () => HUMAN_EVENTS.forEach((e) => window.removeEventListener(e, onHuman));
  }, []);

  return null;
};
