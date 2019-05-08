let Parse = require("parse/node");

Parse.initialize("peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa");
Parse.serverURL = "http://localhost:1337/parse";

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';

/*
    scene 与 spot 为交叉引用的关系，一个scene可以有多个spot， 同一个spot也可以在多个scene中出现。

    下面测试：
    1、 建立 相互引用关系；  
    2、 通过 scene 和 spot 互查
  * 3、 编辑关系，去除对spot的引用，去除scene，删除无用的scene和spot
*/
let Spot = Parse.Object.extend("appSpot_spot");

start();

// 本示例 通过 include 引入相关对象 直接在其上实施修改
// 找到spot 及其相关 scene 删除scene对本身的引用，并删除本身对所有scene的引用

async function start(){
    
    const querySpotId = 101;
    const query = new Parse.Query(Spot);
    query.equalTo("spotId", querySpotId);
    query.include(["scenes.spots"]);    // <----  重要：不仅引入 spot的scenes字段，还进一步引入后者的spots字段


    const spot = await query.first();   //由于唯一性 所以 直接用 first

    console.log(`Query spot whose 'spotId' equal to ${querySpotId}, done.`);
    console.log(`spotId: ${spot.get('spotId')}`);
    console.log(`marker: ${spot.get('marker')}`);
    console.log(`class: ${spot.get('class')}`);

    let scenes = spot.get('scenes');
    console.log(`scenes: ${scenes.length} items`);

    let newScenes = [];
    for(var i = 0; i < scenes.length; i++){
        console.log(` --- [${i}] ---`);
        console.log(` sceneId: ${scenes[i].get('sceneId')}`);
        console.log(` class: ${scenes[i].get('class')}`);
        let sspots = scenes[i].get('spots');
        console.log(` spots: ${sspots.length} items`);
        let newSpots = [], haveRelatedSpot = false;
        for(var j = 0; j < sspots.length; j++){
            let sId = sspots[j].get('spotId');

            console.log(`   --- [${j}] ---`);
            console.log(`   spotId: ${sspots[j].get('spotId')}`);
            console.log(`   marker: ${sspots[j].get('marker')}`);
            console.log(`   class: ${sspots[j].get('class')}`);
            
            // 如果 该scene的涉及spot就是 query的spotId，那么删除该spot
            if(sId && sId !== querySpotId){
                newSpots.push(sspots[j]);
                console.log(`   ✅`);
            }else{
                console.log(`   ❎`);
                haveRelatedSpot = true;
            }
        }

        // spot指向的scene中 有对当前spot的引用
        if(haveRelatedSpot){
            scenes[i].set('spots', newSpots); 
            await scenes[i].save(); //保存
            console.log(` saved`);
        }
        else{
            newScenes.push(scenes[i]);
        }
    }


    spot.set('scenes', newScenes); 
    await spot.save(); //保存

    
    console.log(` --- end ---`);




}

