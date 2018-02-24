const express = require("express");
const app = express();
const ejs = require("ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    ejs.renderFile("views/index.ejs", {"txt": "Greetings!", "query": req.query}, function(err, str){
        res.send(str);
    });
});

app.get("/customer_frontend", (req, res) => {
    ejs.renderFile("views/customer_frontend.ejs", {"query": req.query}, (err, str) => {
        res.send(str);
    })
})

var port = 8080;
app.listen(port, () => console.log("Example app listening on port %s!", port));