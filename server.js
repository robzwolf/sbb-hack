const express = require("express");
const app = express();
const ejs = require("ejs");
const agent = require('./agent');
const bodyParser = require("body-parser");

app.use(express.static("public"));

app.use('/agent', agent)
app.use('/agent', express.static('app'))

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  ejs.renderFile("views/index.ejs", {
    "txt": "Greetings!",
    "query": req.query
}, (err, str) => {
    res.send(str);
  });
})

app.get("/customer_frontend", (req, res) => {
  ejs.renderFile("views/customer_frontend.ejs", {
    "query": req.query
  }, (err, str) => {
    res.send(str);
  })
})

app.post("/post_tour", (req, res) => {
    const json = req.body;
    console.log(json);
    res.set("Content-Type", "text/plain");
    res.send("Received: " + JSON.stringify(json));
})



var port = 8080;
app.listen(port, () => console.log("SBB hack node.js instance listening on port %s!", port));
