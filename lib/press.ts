export type PressItem = {
  outlet: string;
  title: string;
  date: string;
  url: string;
  image: string;
  imageAlt: string;
  credit: string;
};

export const PRESS: PressItem[] = [
  {
    outlet: "Mercado&Consumo",
    title:
      "Bengô Açaí lança quiosque e planeja abrir 50 unidades nos próximos meses",
    date: "2026-08-25",
    url: "https://mercadoeconsumo.com.br/25/08/2026/franquias/bengo-acai-lanca-quiosque-e-planeja-abrir-50-unidades-nos-proximos-meses/",
    image: "/images/press/mercadoeconsumo.webp",
    imageAlt: "Quiosque Bengô Açaí com mesas e cadeiras na área externa",
    credit: "Divulgação",
  },
  {
    outlet: "Portal do Franchising (ABF)",
    title:
      "Ele começou a vida profissional com trabalho informal e hoje prevê faturar R$ 146 milhões com rede maranhense de açaí",
    date: "2026-05-14",
    url: "https://www.portaldofranchising.com.br/historias-do-franchising/bengo-acai-de-informal-a-146-milhoes-em-faturamento/",
    image: "/images/press/portaldofranchising.webp",
    imageAlt:
      "Rodrigo Cardoso, fundador da Bengô Açaí, ao lado do letreiro da marca",
    credit: "Matheus Pontes",
  },
  {
    outlet: "Movimento Econômico",
    title: "Empreendedor transforma negócio de açaí em rede de R$ 146 milhões",
    date: "2026-04-05",
    url: "https://movimentoeconomico.com.br/empreendedorismo/2026/04/05/empreendedor-transforma-negocio-de-acai-em-rede-de-r-146-milhoes/",
    image: "/images/press/movimentoeconomico.webp",
    imageAlt: "Rodrigo Cardoso, CEO e fundador da Bengô Açaí",
    credit: "Matheus Pontes",
  },
];
