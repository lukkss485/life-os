// components/dashboard/projects-preview.tsx
import { Card } from "../ui/card";
import { Table, TableBody, TableRow, TableCell} from "../ui/table";

const PROJETOS = [
  { nome: "Dashboard pessoal", status: "Em andamento" },
  { nome: "Biblioteca de Storage", status: "Concluído" },
  { nome: "Site Portfólio", status: "404" },
];

export function ProjectsPreview() {
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">Projetos</h2>
      <Card className="p-5">
        <Table>
          <TableBody>
          {PROJETOS.map((p, i) => (
            <TableRow key={i} className="flex justify-between">
              <TableCell><span>{p.nome}</span></TableCell>
              <TableCell><span className="text-xs text-muted-foreground">{p.status}</span></TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}