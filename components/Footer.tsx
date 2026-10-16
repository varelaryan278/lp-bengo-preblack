import Image from "next/image";

export const Footer = () => (
  <footer className="border-t border-white/5 bg-noite px-4 pb-28 pt-10 sm:px-6 md:pb-10">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-white/40 md:flex-row md:items-start md:justify-between">
      <Image src="/images/logo-bengo.png" alt="Bengô Açaí" width={150} height={35} className="h-auto w-28 opacity-80" />
      <p className="max-w-2xl text-xs leading-relaxed">
        Valores de faturamento e margem são estimativas informadas pela franqueadora e não constituem promessa de rentabilidade.
        Investimento inicial a partir de R$ 100 mil no formato quiosque; o modelo loja parte de R$ 250 mil, variável conforme ponto e obras
        civis. Projeção de faturamento da rede para 2026 é estimativa da empresa. Informações completas na Circular de Oferta de Franquia
        (COF), conforme Lei nº 13.966/2019.
      </p>
    </div>
  </footer>
);
