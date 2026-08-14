"use client";
import { DashboardHero } from "@/components/geral/dashboardhero";
import { HealthPreview, LearningPreview, RelationshipPreview, DayPreview, } from "@/components/dashboard";
import { useEffect, useState } from "react";
import { creator } from "@/creator";
import { toast } from "sonner";


export default function DashboardPage() {
  toast("Título da Notificação", {
    description: "A amizade é uma construção constante entre os fortes e os sensíveis.",
  });
  return (
    <main>
      <div>
        <DashboardHero />
      </div>

      <div className='flex gap-2 min-h-0'>
        <div><DayPreview /></div>
        <div ><LearningPreview /></div>

        <div><HealthPreview /></div>
        <div ><RelationshipPreview scale={false} /></div>
    </div>
    </main>
  );
}