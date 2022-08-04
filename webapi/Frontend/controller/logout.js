

$(document).ready(function () {

    var tok = localStorage.getItem('token');

    $("#logout").click(function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost:6060/users/logout',
            beforeSend: function (xhr) {
                if (tok) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                }
            },
            success: function (data) {
                location.href = "login.html";

            },
            //  success: function(data) {
            //     $('#stage').append('<p> Username: ' + data.username  + '</p>' + "<p>Password : " + data.password + "<p/>");    

            //  }, 
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Sorry, you are not logged in.");
                console.log(errorThrown)
            }
        });
    });
});
