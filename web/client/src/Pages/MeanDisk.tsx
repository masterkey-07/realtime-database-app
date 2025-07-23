import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const MeanDisk = () => {
  const { data = [] } = trpc.analysis.getMeanDiskUsage.useQuery();

  console.log(data);

  return (
    <>
      <TimeSeriesChart
        data={data}
        title="Mean Disk Usage"
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
