const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const http = express();

let postsIndex = 0;
let posts = [];

http.use(bodyParser.json());
http.use(cors());

http.get("/posts",(request,response)=>{
    console.log("Serving all posts saved in memory")
    response.json(posts);
});

http.post("/posts/create",(request,response)=>{
    const requestBody = request.body;
    console.log("Received new posts request to persist ",requestBody);
    requestBody.identifier = ++postsIndex;
    posts.push(requestBody);
    response.json(requestBody);
});

http.delete("/posts/delete/:identifier",(request,response)=>{
    const identifier = request.params.identifier;
    for(let index = 0; index < posts.length; index++){
        const post = posts[index];
        console.log("Received request to delete post with identifier "+identifier);
        if(identifier ==post.identifier){
            console.log("Found item to be deleted",identifier,index,posts);
            const deleted =  posts.splice(index,1);
            console.log("Array should be",deleted);
            response.json(post);
            return
        }
    }
    response.json({});
});

const listeningPort = 8080;

http.listen(listeningPort,()=>{
    console.log(`nodeJS http server is running at port ${listeningPort}`)
});