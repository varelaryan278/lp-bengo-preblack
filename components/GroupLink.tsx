"use client";

import type { ReactNode } from "react";
import { WHATSAPP_GROUP_URL } from "@/lib/event";
import { track, trackMetaLead } from "@/lib/tracking";

export const GroupLink = ({ className, children }: { className?: string; children: ReactNode }) => {
  const handleClick = () => {
    trackMetaLead(crypto.randomUUID());
    track("redirect");
  };

  return (
    <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
