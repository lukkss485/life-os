export const add = "add" as const;
export const rem = "rem" as const;
export type EditOp = typeof add | typeof rem;
