# parsejsClientTest
---
本项目用于测试 parse 客户端访问服务器的细节。



## 内部实现


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


