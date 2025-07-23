import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./app";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("Internal server error:", error);
      }
    },
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/trpc`);
});
