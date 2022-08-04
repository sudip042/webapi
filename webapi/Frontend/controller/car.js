
$(document).ready(function () {
    var tok = localStorage.getItem('token');
    var id;
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

                $("#cardetails").append(

                    '<div class="col-sm-4">' +
                    '<img src="http://localhost:6060/Cars/' + data[index].carimg +'" style="height:250px; width:100%;">' +

                    '<p class="text-center">' + '<b>Manufacture:  </b>' + data[index].manufacturer + '</p>' +
                    '<p class="text-center">' + '<b>Assembly:  </b>' + data[index].assembly + '</p>' +
                    '<p class="text-center">' + '<b>Engine:  </b>' + data[index].engine + 'mm' + '</p>' +
                    '<p class="text-center">' + '<b>Power:  </b>' + data[index].power + 'cc' + '</p>' +
                    '<p class="text-center">' + '<b>Mileage:  </b>' + data[index].mileage + 'km/hr' + '</p>' +
                    '<p class="text-center">' + '<b>Gears:  </b>' + data[index].gears + ' gears' + '</p>' +
                    '<p class="text-center">' + '<b>Abs:  </b>' + data[index].abs + '</p>' +
                    '<p class="text-center">' + '<b>Wheels:  </b>' + data[index].wheels + '</p>' +
                    '<p class="text-center">' + '<b>Tyre:  </b>' + data[index].tyre + '</p>' +
                    '<p class="text-center">' + '<b>Fuel:  </b>' + data[index].fuel + '</p>' +
                    '</div>'
                );


            });

        },
        error: function () {
            alert("Error. Try Later!!");
        }
    });
});
