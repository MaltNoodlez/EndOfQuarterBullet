const radioList = {
    'Overijssel': "http://streams.rtvoost.nl/audio/allesplat/mp3",
    'Drenthe': "https://cdn.rtvdrenthe.nl/icecast/rtvdrenthe/rtvradio",
    'Friesland': 'https://stream.radionl.fm/rnlfriesland',
    'Groningen': "https://media.rtvnoord.nl/icecast/rtvnoord/radio?.mp3",
    'Flevoland': "https://stream.omroepflevoland.nl/icecast/omroepflevoland/stream1",
    'North Holland': "https://ice.cr6.streamzilla.xlcdn.com:8000/sz=nhnieuws=NHRadio_mp3",
    'South Holland': "https://server3.radio-streams.net:18012/denhaagfm",
    'Zeeland': "https://d3isaxd2t6q8zm.cloudfront.net/icecast/omroepzeeland/omroepzeeland_radio",
    'Utrecht': "https://live.eemland1.nl/radio",
    'Gelderland': "https://d2od87akyl46nm.cloudfront.net/icecast/omroepgelderland/radiogelderland",
    'Limburg': "https://d34pj260kw1xmk.cloudfront.net/icecast/l1/radio-bb-mp3",
    'North Brabant': "http://av.omroepbrabant.nl/icecast/omroepbrabant/mp3"
}

function getLocalRadio(province) {
    return radioList[province]
}

module.exports = { getLocalRadio };