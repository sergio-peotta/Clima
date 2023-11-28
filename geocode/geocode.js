const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {

        var addressUri = encodeURIComponent(address);

        var apiKey = 'AIzaSyCF83dGW2jVMrCI4MFDYWoRMo23aLscgZ4';

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressUri}&key=${apiKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google server');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else {
                reject(JSON.stringify({error, response, body}));
            }
        });

    });

};

module.exports.geocodeAddress = geocodeAddress;