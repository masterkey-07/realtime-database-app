import { getFromQuery } from "../helper";
import { publicProcedure } from "../trpc";

export const getCpuMemmoryEfficiency = publicProcedure.query(() =>
  getFromQuery<{ avg_cpu: number; avg_mem: number }>(`
                            SELECT *
                            FROM "cpu", "memory"
                            GROUP BY TIME(5m) FILL(None)
                        `)
);

export const getDiskPressureDuringHighProcessCount = publicProcedure.query(() =>
  getFromQuery<{ avg_disk: number; avg_proc: number }>(`
                            SELECT mean(disk.disk_percent) AS avg_disk, mean(proc.process_count) AS avg_proc
                            FROM disk, process
                            WHERE time > now() - 6h
                            GROUP BY time(5m)
                            HAVING avg_proc > 100
`)
);

export const getSystemIdleTimeEstimate = publicProcedure.query(() =>
  getFromQuery<{ avg_cpu: number; avg_mem: number; net_traffic: number }>(`
                            SELECT mean(cpu.cpu_percent) AS avg_cpu, mean(memory.mem_percent) AS avg_mem, mean(net.bytes_sent + net.bytes_recv) AS net_traffic
                            FROM cpu, memory, network
                            WHERE time > now() - 12h
                            GROUP BY time(10m)
                            HAVING avg_cpu < 10 AND avg_mem < 30 AND net_traffic < 50000
`)
);

export const getBateryEfficiencyOverLoad = publicProcedure.query(() =>
  getFromQuery<{
    battery_drain_rate: number;
    avg_cpu: number;
    avg_mem: number;
  }>(`
                            SELECT derivative(mean(bat.battery_percent), 1m) AS battery_drain_rate, mean(cpu.cpu_percent) AS avg_cpu, mean(memory.mem_percent) AS avg_mem
                            FROM battery AS bat, cpu, memory AS memory
                            WHERE time > now() - 2h AND bat.battery_power_plugged = false
                            GROUP BY time(1m)`)
);
