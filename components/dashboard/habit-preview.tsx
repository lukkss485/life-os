
"use client";

// components/dashboard/habit-preview.tsx

import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Table, TableBody, TableCell, TableCaption, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";

export function HabitPreview() {
  const habits = [
    "tomar café da manhã",
    "se arrumar",
    "ir para escola",
    "comer almoço",
    "descançar",
    "tomar banho",
    "trocar de roupas",
    "fazer atividades",
    "chegar em casa",
    "tomar agua",
    "ir para o computador",
    "programar",
    "fazer trabalho/ou não",
    "iniciar atividade de dormir",
    "fazer nessesidades",
    "escovar os dentes",
    "arrumar a cama",
    "desligar o computador (ou video game)",
    "dormir"
  ]
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">
        Hábitos
      </h2>
      <Card className="p-5">
        <Table className="w-full caption-bottom text-sm [&_tr:last-child]:rounded-b-xl [&_tr:first-child]:rounded-t-xl">
          <TableBody className="[&_tr:last-child]:border-0 [&_tr:first-child]:rounded-t-xl">
            {habits.map((habit, index) => (
              <TableRow key={habit}>
                <TableCell className="font-medium">{habit}</TableCell>
                <TableCell><PersistentCheckbox group="a" id={index} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
// lib/utils.ts
export function toBase26(num: number): string {
  let str = "";
  while (num >= 0) {
    str = String.fromCharCode((num % 26) + 97) + str;
    num = Math.floor(num / 26) - 1;
  }
  return str;
}

// components/dashboard/PersistentCheckbox.tsx
import { useStorage } from "@/lib"; // ajuste o caminho conforme seu projeto
import { useEffect, useState } from "react";

export function PersistentCheckbox({ id, group, className }: { id: number, group: string, className?: string }) {
  // back-end
  // Gera o ID em letras: ex: group="a" + id=0 -> "a:a" | group="a" + id=1 -> "a:b"
  const letterId = toBase26(id);
  const checkboxKey = `checkbox-${letterId}-${group}`;
  // Usamos o grupo como parte da chave no storage
  const { valor, addData } = useStorage("package1.json", checkboxKey); 
  // ele continuará funcionando perfeitamente pois a chave agora é única.
  

  // front-end
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (valor !== null && valor !== undefined) {
      setChecked(String(valor) === "true");
    }
  }, [valor]);

  const toggle = async (newState: boolean) => {
    setChecked(newState);
    await addData({ [checkboxKey]: newState });
  };

  return <Checkbox checked={checked} onCheckedChange={toggle} className={className} />;
}