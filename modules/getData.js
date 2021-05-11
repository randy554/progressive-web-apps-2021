import fetch from "node-fetch";

// Get API data
let getData = async (apiEndpoint) => {
  // Make call to the API endpoint
  const response = await fetch(apiEndpoint);

  // Get JSON response
  const data = await response.json();

  return data;
};

export default getData;
