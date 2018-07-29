$(document).ready(() => {

    var biology = getUrlParameter('biology');
    var id = getUrlParameter('id');
    var oldRoomNumber;

    if (!sessionStorage['userId']) {
        window.location.href = "/";
    } else {
        $.ajax({
                url: '/getUserById',
                method: 'post',
                data: {
                    userId: sessionStorage['userId']
                }
            })
            .done((data) => {
                $(".userName").text(data.name);
            });

        if (biology == "animal") {
            $.ajax({
                    url: '/getAnimalById',
                    method: 'post',
                    data: {
                        animalId: id
                    }
                })
                .done((data) => {
                    oldRoomNumber = data.roomNumber;

                    $(".content").append("<div class='imagebox'>" +
                        "<img class='img' src='../" + data.photoUrl + "'>" +
                        "</div>")

                    var profile = $("<div class='profile'>");

                    profile.append("<form id='animalUpdateForm' method='post' action='/animalImageUpdate' enctype='multipart/form-data'>" +
                        "<input type='hidden' id='animalId' name='animalId'/>" +
                        "<input type='file' id='animalImage' name='animalImage' onchange='PreviewImage(this)' >" +
                        "<br><br></form>");

                    profile.append("<label>Name:</label><input type='text' id='name' name='name' value='" +
                        data.name + "'><br>" +
                        "<label>Type:</label><input type='text' id='type' name='type' value='" + data.type + "'><br>" +
                        "<label>Variety:</label><input type='text' id='variety' name='variety' value='" + data.variety + "'><br>" +
                        "<label>Age:</label><input type='number' id='age' name='age' value='" + data.age + "'><br>");

                    if (data.gender == "male") {
                        profile.append("<label>Gender:</label>" +
                            "<select id='gender' name='gender'><option value='male' selected>Male</option><option value='female'>Female</option></select><br>");
                    } else {
                        profile.append("<label>Gender:</label>" +
                            "<select id='gender' name='gender'><option value='male'>Male</option><option value='female' selected>Female</option></select><br>");
                    }

                    profile.append("<label style='position:relative;bottom:25px;'>Finding Location:</label>" +
                        "<textarea style='margin-top:5px;width:160px;height:50px;' type='text' id='findingLocation' name='findingLocation'>" + data.findingLocation + "</textarea><br>");

                    profile.append("<label>Price:</label><input type='number' id='price' name='price' value='" +
                        data.price + "'><br>");

                    if (data.isAdopted) {
                        profile.append("<label>Adopted:</label>" +
                            "<select id='isAdopted' name='isAdopted'><option value='true' selected>True</option><option value='false'>False</option></select><br>");
                    } else {
                        profile.append("<label>Adopted:</label>" +
                            "<select id='isAdopted' name='isAdopted'><option value='true' selected>True</option><option value='false' selected>False</option></select><br>");
                    }

                    if (data.healthStatus == "healthy") {
                        profile.append("<label>Status:</label>" +
                            "<select id='healthStatus' name='healthStatus'><option value='healthy' selected>Healthy</option><option value='unhealthy'>Unhealthy</option></select><br>");
                    } else {
                        profile.append("<label>Status:</label>" +
                            "<select id='healthStatus' name='healthStatus'><option value='healthy'>Healthy</option><option value='unhealthy' selected>Unhealthy</option></select><br>");
                    }

                    profile.append("<label>Room:</label><select id='animalRoomNumber' name='animalRoomNumber'><option value='" + data.roomNumber + "'>" + data.roomNumber + "</option></select><br>");

                    profile.append("<label>Finding Time:</label>" + timeStamp2String(data.timeStamp) + "<br>");

                    $(".content").append(profile);

                    $.ajax({
                            url: '/getAnimalAvailableRooms',
                            method: 'post'
                        })
                        .done((data) => {
                            $.each(data, function (key, rooms) {
                                $("#animalRoomNumber").append("<option value='" + rooms.roomNumber + "'>" + rooms.roomNumber + "</option>");
                            });
                        });
                });
        } else {
            $.ajax({
                    url: '/getPlantById',
                    method: 'post',
                    data: {
                        plantId: id
                    }
                })
                .done((data) => {
                    oldRoomNumber = data.roomNumber;

                    $(".content").append("<div class='imagebox'>" +
                        "<img class='img' src='../" + data.photoUrl + "'>" +
                        "</div>")

                    var profile = $("<div class='profile'>");

                    profile.append("<form id='plantUpdateForm' method='post' action='/plantImageUpdate' enctype='multipart/form-data'>" +
                        "<input type='hidden' id='plantId' name='plantId'/>" +
                        "<input type='file' id='plantImage' name='plantImage' onchange='PreviewImage(this)' >" +
                        "<br><br></form>");

                    profile.append("<label>Name:</label><input type='text' id='name' name='name' value='" +
                        data.name + "'><br>" +
                        "<label>Type:</label><input type='text' id='type' name='type' value='" + data.type + "'><br>" +
                        "<label>Variety:</label><input type='text' id='variety' name='variety' value='" + data.variety + "'><br>" +
                        "<label>Age:</label><input type='number' id='age' name='age' value='" + data.age + "'><br>")

                    profile.append("<label>Price:</label><input type='number' id='price' name='price' value='" +
                        data.price + "'><br>")

                    if (data.isAdopted) {
                        profile.append("<label>Adopted:</label>" +
                            "<select id='isAdopted' name='isAdopted'><option value='true' selected>True</option><option value='false'>False</option></select><br>")
                    } else {
                        profile.append("<label>Adopted:</label>" +
                            "<select id='isAdopted' name='isAdopted'><option value='true' selected>True</option><option value='false' selected>False</option></select><br>")
                    }

                    if (data.healthStatus == "healthy") {
                        profile.append("<label>Status:</label>" +
                            "<select id='healthStatus' name='healthStatus'><option value='healthy' selected>Healthy</option><option value='unhealthy'>Unhealthy</option></select><br>")
                    } else {
                        profile.append("<label>Status:</label>" +
                            "<select id='healthStatus' name='healthStatus'><option value='healthy'>Healthy</option><option value='unhealthy' selected>Unhealthy</option></select><br>")
                    }

                    profile.append("<label>Room:</label><select id='plantRoomNumber' name='plantRoomNumber'><option value='" + data.roomNumber + "'>" + data.roomNumber + "</option></select><br>");

                    profile.append("<label>Finding Time:</label>" + timeStamp2String(data.timeStamp) + "<br>");

                    $(".content").append(profile);

                    $.ajax({
                            url: '/getPlantAvailableRooms',
                            method: 'post'
                        })
                        .done((data) => {
                            $.each(data, function (key, rooms) {
                                $("#plantRoomNumber").append("<option value='" + rooms.roomNumber + "'>" + rooms.roomNumber + "</option>");
                            });
                        });
                });
        }
    }

    $(".confirm").on('click', () => {
        var r = confirm("Are you sure to update?");
        if (r === true) {
            if (biology == "animal") {
                $.ajax({
                        url: '/animalInfoUpdate',
                        method: 'post',
                        data: {
                            id: id,
                            name: $("#name").val(),
                            type: $("#type").val(),
                            variety: $("#variety").val(),
                            age: $("#age").val(),
                            gender: $("#gender").val(),
                            findingLocation: $("#findingLocation").val(),
                            price: $("#price").val(),
                            isAdopted: $("#isAdopted").val(),
                            healthStatus: $("#healthStatus").val(),
                            roomNumber: $("#animalRoomNumber").val()
                        }
                    })
                    .done((data) => {
                        var getAnimalId = data._id;
                        $.ajax({
                                url: '/roomStatusToAvailable',
                                method: 'post',
                                data: {
                                    roomNumber: oldRoomNumber
                                }
                            })
                            .done((data) => {
                                $.ajax({
                                        url: '/roomStatusToOccupied',
                                        method: 'post',
                                        data: {
                                            roomNumber: $("#animalRoomNumber").val()
                                        }
                                    })
                                    .done((data) => {
                                        $("#animalId").val(getAnimalId);
                                        console.log(getAnimalId);
                                        $("#animalUpdateForm").submit();
                                    });
                            });
                    })
            } else {
                $.ajax({
                        url: 'plantInfoUpdate',
                        method: 'post',
                        data: {
                            id: id,
                            name: $("#name").val(),
                            type: $("#type").val(),
                            variety: $("#variety").val(),
                            age: $("#age").val(),
                            price: $("#price").val(),
                            isAdopted: $("#isAdopted").val(),
                            healthStatus: $("#healthStatus").val(),
                            roomNumber: $("#plantRoomNumber").val()
                        }
                    })
                    .done((data) => {
                        var getPlantId = data._id;
                        $.ajax({
                                url: '/roomStatusToAvailable',
                                method: 'post',
                                data: {
                                    roomNumber: oldRoomNumber
                                }
                            })
                            .done((data) => {
                                $.ajax({
                                        url: '/roomStatusToOccupied',
                                        method: 'post',
                                        data: {
                                            roomNumber: $("#plantRoomNumber").val()
                                        }
                                    })
                                    .done((data) => {
                                        $("#plantId").val(getPlantId);
                                        console.log(getPlantId);
                                        $("#plantUpdateForm").submit();
                                    });
                            });
                    })
            }
        }
    });

    $(".cancel").on('click', () => {
        if (biology == "animal") {
            window.location.href = "/index/animal";
        } else {
            window.location.href = "/index/plant";
        }
    });

    $(".logout").on('click', () => {
        var r = confirm("Are you sure to logout?");
        if (r === true) {
            $.ajax({
                    url: '/logout',
                    method: 'post'
                })
                .done((data) => {
                    for (var i = 0; i < sessionStorage.length; i++) {
                        var it = sessionStorage.key(i);
                        sessionStorage.removeItem(it);
                    }
                    window.location.href = "/";
                })
        }
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function timeStamp2String(time) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var date = datetime.getDate();
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var second = datetime.getSeconds();
    var mseconds = datetime.getMilliseconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second + "." + mseconds;
};

function PreviewImage(imgFile) {
    var path = URL.createObjectURL(imgFile.files[0]);
    $(".img").prop("src", path);
}