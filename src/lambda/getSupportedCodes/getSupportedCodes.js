async function handler(event) {
  const API_KEY = process.env.API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;

  const response = await fetch(url);

  if (!response.ok) {
    return { statusCode: response.status, body: response.statusText };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

module.exports = { handler };
