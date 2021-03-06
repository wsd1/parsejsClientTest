const Parse = require("parse/node");

Parse.initialize("peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa");
Parse.serverURL = "http://localhost:1337/parse";

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';

/*
    scene 与 spot 为交叉引用的关系，一个scene可以有多个spot， 同一个spot也可以在多个scene中出现。

    下面测试：
  * 1、 建立 相互引用关系；  
    2、 通过 scene 和 spot 互查
    3、 编辑关系，去除对spot的引用，去除scene，删除无用的scene和spot
*/
let Spot = Parse.Object.extend("appSpot_spot");
let Scene = Parse.Object.extend("appSpot_scene");

async function findBiggestSpotId(){
    const query = new Parse.Query(Spot);
    query.descending("spotId");
    return await query.first();
}

async function findBiggestSceneId(){
    const query = new Parse.Query(Scene);
    query.descending("sceneId");
    return await query.first();
}

start();


async function start(){


    let biggestSpot = await findBiggestSpotId();
    let biggestScene = await findBiggestSceneId();
    

    let biggestSpotId = !!biggestSpot ? biggestSpot.get('spotId') : 100;
    let biggestSceneId = !!biggestScene ? biggestScene.get('sceneId'): 1000;
    
    
    let spot1 = new Spot();
    let spot2 = new Spot();
    let scene1 = new Scene();
    let scene2 = new Scene();

    //spot1.set("ctrlrId", 10003);
    await spot1.save({spotId: biggestSpotId + 1, marker: 24, className: "switch_v0.1"});
    console.log("spot1 saved " + spot1.id);
    
    //spot2.set("ctrlrId", 10003);
    await spot1.save({spotId: biggestSpotId + 2, marker: 25, className: "slider_v0.1"});
    console.log("spot2 saved " + spot2.id);

    //注意 得先存储 spot，之后 scene才能引用


    //scene1.set("ctrlrId", 10005);
    await scene1.save({sceneId: biggestSceneId + 1, className: "robotSpace_v0.1", spots: [spot1, spot2] });
    console.log("scene1 saved " + scene1.id);
    
    //scene2.set("ctrlrId", 10006);
    await scene2.save({sceneId: biggestSceneId + 2, className: "robotSpace_v0.2", spots: [spot1] });
    console.log("scene2 saved " + scene2.id);

    // scene存好了，才能更新 spot 对scene的引用

    spot1.set("scenes", [scene1, scene2]);
    await spot1.save();
    console.log("spot1 updated ");
    
    spot2.set("scenes", [scene1]);
    await spot2.save();
    console.log("spot2 updated ");
}

