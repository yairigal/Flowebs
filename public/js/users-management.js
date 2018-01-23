function initEditUser(userid) {

    $.post("/get_user", {id: userid}, function (data, status) {
        let user = data;
        $('#editUserModal').modal('toggle');

        // Set user details in the fields.
        $('#editUserModalTitle').text("Edit User ID: " + user.id).val(user.id);
        $('#editUserUsername').val(user.username);
        $('#editUserPwd').val(user.password);
        $("#editUserTypeBtn:first-child").text(user.type);

        // Set dropdown button selection action.
        $("#editUserTypeDropdown").find("li a").click(function () {
            $("#editUserTypeBtn:first-child").text($(this).text()).val($(this).text());
        });

        // Send update query to the server.
        $('#editUserBtn').click(() => {
            let user = {
                id: $('#editUserModalTitle').val(),
                username: $("#editUserUsername").val(),
                password: $("#editUserPwd").val(),
                type: $("#editUserTypeBtn:first-child").text()
            };
            $.post("/edit_user", user, function (data, status) {
                $("#editUserModal").modal('hide');
                loadHtmlToBody(data);
            });
        });

        $('#deleteUserBtn').click(() => {
            let id = $('#editUserModalTitle').val();
            $.post("/del_user?id=" + id,null, function (data, status) {
                $("#editUserModal").modal('hide');
                loadHtmlToBody(data);
            } )
        });
    });

}

function initAddButton() {

    $('#addUserModal').modal('toggle');

    // Set dropdown button selection action.
    $("#addUserTypeDropdown").find("li a").click(function () {
        $("#addUserTypeBtn:first-child").text($(this).text()).val($(this).text());
    });

    // Send insert query to the server.
    $('#addUserBtn').click(() => {
        let user = {
            id: $('#addUserModalTitle').val(),
            username: $("#addUserUsername").val(),
            password: $("#addUserPwd").val(),
            type: $("#addUserTypeBtn:first-child").text()
        };
        $.post("/add_user", user, function (data, status) {
            $("#addUserModal").modal('hide');
            loadHtmlToBody(data);
        });
    });
}



