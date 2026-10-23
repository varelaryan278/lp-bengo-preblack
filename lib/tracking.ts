const VID_KEY = "bengo_vid";

export const getVisitorId = () => {
  try {
    const current = localStorage.getItem(VID_KEY);
    if (current) return current;
    const vid = crypto.randomUUID();
    localStorage.setItem(VID_KEY, vid);
    return vid;
  } catch {
    return "anon";
  }
};

export const track = (type: "view" | "human" | "form_start" | "redirect") => {
  const payload = JSON.stringify({ type, vid: getVisitorId() });
  if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
  else fetch("/api/track", { method: "POST", body: payload, keepalive: true });
};

export const trackMetaLead = (eventId: string) => {
  const { fbq } = window as Window & {
    fbq?: (command: "track", event: "Lead", data: Record<string, never>, options: { eventID: string }) => void;
  };
  fbq?.("track", "Lead", {}, { eventID: eventId });
};
