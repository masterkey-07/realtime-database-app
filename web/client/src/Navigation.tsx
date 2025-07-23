import type { Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Monitoring",
  },
  {
    segment: "system",
    title: "System",
  },
  {
    segment: "memory",
    title: "Memory",
  },

  {
    segment: "network",
    title: "Network",
  },

  { kind: "divider" },
  {
    kind: "header",
    title: "Analysis",
  },
  { segment: "cpu-memmory-efficiency", title: "Cpu Memmory Efficiency" },
];
