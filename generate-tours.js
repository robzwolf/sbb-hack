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
    "makeTour": function(userJson, _this) {
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
        
        // Convert start/return dates to Date format
        const tripStartDate = new Date(userJson["dates"]["from"]);
        const tripEndDate = new Date(userJson["dates"]["return"]);
        
        // Filter the list of activities down to only those that the user doesn't dislike
        suitable_events = [];
        activities.events.forEach((event, index) => {
            eventDate = new Date(event.datetime);
            if(userJson["activities"]["disliked"].indexOf(event.category) <= -1 && tripStartDate < eventDate && eventDate < tripEndDate) {
                suitable_events.push(event);
            }
        });
        console.log("suitable_events are:", suitable_events);
        
        // Start constructing our events list, ensuring we include the user's preferred activities
        var events_list = [];
        var temp_liked = userJson["activities"]["liked"].slice();
        var i_date_counter = tripStartDate;
        while(i_date_counter <= tripEndDate) {
            /* First: read through the `liked` list and add an event corresponding to each category in the list order
               Second: if necessary, fill the remaining days with random events_list
            */
            if(temp_liked.length > 0) {
                var category = temp_liked.pop();
            } else {
                var category = "any";
            }
            /* Select an event of this category on this day */
            var selected_event = _this.selectEventFromCategory(category, suitable_events, i_date_counter);
            console.log("selected_event is", selected_event);
            var events_list_elem = {
                "date": i_date_counter,
                "event": selected_event
            }
            console.log("events_list_elem is", events_list_elem);
            events_list.push(events_list_elem);
            
            // Set counter forward by one day
            i_date_counter.setDate(i_date_counter.getDate() + 1);
        }
        console.log("generated events_list is", events_list);
        return events_list;
        
        
    },
    "selectEventFromCategory": function(category, suitable_events, target_date) {
        var target_date = new Date(target_date);
        console.log("requsted category is", category);
        console.log("target date is", target_date);
        return_event = undefined;
        for(var i=0; i<suitable_events.length; i++) {
            event = suitable_events[i];
            var eventDate = new Date(event.datetime);
            console.log("eventDate for " + event.name + " is " + eventDate);
            if(category != "any") {
                if(eventDate.getDate() == target_date.getDate() && event.category == category) {
                    console.log("selected", event);
                    return_event = event;
                    break;
                }
            } else {
                if(eventDate.getDate() == target_date.getDate()) {
                    console.log("selected", event);
                    return_event = event;
                    break;
                }
            }
        }
        // suitable_events.forEach((event, i) => {
        //     var eventDate = new Date(event.datetime);
        //     console.log("eventDate for " + event.name + " is " + eventDate);
        //     if(category != "any") {
        //         if(eventDate.getDate() == target_date.getDate() && event.category == category) {
        //             console.log("selected", event);
        //             return_event = event;
        //             break;
        //         }
        //     } else {
        //         if(eventDate.getDate() == target_date.getDate()) {
        //             console.log("selected", event);
        //             return_event = event;
        //             break;
        //         }
        //     }
        // })
        return return_event;
        
    }
}
