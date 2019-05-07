# parsejsClientTest
---
本项目用于测试 parse 客户端访问服务器的细节。

参考教程：

https://www.youtube.com/watch?v=j0zDb9hVooQ&t=404s

##

```bash
# start mongo


# start parse server
parse-server --appId peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa --masterKey fRw4mlRZGUdMCVB8BRv4yb4oyZW165BTKuVWnTQL --databaseURI mongodb://localhost/test



```
## 使用MasterKey来写入对象
```js
//在parse初始化开头，加入：
Parse.masterKey = 'fRw4mlRZGUdMCVB8BRv4yb4oyZW165BTKuVWnTQL';

//写入时
gameScore.set("cheatMode", false);
gameScore.save(null, { useMasterKey: true }).then(...);

```
参见测试代码 index.html


## 内部实现

### one2many的array实现

```js

// let's say we have four weapons
var scimitar = {a:100, b:"gaha"};
var plasmaRifle = {b:200, c:"hoho"};

// stick the objects in an array
var weapons = [scimitar, plasmaRifle];




let user = new Parse.User();
// 引用原有 user
//user.id = "oiMxTxF2G3";

// 新建 user
user.set("username", "testUser");
user.set("password", "my pass");
user.set("email", "email@example.com");

let players = [user];



// store the weapons for the round
var Round = Parse.Object.extend("GameRound");
var round = new Round();

round.set("name", "灭霸");
round.set("weapons", weapons);
round.set("players", players);

round.save()
```

会添加 weapons 和 player两个字段，

weapons部分，会在round对象中添加  weapons array类型对象，内部是 JSON字串，类如：
```json

[
  {
    "a": 100,
    "b": "gaha"
  },
  {
    "b": 200,
    "c": "hoho"
  }
]
```

players部分 会添加  players array类型对象，内部是 JSON字串，如下：

```json

[
  {
    "__type": "Pointer",
    "className": "_User",
    "objectId": "oiMxTxF2G2"
  }
]

```
user是新的对象，那么还会在user表中添加相应用户。

也可以通过设定 user.id = "oiMxTxF2G3" 来直接引用user对象，不过该id正确性不会被检查，就算没有也不会新建。



###  pointer实现

```
        var Comment = Parse.Object.extend("Comment");
        var comment = new Comment();

        comment.set("content", "Great post8!!");    
        comment.set("parent", post);    //  <----  关键部位 
```
mongoDB 内部：

 Comment 文档（表）， parent字段命名为 “_p_parent” ，可能表示该字段是个pointer；
其内容为 “Post$NkugFLC1DX”， 格式应该是 className$InstanceId

### relation实现

```
        var postComments = post.relation("comments");   // <---- 关键部位 
        postComments.add(comment);
        post.save();
```
MongoDB内部：
产生新的表 _Join:comments:Post， 表内 三个字段：

_id, owningId, relatedId，前者是post的Id，后者是 comment的Id。


### 组合查询

```
    var priceQuery = new Parse.Query("Post");
    priceQuery.greaterThan("price", 100);

    var q = new Parse.Query("Comment");
    q.matchesKeyInQuery("parent", "id", priceQuery);
```
会产生：
对 端点 parse/classes/Comment 的访问：
```
{
    "where": {
        "parent": {
            "$select": {
                "key": "id", 
                "query": {
                    "where": {
                        "price": {
                            "$gt": 100
                        }
                    }, 
                    "className": "Post"
                }
            }
        }
    }, 
    "_method": "GET", 
    "_ApplicationId": "peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa", 
    "_ClientVersion": "js2.2.1", 
    "_InstallationId": "db1ffc0b-1137-0448-ef5a-45160470a5f2"
}
```


