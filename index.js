var Parse = require('parse/node');


Parse.initialize('peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa');
Parse.serverURL = 'http://localhost:1337/parse';


var Post = Parse.Object.extend("Post");
var post = new Post();

post.set("body", "8帖子");
post.set("tags", ["3stTag", "2ndTag"]);
post.set("price", 223);

post.save().then(obj => {
        console.log("Saved " + post.id);

        var Comment = Parse.Object.extend("Comment");
        var comment = new Comment();

        comment.set("content", "Great post8!!");
        comment.set("parent", post);
        comment.save().then(
            obj => {
                var postComments = post.relation("comments");
                postComments.add(comment);
                post.save();
            }

        );


    },
    (obj, err) => {
        console.log(err);
    });