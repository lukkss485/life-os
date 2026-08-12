"use client";
import {
  Search,
  ZoomIn,
  ZoomOut,
  Settings,
  Moon,
  Sun,
  Palette,
  RefreshCw,
  Plus,
  Calculator,
} from "lucide-react";
import { Calculadora } from "./plugins/Calc";
// Estado local para controle simples de escala
let currentZoom = 1;

export const notasPlugins = [];

export const animaisPlugins = [];

export const globalPlugins: Plugin[] = [
  {
    name: "zoom",
    icon: Search,
    code: () => {
      currentZoom = 1;
      document.body.style.zoom = "100%";
    },
    miniplugin: [
      {
        name: "zoom in",
        icon: ZoomIn,
        code: () => {
          currentZoom += 0.1;
          document.body.style.zoom = currentZoom;
        },
      },
      {
        name: "zoom out",
        icon: ZoomOut,
        code: () => {
          if (currentZoom > 0.2) {
            currentZoom -= 0.1;
            document.body.style.zoom = currentZoom;
          }
        },
      },
    ],
  },
  {
    name: "Configurações",
    icon: Settings,
    code() { console.log("Abrir painel")},
    miniplugin: [
      {
        name: "Modo Escuro",
        icon: Moon,
        code() {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        },
      },
      {
        name: "Modo Claro",
        icon: Sun,
        code() {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        },
      },
      {
        name: "Resetar Dados",
        icon: RefreshCw,
        code() {
          if (confirm("Tem certeza que deseja limpar tudo?")) {
            localStorage.clear();
            window.location.reload();
          }
        },
      },
    ],
  },
  {
    name: "Estilo",
    icon: Palette,
    isBeta: true,
    miniplugin: [
      {
        name: "Cor Padrão",
        icon: Palette,
        code() {
          const isDark: boolean =
            document.documentElement.classList.contains("dark");

          document.documentElement.style.setProperty(
            "--primary",
            "lab(35.164% -9.57689 -34.4068)",
          );
          document.documentElement.style.setProperty(
            "--card",
            isDark ? "lab(8.30603% .618212 -2.16573)" : "lab(100% 0 0)",
          );
        },
      },
      {
        name: "Cor Azul",
        icon: Palette,
        code() {
          // Removemos todos os temas anteriores primeiro para evitar conflitos
          document.documentElement.classList.remove("theme-red", "theme-green");

          // Adicionamos o tema desejado
          document.documentElement.classList.add("theme-blue");
        },
      },
      {
        name: "Resetar Cores",
        icon: Palette,
        code: () => {
          // Remove apenas as classes de tema personalizadas
          document.documentElement.classList.remove("theme-blue", "theme-red");

          // Opcional: limpa estilos inline caso você ainda tenha algum antigo
          document.documentElement.style.removeProperty("--card");
        },
      },
    ],
  },
  {
    name: "calculadora",
    icon: Calculator,
    component: Calculadora,
  },
];
import { LucideIcon } from "lucide-react";

interface miniplugin {
  name: string;
  icon: LucideIcon;
  code: () => void | Promise<void>;
}

interface Plugin {
  component?: React.ComponentType;
  name: string;
  icon: LucideIcon;
  code?: () => void | Promise<void>;
  miniplugin?: miniplugin[];
  isBeta?: boolean
}

export const allplugin = {
  notasPlugins: notasPlugins as Plugin[],
  animaisPlugins: animaisPlugins as Plugin[],
  globalPlugins: globalPlugins as Plugin[],
};
