
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    //var fullname = 'Sagar';
    //alert(tok)
    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/user/me',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {
            $('#name').append('<p>' + data.fullname + '</p>');
            fullname = $("#name").val();
        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });

    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/showparts',
        beforeSend: function (xhr) {
            if (tok) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
            }
        },
        success: function (data) {

            // id=data._id;
            // console.log(id); 

            // console.log(data);
            $.each(data, function (index) {
                console.log(data[index]._id);
                // alert(data[index].image_file);

                $("#partsdetails").append(
                    '<div class="col-sm-4">' +
                    '<img src="http://localhost:6060/parts/' + data[index].partsimg + '" style="height:250px; width:100%;">' +
                    '<p class="text-center">' + '<b>Parts Name:  </b>' + data[index].partsname + '</p>' +
                    '<p class="text-center">' + '<b>Model:  </b>' + data[index].model + '</p>' +
                    '<p class="text-center">' + '<b>Description:  </b>' + data[index].description + '</p>' +
                    '<button class="btn btn-success d-block mx-auto" id="bookparts">' + 'Order Here' + '</button>' +
                    '</div>'

                );


                $('#bookparts').click(function (e) {
                    e.preventDefault();
                    var partsimg = data[index].partsimg;
                    var partsname = data[index].partsname;
                    var model = data[index].model;
                    var description = data[index].description;


                    data = {
                        'partsimg': partsimg,
                        'partsname': partsname,
                        'model': model,
                        'description': description,
                        'fullname': fullname
                    }
                    console.log(data)
                    $.ajax({
                        url: 'http://localhost:6060/bookparts',
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
                });



            });



        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });
});
