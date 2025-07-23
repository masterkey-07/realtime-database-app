import { InfluxDBClient, Point } from "@influxdata/influxdb3-client";

const url = "http://localhost:8181";
const token =
  "apiv3_sZzGvCIzc5IiG-UEmH_6nmLZqg2q0AiedcwJ_9b71kxoqhY_PDhzoRj9LyRGpPL7xnY6nwGUNF1vSjkluzgzlw";

const database = "unifesp";

const client = new InfluxDBClient({ token, host: url, database: database });

export { client, Point };
