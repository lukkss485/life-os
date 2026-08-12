// components/geral/dashboard-hero.tsx
import { creator } from "@/creator";
 

interface DashboardHeroProps {
  name: string;
  weather?: {
    temp: number;
    condition: string;
  };

  date: string;
  time: string;

  school?: {
    bimestre: string;
    trimestre: string;
    semestre: string;
  };
}

export function DashboardHero({
  name,
  weather,
  date,
  time,
  school,
}: DashboardHeroProps) {
  return (
    <section className="space-y-2">
      <h1 className="text-4xl font-bold">
        Olá, {name} 👋
      </h1>
      <div className="flex gap-4">
        {weather && (
          <p className="text-muted-foreground">
            {weather.temp}° • {weather.condition}
          </p>
        )}

        <p className="text-muted-foreground">
          {time}
        </p>

        <p className="text-muted-foreground">
          {date}
        </p>

        {school && (
          <p className="text-muted-foreground">
            {school.bimestre} • {school.trimestre} • {school.semestre}
          </p>
        )}
      </div>
    </section>
  );
}