import type { EChartOption } from "echarts";
import { ReactECharts } from "./ECharts";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export const TimeSeriesChart = ({
  title,
  series,
  data = [],
}: {
  title: string;
  data: object[];
  series: EChartOption.Series[];
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ReactECharts
        onClick={() => setOpen(true)}
        option={{
          tooltip: {
            trigger: "axis",
          },
          title: {
            text: title,
            left: "center",
            textStyle: { color: "white" },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: "none",
              },
              restore: {},
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "time",
            boundaryGap: false,
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
          },
          dataZoom: [],
          legend: { show: true, textStyle: { color: "white" }, bottom: "0" },
          series: series,
        }}
      />
      <Modal onClose={() => setOpen(false)} open={open}>
        <div
          style={{
            height: "90vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            margin: "1rem",
            overflow: "auto",
            border: "solid white 1px",
          }}
        >
          <TableContainer sx={{ height: "100%" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {Object.keys(data?.[0] || {}).map((v) => (
                    <TableCell>{v}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((dt) => (
                  <TableRow>
                    {Object.keys(data?.[0] || {}).map((k) => (
                      <TableCell>
                        {k === "time"
                          ? new Date(dt[k]).toLocaleTimeString()
                          : dt[k]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </>
  );
};
