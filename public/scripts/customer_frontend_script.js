// customer_frontend_script.js

console.log("Loaded custom JS")

$(document).ready(() => {
    
    console.log("doc ready");
    
    $("#header-application-id").slideDown();

    $("#header-application-id-next").click(function(e) {
        $("#travel-dates").slideDown();
        $(this).addClass("faded-button");
        e.preventDefault();
    });
    
    $("#travel-dates-next").click(function(e) {
        $("#activities-like").slideDown();
        $(this).addClass("faded-button");
        $("#travel-dates").slideUp();
        if(window.ID_INCLUDED) {
            $("#header-application-id").slideUp();
        }
        e.preventDefault();
    })
    
    $("#activities-like-next").click(function(e) {
        $("#activities-dislike").slideDown();
        $(this).addClass("faded-button");
        $("#activities-like").slideUp();
        e.preventDefault();
    });
    
    $("#activities-dislike-next").click(function(e) {
        $("#b-app-id").text($("#app-id").val());
        $("#thank-you").slideDown();
        $(this).addClass("faded-button");
        $("#header-application-id").slideUp();
        $("#activities-dislike").slideUp();
        e.preventDefault();
    });
    
    if(window.ID_INCLUDED) {
        // $("#header-application-id-next").click();
        $("#travel-dates").slideDown();
        $("#header-application-id-next").addClass("faded-button");
    }
    
    // Load tile activities
    $.getJSON("/scripts/activities_static.js", data => {
        
        console.log("did json", data);
        
        // Iterate through activities and append them to #tiles
        $.map(data.activities, (activity, i) => {
            console.log("appending", i, activity)
            $("#tiles-like").append('<a href="#" id="tile-like-' + i + '" class="tile-activity tile-activity-like" data-activity="' + i + '">' + activity + '</a>');
            $("#tiles-dislike").append('<a href="#" id="tile-dislike-' + i + '" class="tile-activity tile-activity-dislike" data-activity="' + i + '">' + activity + '</a>');
        });
        
        // Add click handlers to new elements
        $(".tile-activity-like").click(function(e) {
            $(this).toggleClass("selected");
            $("#tile-dislike-" + $(this).attr("data-activity")).toggleClass("tile-activity-disabled")
            e.preventDefault();
        })
        
        $(".tile-activity-dislike").click(function(e) {
            if( !$(this).hasClass("tile-activity-disabled") ) {
                $(this).toggleClass("selected");
            }
            e.preventDefault();
        })
    });

});
