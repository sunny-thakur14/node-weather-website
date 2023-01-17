// const req = require('request');




// const forecast = (lat,lng, callback) => {
//     const forUrl = 'https://revgeocode.search.hereapi.com/v1/revgeocode?at='+lat+'%2C'+lng+'&lang=en-US&apiKey=nDBlr1TSDL_JUy-UpISAPsDyKXbJbVgmUJv87LIzPFQ';

//     req({url : forUrl, json : true}, (error, response) => {

//         if(error) {
//             callback('Unable to connect', undefined);
//         } else if (response.body.items.length===0) {
//             callback('Wrong lat and lng', undefined);
//         }else{
//             callback(undefined, response.body.items[0].address.city);
//         }

//     })
// }

// // //////////////////////////////////////////////////
// // //calling forecast function from geocode.js to fetch city by give lat and lng
// //const forecast = require('./myutils/forecast')
// forecast ('30.25108','75.83437', (error, data) => {
//     console.log('Error', error);
//     console.log('City : ', data);
// })



// module.exports = forecast;




///////////////////main code for my weather app 5th jan 2022 bcos i was not able t find a particular api endpoint for weather

const req = require('request');


//const Myurl = 'http://api.weatherstack.com/current?access_key=e565adbba7a1ccef2ed2411ef2c3853c&query=New%20York';

const weatherReport = (city, callback) =>  {
    const cityurl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=b567584c111e7ab32d5191b79f9fbd68';


    req({ url: cityurl, json: true }, (error, response) => {
        // console.log(response);
        // console.log(response.body.main);

        // //converting into celcious
        // const CurrentCel = response.body.main.temp - 273.15;
        // const day_desc = response.body.weather[0].description;

        if (error) {
            emsg = "Unable to connect !";
            return callback(emsg, undefined);
        }
        else if (response.body.message) {
            callback(response.body.message, undefined);
        }

        else {
            callback(undefined, {
                Temperatur1: (response.body.main.temp - 273.15).toFixed(1),
                Day_desc: response.body.weather[0].description
            });
        }

    })

}

// // calling weatherReport function
// weatherReport ('Sangrur', (error, data) => {
//     console.log('Error', error);
//     console.log('City : ', data);
// })

module.exports = weatherReport;