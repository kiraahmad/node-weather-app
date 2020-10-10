const request = require('request');

const forecast = (latitude,longitude, callback) => {
    const apiKeyz = '342a2807d218d113d6f8eea14f009692'
   const url = `http://api.openweathermap.org/data/2.5/weather?lat=` +  latitude + `&lon=`+ longitude + `&units=metric&appid=${apiKeyz}`;

   request({url, json: true}, (error, response) => {
       if(error){
           callback('cannot connect to the weather service!', undefined);
       } else if (response.body.message){
           callback('cannot find the location, please try a different location!', undefined);
       } else {
           callback(undefined, 'It is currently ' + response.body.weather[0].description + ', The temperature outside is ' + response.body.main.temp + ' The high today is ' + response.body.main.temp_max + ' with a low of ' + response.body.main.temp_min +'.');
       }
   });
}

module.exports = forecast