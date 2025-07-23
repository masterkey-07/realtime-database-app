import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const Network = () => {
  const { data: flow = [] } = trpc.network.getFlow.useQuery(undefined, {
    staleTime: 500,
    gcTime: 500,
  });

  const { data: connections = [] } = trpc.network.getConnections.useQuery(
    undefined,
    {
      staleTime: 500,
      gcTime: 500,
    }
  );

  return (
    <>
      <TimeSeriesChart
        title="Network Flow"
        data={flow}
        series={["bytes_recv", "bytes_sent"].map((key) => ({
          type: "line",
          smooth: true,
          symbol: "none",
          name: key,
          data: flow.map((mem) => [mem.time, mem[key]]),
        }))}
      />
      <TimeSeriesChart
        title="Connections Count"
        data={connections}
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            name: "",
            data: connections.map((s) => [s.time, s.connection_count]),
          },
        ]}
      />
    </>
  );
};
