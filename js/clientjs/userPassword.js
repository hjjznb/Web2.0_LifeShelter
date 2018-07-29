$(document).ready(() => {
    
    var userType;
    var userId;
    
    if (!sessionStorage['userId']) {
        window.location.href = "/";
    }
    else {
        userId = sessionStorage['userId'];
        $.ajax({
            url: '/getUserById',
            method: 'post',
            data: {userId:sessionStorage['userId']}
        })
        .done((data)=>{
            $(".userName").text(data.name);
            userType = data.type;
            
            $(".password").empty();
            $(".password").append("<div class='profile'>" +
                                "<label>Old Password:</label><input type='password' id='oldPassword' name='oldPassword' required><br>" +
                                "<label>New Password:</label><input type='password' id='newPassword' name='newPassword' required><br>" +
                                "<label>Confirm Password:</label><input type='password' id='confirmPassword' name='confirmPassword' required><br>" +
                                "</div>");
        });
    }
    
    $(".confirm").on('click', ()=>{
        if($("#newPassword").val() !== $("#confirmPassword").val()) {
            alert("The password entered twice is inconsistent");
            $("#newPassword").val("");
            $("#confirmPassword").val("");
        }
        else {
            var r = confirm("Are you sure to update?");
            if (r === true) {
                $.ajax({
                    url: '/getUserById',
                    method: 'post',
                    data: {userId:sessionStorage['userId']}
                })
                .done((data)=>{
                    if(data.password === $("#oldPassword").val()) {
                        $.ajax({
                            url: '/userPassword',
                            method: 'post',
                            data: {
                                userId:sessionStorage['userId'],
                                newPassword:$("#newPassword").val()
                            }
                        })
                        .done((data)=>{
                            alert("Changed successfully!");
                            $.ajax({
                                url: '/logout',
                                method: 'post'
                            })
                            .done((data)=>{
                                for (var i = 0; i < sessionStorage.length; i++) {
                                    var it = sessionStorage.key(i);
                                    sessionStorage.removeItem(it);
                                }
                                window.location.href = "/";
                            })  
                        })
                    }
                    else {
                        alert("Old password does not match");
                    }
                })
            }
        }
    });
});