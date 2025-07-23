import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const CPUMemPerformance = () => {
  const { data = [] } = trpc.analysis.getPerf.useQuery();

  console.log(data);

  return (
    <>
      <TimeSeriesChart
        data={data}
        title="Mem % / CPU % Usage"
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
