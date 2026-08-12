'use client'
import { GlassElement } from "@/components/GlassElement/GlassElement";
import { Atom, CheckCircle2, Circle, Clock, Code2, Laptop, Layers, Target, } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { PersistentCheckbox } from "./habit-preview";
import { Separator } from "../ui/separator";
import { creator } from "@/creator";
import { SkillCarousel } from "../ui/SkillCarousel";

export function LearningPreview() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalizar o design do Liquid Glass" },
    { id: 2, title: "Refatorar componentes de Identity" },
    { id: 3, title: "Integrar API de meteorologia" },
  ]);
  const skills = [
    { name: "Front-end", icon: Layers, color: "emerald" },
    { name: creator.programation.like.join(", "), icon: Laptop, color: "emerald" },
    { name: "React", icon: Atom, color: "blue" },
    { name: creator.programation.languages.join(", "), icon: Code2, color: "indigo" },
  ];
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Aprendizado
      </h2>

      <Card
        className="p-0 max-w-220!"
      >
        <div className=" flex flex-row gap-3 items-center max-h-500!">
          <SkillCarousel skills={skills} />
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Target className="text-blue-500" /> Tarefas
        </h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 group">
              <PersistentCheckbox group="b" id={task.id} />
              <span className="text-sm font-medium transition-all text-neutral-900 dark:text-neutral-100 data-[state=checked]:line-through data-[state=checked]:text-neutral-500">
                {task.title}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span className="flex items-center gap-1"><Clock size={12} /> 12h:00</span>
          </div>
        </div>
      </Card>
    </section>
  );
}