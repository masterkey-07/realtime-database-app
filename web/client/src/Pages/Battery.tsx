import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const Battery = () => {
  const { data: battery = [] } = trpc.battery.getPercentage.useQuery(
    undefined,
    {
      staleTime: 500,
      gcTime: 500,
    }
  );

  return (
    <>
      <TimeSeriesChart
        title="Battery"
        data={battery}
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            name: "",
            data: battery.map((s) => [s.time, s.battery_percent]),
          },
        ]}
      />
      <TimeSeriesChart
        title="Plugged On"
        data={battery}
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            data: battery.map((mem) => [
              mem.time,
              Number(mem.battery_power_plugged),
            ]),
          },
        ]}
      />
    </>
  );
};
