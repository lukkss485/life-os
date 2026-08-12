type TypesNolike = { back: string; full: string };
type Prog = { like: string[]; nolike: TypesNolike, languages: string[] };
type Finance = {
  money: number;
  revenues: number;
  expenses: number;
  economy: number;
};
type Me = {
  name: string;
  abreviation: string;
  class: string;
  age: number;
  school: number;
  programation: Prog;
  finance: Finance;
  pesoAtual: number;
  pesoMeta: number;
};

export var creator: Me = {
  name: "Lucas da Silva Lopes",
  abreviation: "Lucas",
  class: "Creator",
  age: 11,
  school: 6,
  programation: {
    like: ["JavaScript", "TypeScript", "HTML", "CSS", "swift", "rust", "Dart"],
    nolike: { back: "Back-end", full: "Full-stack" },
    languages: ["JavaScript", "TypeScript", "HTML", "CSS", "swift", "rust", "Dart", "Java", "Kotlin"],
  },
  finance: {
    money: 0,
    revenues: 0,
    expenses: 0,
    economy: 0,
  },
  pesoAtual: 0,
  pesoMeta: 0,
};
