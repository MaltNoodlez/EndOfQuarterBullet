const express = require('express');
const cors= require('cors')
const app = express();
const PORT = 3000;
require('dotenv').config();
app.use(express.json());
app.use(cors())

const API = process.env.NS_API || 'b9b6ca97eaff4e34abaa3843eebf8984';
const WORLD_API = process.env.STATE_API;
const COUNTRY_ISO2 = "NL"

const catfact = `https://meowfacts.herokuapp.com/?lang=eng&count=3`


async function getStations(cityName) {
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
    return departureData;
}

async function catFact() {
    const catFactResponse = await fetch(catfact)
    const catData = await catFactResponse.json();
    return catData.data
}

async function lookUpProvince(cityName) {
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
  console.log(`App listening on port ${PORT}  `);
});

app.post('/getTrain', async (req, res) => {
    const {city}=req.body
    
    try {
        const data = await getStations(city);
        console.log('error')
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
        res.status(200).json(catFactList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cat fact :( '});
    }
});

app.post('/radio', async (req, res) => {
    const {city}=req.body
    try {
        const currentProvince = await lookUpProvince(city);
        const localRadio = getLocalRadio(currentProvince['province'])
        console.log(localRadio);
        res.status(200).json(localRadio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch province data'})
    }
});