$(document).ready(() => {
    
    var id;
    var name;
    var nric;
    var phone;
    var email;
    var address;
    var income;
    var balance;
    var type;
    var timeStamp;
    
    if (!sessionStorage['userId']) {
        window.location.href = "/";
    }
    else {
        $.ajax({
            url: '/getUserById',
            method: 'post',
            data: {userId:sessionStorage['userId']}
        })
        .done((data)=>{
            
            id = data._id;
            name = data.name;
            nric = data.nric;
            phone = data.phone;
            email = data.email;
            address = data.address;
            income = data.income;
            balance = data.balance;
            type = data.type;
            timeStamp = data.timeStamp;
            
            $(".userName").text(name);
            
            $("#profile").empty();
            if(type == "Customer") {
                $("#profile").append("<div class='profile'>" +
                                    "<label>Name:</label>" + name + "<br>" +
                                    "<label>NRIC:</label>" + nric + "<br>" +
                                    "<label>Phone:</label>" + phone + "<br>" +
                                    "<label>Email:</label>" + email + "<br>" +
                                    "<label>Address:</label>" + address + "<br>" + 
                                    "<label>Income:</label>" + income + "<br>" +
                                    "<label>Balance:</label>" + balance + "<br>" +
                                    "<label>Type:</label>" + type + "<br>" +
                                    "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                                "</div>");
            }
            else {
                $("#profile").append("<div class='profile'>" +
                                    "<label>Name:</label>" + name + "<br>" +
                                    "<label>NRIC:</label>" + nric + "<br>" +
                                    "<label>Phone:</label>" + phone + "<br>" +
                                    "<label>Email:</label>" + email + "<br>" +
                                    "<label>Address:</label>" + address + "<br>" + 
                                    "<label>Type:</label>" + type + "<br>" +
                                    "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                                "</div>");
            }
        });
    }
    
    $(".update").on('click', ()=>{
        
        $(".update").css("display", "none");
        $(".password").css("display", "none");
        $(".confirm").css("display", "inline");
        $(".cancel").css("display", "inline");
        
        $("#profile").empty();
        if(type == "Customer") {
            $("#profile").append("<div class='profile'>" +
                                "<label>Name:</label><input type='text' id='name' name='name' value='" + name + "'><br>" +
                                "<label>NRIC:</label>" + nric + "<br>" +
                                "<label>Phone:</label><input type='number' id='phone' name='phone' value='" + phone + "'><br>" +
                                "<label>Email:</label>" + email + "<br>" +
                                "<label style='position:relative;bottom:25px;'>Address:</label><textarea style='margin-top:5px;width:160px;height:50px;' type='text' id='address' name='address'>" + address + "</textarea><br>" + 
                                "<label>Income:</label><input type='text' id='income' name='income' value='" + income + "'><br>" +
                                "<label>Balance:</label><input type='text' id='balance' name='balance' value='" + balance + "'><br>" +
                                "<label>Type:</label>" + type + "<br>" +
                                "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                                "</div>");
        }
        else {
            $("#profile").append("<div class='profile'>" +
                                "<label>Name:</label><input type='text' id='name' name='name' value='" + name + "'><br>" +
                                "<label>NRIC:</label>" + nric + "<br>" +
                                "<label>Phone:</label><input type='number' id='phone' name='phone' value='" + phone + "'><br>" +
                                "<label>Email:</label>" + email + "<br>" +
                                "<label style='position:relative;bottom:25px;'>Address:</label><textarea style='margin-top:5px;width:160px;height:50px;' type='text' id='address' name='address'>" + address + "</textarea><br>" + 
                                "<label>Type:</label>" + type + "<br>" +
                                "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                                "</div>");
        }
    });
    
    $(".cancel").on('click', ()=>{
        
        $(".update").css("display", "inline");
        $(".password").css("display", "inline");
        $(".confirm").css("display", "none");
        $(".cancel").css("display", "none");
        
        $("#profile").empty();
        if(type == "Customer") {
            $("#profile").append("<div class='profile'>" +
                                "<label>Name:</label>" + name + "<br>" +
                                "<label>NRIC:</label>" + nric + "<br>" +
                                "<label>Phone:</label>" + phone + "<br>" +
                                "<label>Email:</label>" + email + "<br>" +
                                "<label>Address:</label>" + address + "<br>" + 
                                "<label>Income:</label>" + income + "<br>" +
                                "<label>Balance:</label>" + balance + "<br>" +
                                "<label>Type:</label>" + type + "<br>" +
                                "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                            "</div>");
        }
        else {
            $("#profile").append("<div class='profile'>" +
                                "<label>Name:</label>" + name + "<br>" +
                                "<label>NRIC:</label>" + nric + "<br>" +
                                "<label>Phone:</label>" + phone + "<br>" +
                                "<label>Email:</label>" + email + "<br>" +
                                "<label>Address:</label>" + address + "<br>" + 
                                "<label>Type:</label>" + type + "<br>" +
                                "<label>Created:</label>" + timeStamp2String(timeStamp) + "<br>" +
                            "</div>");
        }
    });
    
    $(".confirm").on('click', ()=>{
        var r = confirm("Are you sure to update?");
        if (r === true) {
            if(type == "Customer") {
                $.ajax({
                    url: '/userUpdate',
                    method: 'post',
                    data: {
                        id: id,
                        name: $("#name").val(),
                        phone: $("#phone").val(),
                        address: $("#address").val(),
                        income: $("#income").val(),
                        balance: $("#balance").val(),
                        type: type
                    }
                })
                .done((data)=>{
                    window.location.href = "/userProfile";
                })
            }
            else {
                $.ajax({
                    url: '/userUpdate',
                    method: 'post',
                    data: {
                        id: id,
                        name: $("#name").val(),
                        phone: $("#phone").val(),
                        address: $("#address").val(),
                        type: type
                    }
                })
                .done((data)=>{
                    window.location.href = "/userProfile";
                })
            }

        }
    });
    
    $(".password").on('click', ()=>{
        window.location.href = "/userPassword";
    }); 
    
    $(".logout").on('click', ()=>{
        var r = confirm("Are you sure to logout?");
        if (r === true) {
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
        }
    });
});

function timeStamp2String (time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var second = datetime.getSeconds();
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second+"."+mseconds;
};
