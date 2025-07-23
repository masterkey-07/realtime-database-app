import { TimeSeriesChart } from "../TimeSeriesChart";
import { trpc } from "../trpc";

export const CpuMemmoryEfficiency = () => {
  const r = trpc.analysis.getCpuMemmoryEfficiency.useQuery();

  console.log(r.isError);
  console.log(r.data);
  console.log(r.isLoading);

  return <></>;
  //   const { data: memory = [] } = trpc.memory.getUsage.useQuery(undefined, {
  //     staleTime: 500,
  //     gcTime: 500,
  //   });

  //   const { data: swap = [] } = trpc.memory.getSwapUsage.useQuery(undefined, {
  //     staleTime: 500,
  //     gcTime: 500,
  //   });

  //   return (
  //     <>
  //       <TimeSeriesChart
  //         data={memory}
  //         title="Memory Usagem"
  //         series={["mem_total", "mem_used"].map((key) => ({
  //           type: "line",
  //           smooth: true,
  //           symbol: "none",
  //           name: key,
  //           data: memory.map((mem) => [mem.time, mem[key]]),
  //         }))}
  //       />
  //       <TimeSeriesChart
  //         data={swap}
  //         title="Swap Usage"
  //         series={[
  //           {
  //             type: "line",
  //             smooth: true,
  //             symbol: "none",
  //             name: "",
  //             data: swap.map((s) => [s.time, s.swap_used]),
  //           },
  //         ]}
  //       />
  //     </>
  //   );
};
