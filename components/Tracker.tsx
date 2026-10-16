"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking";

export const Tracker = () => {
  useEffect(() => {
    track("view");
  }, []);

  return null;
};
