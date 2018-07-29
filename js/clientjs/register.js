$(document).ready(() => {
    $(".registerBtn").on('click', () => {
        var user = {
            name: $("#name").val(),
            nric: $("#nric").val(),
            password: $("#password").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            address: $("#address").val(),
            income: $("#income").val(),
            balance: $("#balance").val(),
            type: $("#type").val()
        };
        $.ajax({
            url: '/register',
            method: 'post',
            data: user
        })
        .done((data) => {
            sessionStorage.setItem("userId", data._id);
            window.location.href = "/index";
        })
        .fail((err) => {
            $(".statusMessage").text(err.responseText);
        });
    });
    
    $("#type").change(function(){
       var selected = $(this).children('option:selected').val()
       if(selected=="Customer"){
           $("#customerFields").attr("style","display:block;");
       }else if(selected=="Staff"){
           $("#customerFields").attr("style","display:none;");
       }
   });
});

