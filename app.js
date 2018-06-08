const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const clima = require('./clima/clima');
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

geocode.geocodeAddress(argv.address)
    .then((resGeoCode) => {
        clima.getClima(resGeoCode.latitude, resGeoCode.longitude)
            .then((res) => {
                console.log(`Coordinate: ${resGeoCode.latitude}, ${resGeoCode.longitude}`);
                console.log(`Address: ${resGeoCode.address}`);
                console.log(`Temperatura: ${utility.getCelsius(res.temperature)}°`);
                console.log(`Temperatura percepita: ${utility.getCelsius(res.apparentTemperature)}°`);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((error) => {
        console.log(error);
    });