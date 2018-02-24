// activities.js
/* Format of an activity event is:
    {
        category,
        name,
        id, (given by index in `events` array)
        location,
        datetime,
        {
            other data (e.g. platform, gate, etc.)
        }
    }
*/

module.exports = {
    "categories": {
        "activities": {
            "mountain-biking": "Mountain Biking",
            "hiking": "Hiking",
            "skiing": "Skiing",
            "swimming": "Swimming",
            "concerts": "Concerts",
            "theatre": "Theatre",
            "museums": "Museums",
            "hackathons": "Hackathons"
        }
    },
    "events": [
        {
            "category": "mountain-biking",
            "name": "Torrenttrail Bike",
            "location": "Leukerbad",
            "datetime": "2018-02-26T10:00:00.110Z",
            "data": {
                "Length": "27 km",
                "Ascents": "940 m",
                "Descents": "1900 m"
            }
        },
        {
            "category": "mountain-biking",
            "name": "Courtavey Bike",
            "location": "Crans-Montana",
            "datetime": "2018-02-27T11:00:00.110Z",
            "data": {
                "Length": "12 km",
                "Ascents": "550 m",
                "Descents": "550 m"
            }
        },
        {
            "category": "mountain-biking",
            "name": "Val d'Anniviers Bike Planet Tour",
            "location": "St Luc",
            "datetime": "2018-02-29T13:00:00.110Z",
        },
        {
            "category": "swimming",
            "name": "Leisure Swimming",
            "location": "Geneva",
            "datetime": "2018-02-26T19:00:00.110Z",
            "data": {
                "Address": "33 Rue de Vermont\n1202 Geneva,\nSwitzerland",
                "Price": "6 CHF"
            }
        },
        {
            "category": "swimming",
            "name": "Lower Letten River Pool – Swimming Fun",
            "location": "Zürich",
            "datetime": "2018-02-27T16:00:00.110Z",
            "data": {
                "Address": "Flussbad Unterer Letten\nWasserwerkstrasse 141\n8037 Zürich",
                "Price": "0 CHF"
            }
        },
        {
            "category": "swimming",
            "name": "Lido Egg – Nature Swimming",
            "location": "Zürich",
            "datetime": "2018-02-28T09:00:00.110Z",
            "data": {
                "Address": "Strandbad Egg\nRállikon 34\n8132 Egg",
                "Price": "4 CHF"
            }
        },
        {
            "category": "hackathons",
            "name": "START Hack 2018",
            "location": "St Gallen",
            "datetime": "2018-02-23T18:00:00.110Z",
            "data": {
                "Duration": "36 hours",
                "Participants": "300"
            }
        },
        {
            "category": "hackathons",
            "name": "Integration in Progress Hackathon",
            "location": "Geneva",
            "datetime": "2018-03-17T08:30:00.110Z",
            "data": {
                "Duration": "12 hours",
                "Participants": "100"
            }
        }
    ]
}
