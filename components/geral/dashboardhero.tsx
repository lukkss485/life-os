// components/geral/dashboard-hero.tsx
import { creator } from "@/creator";
import { useEffect, useState } from "react";


export function DashboardHero() {
  const [dadosData, setDadosData] = useState({
    dataStr: "",
    horaStr: "",
    diaDaSemana: "",
    trimestre: 1,
    bimestre: 1,
  });
  useEffect(() => {
    const atualizarHorario = () => {
      const agora = new Date();

      const dataStr = agora.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const horaStr = agora.toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "2-digit",
      });

      const diaDaSemana = agora.toLocaleString("pt-BR", { weekday: "long" });
      const mesAtual = agora.getMonth() + 1;
      const trimestre = Math.ceil(mesAtual / 3);
      const bimestre = Math.ceil(mesAtual / 2) - 1;

      setDadosData({ dataStr, horaStr, diaDaSemana, trimestre, bimestre });
    };

    atualizarHorario();
    const intervalo = setInterval(atualizarHorario, 1000);
    return () => clearInterval(intervalo);
  }, []);
  return (
    <div className="gap-5 flex flex-col">
      <h1 className="text-2xl text-layer1 font-bold capitalize font-heading">
        Olá, {creator.name}! seja bem vindo(a)!
      </h1>
      <div className="">
        <h3 className="text-xl text-card-foreground/55 font-medium capitalize">
          {dadosData.dataStr} , {dadosData.diaDaSemana} , {dadosData.horaStr}
        </h3>
        <p className="text-shadow-xs text-card-foreground/55 font-medium capitalize">
          {dadosData.trimestre}º Trimestre , {dadosData.bimestre}º Bimestre
        </p>
      </div>
    </div>
  );
}