import { getFromQuery } from "../helper";
import { publicProcedure } from "../trpc";
import { CpuPoint } from "../types";

export const getLastCpuUsage = publicProcedure.query(() =>
  getFromQuery<CpuPoint>(`
                            SELECT *
                            FROM "cpu"
                            WHERE time > now() - 1m
                        `)
);

export const getMeanDiskUsage = publicProcedure.query(() =>
  getFromQuery<{ avg_disk: number; avg_proc: number }>(`
                            SELECT MEAN("disk_percent")
                            FROM "disk"
                            GROUP BY TIME(10m) FILL(None)
`)
);

export const getMeanConnections = publicProcedure.query(() =>
  getFromQuery<{ avg_cpu: number; avg_mem: number; net_traffic: number }>(`
                            SELECT MEAN("connection_count") AS "mean"
                            FROM "network_connections"
                            GROUP BY time(1h) FILL(None)
`)
);

export const getPerf = publicProcedure.query(async () => {
  const cpu = await getFromQuery(`
                            SELECT MEAN("cpu_percent") AS "mean"
                            FROM "cpu"
                            GROUP BY time(10m) FILL(None)
                            
`);

  const mem = await getFromQuery(`
                            SELECT MEAN("mem_percent") AS "mean"
                            FROM "memory"
                            GROUP BY time(10m) FILL(None)`);

  return cpu.map((c) => ({
    mean: (mem.find((m) => c.time === m.time)?.mean || 0) / c?.mean,
    time: c.time,
    cpu: c.mean,
    mem: mem.find((m) => c.time === m.time)?.mean || 0,
  }));
});
