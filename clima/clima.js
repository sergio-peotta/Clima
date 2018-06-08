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
            var res = {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            };
            callback(undefined, res);
        }
    });
};

module.exports.getClima = getClima;