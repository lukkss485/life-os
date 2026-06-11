
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
    "fazer trabalho",
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
        <Table>
          <TableBody className="
            overflow-y-hidden">
            {habits.map((habits, index) => (
              <TableRow key={habits}>
                <TableCell className="font-medium">{habits}</TableCell>
                <TableCell><PersistentCheckbox id={index} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

import { useStorage } from "@/lib"; // Ajuste o caminho se necessário
import { useEffect, useState } from "react";

export function PersistentCheckbox({ id }: { id: number }) {
  const checkboxKey = `checkbox-${id}`;
  const { valor, addData } = useStorage("package1", checkboxKey);
  const [checked, setChecked] = useState(false);

  // Use um estado para garantir que já tentamos carregar
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (valor !== null && valor !== undefined) {
      setChecked(String(valor) === "true");
      setLoaded(true);
    }
  }, [valor, id]);

  const toggle = async (novoEstado: boolean) => {
    setChecked(novoEstado);
    // Tenta salvar diretamente
    await addData({ [checkboxKey]: novoEstado });
  };

  return <Checkbox checked={checked} onCheckedChange={toggle} />;
}