$(document).ready(function() {
    $("a").on('click', function(event) {
        // Check if the link is pointing to a different page
        if (this.hostname !== window.location.hostname) {
            return; // Allow default behavior for external links
        }

        // Check if the link points to a section within the same page
        if (this.hash !== "" && this.pathname === window.location.pathname) {
            event.preventDefault();
            var hash = this.hash;
            $('body,html').animate({
                scrollTop: $(hash).offset().top
            }, 1200, function() {
                window.location.hash = hash;
            });
        }
    });
});

var width = $(window).width();

window.onscroll = function() {
    if ((width >= 900)) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $("#middle").css("background-size", "150% auto");
        } else {
            $("#middle").css("background-size", "100% auto");
        }
    }
};

setTimeout(function() {
    $("#loading").addClass("animated fadeOut");
    setTimeout(function() {
        $("#loading").removeClass("animated fadeOut");
        $("#loading").css("display", "none");
    }, 800);
}, 1450);

