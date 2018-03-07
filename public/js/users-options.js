$(function() {


});



function showCatalogButton() {
    let catBtn = $('#flower-catalog');
    catBtn.show();
    catBtn.click(function () {
        $.get("/catalog", function(data, status){
            loadHtmlContent(data);
        });
    });
}



function showCategories() {
    $('#categories').show();
    $('#users-man').click(function () {
        $.get("/users?id=" + globalId ,function (data,status) {
            loadHtmlContent(data);
            $('#edit-user-modal').modal();
        })
    });
    $('#branches-man').click(function () {
        $.get("/branches",function (data,status) {
            loadHtmlContent(data);
        })
    });
}



function loadUsersManagement(){
    $.get("/users" ,function (data,status) {
        loadHtmlContent(data);
    });
}

function loadStoresManagement(){
    $.get("/branches" ,function (data,status) {
        loadHtmlContent(data);
    });
}
