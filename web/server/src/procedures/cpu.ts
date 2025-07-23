import { getFromTable } from "../helper";
import { publicProcedure } from "../trpc";
import { CpuPoint, TemperaturePoint } from "../types";

export const getTemperature = publicProcedure.query(async () => {
  return getFromTable<TemperaturePoint>("temp");
});

export const getUsage = publicProcedure.query(async () => {
  return getFromTable<CpuPoint>("cpu");
});
