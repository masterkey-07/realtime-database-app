import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const CpuMemmoryEfficiency = () => {
  const { data = [] } = trpc.analysis.getLastCpuUsage.useQuery();

  return (
    <>
      <TimeSeriesChart
        data={data}
        title="Last CPU Usage"
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            name: "",
            data: data.map((s) => [s.time, s.cpu_percent]),
          },
        ]}
      />
    </>
  );
};
