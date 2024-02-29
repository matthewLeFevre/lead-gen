export default function csvStringify(
  data: {
    agent: string;
    id: string;
    title: string;
    type: string;
    principleAddress: string;
    mailingAddress: string;
    agentDetails: string;
    filingDate: string;
    query: string;
  }[]
) {
  let csvStr =
    "ID, AGENT, TITLE, TYPE, PRINCIPLE_ADDRESS, MAILING_ADDRESS, AGENT_DETAILS, FILING_DATE, QUERY\n";
  data.forEach(d => {
    csvStr += `${cleanStr(d.id)}, ${cleanStr(d.agent)}, ${cleanStr(
      d.title
    )}, ${cleanStr(d.type)}, ${cleanStr(d.principleAddress)}, ${cleanStr(
      d.mailingAddress
    )}, ${cleanStr(d.agentDetails)}, ${cleanStr(d.filingDate)}, ${d.query}\n`;
  });
  return csvStr;
}

function cleanStr(str: string) {
  return str.replaceAll(",", "").replaceAll("\n", "");
}
