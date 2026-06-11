import { LayoutDashboard, Heart, Wallet, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import React, { ElementType, ReactElement } from "react";
import { creator } from "./dashboard";

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({
  children,
}: HeaderProps) {
  return (
    <header className="grid h-screen grid-cols-[0.1fr_1.5fr] overflow-hidden bg-muted/30">
      {/* Sidebar */}
      <aside className="flex flex-col h-full w-64 p-4 gap-6">
        {/* Logo ou Nome do Projeto */}
        <div className="px-4 py-6 font-bold text-[2rem] tracking-tight border-b border-muted-foreground/10">
          Life-Os
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon={LayoutDashboard} label="Identidade" />
          <NavItem icon={Heart} label="Saúde e Corpo" />
          <NavItem icon={Wallet} label="Finanças" />
        </nav>

        {/* Perfil no rodapé da Sidebar */}
        <div className="p-4 flex border-t border-muted-foreground/10  ">
          
          <img src="https://i.postimg.cc/hPfLvJVB/lucas.png" alt="user" className="rounded-full max-w-10 " />
          <div className="gap-1 flex flex-col w-full min-w-full ml-5">
            <p className="text-sm font-medium">{creator.name}</p>
          
            <p className="text-xs text-muted-foreground ">{creator.class}</p>
          </div>
        </div>
      </aside>

      {/* Área da página */}
      <div className="h-full pt-4 pl-4 overflow-hidden z-100">
        <main
          className="
            h-full
            rounded-l-3xl
            border
            bg-background
            p-9
            overflow-y-auto
            overflow-x-hidden
            
          "
        >
          {children}
        </main>
      </div>
    </header>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string; // Coloquei o '?' pois agora ele é opcional
}

// Observe que defini { href = "#", ... } nos parâmetros
function NavItem({ href = "#", icon: Icon, label }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
    >
      <Icon size={20} />
      {label}
    </Link>
  );
}