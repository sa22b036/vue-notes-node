const express = require("express");
const cors = require("cors");


const http = express();

let postsIndex = 0;
let posts = [];

http.use(express.json());
http.use(cors());

http.get("/posts",(request,response)=>{
    response.json(posts);
});

http.post("/posts/create",(request,response)=>{
    const requestBody = request.body;
    requestBody.identifier = ++postsIndex;
    posts.push(requestBody);
    response.json(requestBody);
});

http.delete("/posts/delete/:identifier",(request,response)=>{
    const identifier = request.params.identifier;
    const postIndex = posts.findIndex((value,index,arr)=>{
        return value.identifier == identifier;
    });
    const deletedPost = posts[postIndex];
    posts = posts.splice(postIndex,1);
    response.json(deletedPost);
});

const listeningPort = 8080;

http.listen(listeningPort,()=>{
    console.log(`nodeJS http server is running at port ${listeningPort}`)
});