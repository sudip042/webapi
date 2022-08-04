
$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.get("id"));
    var id = urlParams.get("id");
    let imageFile1 = "";
    $("#partsimg").on('change', function () {
        let formData = new FormData();
        let files = $("#partsimg").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile1", files[0]);
        }
        // $("#add-hero").prop("disabled", true);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:6060/parts_img',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile1 = data.filename;
                alert(imageFile1);
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });


    $.getJSON("http://localhost:6060/updatespecificparts/" + id, function (result) {

        $('#model').val(result.model);
        $('#partsimagedisplay').append(
            '<img src="http://localhost:6060/parts/' + result.partsimg + '"' +
            ' style="width:150px;height:150px;">'
        );
        $("#partsname").val(result.partsname);
        $("#price").val(result.price);
        $("#model").val(result.model);
        $("#description").val(result.description);

    });

    $("#partsupdate").click(function (event) {
        event.preventDefault();
        alert("Parts updated")
        var model = $('#model').val();
        // var partsimg = $('#partsimg').val();
        var partsname = $("#partsname").val();
        var price = $("#price").val();
        var model = $("#model").val();
        var description = $("#description").val();

        var data = {
            "partsimg": imageFile1,
            "partsname": partsname,
            "price": price,
            "model": model,
            "description": description
        };
        if (partsimg == "" || partsname == "" ||
            price == "" || model == "" || description == "") {
            alert("Please fill out all of the fields!");
        }
        else {

            $.ajax({
                type: "PUT",
                url: "http://localhost:6060/updateparts/" + id,
                data: data,
                success: function (res, textStatus, xhr) {
                    console.log("Successfully Updated!");
                    alert("Parts Updated Successfully.");
                    location.href = "dashboard.html";
                }
            });
            return false;
        }

    });

});