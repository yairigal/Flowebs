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

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal').modal();

    $('#logout_button_nav').hide();
    $('#logout_button_nav_collapse').hide();
    $('#login_button_nav').show();
    $('#login_button_nav_collapae').show();
    $('#flower-catalog').hide();
    $('#flower-catalog-collapse').hide();







    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText, callb) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function (cb) {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
            setTimeout(cb, 100);
        }, $msgShowTime, callb);
    }
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
                Materialize.toast($toastContent, 1500, '',function(){afterSuccessLogin()});

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
        loadHtmlToBody(data);
        let $toastContent = $('<span>Logout Successful</span>').add($('<button class="btn-flat toast-action red-text" onclick="dismissToasts()">Dismiss</button>'));
        Materialize.toast($toastContent, 1500);

    });

}

function afterSuccessLogin() {
    //$('.close').click();
    $('#login-modal').modal('close')
    $('#login-button-parallax').hide();
    $('.button-collapse').sideNav('hide');

    $('#logout_button_nav').show();
    $('#logout_button_nav_collapse').show();
    $('#flower-catalog').show();
    $('#flower-catalog-collapse').show();
    $('#login_button_nav').hide();
    $('#login_button_nav_collapse').hide();

}

function afterFailedLogin() {
    //$('.close').click();
}

function dismissToasts(){
    Materialize.Toast.removeAll();
}
