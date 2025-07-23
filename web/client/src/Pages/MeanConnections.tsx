import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const MeanConnections = () => {
  const { data = [] } = trpc.analysis.getMeanConnections.useQuery();

  console.log(data);

  return (
    <>
      <TimeSeriesChart
        data={data}
        title="Mean Network Connections"
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            data: data.map((s) => [s.time, s.mean]),
          },
        ]}
      />
    </>
  );
};
