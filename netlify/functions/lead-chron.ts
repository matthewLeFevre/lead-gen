import type { Config } from "@netlify/functions";
import axios from "axios";

export default async () => {
  await axios.get(
    `https://porter-lead-gen.netlify.app/.netlify/functions/send-lead-csv`
  );
};

export const config: Config = {
  schedule: "43 23 * * 2",
};
