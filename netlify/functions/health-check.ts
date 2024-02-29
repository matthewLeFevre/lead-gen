import { Handler } from "@netlify/functions";
import formattedResponse from "../utility/formattedResponse";

const handler: Handler = async () => {
  return formattedResponse(200, { message: "API Healthy" });
};

export { handler };
