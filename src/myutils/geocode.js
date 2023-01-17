//Same above geocode challenge using callback , here we have to create a function where we can give different locations and get geocodes.


const geoRequest = require('request');


const geocode = (address, callback) => {
    const geoUrl = 'https://geocode.search.hereapi.com/v1/geocode?q=' + address + '&apiKey=2SGRnWKAPWGAaqVlMHlNKFUnSyRzidN47NjO0YV3I1I';

    
    const geoRequest = require('request');
    geoRequest ({url : geoUrl , json : true}, (error, response) => {

        //console.log(response);
        if(error) {
            callback('Unable to connect !',undefined);
        }
        else if  (response.body.items.length === 0){
            callback('Unable to find the location', undefined);
        }
        else {
            callback (undefined, {
                lat : response.body.items[0].position.lat,
                lng : response.body.items[0].position.lng});
        }

    })

}


// //calling geocode function from geocode.js
// const move = require('./myutils/geocode')
// move ('Sangrur', (error, data) => {
//      console.log('Error : ',error);
//      console.log('Data : ',data);

// })

module.exports = geocode;