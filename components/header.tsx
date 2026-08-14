'use client';
import { socket } from '@/lib/socket';
import { usePathname } from 'next/navigation'; // Importação necessária
import Link from "next/link";
import { ElementType, ReactNode, useState, useEffect } from "react";
import { Separator } from "./ui/separator";
import { creator } from "@/creator";
import { ThemeToggle } from "./theme-togle";
import { alllinks } from "./header-links";
import { ChevronDown, CircleAlert, LayoutDashboard, Menu, Settings, X, Minus, Square, Layers2, ChevronUp, Home } from "lucide-react";
import "../app/globals.css"
import { Button } from './ui/button';
import { BlurReveal } from './blur-reveal';
import { cn } from '@/lib/utils';
import { LucideIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { globalPlugins, animaisPlugins, notasPlugins } from "./plugins";
import { DialogContent, DialogTrigger } from "../components/ui/dialog";
import { GlassElement } from './GlassElement/GlassElement';
import { useGlassBounce } from './GlassElement/bubleeffect';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Marker, MarkerContent } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message"
import { Input } from './ui/input';
import "../app/globals.css";
import { motion, AnimatePresence } from 'framer-motion';
import { useGlassConfig } from "@/contexts/glass-config-context";

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  ClipboardPasteIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  LayoutGridIcon,
  ListIcon,
  PlusIcon,
  ScissorsIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function ChatComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Escuta mensagens vindas de outros dispositivos
    socket.on('receive-message', (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => { socket.off('receive-message'); };
  }, []);

  const sendMessage = () => {
    socket.emit('send-message', input);
    setInput('');
  };

  return (
    <div>
      {messages.map((m, i) => <p key={i}>{m}</p>)}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}


interface HeaderProps {
  children: ReactNode;
}
export function Header({
  children,
}: HeaderProps) {
  const pathname = usePathname(); // Pega a rota atual (ex: "/notifications")

  const getLinksToRender = () => {
    if (pathname.includes("education")) return alllinks.schollLinks;
    if (pathname.includes("notifications")) return alllinks.notfilinks;
    if (pathname.includes("finance")) return alllinks.FinanceLinks;
    return alllinks.links;
  };

  const linksToRender = getLinksToRender();

  const getPlugins = () => {
    if (pathname.includes("/animais")) return [...globalPlugins, ...animaisPlugins];
    if (pathname.includes("/notas")) return [...globalPlugins, ...notasPlugins];
    return globalPlugins;
  };

  const currentPlugins = getPlugins();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  type MessageType = {
    id: string;
    senderId: string;
    text: string;
    reactions?: string[];
    isGroup?: boolean;
    timestamp: string;
  };

  // Exemplo inicial (isso virá do seu socket no futuro)
  const [messages, setMessages] = useState<MessageType[]>([
    { id: '1', senderId: 'me', text: 'Deploying to prod real quick.', timestamp: '16:55' },
    { id: '2', senderId: 'oliver', text: 'It\'s 4:55 PM. On a Friday.', reactions: ['👍'], timestamp: '16:56' },
  ]);

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(prev => prev.map(m =>
      m.id === msgId ? { ...m, reactions: [...(m.reactions || []), emoji] } : m
    ));
  };
  function formatMessageDate(timestamp: Date) {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // Se passou mais de 24 horas (ou é um dia diferente), mostra a data
    if (diffInDays >= 1) {
      return timestamp.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
      });
    }

    // Se passou menos de 24 horas, mostra apenas a hora
    return timestamp.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return (
    <header className="flex h-screen w-full bg-neutral-100/20! dark:bg-neutral-800/20! overflow-hidden overflow-x-hidden">
      <aside className={cn(
        "max-[1360px]:hidden     [@media(max-height:400px)]:hidden    max-h-[400px]:hidden xl:flex flex-col h-full w-64 p-4 gap-6 shrink-0 transition-all overflow-x-hidden",
        isMenuOpen && "hidden", // Força o hidden se o menu mobile estiver aberto
      )}>
        <div className="border-b border-muted-foreground/10 pb-4">
          <User />
        </div>
        <nav className="flex flex-col gap-2 flex-1 overflow-auto goodscroll">
          <NavItem icon={LayoutDashboard} href="/">Dashboard</NavItem>
          <Separator />

          {linksToRender.map((link, i) => {
            // 1. Trata o separador (o seu código atual já faz isso bem)
            if ('separator' in link) {
              return <Separator key={i} />;
            }

            // 2. Renderiza o NavItem apenas se o link existir
            // Adicionamos uma checagem de segurança opcional para o href
            return (
              <NavItem
                key={i}
                href={link.href || "#"} // Garante que nunca seja undefined
                icon={link.icon}
                miniLinks={link.miniLinks}
                notification={link.notification}
              >
                {link.label}
              </NavItem>
            );
          })}
        </nav>
        <div className="border-t border-muted-foreground/10 pt-4">
          <Principal />
        </div>
      </aside>
      <div className="flex-1 h-full pt-4 px-4 max-[1280px]:px-0  [@media(max-height:400px)]:px-0 max-[1280px]:pb-0  [@media(max-height:400px)]:pb-0 gap-3 flex flex-col overflow-hidden relative">
        <div className="flex items-center translate-x-4.5 gap-4 w-full ">
          <BlurReveal>
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant='ghost' className=" xl:hidden px-2.5"><Menu size={20} /></Button>
          </BlurReveal>
          <BlurReveal>
            <ThemeToggle />
          </BlurReveal>
          <Separator orientation='vertical' />
          {currentPlugins.map((plugin, i) => (
            <BlurReveal key={i}>
              <PluginsItem
                icon={plugin.icon}
                miniplugin={plugin.miniplugin}
                code={plugin.code}
                isBeta={plugin.isBeta}
              >
                {plugin.name}
              </PluginsItem>
            </BlurReveal>
          ))}
        </div>

        {/* Overlay do Menu Mobile */}
        {isMenuOpen && (

          <GlassElement
            depth={5}
            height={356}
            radius={25.2}
            width={256}
            blur={0}
            chromaticAberration={0}
            strength={100}
            className="absolute top-21 left-4 z-50 w-64 max-h-[356px] backdrop-blur-[0.5rem] rounded-2xl"
          >
            <GlassElement
              depth={1}
              height={40}
              radius={20}
              width={40}
              blur={0}
              chromaticAberration={0}
              strength={100}
              className="absolute left-68 z-100000000000000"
            >
              <Button onClick={() => setIsMenuOpen(false)} className='h-[40px] w-[40px] ' variant='ghost'> <X size={20} /></Button>
            </GlassElement>

            <div className="relative z-50 overflow-y-hidden rounded-2xl p-4 shadow-lg xl:hidden">
              <nav className="flex flex-col gap-2">
                <NavItem icon={LayoutDashboard} href="/">Dashboard</NavItem>
                <Separator className='h-[2px]' />

                {linksToRender.map((link, i) => {
                  // 1. Trata o separador (o seu código atual já faz isso bem)
                  if ('separator' in link) {
                    return <Separator key={i} />;
                  }

                  // 2. Renderiza o NavItem apenas se o link existir
                  // Adicionamos uma checagem de segurança opcional para o href
                  return (
                    <NavItem
                      key={i}
                      href={link.href || "#"} // Garante que nunca seja undefined
                      icon={link.icon}
                      miniLinks={link.miniLinks}
                      notification={link.notification}

                    >
                      {link.label}
                    </NavItem>
                  );
                })}
              </nav>
            </div>
          </GlassElement>
        )}

        <main className="h-full rounded-t-[3rem] cornershape max-[1280px]:rounded-b-0 max-[1280px]:pb-0  [@media(max-height:400px)]:pb-0 border bg-background overflow-hidden flex flex-col">
          {/* O padding agora vai no filho que tem o scroll */}
          <div className="flex-1 overflow-y-auto p-9! goodscroll">
            {children}
          </div>
        </main>
      </div>
    </header >
  );
}


export function ICloudIcon({ size = 1000, className }: { size?: number; className?: string }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a5 5 0 1 1 0-10h.2A9 9 0 0 1 17.5 19z" />
    </svg>
  );
}
export function YahooIcon({ size = 1000, className }: { size?: number; className?: string }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      <path
        fill="#6001d2"
        d="M26.23 30.68l13.56 22.84v27.24h8.92V53.62l13.69-22.94h-10.4l-7.79 14.54-7.85-14.54zm38.83 26.54h9.12v23.63h-9.12zm0-18.06h9.12v11.83h-9.12z"
      />
    </svg>
  );
}
export function OutlookIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      xmlSpace="preserve"
    >
      <style type="text/css">{`
        .st0{fill:#0A2767;} .st1{fill:#0364B8;} .st2{fill:#0078D4;} 
        .st3{fill:#28A8EA;} .st4{fill:#14447D;} .st5{fill:url(#SVGID_1_);} 
        .st6{opacity:0.5;fill:#0A2767;} .st7{fill:#1490DF;} .st8{opacity:0.1;} 
        .st9{opacity:0.05;} .st10{opacity:0.2;} .st11{fill:url(#SVGID_2_);} 
        .st12{fill:#FFFFFF;} .st13{fill:#50D9FF;}
      `}</style>

      <defs>
        <linearGradient id="SVGID_1_" x1="315.5344" y1="-877.4263" x2="315.5344" y2="-651.1933" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 1145.3334)">
          <stop offset="0" style={{ stopColor: "#35B8F1" }} />
          <stop offset="1" style={{ stopColor: "#28A8EA" }} />
        </linearGradient>
        <linearGradient id="SVGID_2_" x1="45.5066" y1="-1037.3639" x2="216.4467" y2="-741.3027" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1 0 0 1 0 1145.3334)">
          <stop offset="0" style={{ stopColor: "#1784D9" }} />
          <stop offset="0.5" style={{ stopColor: "#107AD5" }} />
          <stop offset="1" style={{ stopColor: "#0A63C9" }} />
        </linearGradient>
      </defs>

      <path className="st0" d="M512,267.91c0.03-4-2.04-7.73-5.45-9.82h-0.06l-0.21-0.12L328.86,152.95c-0.77-0.52-1.56-0.99-2.38-1.42 c-6.85-3.53-14.99-3.53-21.84,0c-0.82,0.43-1.62,0.9-2.38,1.42L124.84,257.96l-0.21,0.12c-5.42,3.37-7.08,10.5-3.71,15.92 c0.99,1.6,2.36,2.93,3.99,3.88L302.32,382.9c0.77,0.51,1.56,0.99,2.38,1.42c6.85,3.53,14.99,3.53,21.84,0 c0.82-0.43,1.61-0.9,2.38-1.42l177.41-105.02C509.88,275.82,512.04,272.01,512,267.91z" />
      <path className="st1" d="M145.53,197.79h116.43v106.72H145.53V197.79z M488.19,89.3V40.48c0.28-12.21-9.38-22.33-21.59-22.62H164.47 c-12.21,0.29-21.87,10.42-21.59,22.62V89.3l178.6,47.63L488.19,89.3z" />
      <path className="st2" d="M142.88,89.3h119.07v107.16H142.88V89.3z" />
      <path className="st3" d="M381.02,89.3H261.95v107.16l119.07,107.16h107.16V196.47L381.02,89.3z" />
      <path className="st2" d="M261.95,196.47h119.07v107.16H261.95V196.47z" />
      <path className="st1" d="M261.95,303.63h119.07v107.16H261.95V303.63z" />
      <path className="st4" d="M145.53,304.51h116.43v97.02H145.53V304.51z" />
      <path className="st2" d="M381.02,303.63h107.16v107.16H381.02V303.63z" />
      <path className="st5" d="M506.55,277.23l-0.23,0.12l-177.41,99.78c-0.77,0.48-1.56,0.93-2.38,1.33c-3.01,1.43-6.29,2.25-9.62,2.38 l-9.69-5.67c-0.82-0.41-1.61-0.87-2.38-1.37l-179.8-102.61h-0.08l-5.88-3.29V469.9c0.09,13.48,11.09,24.33,24.56,24.24h344.18 c0.2,0,0.38-0.1,0.6-0.1c2.85-0.18,5.65-0.77,8.33-1.74c1.16-0.49,2.28-1.07,3.35-1.74c0.8-0.45,2.17-1.44,2.17-1.44 c6.1-4.51,9.71-11.64,9.74-19.23V267.91C512,271.77,509.91,275.33,506.55,277.23z" />
      <path className="st6" d="M502.47,267.11v12.38L316.96,407.22L124.9,271.28c0-0.07-0.05-0.12-0.12-0.12l0,0l-17.62-10.6v-8.93l7.26-0.12 l15.36,8.81l0.36,0.12l1.31,0.83c0,0,180.51,103,180.99,103.23l6.91,4.05c0.6-0.24,1.19-0.48,1.91-0.71 c0.36-0.24,179.2-100.85,179.2-100.85L502.47,267.11z" />
      <path className="st7" d="M506.55,277.23l-0.23,0.13l-177.41,99.78c-0.77,0.48-1.56,0.93-2.38,1.33c-6.89,3.37-14.95,3.37-21.84,0 c-0.82-0.4-1.61-0.85-2.38-1.33l-177.41-99.78l-0.21-0.13c-3.43-1.86-5.57-5.43-5.61-9.32V469.9c0.09,13.47,11.08,24.33,24.55,24.24 c0,0,0,0,0,0h343.83c13.47,0.09,24.47-10.77,24.55-24.24c0,0,0,0,0,0V267.91C512,271.77,509.91,275.33,506.55,277.23z" />
      <path className="st8" d="M331.49,375.67l-2.66,1.49c-0.77,0.49-1.56,0.94-2.38,1.35c-2.93,1.44-6.11,2.28-9.36,2.48l67.5,79.82 l117.75,28.37c3.23-2.44,5.79-5.64,7.47-9.32L331.49,375.67z" />
      <path className="st9" d="M343.52,368.9l-14.68,8.25c-0.77,0.49-1.56,0.94-2.38,1.35c-2.93,1.44-6.11,2.28-9.36,2.48l31.62,87.19 l153.66,20.97c6.05-4.54,9.62-11.67,9.62-19.24v-2.61L343.52,368.9z" />
      <path className="st3" d="M143.96,494.14h343.46c5.29,0.03,10.44-1.64,14.7-4.76L307.2,375.2c-0.82-0.41-1.61-0.87-2.38-1.37 l-179.8-102.61h-0.08l-5.87-3.31v201.3C119.06,482.96,130.2,494.13,143.96,494.14C143.96,494.14,143.96,494.14,143.96,494.14z" />
      <path className="st8" d="M285.77,134.94v253.98c-0.02,8.9-5.44,16.91-13.69,20.24c-2.56,1.1-5.31,1.67-8.1,1.67H119.07v-285.8h23.81 v-11.91h121.09C276.01,113.16,285.74,122.91,285.77,134.94z" />
      <path className="st10" d="M273.86,146.85v253.98c0.03,2.88-0.58,5.72-1.79,8.33c-3.31,8.15-11.21,13.5-20,13.54h-133V125.02h133 c3.45-0.03,6.86,0.83,9.88,2.5C269.25,131.2,273.86,138.68,273.86,146.85z" />
      <path className="st10" d="M273.86,146.85v230.16c-0.06,12.02-9.77,21.77-21.79,21.87h-133V125.02h133c3.45-0.03,6.86,0.83,9.88,2.5 C269.25,131.2,273.86,138.68,273.86,146.85z" />
      <path className="st10" d="M261.95,146.85v230.16c-0.01,12.04-9.75,21.81-21.79,21.87H119.07V125.02h121.09 c12.04,0.01,21.8,9.77,21.79,21.81C261.95,146.84,261.95,146.84,261.95,146.85z" />
      <path className="st11" d="M21.83,125.02h218.3c12.05,0,21.83,9.77,21.83,21.83v218.3c0,12.05-9.77,21.83-21.83,21.83H21.83 C9.77,386.98,0,377.2,0,365.15v-218.3C0,134.8,9.77,125.02,21.83,125.02z" />
      <path className="st12" d="M68.22,216.56c5.38-11.46,14.06-21.05,24.93-27.54c12.04-6.89,25.75-10.33,39.61-9.93 c12.85-0.28,25.53,2.98,36.66,9.42c10.46,6.24,18.89,15.38,24.25,26.31c5.85,12.05,8.76,25.31,8.5,38.7 c0.28,13.99-2.71,27.86-8.75,40.48c-5.49,11.33-14.19,20.79-25,27.23c-11.56,6.64-24.71,9.98-38.03,9.67 c-13.13,0.32-26.09-2.98-37.47-9.53c-10.55-6.25-19.08-15.4-24.58-26.36c-5.88-11.87-8.83-24.99-8.6-38.23 C59.5,242.91,62.4,229.16,68.22,216.56z M94.79,281.22c2.87,7.25,7.73,13.53,14.03,18.12c6.41,4.48,14.09,6.79,21.91,6.6 c8.33,0.33,16.54-2.06,23.39-6.81c6.22-4.58,10.95-10.88,13.62-18.12c2.99-8.09,4.46-16.66,4.35-25.28c0.09-8.7-1.29-17.36-4.1-25.6 c-2.48-7.44-7.06-14-13.19-18.88c-6.68-4.97-14.86-7.5-23.18-7.14c-7.99-0.21-15.84,2.12-22.42,6.66 c-6.4,4.61-11.36,10.95-14.29,18.28c-6.5,16.79-6.54,35.4-0.1,52.21L94.79,281.22z" />
      <path className="st13" d="M381.02,89.3h107.16v107.16H381.02V89.3z" />
    </svg>
  );
}

// plugin



interface MiniPlugin {
  name: string;
  icon: LucideIcon;
  code?: () => void; // Adicionada a propriedade code
}

interface PluginsItemProps {
  icon: LucideIcon;
  miniplugin?: MiniPlugin[];
  code?: () => void;
  component?: React.ComponentType;
  children: React.ReactNode;
  isBeta?: boolean;
  className?: string;
}

export function PluginsItem({ icon: Icon, miniplugin, code, component: Component, isBeta, children, className }: PluginsItemProps) {
  var betacolor = 'zinc'
  const Trigger = Component ? DialogTrigger : "button";
  return (
    <div className="bg-transparent  no-bounce"> {/* faz com que todos os filho dessa div tenha essa classe notransition */}
      <DropdownMenu>
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("backdrop-blur-2xl", className)}
                onClick={(e) => {
                  console.log("Plugin clicado!");
                  code?.();
                }}
              >
                <Icon size={20} />
                {isBeta && (
                  <span className="absolute -bottom-2 -right-4 flex p-1">
                    <span className={`relative inline-flex rounded-full px-1 py-0 border bg-accent/50 border-bg-accent/50 text-[10px]`}  > beta </span>
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto p-2 bg-card/90 text-sm z-100000 no-bounc e radix-popover-content" side="top">
            {children}
          </HoverCardContent>
        </HoverCard>

        <DropdownMenuContent align="center" className='p-2 rounded-2xl bg-card/10 z-10000000000000'>
          {miniplugin?.map((mini, idx) => (
            <DropdownMenuItem
              key={idx}
              className="gap-2 cursor-pointer p-1.5"
              onClick={mini.code} // Executa a função do miniplugin ao clicar
            >
              <mini.icon size={16} />
              {mini.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
        {Component && (
          <DialogContent>
            <Component />
          </DialogContent>
        )}
      </DropdownMenu>
    </div>
  );
}

// link
type NotificationState = "good" | "more-less" | "bad";
interface SubLink {
  label?: string;
  href?: string;
  separator?: boolean;
  subLinkNotification?: Notification; // Alterado de array para objeto único
}
interface Notification {
  state?: NotificationState;
  notifications: number;
}
interface NavItemProps {
  icon: ElementType;
  href?: string;
  children?: ReactNode;
  miniLinks?: SubLink[];
  notification?: Notification; // Alterado de array para objeto único
}
function getNotificationStyles(state?: string) {
  switch (state) {
    case "bad": return "bg-red-500/20 border-red-500/70 border-1 border-solid text-red-500";
    case "ok": return "bg-yellow-500/20 border-yellow-500/70 border-1 border-solid text-yellow-500";
    case "good": return "bg-emerald-500/20 border-emerald-500/70 border-1 border-solid text-emerald-500";
    default: return "bg-zinc-500/20 border-zinc-500/70 border-1 border-solid text-zinc-500"; // Padrão
  }
}
function NavItem({ href = "#", icon: Icon, children: label, miniLinks, notification }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="flex flex-col">
      <div
        className={miniLinks ? 'justify-between cursor-pointer max-h-[44px] max-w-[222px] px-4 py-3 rounded-xl hover:bg-muted/20 hover:ring hover:ring-muted transition-colors text-sm font-medium grid grid-cols-[7fr_0.5fr] grid-rows-[1fr] gap-[0em 0em] grid-flow-row [grid-template-areas:"._."] dark:text-white' : 'justify-between cursor-pointer px-4 py-3 rounded-xl hover:bg-muted/20 hover:ring hover:ring-muted transition-colors text-sm font-medium'}
      >
        {/* No topo do NavItem, dentro do Link principal */}
        <Link href={href} className="flex items-center gap-3 text-black dark:text-white">
          <Icon size={20} />

          <h3>{label}</h3>

          {/* Faltava este trecho aqui também! */}
          {notification && (
            <span className={`text-[9px] px-2 py-0.5 rounded-full  ${getNotificationStyles(notification.state)}`}>
              {notification.notifications > 1 ? notification.notifications : "new"}
            </span>
          )}
        </Link>
        <div onClick={() => miniLinks && setIsOpen(!isOpen)}>
          {miniLinks && <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
        </div>
      </div>

      {/* Dentro do seu NavItem, na parte dos miniLinks */}
      {isOpen && miniLinks && (
        <div className="flex flex-col ml-8 mt-1 border-border border-l pl-2">
          {miniLinks.map((sub, index) => {
            // 1. SE FOR SEPARADOR: Retorna apenas o Separator e encerra o ciclo deste item
            if (sub.separator) {
              return <Separator key={index} className="my-2" />;
            }

            // 2. SE FOR LINK: Renderiza apenas se tiver href definido
            return (
              <Link
                key={index}
                href={sub.href || "#"}
                className="py-2 px-3 flex flex-row items-center justify-between text-sm hover:text-foreground hover:bg-muted/50 hover:ring hover:ring-muted rounded-lg transition-colors text-neutral-400"
              >
                <h3>{sub.label}</h3>

                {sub.subLinkNotification && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full ${getNotificationStyles(sub.subLinkNotification.state)}`}>
                    {sub.subLinkNotification.notifications > 1
                      ? sub.subLinkNotification.notifications
                      : "new"}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// partes
export function Dock() {
  const pathname = usePathname()

  const getPlugins = () => {
    if (pathname.includes("/animais")) return [...globalPlugins, ...animaisPlugins]
    if (pathname.includes("/notas")) return [...globalPlugins, ...notasPlugins]
    return globalPlugins
  }

  const currentPlugins = getPlugins()
  const pluginsRef = React.useRef<HTMLDivElement>(null)

  function scrollPlugins(direction: "up" | "down") {
    pluginsRef.current?.scrollBy({
      left: direction === "up" ? -80 : 80,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed z-[1000] w-fit h-fit bottom-8 left-1/2 -translate-x-1/2 hover:-translate-y-5 transition-transform"
    >
      <GlassElement
        radius={30}
        height={60}
        width={500}
        strength={90}
        depth={5}
        glassOpacity={50}
        blur={0.8}
        className="flex items-center justify-center gap-3 px-2 max-w-[95vw]"
      >
        {/* ── Zona fixa esquerda: scroll dos plugins ── */}
        <div className="flex items-center gap-1">
          <div className="flex flex-col">
            <button
              onClick={() => scrollPlugins("up")}
              className="pl-2 cursor-pointer"
              aria-label="Rolar plugins pra trás"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => scrollPlugins("down")}
              className="pl-2 cursor-pointer"
              aria-label="Rolar plugins pra frente"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* ── Zona dinâmica central: plugins da página atual ── */}
        <div
          ref={pluginsRef}
          className="flex items-center justify-center gap-4 w-full h-fit border-l border-border overflow-x-auto scrollbar-none"
        >
          {currentPlugins.length === 0 ? (
            <span className="text-xs text-muted-foreground px-2">Sem atalhos aqui</span>
          ) : (
            currentPlugins.map((plugin) => (
              <BlurReveal key={plugin.name} className="relative shrink-0">
                <PluginsItem
                  icon={plugin.icon}
                  miniplugin={plugin.miniplugin}
                  code={plugin.code}
                  isBeta={plugin.isBeta}
                >
                  {plugin.name}
                </PluginsItem>
              </BlurReveal>
            ))
          )}
        </div>
        {/* <div
          className="flex items-center justify-center gap-4 w-fit h-fit border-l border-border overflow-x-auto scrollbar-none"
        >
        </div> */}

        <div className="flex items-center gap-3 border-l pl-4 border-border">
          <Link href="/" aria-label="Página inicial">
            <button className="cursor-pointer p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <Home size={20} className={pathname === "/" ? "text-primary" : ""} />
            </button>
          </Link>
          <ThemeToggle />
        </div>
      </GlassElement>
    </motion.div>
  )
}

// coisa



export function CommandManyItems() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const getPlugins = () => {
    if (pathname.includes("/animais")) return [...globalPlugins, ...animaisPlugins]
    if (pathname.includes("/notas")) return [...globalPlugins, ...notasPlugins]
    return globalPlugins
  }

  const currentPlugins = getPlugins()

  function runCommand(action: () => void) {
    setOpen(false)
    action()
  }

  return (
    <div className="flex flex-col gap-4">
      <CommandDialog open={open} onOpenChange={setOpen} className="bg-transparent!">
        <Command>
          <CommandInput placeholder="Digite um comando ou pesquise..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

            <CommandGroup heading="Navegação">
              <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                <HomeIcon />
                <span>Início</span>
                <CommandShortcut>
                  <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd>B</Kbd>
                  </KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/inbox"))}>
                <InboxIcon />
                <span>Caixa de Entrada</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>I</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/documents"))}>
                <FileTextIcon />
                <span>Documentos</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>D</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/folders"))}>
                <FolderIcon />
                <span>Pastas</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>F</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Ações">
              <CommandItem onSelect={() => runCommand(() => console.log("novo arquivo"))}>
                <PlusIcon />
                <span>Novo Arquivo</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>N</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("nova pasta"))}>
                <FolderPlusIcon />
                <span>Nova Pasta</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>Shift</Kbd><span>+</span><Kbd>N</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => document.execCommand("copy"))}>
                <CopyIcon />
                <span>Copiar</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>C</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("cortar"))}>
                <ScissorsIcon />
                <span>Cortar</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>X</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("colar"))}>
                <ClipboardPasteIcon />
                <span>Colar</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>V</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("excluir"))}>
                <TrashIcon />
                <span>Excluir</span>
                <CommandShortcut><Kbd>Del</Kbd></CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Visualização">
              <CommandItem onSelect={() => runCommand(() => console.log("visão em grade"))}>
                <LayoutGridIcon />
                <span>Grade</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("visão em lista"))}>
                <ListIcon />
                <span>Lista</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("aproximar zoom"))}>
                <ZoomInIcon />
                <span>Aproximar Zoom</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>+</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => console.log("afastar zoom"))}>
                <ZoomOutIcon />
                <span>Afastar Zoom</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>-</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Conta">
              <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
                <UserIcon />
                <span>Perfil</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>P</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/billing"))}>
                <CreditCardIcon />
                <span>Cobrança</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                <SettingsIcon />
                <span>Configurações</span>
                <CommandShortcut>
                  <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>S</Kbd></KbdGroup>
                </CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/notifications"))}>
                <BellIcon />
                <span>Notificações</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/support"))}>
                <HelpCircleIcon />
                <span>Ajuda e Suporte</span>
              </CommandItem>
            </CommandGroup>

            {currentPlugins.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Ferramentas">
                  {currentPlugins.map((plugin) => (
                    <CommandItem
                      key={plugin.name}
                      onSelect={() => runCommand(() => plugin.code?.())}
                    >
                      <plugin.icon />
                      <span>{plugin.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}


//   parte do usuario (User)

function User() {
  return (
    <div className="p-4 flex">
      <img src="https://i.postimg.cc/hPfLvJVB/lucas.png" alt="user" className="rounded-full cornershape max-w-10 " />
      <div className="gap-1 flex flex-col w-full min-w-full ml-5">
        <p className="text-sm font-medium">{creator.name}</p>

        <p className="text-xs text-muted-foreground ">{creator.class}</p>
      </div>
    </div>
  )
}

//  parte de reclamar

function Principal() {
  return (
    <div className="flex flex-col gap-2 flex-1 py-2">
      <NavItem icon={CircleAlert} href="/report">Reportar erros</NavItem>
      <NavItem icon={Settings} href="/config">Config.</NavItem>
    </div>
  )
}