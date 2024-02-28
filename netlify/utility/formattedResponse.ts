export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
};

export default function formattedResponse(statusCode: number, body?: any) {
  let response: any = { statusCode };
  response.headers = CORS_HEADERS;
  if (body) response.body = JSON.stringify(body);
  return response;
}
