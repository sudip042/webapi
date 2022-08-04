
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    //alert(tok)
    if(tok==null){
        locationlocation.href = "login.html";
    }


    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/showparts',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            $.each(data, function (index) {
                console.log(data[index]._id);
                // alert(data[index].image_file);
                $("#partsdetails").append("<tbody><tr style'text-align:center'><td>" + data[index].partsname + "</td>" +
                    '<td><img class="img-fluid" src="http://localhost:6060/parts/' + data[index].partsimg + '" style="height:200px; width:200px;"></td>' + "<td>"
                    + '$' + data[index].price + "</td>"
                    + "<td>"
                    + data[index].model + "</td>"
                    + "<td>" + data[index].description + "</td>" +
                    '<td><button id="delete" value="' + data[index]._id + '" class="btn btn-danger">Delete<i class="fa fa-trash" aria-hidden="true"></i></button>' +
                    "<a href='updateparts.html?id=" + data[index]._id + "'>" +
                    '<button type"button" class="btn btn-light">Update<i class="fa fa-wrench" aria-hidden="true"></i></a></button>' +
                    "</td></tr></tbody>");


            });

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    $('#partsdetails').on('click', '#delete', function () {
        alert("Parts Deleted Successfully");
        location.href = "dashboard.html";
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:6060/deleteparts/' + id,
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
