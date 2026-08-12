'use client';
import { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Rocket, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { GlassElement } from './GlassElement/GlassElement';

type ActionState = 'bad' | 'ok' | 'good' | 'default';

const bounceHover = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 12 },
};

type ShowNotificationOptions = {
  icon?: ElementType;
  title: ReactNode;
  desc: ReactNode;
  state?: ActionState;
  duration?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

// Função que dispara a notificação — chame de qualquer lugar do app
export function showNotification({
  icon = Rocket,
  title,
  desc,
  state = 'default',
  duration = 10000,
  onConfirm,
  onCancel,
}: ShowNotificationOptions) {
  toast.custom(
    (id) => (
      <NotificationCard
        icon={icon}
        title={title}
        desc={desc}
        state={state}
        onConfirm={() => {
          onConfirm?.();
          toast.dismiss(id);
        }}
        onCancel={() => {
          onCancel?.();
          toast.dismiss(id);
        }}
      />
    ),
    { duration, unstyled: true }
  );
}

function NotificationCard({
  icon: Icon,
  title,
  desc,
  state,
  onConfirm,
  onCancel,
}: {
  icon: ElementType;
  title: ReactNode;
  desc: ReactNode;
  state: ActionState;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-row-reverse items-end gap-2" role="alert" aria-live="assertive">
      <Not.Body>
        <Not.Icon icon={Icon} state={state} />
        <Not.Title>{title}</Not.Title>
        <Not.Desc>{desc}</Not.Desc>
      </Not.Body>

      <Not.Actions>
        <ActionCancel state="bad" onClick={onCancel} />
        <ActionSubmit state="good" onClick={onConfirm} />
      </Not.Actions>
    </div>
  );
}

export const Not = { Body, Title, Icon, Desc, Actions };

function Body({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <GlassElement
      depth={5}
      height={80}
      radius={25.2}
      width={320}
      blur={2}
      chromaticAberration={0}
      strength={100}
      className={cn(
        'cornershape relative grid grid-cols-[0.2fr_1.8fr] grid-rows-[0.6fr_1.3fr] gap-[5px_10px] grid-flow-row [grid-template-areas:"icon_title"_"icon_descripition"]',
        className
      )}
    >
      {children}
    </GlassElement>
  );
}

function Actions({ children, className = '' }: { className?: string; children: ReactNode }) {
  return (
    <GlassElement
      depth={5}
      height={79}
      radius={25.2}
      width={42}
      blur={2}
      chromaticAberration={0}
      strength={100}
      className={cn('cornershape flex flex-col gap-0.5', className)}
    >
      {children}
    </GlassElement>
  );
}

const globalactionsstyles = ({ state = 'default', className }: { state?: ActionState; className?: string }) => {
  const styles: Record<ActionState, string> = {
    bad: 'bg-red-400/20 border border-red-400/50 text-red-400 dark:bg-red-600/20 dark:border-red-600/50 dark:text-red-600 active:bg-red-500/20 active:border-red-500/50 active:text-red-500',
    ok: 'bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 dark:bg-yellow-600/20 dark:border-yellow-600/50 dark:text-yellow-600 active:bg-yellow-500/20 active:border-yellow-500/50 active:text-yellow-500',
    good: 'bg-emerald-400/20 border border-emerald-400/50 text-emerald-400 dark:bg-emerald-600/20 dark:border-emerald-600/50 dark:text-emerald-600 active:bg-emerald-500/20 active:border-emerald-500/50 active:text-emerald-500',
    default: 'bg-neutral-400/20 border border-neutral-400/50 text-neutral-400 dark:bg-neutral-600/20 dark:border-neutral-600/50 dark:text-neutral-600 active:bg-neutral-500/20 active:border-neutral-500/50 active:text-neutral-500',
  };
  return cn('cornershape py-1.5 flex justify-center items-center', styles[state], className);
};

function ActionSubmit({ className = '', onClick, state = 'default' }: { className?: string; state?: ActionState; onClick?: () => void }) {
  return (
    <motion.button onClick={onClick} className={globalactionsstyles({ state, className })} aria-label="Confirmar" {...bounceHover}>
      <Check size={20} strokeWidth={3} />
    </motion.button>
  );
}

function ActionCancel({ className = '', onClick, state = 'default' }: { className?: string; state?: ActionState; onClick?: () => void }) {
  return (
    <motion.button onClick={onClick} className={globalactionsstyles({ state, className })} aria-label="Cancelar" {...bounceHover}>
      <X size={20} strokeWidth={3} />
    </motion.button>
  );
}

function Icon({ icon: IconComponent, state = 'default', className }: { state?: ActionState; className?: string; icon: ElementType }) {
  const styles: Record<ActionState, string> = {
    bad: 'bg-red-400/20 border-r border-red-400/50 dark:bg-red-600/20 dark:border-red-600/50 active:bg-red-500/20 active:border-red-500/50',
    ok: 'bg-yellow-400/20 border-r border-yellow-400/50 dark:bg-yellow-600/20 dark:border-yellow-600/50 active:bg-yellow-500/20 active:border-yellow-500/50',
    good: 'bg-emerald-400/20 border-r border-emerald-400/50 dark:bg-emerald-600/20 dark:border-emerald-600/50 active:bg-emerald-500/20 active:border-emerald-500/50',
    default: 'bg-neutral-400/20 border-r border-neutral-400/50 dark:bg-neutral-600/20 dark:border-neutral-600/50 active:bg-neutral-500/20 active:border-neutral-500/50',
  };
  return (
    <div className={cn('w-14 flex items-center justify-center [grid-area:icon]', styles[state], className)}>
      <IconComponent className="size-6" />
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="font-semibold text-sm self-end truncate [grid-area:title]">{children}</h3>;
}

function Desc({ children }: { children: ReactNode }) {
  return <p className="text-neutral-500 text-xs line-clamp-2 leading-tight [grid-area:descripition]">{children}</p>;
}