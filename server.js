const express = require("express");
const app = express();
const fs = require("fs");
//const fileDB = require("./modules/fileDB.js");

const dbFolder = "./.data/";

app.use(express.static("public"));
app.use(express.json()); // added to be used in post requests to created the "body"

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// IMAN: receive a value
app.post("/mirror", function(request, response) {
  console.log("received request")
  console.log("received request with devID: " + request.body.devId)
  appFile(dbFolder, request.body.devId + ".db", JSON.stringify(request.body) + "\n")
  response.send(getFromFile(dbFolder, request.body.devId + ".db"));
});
 

function appFile(path, name, entry) {
  fs.appendFileSync(path + name, entry, function(err) {
    if (err) throw err;
    console.log("File is appended successfully");
  });
}

function getFromFile(path, name) {
  try {
    return fs.readFileSync(path + name, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

function listDir(path) {
  try {
    return fs.readdirSync(path)
  } catch (err) {
    console.error(err)
    return false
  }
}
