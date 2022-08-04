
$(document).ready(function () {


    $('#login').click(function () {

        username = $("#username").val();
        password = $("#password").val();
            // alert(password)
            data = {
                "username": username,
                "password": password
            }
            if (username == "" || password == "") {
                alert("please fill out all of the fields!");
            } else {

                $.ajax({
                    url: 'http://localhost:6060/login',
                    type: 'post',
                    data: data,
                    success: function (res, textStatus, xhr) {
                        if (res.token != null) {
                            //alert(res.token);
                            alert("Successfull")
                            localStorage.setItem('token', res.token);

                            if (res.user.usertype == 'admin') {
                                location.href = "dashboard.html";  //admin login
                            } else if (res.user.usertype == 'user') {
                                location.href = "index2.html";    //general user login
                            }

                        }

                    },
                    error: function (xhr, textStatus, errorThrown) {
                        alert("Incorrect Username or Password!!!")
                        console.log('Error in Operation');
                        location.href = "login.html";   //user will be thrown to login page if error in username || password.

                    }
                });
            }
        
    });

});
