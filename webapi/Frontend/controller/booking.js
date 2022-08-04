     
$(document).ready(function () {

    var tok = localStorage.getItem('token');

    var id;
    var fullname;
    var phonenumber;
    var address;


    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/user/me',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {

            // date restriciton
            var dtToday = new Date();

            var month = dtToday.getMonth() + 1;
            var day = dtToday.getDate();
            var year = dtToday.getFullYear();
            if (month < 10)
                month = '0' + month.toString();
            if (day < 10)
                day = '0' + day.toString();

            var maxDate = year + '-' + month + '-' + day;
            // alert(maxDate);
            $('#dateselection').attr('min', maxDate);


            $('#fullname').val(data.fullname);
            $('#ID_user').val(data._id);
            $('#phonenumber').val(data.phonenumber);
            $('#address').val(data.address);
            id = data._id;
            console.log(id);
        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    $('#booking').click(function (e) {
        e.preventDefault();
        user_id = $("#ID_user").val();
        fullname = $("#fullname").val();
        phonenumber = $("#phonenumber").val();
        address = $("#address").val();
        Carselection = $("#Carselection").val();
        dateselection = $('#dateselection').val();
        locationselection = $("#locationselection").val();

        data = {
            'user_id': user_id,
            'fullname': fullname,
            'phonenumber': phonenumber,
            'address': address,
            'Carselection': Carselection,
            'dateselection': dateselection,
            'locationselection': locationselection
        }
        console.log(data)
        if (fullname == "" || phonenumber == "" || address == "" ||
            Carselection == "" || dateselection == "" || locationselection == "") {
            alert("please fill out all of the fields!");
        }
        else {
            $.ajax({
                url: 'http://localhost:6060/bookservicing',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                    alert("Booked Successful");
                    console.log(data);
                    location.href = "index2.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                    console.log(xhr);
                }
            });
        }
    });
});
