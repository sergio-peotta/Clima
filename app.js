const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const clima = require('./clima/clima.js');
const utility = require('./utility.js');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        clima.getClima(results.latitude, results.longitude, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Coordinate: ${results.latitude}, ${results.longitude}`);
                console.log(`Temperatura: ${utility.getCelsius(res.temperature)}°`);
            }
        });
    }
});