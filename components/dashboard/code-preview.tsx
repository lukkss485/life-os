'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Field, FieldLabel } from "@/components/ui/field";
import { GlassElement } from "@/components/GlassElement/GlassElement";
import { Code2 } from "lucide-react";
import { Card } from "../ui/card";

export function CodePreview() {
  const progressbar1 = 10;
  const progressbar2 = 100;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Código</h2>

      <Card className=" p-6">
        <Tabs defaultValue="header" className="w-full h-full flex flex-col">
          <TabsList className="mb-0 bg-neutral-300/50 dark:bg-neutral-950/20">
            <TabsTrigger className="translate-y-[-1.5px]  data-[state=active]:bg-white/50 data-[state=active]:text-black dark:data-[state=active]:bg-black/25 dark:data-[state=active]:text-white" value="header">Header.tsx</TabsTrigger>
            <TabsTrigger className="translate-y-[-1.5px]  data-[state=active]:bg-white/50 data-[state=active]:text-black dark:data-[state=active]:bg-black/25 dark:data-[state=active]:text-white" value="utils">Utils.ts</TabsTrigger>
          </TabsList>

          <TabsContent value="header" className="mb-0 mt-0">
            <CodeProgress value={progressbar1} />
          </TabsContent>

          <TabsContent value="utils" className="mb-0 mt-0">
            <CodeProgress value={progressbar2} />
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
}

// Sub-componente para limpar a repetição
function CodeProgress({ value }: { value: number }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 border border-neutral-800/50 border-dashed rounded-2xl h-full">
      <Field className="w-full">
        <FieldLabel className="flex justify-between text-neutral-400 mb-2">
          <span>Progresso de implementação</span>
          <span className="font-mono text-neutral-600 dark:text-neutral-400">{value}%</span>
        </FieldLabel>
        <Progress value={value} className="h-2 bg-neutral-200 dark:bg-neutral-800 " />
      </Field>
      <p className="text-xs text-neutral-500 italic">
        {value === 100 ? "✓ Concluído com sucesso." : "Trabalhando no arquivo..."}
      </p>
    </div>
  );
}