const request = require('request');

var getClima = (latitude, longitude) => {

    return new Promise((resolve, reject) => {

        var apiKey = '';

        request({
            url: `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Forecast.io server');
            } else if (response.statusCode === 404) {
                reject('Url not found.');
            } else if (response.statusCode === 400) {
                reject('Unable to fetch weather.');
            } else if (response.statusCode === 200) {
                var res = {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                };
                resolve(res);
            } else {
                reject(JSON.stringify({ error, response, body }));
            }
        });

    });

};

module.exports.getClima = getClima;