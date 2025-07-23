import { router } from "./trpc";
import { getTemperature, getUsage as getCPUUsage } from "./procedures/cpu";
import { getSwapUsage, getUsage as getMemoryUsage } from "./procedures/memory";
import { getConnections, getFlow } from "./procedures/network";
import {
  getLastCpuUsage,
  getMeanDiskUsage,
  getMeanConnections,
} from "./procedures/analysis";

export const appRouter = router({
  cpu: { getTemperature, getUsage: getCPUUsage },
  memory: { getUsage: getMemoryUsage, getSwapUsage },
  network: { getConnections, getFlow },
  analysis: {
    getLastCpuUsage,
    getMeanDiskUsage,
    getMeanConnections,
  },
});

export type AppRouter = typeof appRouter;
