const Parse = require('parse/node');

Parse.initialize('peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa');
Parse.serverURL = 'http://localhost:1337/parse';

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';


// let's say we have four weapons
let scimitar = {a:100, b:"gaha"}
let plasmaRifle = {b:200, c:"hoho"}

// stick the objects in an array
let weapons = [scimitar, plasmaRifle];



let user = new Parse.User();

// 引用原有 user
user.id = "oiMxTxF2G3";

// 新建 user
//user.set("username", "testUser");
//user.set("password", "my pass");
//user.set("email", "email@example.com");


let players = [user];

// store the weapons for the round
let Round = Parse.Object.extend("GameRound");
let round = new Round();

round.set("name", "灭霸");
round.set("weapons", weapons);
round.set("players", players);

round.save().then(obj => {
        console.log("Saved " + round.id);
    },
    (err) => {
        console.log(err);
    });


