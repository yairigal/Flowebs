$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: false
});

// move next carousel
$('.moveNextCarousel').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('next');
});

// move prev carousel
$('.movePrevCarousel').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.carousel').carousel('prev');
});

function loadCatalog() {
    $.get("/catalog", function (data, status) {
        loadHtmlPage(data);
    })
}


function loadHtmlPage(data) {
    $('#content').html(data);
}

