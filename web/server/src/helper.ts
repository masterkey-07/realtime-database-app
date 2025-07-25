import { client } from "./influx";

export const getFromTable = async <T>(
  table: string,
  operations: string = "",
  select: string = "*"
) => {
  const query = `SELECT ${select} FROM "${table}" ${operations}`;

  const result = client.query(query, undefined, { type: "influxql" });

  const output = [];

  for await (const row of result) output.push(row as T);

  return output.sort((a, b) => a.time - b.time);
};

export const getFromQuery = async <T>(query: string) => {
  const result = client.query(query, undefined, { type: "influxql" });

  const output = [];

  for await (const row of result) output.push(row as T);

  return output;
};
