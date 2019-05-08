let Parse = require("parse/node");

Parse.initialize("peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa");
Parse.serverURL = "http://localhost:1337/parse";

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';

let Spot = Parse.Object.extend("appSpot_spot");

async function findBiggestSpotId(){
    const query = new Parse.Query(Spot);
    query.descending("spotId");
    return await query.first();
}


find();

async function find(){
    let biggestSpot = await findBiggestSpotId();
    console.log('Biggest spotId : ', !!biggestSpot ? biggestSpot.get('spotId') : 'Empty table');
}

