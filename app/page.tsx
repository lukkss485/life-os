"use client";

import { Separator } from "@/components/ui/separator";

import { DashboardHero } from "@/components/geral/dashboardhero";
import { creator, FilesPreview, FinancePreview, GoalsPreview, HabitPreview, HealthPreview, LearningPreview, MemoryPreview, ProjectsPreview, RelationshipPreview } from "@/components/dashboard";
import { IdentityPreview } from "@/components/dashboard";
import { useEffect, useState } from "react";



export default function DashboardPage() {
  // lib/weather.ts
  async function getWeatherData() {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=-25.43&longitude=-49.19&current=temperature_2m,weather_code"
      );

      if (!res.ok) {
        throw new Error("Falha ao obter clima");
      }

      const data = await res.json();

      const weatherCode = data.current.weather_code;

      const weatherMap: Record<number, string> = {
        0: "Ensolarado",
        1: "Predominantemente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",

        45: "Nevoeiro",
        48: "Nevoeiro com geada",

        51: "Garoa fraca",
        53: "Garoa moderada",
        55: "Garoa intensa",

        61: "Chuva fraca",
        63: "Chuva moderada",
        65: "Chuva forte",

        71: "Neve fraca",
        73: "Neve moderada",
        75: "Neve forte",

        80: "Pancadas de chuva fracas",
        81: "Pancadas de chuva moderadas",
        82: "Pancadas de chuva fortes",

        95: "Tempestade",
        96: "Tempestade com granizo",
        99: "Tempestade severa com granizo",
      };

      return {
        temp: Math.round(data.current.temperature_2m),
        condition: weatherMap[weatherCode] ?? "Condição desconhecida",
        code: weatherCode,
      };
    } catch (error) {
      console.error(error);

      return {
        temp: 0,
        condition: "Indisponível",
        code: -1,
      };
    }
  }

  const now = new Date();

  const date = now.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  const [weather, setWeather] = useState({ temp: 0, condition: "Carregando..." });

  useEffect(() => {
    async function loadData() {
      const data = await getWeatherData();
      setWeather(data);
    }
    loadData();
  }, []);

  // Para o 'school', se forem dados fixos que mudam apenas por época, 
  // você pode manter como objeto ou buscar de um JSON no seu Storage.
  // Dentro do seu DashboardPage
  const mes = now.getMonth() + 1; // getMonth() retorna 0-11, então +1
  const school = {
    bimestre: `${Math.ceil(mes / 2)}º bimestre`,
    trimestre: mes <= 4 ? "1º Trimestre" : mes <= 8 ? "2º Trimestre" : "3º Trimestre",
    semestre: mes <= 6 ? "1º Semestre" : "2º Semestre",
  };

  return (
    <main className='grid grid-cols-[1fr] grid-rows-[0.3fr_1.7fr] auto-cols-[1fr] gap-[0px 0px] grid-flow-row [grid-template-areas:"top"_"all"]         gap-10'>
      <div className="[grid-area:top]">
        <DashboardHero
          name={creator.name}
          weather={weather}
          date={date}
          time={time}
          school={school}
        />
      </div>

      {/*all*/}

      <div className='grid grid-cols-[1fr] grid-rows-[repeat(2,_0.5fr)_2fr] gap-[0px 0px] grid-flow-row [grid-template-areas:"row1"_"row2"_"parts"] [grid-area:all]        gap-10'>
        <div className='grid grid-cols-[0.9fr_1.1fr] grid-rows-[1fr] gap-[0px 0px] [grid-template-areas:"div1_div2"] [grid-area:row1]             gap-10'>
          <div className="[grid-area:div1]"><IdentityPreview /></div>
          <div className="[grid-area:div2]"><HealthPreview /></div>
        </div>

        <div className='grid grid-cols-[1.1fr_0.9fr] grid-rows-[1fr] gap-[0px 0px] [grid-template-areas:"div1a_div2a"] [grid-area:row2]          gap-10'>
          <div className="[grid-area:div1a]"><LearningPreview /></div>
          <div className="[grid-area:div2a]"><FilesPreview /></div>
        </div>

        <div className='grid grid-cols-[1.9fr_0.5fr_0.6fr_1fr_1fr] grid-rows-[0.5fr_0.7fr_1.0fr_1fr] gap-[0px 0px] [grid-template-areas:"element1_element2_element2_element2_element2"_"element1_element3_element3_element3_element3"_"element1_element4_element4_element5_element5"_"element6_element6_element6_element5_element5"] [grid-area:parts]        gap-10'>
          <div className="[grid-area:element1]"><HabitPreview /></div>
          <div className="[grid-area:element2]"><RelationshipPreview scale={false} /></div>
          <div className="[grid-area:element3]"><GoalsPreview /></div>
          <div className="[grid-area:element4]"><MemoryPreview /></div>
          <div className="[grid-area:element5]"><FinancePreview /></div>
          <div className="[grid-area:element6]"><ProjectsPreview /></div>
        </div>
      </div>
    </main>
  );
}