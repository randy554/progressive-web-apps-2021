import fetch from "node-fetch";

export async function getData(apiEndpoint) {
  const response = await fetch(apiEndpoint);

  const data = await response.json();

  return data;
}
