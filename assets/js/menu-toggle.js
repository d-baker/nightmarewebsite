$(document).ready(function() {
    $("#main-nav").addClass("closed");
    $("#menu-toggle").attr("aria-expanded", false);

    $("#menu-toggle").click(function() {

        if ($("#main-nav").hasClass("closed")) {
            $("#main-nav").removeClass("closed");
            $("#main-nav").addClass("open");
            $("#menu-toggle").attr("aria-expanded", true);
        } else {
            $("#main-nav").removeClass("open");
            $("#main-nav").addClass("closed");
            $("#menu-toggle").attr("aria-expanded", false);
        }

    });
})
