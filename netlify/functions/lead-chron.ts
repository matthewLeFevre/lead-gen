import type { Config } from "@netlify/functions";
import axios from "axios";

export default async () => {
  await axios.post(
    `https://porter-lead-gen.netlify.app/.netlify/functions/send-lead-csv-background`,
    {}
  );
};

export const config: Config = {
  schedule: "0 13 * * 4",
};
