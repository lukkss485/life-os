'use client';
import { creator } from "@/creator";
import { User, Cake, School, Code2, Terminal, Pencil } from "lucide-react";
import { GlassElement } from "@/components/GlassElement/GlassElement";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Identity() {
  const profileFields = [
    { label: "Nome", value: creator.name, icon: User, span: "lg:col-span-2" },
    { label: "Idade", value: `${creator.age} anos`, icon: Cake },
    { label: "Escola", value: `${creator.school}º ano`, icon: School },
    { label: "Linguagens", value: creator.programation.languages.join(", "), icon: Code2, span: "lg:col-span-2" },
    { label: "Editar Perfil", value: "Acessar Editor", icon: Pencil, interactive: true },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 bg-zinc-950 text-zinc-100">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-br from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
          Identidade
        </h1>
        <p className="text-zinc-500 mt-2 font-medium">Gerencie suas informações pessoais.</p>
      </header>

      {/* Grid com animação de entrada (Staggered) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[140px]"
      >
        {profileFields.map((field, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20, backdropFilter: "blur(10px)" },
              visible: { opacity: 1, y: 0, backdropFilter: "blur(0px)" }
            }}
            className={`${field.span || ""}`}
          >
              <Card className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:border-zinc-700 transition-colors group flex flex-col gap-2 flex-1">
                <CardHeader className="flex flex-row items-center gap-3 pb-2 pt-0">
                  <div className="p-2 rounded-xl bg-zinc-800/50 text-zinc-400">
                    <field.icon size={18} />
                  </div>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    {field.label}
                  </span>
                </CardHeader>
                <CardContent className="pb-0 pt-0">
                  <p className="text-lg font-semibold text-zinc-100 tracking-tight truncate">
                    {field.value}
                  </p>
                </CardContent>
              </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}