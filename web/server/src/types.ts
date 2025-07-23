export type CpuPoint = {
  time: number;
  cpu_percent: number;
};

export type MemoryPoint = {
  time: number;
  mem_total: number;
  mem_used: number;
  mem_percent: number;
};

export type DiskPoint = {
  time: number;
  disk_total: number;
  disk_used: number;
  disk_percent: number;
};

export type ProcessPoint = {
  time: number;
  process_count: number;
};

export type SwapPoint = {
  time: number;
  swap_total: number;
  swap_used: number;
  swap_free: number;
  swap_percent: number;
};

export type TemperaturePoint = {
  time: number;
  [sensor: string]: number; // e.g. "coretemp_Core 0": 45.0
};

export type NetworkPoint = {
  time: number;
  bytes_sent: number;
  bytes_recv: number;
};

export type NetworkConnectionsPoint = {
  time: number;
  connection_count: number;
};

export type BatteryPoint = {
  time: number;
  battery_percent: number | null;
  battery_secs_left: number | null;
  battery_power_plugged: boolean | null;
};

export type SystemInfoPoint = {
  time: number;
  os: string;
  hostname: string;
};
