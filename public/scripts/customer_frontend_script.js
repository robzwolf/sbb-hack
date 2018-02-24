// customer_frontend_script.js

console.log("Loaded custom JS")

$(document).ready(() => {
    
    console.log("doc ready");
    
    // Slide down the welcome header upon page load
    $("#header-application-id").slideDown();

    $("#header-application-id-next").click(function(e) {
        $("#travel-dates").slideDown();
        $(this).addClass("faded-button");
        if(!window.ID_INCLUDED) {
            $("#header-application-id").slideUp();
        }
        e.preventDefault();
    });
    
    $("#travel-dates-next").click(function(e) {
        // $("#travel-cities").slideDown();
        $("#activities-like").slideDown();
        $(this).addClass("faded-button");
        $("#travel-dates").slideUp();
        if(window.ID_INCLUDED) {
            $("#header-application-id").slideUp();
        }
        e.preventDefault();
    })
    
    // $("#travel-cities-next").click(function(e) {
    //     $("#activities-like").slideDown();
    //     $(this).addClass("faded-button");
    //     $("#travel-cities").slideUp();
    //     e.preventDefault();
    // })
    
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
        
        submitForm();
        
        e.preventDefault();
    });
    
    if(window.ID_INCLUDED) {
        $("#travel-dates").slideDown();
        $("#header-application-id-next").addClass("faded-button");
    }
    
    // Prefill date selectors with today's date
    document.getElementById("from-date").valueAsDate = new Date();
    document.getElementById("return-date").valueAsDate = new Date();
    
    // Load tile activities
    $.getJSON("/scripts/activities_static.js", data => {
        
        console.log("did json activities retrieve:", data);
        
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
        });
        $(".tile-activity-dislike").click(function(e) {
            if( !$(this).hasClass("tile-activity-disabled") ) {
                $(this).toggleClass("selected");
            }
            e.preventDefault();
        });
    });

});

submitForm = function() {
    console.log("Submit clicked");
    submissionData = {
        "id": $("#app-id").val(),
        "dates": {
            "from": $("#from-date").val(),
            "return": $("#return-date").val()
        },
        "activities": {
            "liked": [],
            "disliked": []
        }
    };

    // Get liked activities
    $("#tiles-like").children().filter(".selected").each((i, elem) => { submissionData.activities.liked.push($(elem).attr("data-activity"));});
    
    // Get disliked activities
    $("#tiles-dislike").children().filter(".selected").each((i, elem) => { submissionData.activities.disliked.push($(elem).attr("data-activity"));});
    
    console.log(submissionData);
    
    // Submit it via AJAX
    $.post("http://localhost:8080/post_tour", submissionData, data => {
        console.log("Posted to localhost:8080/post_tour, RESPONSE is", data);
    });
    
}
