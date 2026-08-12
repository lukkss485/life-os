"use client";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
// Dentro do seu componente FileUploader
interface FileUploaderProps {
  onFileChange: (url: string | null) => void;
}

export function FileUploader({ onFileChange }: FileUploaderProps) {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64 = reader.result as string;
  
      setFilePreview(base64);
      onFileChange(base64);
    };
  
    reader.readAsDataURL(file);
  };

  return (
    // Removido 'border-dashed' e adicionado 'border-0' e 'rounded-none'
    <Card className="p-[calc(var(--spacing)*6)!important] flex flex-col items-center gap-4 shadow-none">
      {filePreview ? (
        <img 
        src={filePreview} 
        alt="Preview" 
        // Adicione isso à classe da sua imagem ou div
        className="w-32 h-32 object-cover transition-all duration-300 hover:scale-105 rounded-3xl"
      />
      ) : (
        // Removido 'rounded-full'
        <div className="w-32 h-32 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded-3xl">
          Sem foto
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        className="hidden" 
        accept="image/*"
      />
      
      <Button 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
      >
        Escolher Foto
      </Button>
    </Card>
  );
}