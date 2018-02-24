// customer_frontend_script.js

console.log("Loaded custom JS")

$(document).ready(() => {
    
    console.log("doc ready")
    
    // Load tile activities
    $.getJSON("/scripts/activities_static.js", data => {
        
        console.log("did json", data);
        
        // Iterate through activities and append them to #tiles
        $.map(data.activities, (activity, i) => {
            console.log("appending", i, activity)
            $("#tiles-like").append('<a href="#" id="tile-' + i + '" class="tile-activity tile-activity-like">' + activity + '</a>');
            $("#tiles-dislike").append('<a href="#" id="tile-' + i + '" class="tile-activity tile-activity-dislike">' + activity + '</a>');
        });
        
        // Add click handlers to new elements
        $(".tile-activity").click(function(e) {
            $(this).toggleClass("selected");
            e.preventDefault();
        })
    });

});
