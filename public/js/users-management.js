function initEditUser(userid) {
    // alert("Edit User " + userid);
    $.post("/get_user", {id: userid}, function (data, status) {
        debugger;
        let user = data;
        $('#edit-user-modal').modal();
        $('#edit-user-modal').modal('open');

    //     // Set user details in the fields.
    //     $('#edit-user-modal-title').text("Edit User ID: " + user.id).val(user.id);
    //     $('#editUserUsername').val(user.username);
    //     $('#editUserPwd').val(user.password);
    //     $("#editUserTypeBtn:first-child").text(user.type);
    //
    //     // Set dropdown button selection action.
    //     $("#editUserTypeDropdown").find("li a").click(function () {
    //         $("#editUserTypeBtn:first-child").text($(this).text()).val($(this).text());
    //     });
    //
    //     // Send update query to the server.
    //     $('#editUserBtn').click(() => {
    //         let user = {
    //             id: $('#edit-user-modal-title').val(),
    //             username: $("#editUserUsername").val(),
    //             password: $("#editUserPwd").val(),
    //             type: $("#editUserTypeBtn:first-child").text()
    //         };
    //         $.post("/edit_user", user, function (data, status) {
    //             $("#editUserModal").modal('hide');
    //             loadHtmlContent(data);
    //         });
    //     });
    //
    //     $('#deleteUserBtn').click(() => {
    //         let id = $('#edit-user-modal-title').val();
    //         $.post("/del_user?id=" + id,null, function (data, status) {
    //             $("#editUserModal").modal('hide');
    //             loadHtmlContent(data);
    //         } )
    //     });
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
            loadHtmlContent(data);
        });
    });
}



