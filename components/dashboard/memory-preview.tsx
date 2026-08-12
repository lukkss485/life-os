import { useStorage } from "@/lib";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogOverlay,
  DialogPortal
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { FileUploader } from "../file-uploader";
import { uploadImage } from "@/lib/image-actions";

export function MemoryPreview() {
  const temMemoria = false;
  const { valor, addData } = useStorage("package1", "lista-de-memorias");
  const [formData, setFormData] = useState({
    antes: "",
    descricao: "",
    depois: "",
    foto: ""
  });

  const memorias =
    valor && valor !== "undefined"
      ? JSON.parse(valor)
      : [];

  const handleSave = async () => {
    // 1. Pega lista existente
    const listaAtual = memorias;

    // 2. Cria objeto da memória
    const novaMemoria = {
      ...formData,
      id: Date.now()
    };

    // 3. Salva no Storage
    await addData({
      "lista-de-memorias": [
        ...listaAtual,
        novaMemoria
      ]
    });

    alert("Memória registrada!");
  };
  const [open, setOpen] = useState<boolean>(false);
  return (
    <section className="space-y-2 min-h-full">
      <h2 className="text-2xl font-semibold mb-2">Memórias</h2>
      <Card className="max-h-106 p-4 flex flex-col items-center">

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">Adicionar Memória</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Memória</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <Input
                  placeholder="O que aconteceu antes?"
                  onChange={(e) => setFormData({ ...formData, antes: e.target.value })}
                />
                <Textarea
                  placeholder="Descrição..."
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
                <Input
                  placeholder="O que aconteceu depois?"
                  onChange={(e) => setFormData({ ...formData, depois: e.target.value })}
                />

                {/* Aqui recebemos a foto */}
                <FileUploader onFileChange={(url) => setFormData({ ...formData, foto: url || "" })} />
              </div>

              <DialogFooter>
                <Button onClick={handleSave}>Salvar Memória</Button>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>

        {/* ÁREA ONDE AS MEMÓRIAS APARECEM */}
        {/* Adicione max-[1251px]:hidden aqui para esconder em telas maiores que 1251px */}
        <div className="w-full rounded-xl space-y-3 overflow-y-auto max-[1251px]:hidden">
          {memorias.length > 0 ? (
            memorias.map((memoria: any) => (
              <div key={memoria.id} className="p-3 border rounded-xl bg-muted/20 flex gap-3 items-center">
                {memoria.foto && <img src={memoria.foto} className="w-12 h-12 rounded-lg object-cover" />}
                <div>
                  <p className="font-semibold text-sm">{memoria.descricao}</p>
                  <p className="text-xs text-muted-foreground">Antes: {memoria.antes}</p>
                  <p className="text-xs text-muted-foreground">Depois: {memoria.depois}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground mt-4">
              <p className="text-sm">📸 Nenhuma memória registrada</p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}