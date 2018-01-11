function openEditUser(userid) {
    //let user = eval($('#edit-btn').id);
    $.post("/get_user", {id: userid}, function (data, status) {
        let user = data;
        $('#EditUserModal').modal('toggle');
        $('#edit-user-username').text(user.username);
        $('#edit-user-pass').text(user.password);
        $('#editMenu').text(user.type);
        $('#edit-user-btn').click(() => {
            let user = {
                username: $("#edit-user-username").val(),
                password: $("#edit-user-pass").val(),
                type: $('#editMenu').val()
            };
            $.post("/edit_user", user, function (data, status) {
                dismissModal('EditUserModal');
                loadHtmlToBody(data);
            });
        });
    });

}

function initDropbox() {
    $("#add-user-type").children().each(function () {
        $(this).click(function () {
            $("#addMenu").text($(this).text());
            $("#addMenu").val($(this).text());
        });
    });
}

function dismissModal(modalid) {
    $("#" + modalid).modal('hide');
}


function initAddButton() {
    $("#btnAddUser").click(function () {
        let user = {
            username: $("#add-user-username").val(),
            password: $("#add-user-pass").val(),
            type: $('#addMenu').val()
        };
        $.post("/add_user", user, function (data, status) {
            dismissModal('AddUserModal');
            loadHtmlToBody(data);
        });
    });
}

$(function () {
    initDropbox();
    initAddButton();
});