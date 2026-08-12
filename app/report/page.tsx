import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { creator } from "@/creator";

/**
 * Tabela de dados para o Banco de Dados:
 * | Campo          | Tipo      | Descrição                                 |
 * |----------------|-----------|-------------------------------------------|
 * | id             | UUID      | Identificador único do report             |
 * | reportType     | String    | 'codigo' ou 'visual'                      |
 * | description    | Text      | Detalhes do erro reportado                |
 * | codeSnippet    | Text      | Trecho do código com problema (opcional)  |
 * | createdAt      | DateTime  | Data e hora do envio                      |
 */

export default function Report() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    /* fazer contato com banco de dados 
       {
         reportType: "selecionado pelo usuário",
         description: "conteúdo do textarea",
         codeSnippet: "conteúdo do input de código",
         createdAt: new Date().toISOString()
       }
    */
  };

  return (
    <main id="app" className="min-h-screen w-full flex items-center justify-center p-8">
      <Card className="backdrop-blur-xl bg-card/10 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-2xl font-bold text-neutral-600 dark:text-neutral-400 mb-6">Reportar Erro</h1>
        
        <form /*onSubmit={handleSubmit}*/ className="flex flex-col gap-4">
          <select className="bg-white/20 border border-black/10 dark:bg-black/20 dark:border-white/10 p-3 rounded-lg text-neutral-600 dark:text-neutral-400">
            <option value="visual">Erro Visual</option>
            <option value="codigo">Erro de Código</option>
          </select>
          <Textarea
            placeholder="Descreva o problema..."
            className="bg-white/20 border border-black/10 dark:bg-black/20 dark:border-white/10 p-3 rounded-lg text-neutral-600 dark:text-neutral-400 h-32"
          />

          <Input
            type="text"
            placeholder="Cole o trecho do código (se houver)"
            className="bg-white/20 border border-black/10 dark:bg-black/20 dark:border-white/10 p-3 rounded-lg text-neutral-600 dark:text-neutral-400"
          />

          <Button 
            type="submit"
            className=" text-neutral-600 dark:text-neutral-400 p-3 rounded-lg transition-all"
          >
            Enviar Report
          </Button>
        </form>
      </Card>
    </main>
  );
}