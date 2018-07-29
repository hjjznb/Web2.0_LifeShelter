$(document).ready(() => {

    var userType;
    var currentAction = getUrlParameter('action');

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

    $(".addRoomBtn").on('click', () => {
        $(".deleteContent").css("display", "none");
        $(".addContent").css("display", "inline-block");
        changeURL("addRoom");
    });

    $(".deleteRoomBtn").on('click', () => {
        $(".deleteContent").css("display", "inline-block");
        $(".addContent").css("display", "none");
        changeURL("deleteRoom");
        $.ajax({
            url: '/getAvailableRooms',
            method: 'post'
        })
        .done((data)=>{
            $.each(data, function(key, rooms) {
                $("#getRoomNumber").append("<option value='" + rooms.roomNumber + "'>" + rooms.roomNumber + "</option>");
            });
        });
    });
    
    if (typeof (currentAction) != "undefined") {
        if (currentAction == "addRoom") {
            $(".addRoomBtn").trigger("click");
        }
        else if (currentAction == "deleteRoom") {
            $(".deleteRoomBtn").trigger("click");
        }
    }

    $(".confirm").on('click', () => {
        var action = getUrlParameter('action');

        if (typeof (action) != "undefined") {
            if (action == "addRoom") {
                $.ajax({
                    url: '/getAllRooms',
                    method: 'post'
                })
                .done((data)=>{
                    var room_arr = new Array();
                    $.each(data, function(key, rooms) {
                        room_arr.push(rooms.roomNumber);
                    });
                    if(room_arr.length < 1) {
                        
                    }
                    else {
                        var count = 0;
                        if($("#roomNumber").val() != "") {
                            for(var i=0; i<room_arr.length; i++) {
                                if($("#roomNumber").val() == room_arr[i]) {
                                    $("#roomNumber").val('');
                                    alert("Room " + room_arr[i] + " has already existed.");
                                    count++;
                                    break;
                                }
                            }
                            
                            if(count == 0) {
                                var room = {
                                    roomNumber: $("#roomNumber").val(),
                                    biology: $("#biology").val()
                                };
                                $.ajax({
                                    url: '/roomInfoAdd',
                                    method: 'post',
                                    data: room
                                })
                                .done((data)=>{
                                    $("#roomNumber").val('');
                                    alert("Room " + data.roomNumber + " is added successfully.");
                                });
                            }
                        }
                        else {
                            alert("Please enter a room number.");
                        }
                    }
                });
            }
            else if(action == "deleteRoom") {
                var deleteRoomNumber = $('#getRoomNumber option:selected').val(); ;
                deleteFunc(deleteRoomNumber);
            }
        }
    });
});

function deleteFunc(roomNumber){
    var r = confirm("Are you sure to delete " + roomNumber + "?");
    if (r === true) {
        document.getElementById("DeleteForm").submit();
    }
}

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

function changeURL(action) {
    window.history.pushState({}, 0, 'http://' + window.location.host + '/room?action=' + action);
}