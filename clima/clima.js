const request = require('request');

var getClima = (latitude, longitude, callback) => {

    var apiKey = '';

    request({
        url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, body.currently);
        }
    });
};

module.exports.getClima = getClima;