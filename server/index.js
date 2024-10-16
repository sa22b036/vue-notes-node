const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const http = express();

let postsIndex = 0;
let posts = [];

http.use(bodyParser.json());
http.use(cors());

// Get all posts from array , GET /posts führt zu dieser funktion
http.get("/posts",(request,response)=>{
    console.log("Serving all posts saved in memory")
    // Hier werden alle posts abgeschickt
    response.json(posts);
});

// POST /posts/create erstellt einen neuen eintrag und gibt einen identifier 
http.post("/posts/create",(request,response)=>{
    // Das ist der JSON welches der Browser uns geschickt hat
    const requestBody = request.body; // <- hat title und content 
    console.log("Received new posts request to persist ",requestBody);
    requestBody.identifier = ++postsIndex; // Identifier setzen fuer post
    posts.push(requestBody); // Neuen post in array abspeichern
    response.json(requestBody); // Neuen post mit neuer ID zurück schicken
});

// DELETE /posts/delete/0 oder /posts/delete/1 löscht einen eintrag aus dem array
http.delete("/posts/delete/:identifier",(request,response)=>{
    const identifier = request.params.identifier; //Nimmt den wert :identifier von der URL und fügt es hier ein
    for(let index = 0; index < posts.length; index++){ // Loopen um eintrag und index zu bekommen
        const post = posts[index];
        console.log("Received request to delete post with identifier "+identifier);
        if(identifier ==post.identifier){
            console.log("Found item to be deleted",identifier,index,posts);
            const deleted =  posts.splice(index,1); // Lösche Eintrag vom Array
            console.log("Array should be",deleted);
            response.json(post); // Sende gelöschten Beitrag wieder zurück
            return
        }
    }
    // Falls kein eintrag gefunden wurde, error objekt wird abgeschickt mit HTTP status 500
    response.status(500).json({error: "Could not find post"});
});


const listeningPort = 8080;

// Hier wird der Server gestartet
http.listen(listeningPort,()=>{
    console.log(`nodeJS http server is running at port ${listeningPort}`)
});