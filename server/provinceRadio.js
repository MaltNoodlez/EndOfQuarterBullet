const radioList = {
    'Overijssel': "Radio Oost",
    'Drenthe': "RTV Drenthe",
    'Friesland': 'https://stream.radionl.fm/rnlfriesland',
    'Groningen': "RTV Noord",
    'Flevoland': "Omrop Flevoland",
    'North Holland': "Radio Noord-Holland",
    'South Holland': "Radio West",
    'Zeeland': "Radio Zeeland",
    'Utrecht': "Radio M",
    'Gelderland': "Radio Gelderland",
    'Limburg': "L1",
    'Brabant': "Omroep Brabant"
}

function getLocalRadio(province) {
    return radioList[province]
}

module.exports = { getLocalRadio };