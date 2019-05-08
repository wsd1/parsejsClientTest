let Parse = require("parse/node");

Parse.initialize("peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa");
Parse.serverURL = "http://localhost:1337/parse";

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';

/*
    scene 与 spot 为交叉引用的关系，一个scene可以有多个spot， 同一个spot也可以在多个scene中出现。

    下面测试：
    1、 建立 相互引用关系；  
  * 2、 通过 scene 和 spot 互查
    3、 编辑关系，去除对spot的引用，去除scene，删除无用的scene和spot
*/
let Spot = Parse.Object.extend("appSpot_spot");

start();


async function start(){
    
    const querySpotId = 101;
    const query = new Parse.Query(Spot);
    query.equalTo("spotId", querySpotId);
    query.include("scenes");    // 作为指针引用，这个必不可少


    const spot = await query.first();   //由于唯一性 所以 直接用 first

    console.log(`Query spot whose 'spotId' equal to ${querySpotId}, done.`);
    console.log(`spotId: ${spot.get('spotId')}`);
    console.log(`marker: ${spot.get('marker')}`);
    console.log(`class: ${spot.get('class')}`);

    let scenes = spot.get('scenes');
    console.log(`scenes: ${scenes.length} items`);

    for(var i = 0; i < scenes.length; i++){
        console.log(` --- [${i}] ---`);
        console.log(` sceneId: ${scenes[i].get('sceneId')}`);
        console.log(` class: ${scenes[i].get('class')}`);
        console.log(` spots: ${scenes[i].get('spots').length} items`);
    }
    console.log(` --- end ---`);

}

