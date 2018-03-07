$(function () {
    $('.modal').modal();
    $('select').material_select();

    $('#loading-modal').modal({
        dismissible: false
    });


});


function initEditUser(userid) {
    // alert("Edit User " + userid);
    $.post("/get_user", {id: userid}, function (data, status) {
        let user = data;
        $('#edit-user-modal').modal('open');
        // Set user details in the fields.
        // debugger;
        $('#edit-user-modal-title').text("Edit User ID: " + user.id).val(user.id);
        $('#edit-user-username').val(user.username);
        $('#edit-user-pwd').val(user.password);
        let d = {
            "Manager": "1",
            "Worker": "2",
            "Client": "3"
        };
        $("#edit-select-type").val(d[user.type]).material_select();
        // $('select').val(user.type).material_select();

        // Send update query to the server.
        $('#edit-user-send').click(() => {
            let user = {
                id: $('#edit-user-modal-title').val(),
                username: $('#edit-user-username').val(),
                password: $('#edit-user-pwd').val(),
                type: $('#edit-select-type').parent(["0"]).children()[1].value
            };
            // debugger;
            toggleLoading('open', "Updating. Please Wait...");
            $('#edit-user-modal').modal('close');
            $.ajax({
                type: "POST",
                url: "/edit_user",
                data: user,
                timeout: 5000,
                error: function () {
                    toggleLoading('close');
                    toggleError('open');
                },
                success: function (data, status) {
                    toggleLoading('close');
                    loadHtmlContent(data);
                }
            });
        });
    });

}

function initAddUser(currentUserType) {

    $('#add-user-modal').modal('open');

    $('#add-user-send').click(() => {
        let user = {
            username: $('#add-user-username').val(),
            password: $('#add-user-pwd').val(),
            type: $('#add-select-type').parent(["0"]).children()[1].value
        };

        if (currentUserType === "Worker" && (user.type === "Manager" || user.type === "Worker")) {
            let $toastContent = $('<span>Worker cannot add Manager or client</span>').add($('<button class="btn-flat toast-action red-text" onclick="dismissToasts()">Dismiss</button>'));
            Materialize.toast($toastContent, 1000, '', function () {
            });
            return;
        }

        toggleLoading('open', "Adding. Please Wait...");
        $('#add-user-modal').modal('close');
        $.ajax({
            type: "POST",
            url: "/add_user",
            data: user,
            timeout: 5000,
            error: function () {
                toggleLoading('close');
                toggleError('open');
            },
            success: function (data, status) {
                toggleLoading('close');
                loadHtmlContent(data);
            }
        });
    });
    // $('#addUserModal').modal('toggle');
    //
    // // Set dropdown button selection action.
    // $("#addUserTypeDropdown").find("li a").click(function () {
    //     $("#addUserTypeBtn:first-child").text($(this).text()).val($(this).text());
    // });
    //
    // // Send insert query to the server.
    // $('#addUserBtn').click(() => {
    //     let user = {
    //         id: $('#addUserModalTitle').val(),
    //         username: $("#addUserUsername").val(),
    //         password: $("#addUserPwd").val(),
    //         type: $("#addUserTypeBtn:first-child").text()
    //     };
    //     $.post("/add_user", user, function (data, status) {
    //         $("#addUserModal").modal('hide');
    //         loadHtmlContent(data);
    //     });
    // });
}

function initDeleteUser(userid) {
    $('#confirm-modal').modal('open');

    $('#confirm-delete-btn').click(() => {
        // debugger;
        toggleLoading('open');

        $.ajax({
            type: "POST",
            url: "/del_user?id=" + userid,
            data: null,
            timeout: 5000,
            error: function () {
                toggleLoading('close');
                toggleError('open');
            },
            success: function (data, status) {
                toggleLoading('close');
                loadHtmlContent(data);
            }
        });
    });
}

function toggleError(toggle) {
    $('#error-modal').modal(toggle);
}

function toggleLoading(toggle, title) {
    if (title)
        $('#loading-modal-title').html(title);
    $('#loading-modal').modal(toggle);
}

function refreshUsers() {
    toggleLoading('open', "Loading...");
    $.ajax({
        type: "GET",
        url: "/users",
        timeout: 5000,
        error: function () {
            toggleLoading('close');
            toggleError('open');
        },
        success: function (data, status) {
            toggleLoading('close');
            loadHtmlContent(data);
        }
    });
}

