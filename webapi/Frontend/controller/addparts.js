
$(document).ready(function (e) {
    var tok = localStorage.getItem('token');
    var id;
    //alert(tok)

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


    $('#addparts').click(function (e) {

        e.preventDefault();
        partsimg = imageFile1;
        partsname = $("#partsname").val();
        price = $("#price").val();
        model = $("#model").val();

        description = $("#description").val();
        data = {
            'partsimg': partsimg,
            'partsname': partsname,
            'price': price,
            'model': model,
            'description': description,
        }

        console.log(data)

        if (partsimg == "" || partsname == "" || price == "" || model == "" || description == "") {
            alert("please fill out all of the fields!");
        }
        else {
            $.ajax({
                url: 'http://localhost:6060/addparts',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res, textStatus, xhr) {
                    alert("Parts Added Successful");
                    console.log(data);
                    location.href = "dashboard.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log('Error in Operation');
                    console.log(xhr);
                }
            });
        }
    });
});
