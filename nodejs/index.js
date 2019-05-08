const Parse = require('parse/node');


Parse.initialize('peDapNoazCLWTBVQW6acxNgUI4ylTE2LqfrMnrHa');
Parse.serverURL = 'http://localhost:1337/parse';

//Parse.initialize('UgDcZsyEvbR5zWKranSMyIFaPqZQe1efHIJuOd06');
//Parse.serverURL = 'http://ucast.cc:1337/parse';


var Post = Parse.Object.extend("Post");
var post = new Post();

post.set("body", "帖子1");
post.set("tags", ["Tag1", "Tag2"]);
post.set("price", 103);

post.save().then(obj => {
        console.log("Saved " + post.id);

        var Comment = Parse.Object.extend("Comment");
        var comment = new Comment();

        comment.set("content", "Great post 1!!");
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