import { creator } from "@/creator";
import {
  CloudSun,
  CalendarDays,
  GraduationCap,
  Laptop,
  MapPin,
  ThermometerSun,
  Code2
} from "lucide-react";
import { GlassElement } from "../GlassElement/GlassElement";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function DayPreview() {
  // Dados mockados ou vindos do seu hook de clima
  const weather = { temp: "17°", condition: "Nublado" };

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Dia hoje & Identidade
      </h2>
      

      <Card className="relative p-6 overflow-hidden">




        <div className="flex justify-between items-start mb-6">
          <Card className="flex flex-row items-center gap-1.5 px-3 py-1 right-0 rounded-full bg-card/10 backdrop-blur-[2px]  border border-neutral-300/50 dark:border-neutral-700/50 text-xs text-neutral-900 dark:text-neutral-300">
            <ThermometerSun size={16} className="text-orange-500" />
            <span className="text-neutral-600">|</span>
            <span>26 de Junho</span>
          </Card>
          {/* Badge de Clima */}
          <Card className="flex flex-row items-center gap-1.5 px-3 py-1 right-0 rounded-full bg-card/10 backdrop-blur-[2px]  border border-neutral-300/50 dark:border-neutral-700/50 text-xs text-neutral-900 dark:text-neutral-300">
            <CloudSun size={14} className="text-amber-400" />
            <span>{weather.temp}</span>
            <span className="text-neutral-600">|</span>
            <span>{weather.condition}</span>
          </Card>

        </div>
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{creator.name}</p>
            </div>
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <CalendarDays size={16} className="text-emerald-500" />
              <span>{creator.age} anos • {creator.school}º ano</span>
            </div>

          </div>
          <Link href="/identity">
            <Button className="backdrop-blur-2xl w-fit ml-auto " variant='outline'>Ver identidade</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}