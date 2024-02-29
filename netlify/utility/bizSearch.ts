import axios from "axios";

export async function bizSearch(query, whenceString, todayString) {
  const res = await axios.post(
    "https://sosbiz.idaho.gov/api/Records/businesssearch",
    {
      ACTIVE_ONLY_YN: false,
      CRA_SEARCH_YN: false,
      FILING_DATE: { start: whenceString, end: todayString },
      SEARCH_VALUE: query,
      STARTS_WITH_YN: "false",
    }
  );

  const entries = res.data.rows;
  let entryData: any[] = [];
  const requests: any[] = [];
  for (const [key, data] of Object.entries(entries)) {
    requests.push(
      axios.get(
        `https://sosbiz.idaho.gov/api/FilingDetail/business/${key}/true`
      )
    );
  }

  const allResults = await Promise.all(requests);
  allResults.forEach(({ data }, i) => {
    const key = Object.keys(entries)[i];
    entryData.push({
      agent: entries[key].AGENT,
      id: key,
      title: entries[key].TITLE[0],
      type: entries[key].TITLE[1],
      principleAddress: data.DRAWER_DETAIL_LIST[5]?.VALUE || "N/A",
      mailingAddress: data.DRAWER_DETAIL_LIST[6]?.VALUE || "N/A",
      agentDetails: data.DRAWER_DETAIL_LIST[9]?.VALUE || "N/A",
      filingDate: entries[key].FILING_DATE,
      query,
    });
  });

  return entryData;
}
