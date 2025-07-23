import { getFromTable } from "../helper";
import { publicProcedure } from "../trpc";
import { NetworkConnectionsPoint, NetworkPoint } from "../types";

export const getConnections = publicProcedure.query(async () => {
  return getFromTable<NetworkConnectionsPoint>("network_connections");
});

export const getFlow = publicProcedure.query(async () => {
  return getFromTable<NetworkPoint>("network");
});
