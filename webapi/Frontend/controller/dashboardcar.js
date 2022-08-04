
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    if(tok==null){
        locationlocation.href = "login.html";
    }
    //alert(tok)


    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/showCars',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            $.each(data, function (index) {
                console.log(data[index]._id);
                // alert(data[index].image_file);
                $("#cardetails").append("<tbody><tr style'text-align:center'><td>" + data[index].model +
                    '<td><img class="img-fluid" src="http://localhost:6060/Cars/' + data[index].carimg + '" style="height:200px; width:200px;"></td>'
                    + "<td>" + data[index].manufacturer + "</td>"
                    + "<td>" + data[index].assembly + "</td>" + "<td>" + data[index].engine + 'mm' + "</td>" + "<td>" + data[index].power + 'cc' + "</td>"
                    + "<td>" + data[index].mileage + 'km/l' + "</td>" + "<td>" + data[index].gear + 'gears' + "</td>" + "<td>" + data[index].fuel + "</td>"
                    + "<td>" + data[index].abs + "</td>" + "<td>" + data[index].wheels + "</td>" + "<td>" + data[index].tyre + "</td>" +
                    '<td><button id="delete" value="' + data[index]._id + '" class="btn btn-danger">Delete<i class="fa fa-trash" aria-hidden="true"></i></button>' +
                    "<a href='updatecars.html?id=" + data[index]._id + "'>" +
                    '<button type"button" class="btn btn-light">Update<i class="fa fa-wrench" aria-hidden="true"></i></a></button>' +
                    "</td></tr></tbody>");
            });

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });
    $('#cardetails').on('click', '#delete', function () {
        alert("Car Deleted Successfully");
        location.href = "dashboard.html";
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:6060/deleteCar/' + id,
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
