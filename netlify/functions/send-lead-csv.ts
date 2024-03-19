import { Handler } from "@netlify/functions";
import formattedResponse from "../utility/formattedResponse";
import getLeads from "../utility/getLeads";
import { readFile, writeFile } from "fs/promises";
import csvStringify from "../utility/csvStringify";
import { AWSRegion, EmailSender } from "@everlast-brands/aws-email-sender";

const handler: Handler = async () => {
  try {
    const email = new EmailSender({
      region: AWSRegion.USWest2,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
      defaultSender: "matthewlefevre95@gmail.com",
    });
    const leads = await getLeads();
    const csvFileContents = csvStringify(leads.flat());
    await writeFile("/tmp/leads.csv", csvFileContents);
    const data = await readFile("/tmp/leads.csv");
    email.send({
      // reciever: ["scall@portersop.com"],
      reciever: [
        "mlefevre@everlastbrands.com",
        "matthewlefevre95@gmail.com",
        "scall@portersop.com",
      ],
      subject: "[New Leads] Porter Lead Gen Tool",
      attachment: {
        data: data,
        name: "leads.csv",
      },
      markup:
        "Leads from newly registered businesses in the last week from Idaho Secritary Of State Office.",
    });
  } catch (err) {
    console.error(err);
  }
  return formattedResponse(200);
};

export { handler };
