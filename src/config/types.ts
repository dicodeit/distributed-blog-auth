export type Optional<T> = T | null | undefined;
export type Nil = null | undefined;

export const isNil = <T>(value: Optional<T>): value is Nil => value == null;