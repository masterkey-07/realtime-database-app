import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { NAVIGATION } from "./Navigation";
import { Memory } from "./Pages/Memory";
import { Network } from "./Pages/Network";
import { System } from "./Pages/System";
import type { JSX } from "react";
import { CpuMemmoryEfficiency } from "./Pages/MeanCPU";
import { MeanDisk } from "./Pages/MeanDisk";
import { MeanConnections } from "./Pages/MeanConnections";
import { CPUMemPerformance } from "./Pages/CPUMemPerformance";
import { Battery } from "./Pages/Battery";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }: { pathname: string }) {
  const Pages: Record<string, JSX.Element> = {
    "/memory": <Memory />,
    "/network": <Network />,
    "/system": <System />,
    "/battery": <Battery />,
    "/cpu-memmory-efficiency": <CpuMemmoryEfficiency />,
    "/get-mean-disk-usage": <MeanDisk />,
    "/get-mean-connections": <MeanConnections />,
    "/get-perf": <CPUMemPerformance />,
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname in Pages ? (
        Pages[pathname]
      ) : (
        <Typography variant="h4" component="h1" gutterBottom>
          Page not found: {pathname}
        </Typography>
      )}
    </Box>
  );
}

export default function App() {
  const router = useDemoRouter("/system");

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      branding={{ title: "RAP - Reatime Application Platform" }}
      window={window}
    >
      <DashboardLayout disableCollapsibleSidebar>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
