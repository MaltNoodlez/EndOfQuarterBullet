const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const API = process.env.NS_API;
app.use(express.json());

let cityName = "Enschede";

const cityInfoUrl = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${cityName}&limit=1`;
const catfact = `https://meowfacts.herokuapp.com/?lang=eng&count=3`

async function getStations() {

  const response = await fetch(cityInfoUrl, {
    headers: { "Ocp-Apim-Subscription-Key": API }
  });
  const data = await response.json();
  console.log(data.payload[0])
  const cityCode = data.payload[0].UICCode;

  const cityDeparturesUrl = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?lang=en&uicCode=${cityCode}&maxJourneys=5`;

  const departures = await fetch(cityDeparturesUrl, {
    headers: { "Ocp-Apim-Subscription-Key": API }
  });

  const departureData = await departures.json();
  console.log(departureData.payload.departures);

  return departureData;
}

async function catFact() {
    const catFactResponse = await fetch(catfact)
    const catData = await catFactResponse.json();

    console.log(catData.data);
    return catData.data
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get('/getTrain', async (req, res) => {
    try {
        const data = await getStations();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch station data '});
    }
});

app.get('/getCatFact', async (req, res) => {
    try {
        const catFactList = await catFact();
        console.log(catFactList);
        res.status(200).json(catFactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cat fact :( '});
    }
});