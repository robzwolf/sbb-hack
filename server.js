const express = require("express");
const app = express();
const ejs = require("ejs");
const agent = require('./agent');
const bodyParser = require("body-parser");
const jquery = require("jquery");
const request = require('request');
const generateTours = require("./generate-tours.js");
const activities = require("./activities.js");

const tours = {
    "000000": {
        // Example tour
        userJson: {
            // ...
        },
        tour: {
            // ...
        }
    }
};

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
    const userJson = req.body;
    console.log("Received json was:", userJson);
    tours[userJson.id] = {
        "userJson": cleanupUserJson(userJson)
    }
    console.log("tours is now", tours);
    generateTours.makeTour(userJson);
    res.set("Content-Type", "text/plain");
    res.send("Received:" + JSON.stringify(userJson));
})

app.get("/activities_categories", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send(activities.categories);
});

generateTours.sayHello();
generateTours.generateToken();

const cleanupUserJson = function(userJson) {
    if(!userJson["activities"]) {
        userJson["activities"] = {
            // "liked": [],
            // "disliked": []
        }
        console.log("redfeined activities")
    }
    
    if(!userJson["activities"]["disliked"]) {
        userJson["activities"]["liked"] = [];
        console.log("refedefined liked")
    }
    
    if(!userJson["activities"]["disliked"]) {
        userJson["activities"]["disliked"] = [];
        console.log("refedeifng disliked")
    }
    return userJson;
}

// setTimeout(() => { console.log(generateTours.token); }, 2000);

var port = 8080;
app.listen(port, () => console.log("SBB hack node.js instance listening on port %s!", port));
