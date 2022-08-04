
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    //alert(tok)
    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/showprofile',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            //    $('#stage').append('<p> Name: ' + data.name  + '</p>' + "<p>UserName : " + data.username + "<p/>");   
            // id=data._id;
            // console.log(id); 
            $.each(data, function (index) {
                console.log(data[index]._id);
                // alert(data[index].image_file);
                $("#profiledetails").append("<tbody><tr style'text-align:center'><td>" + data[index]._id + "</td>" +
                    "<td>" + data[index].fullname + "</td><td>" + data[index].email + "</td>" + "<td>" + data[index].phonenumber + "</td>"
                    + "<td>" + data[index].address + "</td>" + "<td>" + data[index].username + "</td>" + "<td>" + data[index].password + "</td>" + "<td>" + data[index].cnfpassword + "</td>" + "<td>" + data[index].usertype + "</td>"
                    + data[index]._id + "' class='btn btn-primary btn-sm'>Edit</a>" +
                    '<td><button id="delete" value="' + data[index]._id + '" class="btn btn-danger">Delete<i class="fa fa-trash" aria-hidden="true"></i></button>');
            });
            // console.log(data);
        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    $('#profiledetails').on('click', '#delete', function () {
        alert("User Deleted Successfully");
        location.href = "profile.html";
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:6060/deleteuser/' + id,
            type: 'DELETE',
            dataType: 'json',
            data: id,
            success: function (data, textStatus, xhr) {
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    });
});
