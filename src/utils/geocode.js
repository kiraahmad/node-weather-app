const request = require('request');

const geoCode = (address , callback) => {
    const apiKey = 'pk.eyJ1Ijoia2lyYWFobWFkIiwiYSI6ImNrZmY3OWpsbjA5MXIyd29xOWo1YmN6cjYifQ.exAIBSSNXPeW8jyJ2kO7iw';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=${apiKey}`;

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('cannot connect to the geolocation service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('cannot find location , please try a different location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
}

module.exports = geoCode