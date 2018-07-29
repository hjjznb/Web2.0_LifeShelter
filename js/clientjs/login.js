$(document).ready(() => {
    $(".loginBtn").on('click', ()=>{
        $.ajax({
            url: '/login',
            method: 'post',
            data: {
                email:$("#email").val(),
                password:$("#password").val()
            }
        })
        .done((data)=>{
            if(data != "") {
                sessionStorage.setItem("userId", data._id);
                window.location.href = "/index";
            }
            else {
                $(".statusMessage").text("Email or password error!");
            }
        })
        .fail((err)=>{
            $(".statusMessage").text(err.responseText);
        });
    });
});
