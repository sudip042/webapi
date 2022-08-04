
$(document).ready(function () {

    var tok = localStorage.getItem('token');

    // var id;
    var fullname;
    var email;
    var phonenumber;
    var address;
    var username;
    var password;

    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/user/me',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            // alert(tok)

            $('#fullname').val(data.fullname);
            //  $('#ID_user').val(data._id);
            $('#email').val(data.email);
            $('#phonenumber').val(data.phonenumber);
            $('#address').val(data.address);
            $('#username').val(data.username);
            $('#password').val(data.password);
            id = data._id;
            console.log(id);
        },
        error: function () {
            //alert("Sorry, you are not logged in.");
        }
    });


    $("#profile_update").click(function (e) {
        e.preventDefault();
        fullname = $("#fullname").val();
        email = $("#email").val();
        phonenumber = $("#phonenumber").val();
        address = $("#address").val();
        username = $("#username").val();
        password = $("#password").val();
        data1 = {
            'fullname': fullname,
            'email': email,
            'phonenumber': phonenumber,
            'address': address,
            'username': username,
            'password': password

        }
        console.log(data1);
        if (fullname == "" || email == "" || phonenumber == "" || address == "" ||
            username == "" || password == "") {
            alert("please fill out all of the fields!");
        }
        else {

            $.ajax({
                type: "PUT",
                url: "http://localhost:6060/profileupdate",
                data: data1,
                success: function (result) {
                    alert(result);
                },
                beforeSend: function (xhr) {
                    if (tok) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                    }
                },
            });
        }

    });
});


