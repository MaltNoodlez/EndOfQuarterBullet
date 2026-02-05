const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const API = process.env.NS_API;
app.use(express.json());

const city_name = "Enschede";
const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${city_name}&limit=1`;

async function getStations() {
  const response = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": API }
  });

  const data = await response.json();

  console.log(data.payload[0].namen);
  return data.payload[0].namen;
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);

  getStations();
});

app.get('/', async (req, res) => {
  try {
    const data = await getStations();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch station data' });
  }
});
