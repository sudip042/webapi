
$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.get("id"));
    var id = urlParams.get("id");

    let imageFile = "";
    $("#Carimg").on('change', function () {
        let formData = new FormData();
        let files = $("#Carimg").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:6060/Car_img',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                alert(imageFile)
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $.getJSON("http://localhost:6060/updatespecificCar/" + id, function (result) {

        $('#model').val(result.model);
        $('#Carimagedisplay').append(
            '<img src="http://localhost:6060/Cars/' + result.carimg + '"' +
            ' style="width:150px;height:150px;">'
        );


        $("#manufacturer").val(result.manufacturer);
        $("#assembly").val(result.assembly);
        $("#engine").val(result.engine);
        $("#power").val(result.power);
        $("#mileage").val(result.mileage);
        $("#gear").val(result.gear);
        $("#fuel").val(result.fuel);
        $("#abs").val(result.abs);
        $("#wheels").val(result.wheels);
        $("#tyre").val(result.tyre);
        //$('#Carimg').val(result.Carimg);
    });

    $("#Carupdate").click(function (event) {
        event.preventDefault();
        alert(" Car Updated")
        var model = $('#model').val();
        var manufacturer = $("#manufacturer").val();
        var assembly = $("#assembly").val();
        var engine = $("#engine").val();
        var mileage = $("#mileage").val();
        var gear = $("#gear").val();
        var fuel = $("#fuel").val();
        var abs = $("#abs").val();
        var wheels = $("#wheels").val();
        var tyre = $("#tyre").val();
        //var Carimg = $('#Carimg').val();


        var data = {
            "model": model,
            "carimg": imageFile,
            "manufacturer": manufacturer,
            "assembly": assembly,
            "engine": engine,
            "mileage": mileage,
            "gear": gear,
            "fuel": fuel,
            "abs": abs,
            "wheels": wheels,
            "tyre": tyre
        };
        if (model == "" ||
            manufacturer == "" || assembly == "" || engine == "" || mileage == "" ||
            gear == "" || fuel == "" || abs == "" || wheels == "" || tyre == "" || Carimg == "") {
            alert("Please fill out all of the fields!");
        }
        else {

            $.ajax({
                type: "PUT",
                url: "http://localhost:6060/updateCar/" + id,
                data: data,
                success: function (res, textStatus, xhr) {
                    console.log("successfully updated!");
                    alert("Car updated successfully.");
                    location.href = "dashboard.html";
                }
            });
            return false;
        }

    });

});