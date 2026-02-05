const express = require('express');
const cors=require('cors')
const app = express();
const PORT = 3000;
const cors=require('cors')
require('dotenv').config();
app.use(express.json());
app.use(cors({
    origin:"http:localhost:5173",
    methods:["GET","POST","DELETE"]
}))

const API = process.env.NS_API;
const WORLD_API = process.env.STATE_API;
const COUNTRY_ISO2 = "NL"

const catfact = `https://meowfacts.herokuapp.com/?lang=eng&count=3`


async function getStations(cityName = "Enschede") {
    const cityInfoUrl = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${cityName}&limit=1`;

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
    return catData.data
}

async function lookUpProvince(cityName = "Enschede") {
  const response = await fetch(
    `https://api.countrystatecity.in/v1/countries/${COUNTRY_ISO2}/states`,
    { headers: { 'X-CSCAPI-KEY': WORLD_API } }
  );
  const provinces = await response.json();

  const cityPromises = provinces.map(async (province) => {
    const res = await fetch(
      `https://api.countrystatecity.in/v1/countries/${COUNTRY_ISO2}/states/${province.iso2}/cities`,
      { headers: { 'X-CSCAPI-KEY': WORLD_API } }
    );
    const cities = await res.json();

    const match = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (match) return province.name;
    return null;
  });

  const results = await Promise.all(cityPromises);

  const provinceFound = results.find(p => p !== null);

  if (provinceFound) {
    console.log({ city: cityName, province: provinceFound });
    return { city: cityName, province: provinceFound };
  } else {
    console.log({ city: cityName, province: "Not Found in Database" });
    return { city: cityName, province: "Not Found in Database" };
  }
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
        // console.log(catFactList);
        res.status(200).json(catFactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cat fact :( '});
    }
});

app.get('/radio', async (req, res) => {
    try {
        const currentProvince = await lookUpProvince();
        console.log(currentProvince);
        res.status(200).json(currentProvince);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch province data'})
    }
});