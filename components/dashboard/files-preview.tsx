"use client";

import { useEffect, useState, useRef } from "react";
import { useStorage } from "@/lib"; // Importando o seu hook de storage
import { Card } from "../ui/card";
import { Button } from "../ui/button";

type Arquivo = {
  nome: string;
  data: string;
  peso: string;
};

export function FilesPreview() {
  const { valor, addData } = useStorage("package1", "lista-de-arquivos");
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sincroniza o valor do storage com o estado local
  useEffect(() => {
    if (valor) {
      try {
        setArquivos(JSON.parse(valor));
      } catch (e) {
        console.error("Erro ao converter JSON do storage", e);
      }
    }
  }, [valor]);

  // Função disparada ao selecionar um arquivo
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const novoArquivo: Arquivo = {
      nome: file.name,
      data: new Date().toLocaleString(),
      peso: (file.size / 1024 / 1024).toFixed(2) + " MB",
    };

    // Salva no seu sistema via Server Action (JSON)
    const listaAtualizada = [...arquivos, novoArquivo];
    await addData({ "lista-de-arquivos": JSON.stringify(listaAtualizada) });
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Arquivos</h2>

      <Card className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-zinc-600">Meus Arquivos</h2>
          
          {/* Input invisível que o botão aciona */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
          />
          
          <Button 
            variant="outline" 
            className="text-[1rem] font-semibold text-zinc-600"
            onClick={() => fileInputRef.current?.click()}
          >
            Adicionar Arquivo(s)
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {arquivos.length > 0 ? (
            arquivos.map((arq, index) => (
              <Card key={index} className="flex flex-row justify-between items-center p-3 border-b hover:bg-muted/50 rounded-[1.5rem]">
                <div>
                  <p className="font-medium text-sm">{arq.nome}</p>
                  <p className="text-xs text-muted-foreground">{arq.data}</p>
                </div>
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{arq.peso}</span>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum arquivo encontrado.</p>
          )}
        </div>
      </Card>
    </div>
  );
}