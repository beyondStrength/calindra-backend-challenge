const NodeGeocoder = require('node-geocoder');
const env = require('ckey');

const options = {
    provider    : "google",
    apiKey      : env.API_KEY,
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder;