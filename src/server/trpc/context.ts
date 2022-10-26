// src/server/router/context.ts
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { prisma } from "../db/client";

export const createContext = async (opts: CreateNextContextOptions) => {
  return {
    prisma,
    req: opts.req,
    res: opts.res
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
