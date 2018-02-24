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
            "location": "Leukerbad, Rinderhütte-Leukerbad",
            "datetime": "2018-02-26T10:00:00.110Z",
            "data": {
                "Length": "27 km",
                "Ascents": "940 m",
                "Descents": "1900 m"
            }
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
            "category": "hackathons",
            "name": "START Hack 2018",
            "location": "St Gallen",
            "datetime": "2018-02-23T18:00:00.110Z",
            "data": {
                "Duration": "36 hours",
                "Participants": "300"
            }
        }
    ]
}
