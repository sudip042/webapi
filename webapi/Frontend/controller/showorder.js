
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
    //var fullname = 'Sagar';
    //alert(tok)

    $.ajax({
        type: 'get',
        url: 'http://localhost:6060/getOrder',
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
                    '<tr>' +
                    '<td><img src="http://localhost:6060/parts/' + data[index].partsimg + '" style="height:250px; width:100%;"></td>' +
                    '<td>' + data[index].partsname + '</td>' +
                    '<td>' + data[index].model + '</td>' +
                    '<td>' + data[index].description + '</td>' +
                    '<td>' + '<b>Psersone:  </b>' + data[index].description + '</td>' +
                    '</tr>'

                );

            });



        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });
});
