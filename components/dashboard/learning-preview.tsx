"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Atom, Code2, Laptop, Layers, Plus, Target, Check, X } from "lucide-react"
import { Separator } from "../ui/separator"
import { SkillCarousel } from "../ui/SkillCarousel"
import { PersistentCheckbox } from "./habit-preview"
import { creator } from "@/creator"
import { Button } from "../ui/button"

export function LearningPreview() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalizar o design do Liquid Glass", tag: "UI/UX" },
    { id: 2, title: "Refatorar componentes de Identity", tag: "Core" },
    { id: 3, title: "Integrar API de meteorologia", tag: "API" },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskTag, setNewTaskTag] = useState("Core")

  const skills = [
    { name: "Front-end", icon: Layers, color: "emerald" },
    { name: creator.programation.like.join(", "), icon: Laptop, color: "emerald" },
    { name: "React", icon: Atom, color: "blue" },
    { name: creator.programation.languages.join(", "), icon: Code2, color: "indigo" },
  ]

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      tag: newTaskTag.trim() || "Geral",
    }

    setTasks((prev) => [...prev, newTask])
    setNewTaskTitle("")
    setIsAdding(false)
  }

  return (
    /* Reduzido gap-4 para gap-2.5 para aproximar as seções */
    <section className="flex flex-col gap-2.5 w-full max-w-80 mx-auto p-1">
      {/* ── Cabeçalho da Seção ── */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Layers size={18} />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Aprendizado
          </h2>
        </div>
      </div>

      {/* ── Carrossel de Skills em Card ── */}
      <Card className="p-0 flex items-center overflow-hidden transition-all rounded-full">
        <div className="flex flex-row gap-3 items-center w-full h-full">
          <SkillCarousel skills={skills} />
        </div>
      </Card>

      {/* ── Card de Tarefas Ativas (Reduzido max-h de 80 para 64) ── */}
      <Card className="flex flex-col justify-between relative overflow-hidden max-h-50">
        {/* Padding interno reduzido de p-5 para p-3.5 e max-h de 60 para 44 */}
        <div className="scroll-auto py-3.5 flex flex-col gap-2 max-h-44 overflow-y-auto rounded-2xl w-full">
          {/* Glow sutil ao fundo do card */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Target size={14} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Tarefas Ativas
              </h3>
            </div>

            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {tasks.length} ativas
            </span>
          </div>

          <div className="space-y-1.5 my-1">
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                  /* Padding das linhas reduzido de p-2.5 para p-1.5 */
                  className="group flex items-center justify-between p-1.5 px-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  <div className="flex items-center gap-2.5">
                    <PersistentCheckbox group="b" id={task.id} />
                    <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-white transition-colors truncate max-w-[140px]">
                      {task.title}
                    </span>
                  </div>

                  <span className="text-[9px] text-neutral-400 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 opacity-70 group-hover:opacity-100">
                    {task.tag}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Rodapé mais compacto */}
        <div className="px-3.5 pb-1 gap-1 flex flex-col">
          <Separator className="bg-white/10" />

          {isAdding ? (
            <form onSubmit={handleAddTask} className="flex items-center gap-1.5 pt-0.5">
              <input
                type="text"
                placeholder="Título..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                autoFocus
                className="flex-1 min-w-0 text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/50"
              />
              <Button type="submit" size="sm" className="h-6 px-2 bg-blue-600 hover:bg-blue-500 text-white shrink-0">
                <Check size={12} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsAdding(false)}
                className="h-6 px-2 text-neutral-400 hover:text-white shrink-0"
              >
                <X size={12} />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <Button variant="outline" size="sm" className="h-7 text-[11px]" onClick={() => setIsAdding(true)}>
                adicionar tarefa
                <Plus size={12} className="ml-1 text-neutral-400" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </section>
  )
}