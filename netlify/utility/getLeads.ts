import { bizSearch } from "./bizSearch";

export default async function getLeads() {
  const today = new Date();
  const whence = new Date();
  const signature = whence.getDate() - 8;
  whence.setDate(signature);

  const todayString = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  const whenceString = `${
    whence.getMonth() + 1
  }/${whence.getDate()}/${whence.getFullYear()}`;
  console.log(whenceString, todayString);

  const queries = ["Law", "Office", "Clinic", "Practice", "INC"];

  const results = await Promise.all(
    queries.map(q => bizSearch(q, whenceString, todayString))
  );

  return results;
}
