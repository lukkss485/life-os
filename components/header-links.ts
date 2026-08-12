import {
  TrendingUp,
  PawPrint,
  BellDot,
  FlaskConical,
  Mail,
  Banknote,
  HandCoins,
  Plus,
  Ellipsis,
  PieChart,
  AlertTriangle,
  GraduationCap,
  NotebookPen,
  Presentation,
  BrickWall,
  Flag,
} from "lucide-react";
import { ICloudIcon, OutlookIcon, YahooIcon } from "./header";

const links: NavLink[] = [
  {
    label: "Educação",
    icon: GraduationCap,
    href: "/education",
    miniLinks: [
      {
        label: "Tarefas",
        href: "/education/tasks",
      },
      {
        label: "Trabalhos",
        href: "/education/work",
      },
      {
        label: "Projetos",
        href: "/education/projects",
      },
      {
        label: "Metas",
        href: "/education/goals",
      },
      { separator: true },
      {
        label: "Tudo",
        href: "/education/all",
      },
    ],
  },
  {
    label: "Financias",
    icon: TrendingUp,
    href: "/finance",
    notification: { state: "ok", notifications: 0 },
    miniLinks: [
      {
        label: "Dinheiro Geral",
        href: "/finance/general-money",
        subLinkNotification: {
          state: "good",
          notifications: 0,
        },
      },
      {
        label: "Dividendos",
        href: "/finance/dividends",
        subLinkNotification: {
          state: "bad",
          notifications: 10,
        },
      },
      {
        label: "Passivos",
        href: "/finance/liabilities",
        subLinkNotification: {
          state: "good",
          notifications: 0,
        },
      },
      {
        label: "Análise",
        href: "/finance/analytics",
        subLinkNotification: {
          state: "bad",
          notifications: 10,
        },
      },
      {separator: true},
      {
        label: "Outros",
        href: "/finance/others",
        subLinkNotification: {
          state: "good",
          notifications: 0,
        },
      },
      {
        label: "Tudo",
        href: "/finance/all",
        subLinkNotification: {
          state: "bad",
          notifications: 10,
        },
      },
    ],
  },

  {
    label: "testes",
    icon: FlaskConical,
    href: "/tests",
    miniLinks: [
      {
        label: "liquid glass",
        href: "/tests/liquid-glass",
        subLinkNotification: {
          state: "bad",
          notifications: 1,
        },
      },
      {
        label: "gradiente pixelado",
        href: "/tests/pixel-gradient",
        subLinkNotification: {
          state: "ok",
          notifications: 1,
        },
      },
      {
        label: "reformulação dos componentes",
        href: "/tests/components-reform",
        subLinkNotification: {
          state: "ok",
          notifications: 1,
        },
      },
    ],
  },
  {
    label: "Notificações",
    icon: BellDot,
    href: "/notifications",
    notification: { state: "good", notifications: 0 },
    miniLinks: [
      {
        label: "Email",
        href: "/notifications/email",
        subLinkNotification: {
          state: "bad",
          notifications: 1,
        },
      },
      {
        label: "Outlook",
        href: "/notifications/outlook",
        subLinkNotification: {
          state: "ok",
          notifications: 10,
        },
      },
      {
        label: "Outros",
        href: "/notifications/others",
        subLinkNotification: {
          state: "ok",
          notifications: 1,
        },
      },
    ],
  },
  { separator: true },
  {
    label: "Animais",
    icon: PawPrint,
    href: "/animais",
    miniLinks: [
      {
        label: "gato",
        href: "/animais/gato",
      },
      {
        label: "Cachorro",
        href: "/animais/cachorro",
      },
    ],
  },
]; // separator code { isSeparator: true },
const schollLinks:NavLink[] = [
  {
    label: "Trabalhos",
    href: "/education/work",
    icon: Presentation,
  },
  {
    label: "Tarefas",
    href: "/education/tasks",
    icon: NotebookPen,
  },
  {
    label: "Projetos",
    href: "/education/projects",
    icon: BrickWall,
  },
  {
    label: "Metas",
    href: "/education/goals",
    icon: Flag,
  },
  { separator: true },
  {
    label: "Tudo",
    href: "/education/all",
    icon: Plus
  },
];
const notifLinks: NavLink[] = [
  {
    label: "Email",
    href: "/notifications/email",
    icon: Mail,
    miniLinks: [
      {
        label: "Pessoas",
        href: "/notifications/email/people",
      },
      {
        label: "Empresas",
        href: "/notifications/email/interprises",
      },
      {
        label: "Oportunidades",
        href: "/notifications/email/oportunites",
      },
      { separator: true },

      {
        label: "Outros",
        href: "/notifications/email/others",
      },
      {
        label: "Tudo",
        href: "/notifications/email/all",
      },
    ],
  },
  {
    label: "Outlook",
    href: "/notifications/outlook",
    icon: OutlookIcon,
    miniLinks: [
      {
        label: "Pessoas",
        href: "/notifications/outlook/people",
      },
      {
        label: "Empresas",
        href: "/notifications/outlook/interprises",
      },
      {
        label: "Oportunidades",
        href: "/notifications/outlook/oportunites",
      },
      { separator: true },
      {
        label: "Outros",
        href: "/notifications/outlook/others",
      },
      {
        label: "Tudo",
        href: "/notifications/outlook/all",
      },
    ],
  },
  {
    label: "Yahoo",
    href: "/notifications/yahoo",
    icon: YahooIcon,
    miniLinks: [
      {
        label: "Pessoas",
        href: "/notifications/yahoo/people",
      },
      {
        label: "Empresas",
        href: "/notifications/yahoo/interprises",
      },
      {
        label: "Oportunidades",
        href: "/notifications/yahoo/oportunites",
      },
      { separator: true },
      {
        label: "Outros",
        href: "/notifications/yahoo/others",
      },
      {
        label: "Tudo",
        href: "/notifications/yahoo/all",
      },
    ],
  },
  {
    label: "Icloud",
    href: "/notifications/icloud",
    icon: ICloudIcon,
    miniLinks: [
      {
        label: "Pessoas",
        href: "/notifications/icloud/people",
      },
      {
        label: "Empresas",
        href: "/notifications/icloud/interprises",
      },
      {
        label: "Oportunidades",
        href: "/notifications/icloud/oportunites",
      },
      { separator: true },
      {
        label: "Outros",
        href: "/notifications/icloud/others",
      },
      {
        label: "Tudo",
        href: "/notifications/yahoo/all",
      },
    ],
  },
  { separator: true },
  {
    label: "Outros",
    href: "/notifications/others",
    icon: Ellipsis,
    miniLinks: [
      {
        label: "Empresas",
        href: "/notifications/others/interprises",
      },
      {
        label: "Oportunidades",
        href: "/notifications/others/oportunites",
      },
      {
        label: "Pessoas",
        href: "/notifications/others/people",
      },
      { separator: true },
      {
        label: "Tudo",
        href: "/notifications/others/all",
      },
    ],
  },
  {
    label: "Tudo",
    href: "/notifications/all",
    icon: Plus,
  },
];
const FinanceLinks: NavLink[] = [
  {
    label: "Dinhero Geral",
    href: "/finance/general-money",
    icon: Banknote,
    miniLinks: [
      {
        label: "Recebidos",
        href: "/finance/general-money/received",
      },
      {
        label: "Transações",
        href: "/finance/general-money/transactions",
      },
      {
        label: "Oportunidades",
        href: "/finance/general-money/oportunites",
      },
      { separator: true },
      {
        label: "Outros",
        href: "/finance/general-money/others",
      },
      {
        label: "Tudo",
        href: "/finance/general-money/all",
      },
    ],
  },
  {
    label: "Dividendos",
    href: "/finance/dividends",
    icon: HandCoins,
    miniLinks: [
      {
        label: "Recebidos",
        href: "/finance/dividends/received",
      },
      {
        label: "Empresas para comprar",
        href: "/finance/dividends/companiestobuy",
      },
      {
        label: "Oportunidades",
        href: "/finance/dividends/oportunites",
      },
      { separator: true },
      {
        label: "Outros",
        href: "/finance/dividends/others",
      },
      { label: "Tudo", href: "/finance/dividends/all" },
    ],
  },
  {
    label: "Passivos",
    href: "/finance/liabilities",
    icon: AlertTriangle,
    miniLinks: [
      { label: "Devedores", href: "/finance/liabilities/debtors" },
      { label: "Contas a pagar", href: "/finance/liabilities/payables" },
      { label: "Parcelas", href: "/finance/liabilities/installments" },
      { separator: true },
      { label: "Others", href: "/finance/liabilities/others" },
      { label: "All", href: "/finance/liabilities/all" },
    ],
  },
  {
    label: "Análise",
    href: "/finance/analytics",
    icon: PieChart,
    miniLinks: [
      { label: "Mensal", href: "/finance/analytics/monthly" },
      { label: "Anual", href: "/finance/analytics/yearly" },
      { label: "Relatórios fiscais", href: "/finance/analytics/tax" },
      { label: "Desempenho", href: "/finance/analytics/performance" },
      { separator: true },
      { label: "Others", href: "/finance/analytics/others" },
      { label: "All", href: "/finance/analytics/all" },
    ],
  },
  { separator: true },
  {
    label: "Tudo",
    href: "/finance/all",
    icon: Plus,
  },
];

type NotificationState = "bad" | "ok" | "good" | "default";
interface NotificationInfo {
  state: NotificationState;
  notifications: number;
}
interface MiniLink {
  label?: string;
  href?: string;
  subLinkNotification?: NotificationInfo;
  separator?: boolean;
}
interface NavLink {
  label?: string;
  href?: string;
  icon?: any;
  notification?: NotificationInfo;
  miniLinks?: MiniLink[];
  separator?: boolean;
}

export const alllinks = {
  schollLinks: schollLinks as NavLink[],
  FinanceLinks: FinanceLinks as NavLink[],
  links: links as NavLink[],
  notfilinks: notifLinks as NavLink[],
};
