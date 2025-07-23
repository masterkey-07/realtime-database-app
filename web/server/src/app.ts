import { router } from "./trpc";
import { getTemperature, getUsage as getCPUUsage } from "./procedures/cpu";
import { getSwapUsage, getUsage as getMemoryUsage } from "./procedures/memory";
import { getConnections, getFlow } from "./procedures/network";
import { getPercentage } from "./procedures/battery";
import {
  getLastCpuUsage,
  getMeanDiskUsage,
  getMeanConnections,
  getPerf,
} from "./procedures/analysis";

export const appRouter = router({
  cpu: { getTemperature, getUsage: getCPUUsage },
  memory: { getUsage: getMemoryUsage, getSwapUsage },
  network: { getConnections, getFlow },
  battery: { getPercentage },
  analysis: {
    getLastCpuUsage,
    getMeanDiskUsage,
    getMeanConnections,
    getPerf,
  },
});

export type AppRouter = typeof appRouter;
