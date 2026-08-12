// components/dashboard/goals-preview.tsx

import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { PersistentCheckbox } from "./habit-preview";

export function GoalsPreview() {
  var objectives = [
    "começar com free lançe",
    "fazer um robo",
    "dominar o liquid glass",
    "altura",
    "atividades físicas"
  ]
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">
        Objetivos
      </h2>
      <Card className="p-6">
        <Table>
          <TableBody>
            {objectives.map((item, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{item}</TableCell>
                <TableCell><PersistentCheckbox group="c" id={i} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}