$(document).ready(() => {

    var userType;

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
                userType = data.type;
            });
    }

    var biology = getUrlParameter('biology');

    if (biology == "animal") {
        $("#animalAdd").css("display", "block");
        $("#plantAdd").css("display", "none");
        $.ajax({
            url: '/getAnimalAvailableRooms',
            method: 'post'
        })
        .done((data) => {
            $.each(data, function(key, rooms) {
                $("#animalRoomNumber").append("<option value='" + rooms.roomNumber + "'>" + rooms.roomNumber + "</option>");
            });
        });
    } else {
        $("#plantAdd").css("display", "block");
        $("#animalAdd").css("display", "none");
        $.ajax({
            url: '/getPlantAvailableRooms',
            method: 'post'
        })
        .done((data) => {
            $.each(data, function(key, rooms) {
                $("#plantRoomNumber").append("<option value='" + rooms.roomNumber + "'>" + rooms.roomNumber + "</option>");
            });
        });
    }

    $(".confirm").on('click', () => {
        if (biology == "animal") {
            var animal = {
                name: $("#animalName").val(),
                type: $("#animalType").val(),
                variety: $("#animalVariety").val(),
                age: $("#animalAge").val(),
                gender: $("#animalGender").val(),
                findingLocation: $("#animalFindingLocation").val(),
                price: $("#animalPrice").val(),
                isAdopted: $("#animalAdopted").val(),
                healthStatus: $("#animalHealthStatus").val(),
                roomNumber: $("#animalRoomNumber").val()
            };

            $.ajax({
                url: '/animalInfoAdd',
                method: 'post',
                data: animal
            })
            .done((data) => {
                var getAnimalId = data._id;
                var getRoomNumber = data.roomNumber;
                $.ajax({
                    url: '/roomStatusToOccupied',
                    method: 'post',
                    data: {
                        roomNumber:getRoomNumber
                    }
                })
                .done((data) => {
                    $.ajax({
                        url: '/animalImageInfoAdd',
                        method: 'post',
                        data: {
                        id: getAnimalId
                        }
                    })
                    .done((data) => {
                        $("#animalId").val(getAnimalId);
                        console.log(getAnimalId);
                        $("#animalAddForm").submit();
                    })
                });
            });
        } else {
            var plant = {
                name: $("#plantName").val(),
                type: $("#plantType").val(),
                variety: $("#plantVariety").val(),
                age: $("#plantAge").val(),
                price: $("#plantPrice").val(),
                isAdopted: $("#plantAdopted").val(),
                healthStatus: $("#plantHealthStatus").val(),
                roomNumber: $("#plantRoomNumber").val()
            };
            
            $.ajax({
                url: '/plantInfoAdd',
                method: 'post',
                data: plant
            })
            .done((data) => {
                var getPlantId = data._id;
                var getRoomNumber = data.roomNumber;
                $.ajax({
                    url: '/roomStatusToOccupied',
                    method: 'post',
                    data: {
                        roomNumber:getRoomNumber
                    }
                })
                .done((data) => {
                    $.ajax({
                        url: '/plantImageInfoAdd',
                        method: 'post',
                        data: {
                            id: getPlantId
                        }
                    })
                    .done((data) => {
                        $("#plantId").val(getPlantId);
                        console.log(getPlantId);
                        $("#plantAddForm").submit();
                    })
                });
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

function PreviewImage(imgFile) {
    var path = URL.createObjectURL(imgFile.files[0]);
    $(".img").prop("src", path);
}