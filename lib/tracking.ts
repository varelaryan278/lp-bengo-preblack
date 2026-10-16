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

export const appendTrackingContext = (formData: FormData) => {
  const params = new URLSearchParams(window.location.search);
  formData.set("vid", getVisitorId());
  formData.set("utm_source", params.get("utm_source") ?? "");
  formData.set("utm_medium", params.get("utm_medium") ?? "");
  formData.set("utm_campaign", params.get("utm_campaign") ?? "");
  formData.set("referrer", document.referrer);
};
