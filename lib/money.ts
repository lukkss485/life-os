export type CurrencyCode = "BRL" | "USD" | "EUR" | "GBP" | "JPY";

export type Money = {
  /** Inteiro, na menor unidade da moeda (centavos, cents, etc.) — nunca decimal */
  amount: number;
  currency: CurrencyCode;
};

// Quantas casas decimais cada moeda usa pra sua subunidade
const MINOR_UNIT_EXPONENT: Record<CurrencyCode, number> = {
  BRL: 2, // 1 real = 100 centavos
  USD: 2, // 1 dollar = 100 cents
  EUR: 2,
  GBP: 2,
  JPY: 0, // iene não tem subunidade
};

const LOCALE_BY_CURRENCY: Record<CurrencyCode, string> = {
  BRL: "pt-BR",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
};

/** Converte um valor decimal digitado (ex: 55.90) pra inteiro na menor unidade da moeda */
export function toMinorUnits(value: number, currency: CurrencyCode): number {
  const exponent = MINOR_UNIT_EXPONENT[currency];
  return Math.round(value * 10 ** exponent);
}

// money.ts — trocar "function fromMinorUnits" por:
export function fromMinorUnits(amount: number, currency: CurrencyCode): number {
  return amount / 10 ** MINOR_UNIT_EXPONENT[currency];
}

export function createMoney(decimalValue: number, currency: CurrencyCode): Money {
  return { amount: toMinorUnits(decimalValue, currency), currency };
}

export function formatMoney({ amount, currency }: Money): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
  }).format(fromMinorUnits(amount, currency));
}

/** Soma só é válida entre a MESMA moeda — não existe "somar R$ com US$" sem conversão explícita */
export function addMoney(a: Money, b: Money): Money {
  if (a.currency !== b.currency) {
    throw new Error(`[money] não é possível somar ${a.currency} com ${b.currency} sem conversão de câmbio`);
  }
  return { amount: a.amount + b.amount, currency: a.currency };
}

export function negateMoney(m: Money): Money {
  return { amount: -m.amount, currency: m.currency };
}