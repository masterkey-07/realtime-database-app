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
