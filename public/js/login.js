/* #####################################################################
   #
   #   Project       : Modal Login with jQuery Effects
   #   Author        : Rodrigo Amarante (rodrigockamarante)
   #   Version       : 1.0
   #   Created       : 07/29/2015
   #   Last Change   : 08/04/2015
   #
   ##################################################################### */


var globalId;

//when document is ready
$(function () {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal').modal();

    $('#logout_button_nav').hide();
    $('#logout_button_nav_collapse').hide();
    $('#login_button_nav').show();
    $('#login_button_nav_collapae').show();
    $('#flower-catalog').hide();
    $('#flower-catalog-collapse').hide();

});

function login() {

    let username = $('#login_username').val();
    let password = $('#login_password').val();
    $.post("/login",
        {
            username: username,
            pass: password
        },
        function (data, status) {
            if (data !== "BAD") {
                globalId = data;
                let $toastContent = $('<span>Login Successful</span>').add($('<button class="btn-flat toast-action red-text" onclick="dismissToasts()">Dismiss</button>'));
                Materialize.toast($toastContent, 1500, '',function(){afterSuccessLogin(data)});

            } else {
                let $toastContent = $('<span>Wrong Password or Username!</span>').add($('<button class="btn-flat toast-action red-text" onclick="dismissToasts()">Dismiss</button>'));
                Materialize.toast($toastContent, 1500);

            }
        });
}

function logout() {
    $.get('/logout', function (data, status) {
        $('#logout_button_nav').hide();
        $('#logout_button_nav_collapse').hide();
        $('#login_button_nav').show();
        $('#login_button_nav_collapse').show();
        $('#flower-catalog').hide();
        $('#flower-catalog-collapse').hide();
        $('.button-collapse').sideNav('hide');
        $('#login-button-parallax').show();
        $('#info').hide();

        loadHtmlContent(data);
        let $toastContent = $('<span>Logout Successful</span>').add($('<button class="btn-flat toast-action red-text" onclick="dismissToasts()">Dismiss</button>'));
        Materialize.toast($toastContent, 1500);

    });

}

function afterSuccessLogin(data) {
    //$('.close').click();
    $('#login-modal').modal('close');
    $('#login-button-parallax').hide();
    $('.button-collapse').sideNav('hide');

    $('#logout_button_nav').show();
    $('#logout_button_nav_collapse').show();
    $('#flower-catalog').show();
    $('#flower-catalog-collapse').show();
    $('#login_button_nav').hide();
    $('#login_button_nav_collapse').hide();

    loadHtmlContent(data)
    // $('#info').hide();

}

function loadHtmlContent(data) {
    $('#dynamic-content').html(data);
}


function dismissToasts(){
    Materialize.Toast.removeAll();
}
