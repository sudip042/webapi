
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    //alert(tok)


    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/showbooking',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {

            $.each(data, function (index) {
                console.log(data[index]._id);
                // alert(data[index].image_file);
                $("#bookingdetails").append("<tbody><tr style'text-align:center'><td>" + data[index]._id + "</td>" +
                    "<td>" + data[index].fullname + "</td><td>" + data[index].phonenumber + "</td>"
                    + "<td>" + data[index].address + "</td>" + "<td>" + data[index].Carselection + "</td>" + "<td>" + data[index].dateselection + "</td>" + "<td>" + data[index].locationselection + "</td>"
                    +
                    '<td><button id="delete" value="' + data[index]._id + '" class="btn btn-danger">Delete<i class="fa fa-trash" aria-hidden="true"></i></button>');
            });

        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });
    $('#bookingdetails').on('click', '#delete', function () {
        alert("Booking Deleted Successfully");
        location.href = "bookdetails.html";
        id = $(this).val();
        $.ajax({
            url: 'http://localhost:6060/deletebooking/' + id,
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
