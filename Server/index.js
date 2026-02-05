const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const API = process.env.NS_API;
app.use(express.json());

const city_name = "Schiphol";
const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${city_name}&limit=1`;
const catfact = `https://meowfacts.herokuapp.com/?lang=eng`

async function getStations() {
  const response = await fetch(url, {
    headers: { "Ocp-Apim-Subscription-Key": API }
  });

  const data = await response.json();

  console.log(data.payload[0]);
  return data.payload[0].sporen;
}

async function catFact() {
    const catFactResponse = await fetch(catfact)
    const catData = await catFactResponse.json();

    console.log(catData.data[0]);
}


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  
  catFact();
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
