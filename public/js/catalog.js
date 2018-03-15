function onLoadPage() {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: false
    });

// move next carousel
    $('.moveNextCarousel').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.carousel').carousel('next');
    });

// move prev carousel
    $('.movePrevCarousel').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.carousel').carousel('prev');
    });

    $('#add-product-modal').modal();
}


function closeNavBar() {
    // $('#mobile-demo').on('click', function(){
    //     $("#mobile-demo").hide();
    // });
}

function loadCatalog() {
    $.get("/catalog", function (data, status) {
        loadHtmlPage(data);
        onLoadPage();
    });
    closeNavBar();
}

function loadHtmlPage(data) {
    $('#content').html(data);
}

function initAddProduct() {
    let modal = $('#add-product-modal');
    let form = $("#upload-form");
    modal.modal('open');
    form.submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: "/catalog/upload",
            processData: false,
            contentType: false,
            data: formData,
            success: function (data, status) {
                modal.modal('close');
                loadHtmlPage(data);
                onLoadPage();
            }
        });
    });
}

function submitUploadForm() {
    let modal = $('#add-product-modal');
    if ($('#url-textbox').val() === '') {
        let form = $("#upload-form");
        form.submit();
    } else {
        let body = {};
        body.src = $('#url-textbox').val();
        $.ajax({
            type: "POST",
            url: "/catalog/upload-url",
            data: body,
            success: function (data, status) {
                modal.modal('close');
                loadHtmlPage(data);
                onLoadPage();
            }
        });
    }

}


