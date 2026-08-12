"use client";
import { DashboardHero } from "@/components/geral/dashboardhero";
import { FilesPreview, FinancePreview, GoalsPreview, HabitPreview, HealthPreview, LearningPreview, LinksPreview, MemoryPreview, ProjectsPreview, RelationshipPreview, DayPreview, CodePreview } from "@/components/dashboard";
import { useEffect, useState } from "react";
import { creator } from "@/creator";
import { toast } from "sonner";


/** Corpo principal do dashboard — separado só pra deixar o page.tsx focado em dados */
function DashboardGrid() {
  return (
    <div className='[grid-area:all] grid grid-cols-[1fr] grid-rows-[0.2fr_0.2fr_1.4fr_0.5fr] grid-flow-row [grid-template-areas:"row1"_"row2"_"parts"_"conte"] gap-2 min-h-0'>
  {/* Linha 1: dia + saúde */}
  <div className='[grid-area:row1] grid grid-cols-[0.9fr_1.1fr] grid-rows-[1fr] [grid-template-areas:"div1_div2"] gap-2 max-[700px]:flex max-[700px]:flex-col'>
    <div className="[grid-area:div1]"><DayPreview /></div>
    <div className="[grid-area:div2]"><HealthPreview /></div>
  </div>

  {/* Linha 2: aprendizado + relacionamentos */}
  <div className='[grid-area:row2] grid grid-cols-[1.1fr_0.9fr] grid-rows-[1fr] [grid-template-areas:"div1a_div2a"] gap-2 max-[700px]:flex max-[700px]:flex-col'>
    <div className="[grid-area:div1a]"><LearningPreview /></div>
    <div className="[grid-area:div2a]"><RelationshipPreview scale={false} /></div>
  </div>
</div>
  );
}

export default function DashboardPage() {
  // lib/weather.ts
  const DASHBOARD_COORDS = { latitude: -25.43, longitude: -49.19 };

  const WEATHER_CODE_MAP: Record<number, string> = {
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

  type WeatherData = {
    temp: number;
    condition: string;
    code: number;
  };
  const INITIAL_WEATHER: WeatherData = { temp: 0, condition: "Carregando...", code: -1 };

function useWeather() {
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);

  useEffect(() => {
    getWeatherData().then(setWeather);
  }, []);

  return weather;
}
  function useClock() {
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

    // Alinha o próximo tick com a virada do minuto, depois repete a cada 60s
    const now = new Date();
    const msUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    const timeout = setTimeout(() => {
      update();
      const interval = setInterval(update, 60000);
      // guarda o interval pra limpar no cleanup do timeout
      (timeout as any)._interval = interval;
    }, msUntilNextMinute);

    return () => {
      clearTimeout(timeout);
      if ((timeout as any)._interval) clearInterval((timeout as any)._interval);
    };
  }, []);

  return time;
}
  async function getWeatherData(): Promise<WeatherData> {
    try {
      const { latitude, longitude } = DASHBOARD_COORDS;
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );

      if (!res.ok) throw new Error("Falha ao obter clima");

      const data = await res.json();
      const weatherCode = data.current.weather_code;

      return {
        temp: Math.round(data.current.temperature_2m),
        condition: WEATHER_CODE_MAP[weatherCode] ?? "Condição desconhecida",
        code: weatherCode,
      };
    } catch (error) {
      console.error(error);
      return { temp: 0, condition: "Indisponível", code: -1 };
    }
  }

  function getSchoolPeriod(date: Date) {
  const mes = date.getMonth() + 1; // 1-12

  return {
    bimestre: `${Math.ceil(mes / 2)}º bimestre`,
    trimestre:
      mes <= 4 ? "1º Trimestre" : mes <= 8 ? "2º Trimestre" : "3º Trimestre",
    semestre: mes <= 6 ? "1º Semestre" : "2º Semestre",
  };
}
  const now = new Date();
  const date = now.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = useClock();
  const weather = useWeather();
  const school = getSchoolPeriod(now);

    toast("Título da Notificação", {
      description: "A amizade é uma construção constante entre os fortes e os sensíveis.",
    });
  return (
    <main className='h-dvh grid grid-cols-[1fr] grid-rows-[0.3fr_1.7fr] auto-cols-[1fr] grid-flow-row [grid-template-areas:"top"_"all"] gap-2.5 p-2.5 overflow-hidden'>
  <div className="[grid-area:top]">
    <DashboardHero name={creator.name} weather={weather} date={date} time={time} school={school} />
  </div>

      <DashboardGrid />
    </main>
  );
}