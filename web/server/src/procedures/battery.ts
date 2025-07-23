import { getFromTable } from "../helper";
import { publicProcedure } from "../trpc";
import { BatteryPoint } from "../types";

export const getPercentage = publicProcedure.query(async () => {
  return getFromTable<BatteryPoint>("battery");
});
