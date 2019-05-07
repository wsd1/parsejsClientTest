var Parse = require('parse/node');


Parse.initialize('peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa', null, 'fRw4mlRZGUdMCVB8BRv4yb4oyZW165BTKuVWnTQL');
Parse.serverURL = 'http://localhost:1337/parse';

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';


/*
let user = new Parse.User();
//user.set("id", "CFdVEXQ41O");
user.set("username", "ucastUser");
//user.set("phoneNum", "13671056700");
//user.set("email", "xxx@yyy.zzz");

user._linkWith('test', {
    authData: {
        "id": "1",
        "screen_name": "ParseItgg",
    }
})

*/


Parse.User.logInWith('local', {
        authData: {
            "id": "2",
            "secret": "dyhao"
        }
    }).then(function (user) {
        var token = user.getSessionToken();

        console.dir(user);
/*
        user.set("username", "ucastUser");
        user.set("phoneNum", "13671056700");
        user.set("email", "xxx@yyy.zzz");
        user.save();

        if (false)
            Parse.User.become(token).then(function (user) {

                var currentUser = Parse.User.current();
                if (currentUser) {
                    console.log("Parse.User.current()  have some thing");
                    console.dir(currentUser);

                    console.dir(user);
                    user.set("username", "ucastUser");
                    user.set("phoneNum", "13671056700");
                    user.set("email", "xxx@yyy.zzz");
                    user.save();

                } else {
                    // show the signup or login page
                    console.log("Parse.User.current()  null");
                }

            }, function (error) {
                // The token could not be validated.
            });


        */




    })
    .catch(e => {
        console.log(e);
    });