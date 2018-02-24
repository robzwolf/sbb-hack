// generate-tours.js

const jquery = require("jquery");
const request = require('request');
const secret = require("./secret.js");
const activities = require("./activities.js");

module.exports = {
    "jsTitle": "generate-tours",
    "sayHello": function() {
        console.log("generate-tours.js was loaded successfully");
    },
    "generateToken": function() {
        console.log("called doJSThing()")
        request.post("https://sso.sbb.ch/auth/realms/SBB_Public/protocol/openid-connect/token",
            {
                form: secret.creds
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    json = JSON.parse(body);
                    module.exports.token = json.access_token;
                    console.log("TOKEN IS NOW:", module.exports.token);
                }
            }
        );
    },
    "token": undefined,
    "makeTour": function(userJson) {
        console.log("makeTour json was passed:", userJson);
        /* Let us define the general process for generating a tour.
        1) Retrieve a list of available activities
        2) Filter the activities – i.e. remove the ones the user does not like
        3) Pick activities that the user does like
        4) Once we have decided on a list of activities and know the times of
           these activities, get train data to fill in travel between the activity
           locations.
        5) Turn this into one massive tour file (in the format of `sample.json`), and
           make this available via /retrieve_tour?id=xxx
        */
        
        // Filter the list of activities down to only those that the user doesn't dislike
        suitable_events = [];
        activities.events.forEach((event, index) => {
            // console.log("index of " + event.category + " in .disliked is: " + userJson["activities"]["disliked"].indexOf(event.category));
            if(userJson["activities"]["disliked"].indexOf(event.category) <= -1) {
                suitable_events.push(event);
            }
        });
        console.log("suitable_events are:", suitable_events);
        
        
        
        
    }
}
