$(document).ready(function() { 
    $("#backtotop").hide();

    $(window).scroll(function() {
        var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
        if (scrollPercent > 5) {
            $("#backtotop").show();
        } else {
            $("#backtotop").hide();
        }
    });
});
