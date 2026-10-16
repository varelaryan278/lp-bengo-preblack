import { LIVE_DATE } from "./event";

export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE = {
  name: "Pré-Black Bengô Açaí",
  title: "Pré-Black Bengô Açaí · Live exclusiva para futuros franqueados",
  shortTitle: "Pré-Black Bengô Açaí",
  description:
    "Live exclusiva da Pré-Black Bengô Açaí: a franquia de açaí que mais cresce no Brasil libera, ao vivo, a condição de franquia mais agressiva do ano. Entre no grupo VIP e garanta seu acesso.",
  keywords: [
    "franquia de açaí",
    "Bengô Açaí",
    "black friday franquia",
    "pré-black",
    "franquia barata",
    "abrir franquia",
    "franquia lucrativa",
    "franquia de sorvete",
    "investir em franquia",
    "live franquia",
  ],
  liveDate: LIVE_DATE,
};
