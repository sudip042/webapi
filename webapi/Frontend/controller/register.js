

$(document).ready(function () {

    $('#register').click(function (e) {
        e.preventDefault();

        fullname = $("#fullname").val();
        email = $("#email").val();
        phonenumber = $("#phonenumber").val();
        address = $("#address").val();
        username = $("#username").val();
        password = $("#password").val();
        cnfpassword = $("#cnfpassword").val();
        data = {
            'fullname': fullname,
            'email': email,
            'phonenumber': phonenumber,
            'address': address,
            'username': username,
            'password': password,
            'cnfpassword': cnfpassword,
            'usertype': "user"
        }
        console.log(data)
        if (fullname == "" || email == "" || phonenumber == "" || address == "" ||
            username == "" || password == "" || cnfpassword == "") {
            alert("please fill out all of the fields!");
        }
        else if
            (
            password !== cnfpassword) {
            alert("Password Donot Match!!!");
        }
        else {
            $.ajax({
                url: 'http://localhost:6060/registerusers',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                    alert("Registered Successful");
                    console.log(data);
                    location.href = "login.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                    console.log(xhr);
                }
            });
        }
    });
});
