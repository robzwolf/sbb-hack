// customer_frontend_script.js

console.log("Loaded custom JS")

$(document).ready(() => {
    console.log("doc ready")
    $(".tile-activity").click(function() {
        $(this).toggleClass("selected");
    })
})
