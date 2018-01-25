function hideCatalogButton() {
    $('#flower-catalog').hide();
}

function hideManagement() {
    $('#list-group').hide();
}

function hideCatalog() {
    $('#catalog-con').hide();
}

function showCatalogButton() {
    let catBtn = $('#flower-catalog');
    catBtn.show();
    catBtn.click(function () {
        $.get("/catalog", function(data, status){
            loadHtmlContent(data);
        });
    });
}

function showManagementButton() {
    $('#categories').show();
}

function changeToLogoutButton() {
    // language=JQuery-CSS
    let lg_btn = $('#login_button_nav');
    if(lg_btn) { // turn to logout
        lg_btn.hide();
        $('#logout_button_nav').show();
        $('#logout_button_nav').click(function () {
            logout();
        });
    }

}

function showCatalog() {
    $('#catalog-container').show();
}

function hideWelcomePage() {
    $('#welcome_page').hide();
}

function showAllButtons() {
    showCatalogButton();
    showCategories();
}

function hideCategories() {
    $('#categories').hide();
}



function showCategories() {
    $('#categories').show();
    $('#users-man').click(function () {
        $.get("/users?id=" + globalId ,function (data,status) {
            loadHtmlContent(data);
        })
    });
    $('#branches-man').click(function () {
        $.get("/branches",function (data,status) {
            loadHtmlContent(data);
        })
    });
}


$(function() {
    //hideManagement();
    //$('.col-md-3').hide();
    //hideCatalogButton();
    //hideCatalog();
    $('#logout_button_nav').hide();
    hideCategories();
    hideCatalogButton();
    //$('#categories').hide();
});

function loadUsersManagement(){
    alert("working!")
}

function loadStoresManagement(){
    alert("working!")
}