import { getFromTable } from "../helper";
import { publicProcedure } from "../trpc";
import { MemoryPoint, SwapPoint } from "../types";

export const getUsage = publicProcedure.query(async () => {
  return getFromTable<MemoryPoint>("memory");
});

export const getSwapUsage = publicProcedure.query(async () => {
  return getFromTable<SwapPoint>("swap");
});
