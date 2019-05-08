const Parse = require('parse/node');


Parse.initialize('peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa');
Parse.serverURL = 'http://localhost:1337/parse';

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';

const user = await Parse.User.logIn("user", "pass");




