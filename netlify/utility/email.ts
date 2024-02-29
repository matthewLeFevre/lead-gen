import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export function setupEmail() {
  if (!process?.env?.AMAZON_ACCESS_KEY_ID) throw new Error();
  if (!process?.env?.AMAZON_SECRET_ACCESS_KEY) throw new Error();
  if (!process?.env?.AMAZON_REGION) throw new Error();
  const sesClient = new SESClient({
    region: process.env.AMAZON_REGION,
    credentials: {
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
    },
  });
  const send = async (
    recievers: string[],
    subject: string,
    markup: string,
    from: string
  ) => {
    await sesClient.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: recievers,
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: markup,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
        Source: from,
      })
    );
  };

  return send;
}
