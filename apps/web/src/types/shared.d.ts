// export type Maybe<T> = T | null | undefined;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}
