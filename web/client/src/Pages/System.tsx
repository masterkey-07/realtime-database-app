import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const System = () => {
  const { data: temperature = [] } = trpc.cpu.getTemperature.useQuery(
    undefined,
    { staleTime: 500, gcTime: 500 }
  );

  const { data: usage = [] } = trpc.cpu.getUsage.useQuery(undefined, {
    staleTime: 500,
    gcTime: 500,
  });

  const sensors = temperature.length
    ? Object.keys(temperature[0]).filter((k) => k !== "time")
    : [];

  return (
    <>
      <TimeSeriesChart
        title="CPU Temperature"
        data={temperature}
        series={sensors.map((sensor) => ({
          type: "line",
          smooth: true,
          symbol: "none",
          name: sensor,
          data: temperature.map((temp) => [temp.time, temp[sensor]]),
        }))}
      />
      <TimeSeriesChart
        title="CPU Usage"
        data={usage}
        series={[
          {
            type: "line",
            smooth: true,
            symbol: "none",
            name: "",
            data: usage.map((temp) => [temp.time, temp.cpu_percent]),
          },
        ]}
      />
    </>
  );
};
