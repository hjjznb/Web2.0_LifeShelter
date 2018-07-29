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
                if (userType == "Customer") {
                    $(".donateBtn").css("display", "inline");
                } else {
                    $(".roomBtn").css("display", "inline");
                }
            });

        $.ajax({
                url: '/getAllAnimals',
                method: 'post'
            })
            .done((data) => {

                // animalType:     | Cat | Dog |
                // animalHealth:   |  12 |  6  |
                // animalUnhealth: |  12 |  6  |

                var animalType_arr = new Array();
                var animalHealth_arr = new Array();
                var animalUnhealth_arr = new Array();
                $.each(data, function (key, animals) {
                    // 如果无动物，需要判断
                    if (animalType_arr.length < 1) {
                        animalType_arr.push(animals.type);
                        animalHealth_arr[0] = 0;
                        animalUnhealth_arr[0] = 0;
                        if (animals.healthStatus == "healthy") {
                            animalHealth_arr[0]++;
                        } else {
                            animalUnhealth_arr[0]++;
                        }
                    } else {
                        var count = 0;
                        var index = 0;
                        for (var i = 0; i < animalType_arr.length; i++) {
                            if (animalType_arr[i] == animals.type) {
                                count++;
                                index = i;
                            }
                        }
                        if (count == 0) {
                            animalType_arr.push(animals.type);
                            animalHealth_arr[animalType_arr.length - 1] = 0;
                            animalUnhealth_arr[animalType_arr.length - 1] = 0;
                            if (animals.healthStatus == "healthy") {
                                animalHealth_arr[animalType_arr.length - 1]++;
                            } else {
                                animalUnhealth_arr[animalType_arr.length - 1]++;
                            }
                        } else {
                            if (animals.healthStatus == "healthy") {
                                animalHealth_arr[index]++;
                            } else {
                                animalUnhealth_arr[index]++;
                            }
                        }
                    }
                });

                $.ajax({
                        url: '/getAllPlants',
                        method: 'post'
                    })
                    .done((data) => {

                        // plantType:     | Tree | Flower |
                        // plantHealth:   |  5   |  13    |
                        // plantUnhealth: |  5   |  13    |

                        var plantType_arr = new Array();
                        var plantHealth_arr = new Array();
                        var plantUnhealth_arr = new Array();
                        $.each(data, function (key, plants) {
                            // 如果无动物，需要判断
                            if (plantType_arr.length < 1) {
                                plantType_arr.push(plants.type);
                                plantHealth_arr[0] = 0;
                                plantUnhealth_arr[0] = 0;
                                if (plants.healthStatus == "healthy") {
                                    plantHealth_arr[0]++;
                                } else {
                                    plantUnhealth_arr[0]++;
                                }
                            } else {
                                var count = 0;
                                var index = 0;
                                for (var i = 0; i < plantType_arr.length; i++) {
                                    if (plantType_arr[i] == plants.type) {
                                        count++;
                                        index = i;
                                    }
                                }
                                if (count == 0) {
                                    plantType_arr.push(plants.type);
                                    plantHealth_arr[plantType_arr.length - 1] = 0;
                                    plantUnhealth_arr[plantType_arr.length - 1] = 0;
                                    if (plants.healthStatus == "healthy") {
                                        plantHealth_arr[plantType_arr.length - 1]++;
                                    } else {
                                        plantUnhealth_arr[plantType_arr.length - 1]++;
                                    }
                                } else {
                                    if (plants.healthStatus == "healthy") {
                                        plantHealth_arr[index]++;
                                    } else {
                                        plantUnhealth_arr[index]++;
                                    }
                                }
                            }
                        });
                        console.log(animalType_arr);
                        console.log(animalHealth_arr);
                        console.log(animalUnhealth_arr);
                        console.log(plantType_arr);
                        console.log(plantHealth_arr);
                        console.log(plantUnhealth_arr);
                    
                        var totalBiology = 0;
                        var healthyBiology = 0;
                        var unhealthyBiology = 0;
                        for(var i=0; i<animalHealth_arr.length; i++) {
                            totalBiology = totalBiology + animalHealth_arr[i];
                            healthyBiology = healthyBiology + animalHealth_arr[i];
                        }
                        for(var i=0; i<animalUnhealth_arr.length; i++) {
                            totalBiology = totalBiology + animalUnhealth_arr[i];
                            unhealthyBiology = unhealthyBiology + animalUnhealth_arr[i];
                        }
                        for(var i=0; i<plantHealth_arr.length; i++) {
                            totalBiology = totalBiology + plantHealth_arr[i];
                            healthyBiology = healthyBiology + plantHealth_arr[i];
                        }
                        for(var i=0; i<plantUnhealth_arr.length; i++) {
                            totalBiology = totalBiology + plantUnhealth_arr[i];
                            unhealthyBiology = unhealthyBiology + plantUnhealth_arr[i];
                        }
                    
                        console.log(totalBiology);
                        console.log(healthyBiology);
                        console.log(unhealthyBiology);
                    
                        var setHealthType_arr = new Array();
                        for(var i=0; i<animalType_arr.length; i++){
                            setHealthType_arr[i] = new Array();
                            setHealthType_arr[i][0] = animalType_arr[i] + " (" + animalHealth_arr[i] + "/" + healthyBiology + ")";
                            setHealthType_arr[i][1] = animalHealth_arr[i] / healthyBiology *100;
                        }
                        for(var i=0; i<plantType_arr.length; i++){
                            setHealthType_arr[animalType_arr.length+i] = new Array();
                            setHealthType_arr[animalType_arr.length+i][0] = plantType_arr[i] + " (" + plantHealth_arr[i] + "/" + healthyBiology + ")";
                            setHealthType_arr[animalType_arr.length+i][1] = plantHealth_arr[i] / healthyBiology *100;
                        }
                    
                        console.log(setHealthType_arr);
                    
                        var setUnhealthType_arr = new Array();
                        for(var i=0; i<animalType_arr.length; i++){
                            setUnhealthType_arr[i] = new Array();
                            setUnhealthType_arr[i][0] = animalType_arr[i] + " (" + animalUnhealth_arr[i] + "/" + unhealthyBiology + ")";
                            setUnhealthType_arr[i][1] = animalUnhealth_arr[i] / unhealthyBiology *100;
                        }
                        for(var i=0; i<plantType_arr.length; i++){
                            setUnhealthType_arr[animalType_arr.length+i] = new Array();
                            setUnhealthType_arr[animalType_arr.length+i][0] = plantType_arr[i] + " (" + plantUnhealth_arr[i] + "/" + unhealthyBiology + ")";
                            setUnhealthType_arr[animalType_arr.length+i][1] = plantUnhealth_arr[i] / unhealthyBiology *100;
                        }
                    
                        console.log(setUnhealthType_arr);
                    
                        // Create the chart
                        Highcharts.chart('healthStatus', {
                            chart: {
                                type: 'pie'
                            },
                            title: {
                                text: 'Health status of all animals and plants'
                            },
                            subtitle: {
                                text: 'Source: IOT Smart Shelter'
                            },
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}: {point.y:.1f}%'
                                    }
                                }
                            },

                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                            },

                            "series": [{
                                "name": "HealthStatus",
                                "colorByPoint": true,
                                "data": [{
                                        "name": "Healthy (" + healthyBiology + "/" + totalBiology + ")",
                                        "y": healthyBiology/totalBiology*100,
                                        "drilldown": "Healthy"
                                    },
                                    {
                                        "name": "Unhealthy (" + unhealthyBiology + "/" + totalBiology + ")",
                                        "y": unhealthyBiology/totalBiology*100,
                                        "drilldown": "Unhealthy"
                                    }
                                ]
                            }],
                            "drilldown": {
                                "series": [{
                                        "name": "Healthy",
                                        "id": "Healthy",
                                        "data": setHealthType_arr
                                    },
                                    {
                                        "name": "Unhealthy",
                                        "id": "Unhealthy",
                                        "data": setUnhealthType_arr
                                    }
                                ]
                            }
                        });
                    });
            });
    }

    $(".animalBtn").on('click', () => {
        changeURL("animal");
        $.ajax({
                url: '/getAllAnimals',
                method: 'post'
            })
            .done((data) => {
                $(".content").empty();
                var animalType_arr = new Array();
                var fieldset_arr = new Array();
                $.each(data, function (key, animals) {
                    // 如果无动物，需要判断
                    if (animalType_arr.length < 1) {
                        animalType_arr.push(animals.type);
                        var fieldset = $("<fieldset class='" + animals.type + "'>");
                        fieldset_arr.push(fieldset);
                        fieldset_arr[fieldset_arr.length - 1].append("<legend class='animalType'>" + animals.type.toUpperCase() + "</legend>");

                        if (userType == "Staff") {
                            var addimgbox = $("<div class='imgbox'>");
                            addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('animal')\">");
                            addimgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label><br>" +
                                "<label>Variety:</label><br>" +
                                "<label>Age:</label><br>" +
                                "<label>Gender:</label><br>" +
                                "<label>Price:</label><br>" +
                                "<label>Status:</label><br>" +
                                "<label>Room:</label><br>" +
                                "</div>");
                            addimgbox.append("<div class='updateDeleteBox'>" +
                                "<button class='button updateBtn'>Update</button>" +
                                "<button class='button deleteBtn'>Delete</button>" +
                                "</div>");
                            fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                        }

                        if (typeof (animals.type) != "undefined") {
                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + animals.name + "<br>" +
                                "<label>Variety:</label>" + animals.variety + "<br>" +
                                "<label>Age:</label>" + animals.age + "<br>" +
                                "<label>Gender:</label>" + animals.gender + "<br>" +
                                "<label>Price:</label>" + animals.price + "<br>" +
                                "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                            } else {
                                if (!animals.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                            $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                        }
                    } else {
                        var count = 0;
                        var index = 0;
                        for (var i = 0; i < animalType_arr.length; i++) {
                            if (animalType_arr[i] == animals.type) {
                                count++;
                                index = i;
                            }
                        }
                        if (count == 0) {
                            animalType_arr.push(animals.type);
                            var fieldset = $("<fieldset class='" + animals.type + "'>");
                            fieldset_arr.push(fieldset);
                            fieldset_arr[fieldset_arr.length - 1].append("<legend class='animalType'>" + animals.type.toUpperCase() + "</legend>");

                            if (userType == "Staff") {
                                var addimgbox = $("<div class='imgbox'>");
                                addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('animal')\">");
                                addimgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label><br>" +
                                    "<label>Variety:</label><br>" +
                                    "<label>Age:</label><br>" +
                                    "<label>Gender:</label><br>" +
                                    "<label>Price:</label><br>" +
                                    "<label>Status:</label><br>" +
                                    "<label>Room:</label><br>" +
                                    "</div>");
                                addimgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn'>Update</button>" +
                                    "<button class='button deleteBtn'>Delete</button>" +
                                    "</div>");

                                fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                            }

                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + animals.name + "<br>" +
                                "<label>Variety:</label>" + animals.variety + "<br>" +
                                "<label>Age:</label>" + animals.age + "<br>" +
                                "<label>Gender:</label>" + animals.gender + "<br>" +
                                "<label>Price:</label>" + animals.price + "<br>" +
                                "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                            } else {
                                if (!animals.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                            $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                        } else {
                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + animals.name + "<br>" +
                                "<label>Variety:</label>" + animals.variety + "<br>" +
                                "<label>Age:</label>" + animals.age + "<br>" +
                                "<label>Gender:</label>" + animals.gender + "<br>" +
                                "<label>Price:</label>" + animals.price + "<br>" +
                                "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                            } else {
                                if (!animals.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[index].append(imgbox);
                        }
                    }
                });
            })
            .fail((err) => {

            });
    });

    $(".plantBtn").on('click', () => {
        changeURL("plant");
        $.ajax({
                url: '/getAllPlants',
                method: 'post'
            })
            .done((data) => {
                $(".content").empty();
                var plantType_arr = new Array();
                var fieldset_arr = new Array();
                $.each(data, function (key, plants) {
                    // 如果无植物，需要判断
                    if (plantType_arr.length < 1) {
                        plantType_arr.push(plants.type);
                        var fieldset = $("<fieldset class='" + plants.type + "'>");
                        fieldset_arr.push(fieldset);
                        fieldset_arr[fieldset_arr.length - 1].append("<legend class='plantType'>" + plants.type.toUpperCase() + "</legend>");

                        if (userType == "Staff") {
                            var addimgbox = $("<div class='imgbox'>");
                            addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('plant')\">");
                            addimgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label><br>" +
                                "<label>Variety:</label><br>" +
                                "<label>Age:</label><br>" +
                                "<label>Price:</label><br>" +
                                "<label>Status:</label><br>" +
                                "<label>Room:</label><br>" +
                                "</div>");
                            addimgbox.append("<div class='updateDeleteBox'>" +
                                "<button class='button updateBtn'>Update</button>" +
                                "<button class='button deleteBtn'>Delete</button>" +
                                "</div>");
                            fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                        }

                        if (typeof (plants.type) != "undefined") {
                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + plants.name + "<br>" +
                                "<label>Variety:</label>" + plants.variety + "<br>" +
                                "<label>Age:</label>" + plants.age + "<br>" +
                                "<label>Price:</label>" + plants.price + "<br>" +
                                "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                            } else {
                                if (!plants.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                            $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                        }
                    } else {
                        var count = 0;
                        var index = 0;
                        for (var i = 0; i < plantType_arr.length; i++) {
                            if (plantType_arr[i] == plants.type) {
                                count++;
                                index = i;
                            }
                        }
                        if (count == 0) {
                            plantType_arr.push(plants.type);
                            var fieldset = $("<fieldset class='" + plants.type + "'>");
                            fieldset_arr.push(fieldset);
                            fieldset_arr[fieldset_arr.length - 1].append("<legend class='plantType'>" + plants.type.toUpperCase() + "</legend>");

                            if (userType == "Staff") {
                                var addimgbox = $("<div class='imgbox'>");
                                addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('plant')\">");
                                addimgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label><br>" +
                                    "<label>Variety:</label><br>" +
                                    "<label>Age:</label><br>" +
                                    "<label>Price:</label><br>" +
                                    "<label>Status:</label><br>" +
                                    "<label>Room:</label><br>" +
                                    "</div>");
                                addimgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn'>Update</button>" +
                                    "<button class='button deleteBtn'>Delete</button>" +
                                    "</div>");
                                fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                            }

                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + plants.name + "<br>" +
                                "<label>Variety:</label>" + plants.variety + "<br>" +
                                "<label>Age:</label>" + plants.age + "<br>" +
                                "<label>Price:</label>" + plants.price + "<br>" +
                                "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                            } else {
                                if (!plants.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                            $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                        } else {
                            var imgbox = $("<div class='imgbox'>");
                            imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                            imgbox.append("<div class='imginfo'>" +
                                "<label>Name:</label>" + plants.name + "<br>" +
                                "<label>Variety:</label>" + plants.variety + "<br>" +
                                "<label>Age:</label>" + plants.age + "<br>" +
                                "<label>Price:</label>" + plants.price + "<br>" +
                                "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                "</div>");

                            if (userType == "Staff") {
                                imgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                    "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                    "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                    "</form>" +
                                    "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                            } else {
                                if (!plants.isAdopted) {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                } else {
                                    imgbox.append("<div class='adoptionBox'>" +
                                        "<button class='button adoptedBtn'>Adopted</button></div>");
                                }
                            }

                            fieldset_arr[index].append(imgbox);
                        }
                    }
                });
            })
            .fail((err) => {

            });
    });

    $(".donateBtn").on('click', () => {
        $(".modal1").css("display", "block");
        $("#donateMsg").html("");
        $("#amount").val("");
        $("#userId").val(sessionStorage['userId']);
    });

    $(".close1").on('click', () => {
        $(".modal1").css("display", "none");
    });

    $(window).click(function (e) {
        if (e.target.className == "modal1") {
            $(".modal1").css("display", "none");
        }
    });

    $(".donateConfirmBtn").on('click', () => {
        var amount = $("#amount").val();
        if (amount < 0) {
            $("#donateMsg").html("Wrong amount");
        } else {
            var r = confirm("Please confirm your amount: " + amount);
            if (r === true) {
                $.ajax({
                        url: '/getUserById',
                        method: 'post',
                        data: {
                            userId: sessionStorage['userId']
                        }
                    })
                    .done((data) => {
                        if (data.balance >= amount) {
                            var newBalance = data.balance - amount;
                            $.ajax({
                                    url: '/donate',
                                    method: 'post',
                                    data: {
                                        userId: sessionStorage['userId'],
                                        newBalance: newBalance
                                    }
                                })
                                .done((data) => {
                                    console.log(data.balance);
                                    $("#donateMsg").html("Thank you for donating!");
                                })
                        } else {
                            $("#donateMsg").html("Not enough money");
                        }
                    })
            }
        }
    });

    $(".roomBtn").on('click', () => {
        window.location.href = "/room/addRoom";
    });

    $(".statisticsBtn").on('click', () => {
        $(".modal2").css("display", "block");
        $("#donateMsg").html("");
        $("#amount").val("");
        $("#userId").val(sessionStorage['userId']);
    });

    $(".close2").on('click', () => {
        $(".modal2").css("display", "none");
    });

    $(window).click(function (e) {
        if (e.target.className == "modal2") {
            $(".modal2").css("display", "none");
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

    var biology = getUrlParameter('biology');

    if (typeof (biology) != "undefined") {
        if (biology == "animal") {
            $(".animalBtn").trigger("click");
        } else if (biology == "plant") {
            $(".plantBtn").trigger("click");
        } else {
            $(".animalBtn").trigger("click");
        }
    } else {
        $(".animalBtn").trigger("click");
    }

    $(".searchBtn").on('click', () => {
        var curBiology = getUrlParameter('biology');
        if (curBiology == "animal") {
            $.ajax({
                    url: '/animalSearch',
                    method: 'post',
                    data: {
                        name: $("#searchTxt").val()
                    }
                })
                .done((data) => {
                    $(".content").empty();
                    var animalType_arr = new Array();
                    var fieldset_arr = new Array();
                    $.each(data, function (key, animals) {
                        if (animalType_arr.length < 1) {
                            animalType_arr.push(animals.type);
                            var fieldset = $("<fieldset class='" + animals.type + "'>");
                            fieldset_arr.push(fieldset);
                            fieldset_arr[fieldset_arr.length - 1].append("<legend class='animalType'>" + animals.type.toUpperCase() + "</legend>");

                            if (userType == "Staff") {
                                var addimgbox = $("<div class='imgbox'>");
                                addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('animal')\">");
                                addimgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label><br>" +
                                    "<label>Variety:</label><br>" +
                                    "<label>Age:</label><br>" +
                                    "<label>Gender:</label><br>" +
                                    "<label>Status:</label><br>" +
                                    "<label>Room:</label><br>" +
                                    "</div>");
                                addimgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn'>Update</button>" +
                                    "<button class='button deleteBtn'>Delete</button>" +
                                    "</div>");
                                fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                            }

                            if (typeof (animals.type) != "undefined") {
                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + animals.name + "<br>" +
                                    "<label>Variety:</label>" + animals.variety + "<br>" +
                                    "<label>Age:</label>" + animals.age + "<br>" +
                                    "<label>Gender:</label>" + animals.gender + "<br>" +
                                    "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                    "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                                } else {
                                    if (!animals.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                                $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                            }
                        } else {
                            var count = 0;
                            var index = 0;
                            for (var i = 0; i < animalType_arr.length; i++) {
                                if (animalType_arr[i] == animals.type) {
                                    count++;
                                    index = i;
                                }
                            }
                            if (count == 0) {
                                animalType_arr.push(animals.type);
                                var fieldset = $("<fieldset class='" + animals.type + "'>");
                                fieldset_arr.push(fieldset);
                                fieldset_arr[fieldset_arr.length - 1].append("<legend class='animalType'>" + animals.type.toUpperCase() + "</legend>");

                                if (userType == "Staff") {
                                    var addimgbox = $("<div class='imgbox'>");
                                    addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('animal')\">");
                                    addimgbox.append("<div class='imginfo'>" +
                                        "<label>Name:</label><br>" +
                                        "<label>Variety:</label><br>" +
                                        "<label>Age:</label><br>" +
                                        "<label>Gender:</label><br>" +
                                        "<label>Status:</label><br>" +
                                        "<label>Room:</label><br>" +
                                        "</div>");
                                    addimgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn'>Update</button>" +
                                        "<button class='button deleteBtn'>Delete</button>" +
                                        "</div>");

                                    fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                                }

                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + animals.name + "<br>" +
                                    "<label>Variety:</label>" + animals.variety + "<br>" +
                                    "<label>Age:</label>" + animals.age + "<br>" +
                                    "<label>Gender:</label>" + animals.gender + "<br>" +
                                    "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                    "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                                } else {
                                    if (!animals.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                                $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                            } else {
                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + animals.photoUrl + "' onclick=\"checkItemFunc('animal', '" + animals._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + animals.name + "<br>" +
                                    "<label>Variety:</label>" + animals.variety + "<br>" +
                                    "<label>Age:</label>" + animals.age + "<br>" +
                                    "<label>Gender:</label>" + animals.gender + "<br>" +
                                    "<label>Status:</label>" + animals.healthStatus + "<br>" +
                                    "<label>Room:</label>" + animals.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('animal', '" + animals._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + animals._id + "DeleteForm' action='/animalDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + animals._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + animals.name + "', '" + animals._id + "')\">Delete</button></div>");
                                } else {
                                    if (!animals.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' animalId='" + animals._id + "' animalPrice='" + animals.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[index].append(imgbox);
                            }
                        }
                    });
                })
        } else {
            $.ajax({
                    url: '/plantSearch',
                    method: 'post',
                    data: {
                        name: $("#searchTxt").val()
                    }
                })
                .done((data) => {
                    $(".content").empty();
                    var plantType_arr = new Array();
                    var fieldset_arr = new Array();
                    $.each(data, function (key, plants) {
                        if (plantType_arr.length < 1) {
                            plantType_arr.push(plants.type);
                            var fieldset = $("<fieldset class='" + plants.type + "'>");
                            fieldset_arr.push(fieldset);
                            fieldset_arr[fieldset_arr.length - 1].append("<legend class='plantType'>" + plants.type.toUpperCase() + "</legend>");

                            if (userType == "Staff") {
                                var addimgbox = $("<div class='imgbox'>");
                                addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('plant')\">");
                                addimgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label><br>" +
                                    "<label>Variety:</label><br>" +
                                    "<label>Age:</label><br>" +
                                    "<label>Status:</label><br>" +
                                    "<label>Room:</label><br>" +
                                    "</div>");
                                addimgbox.append("<div class='updateDeleteBox'>" +
                                    "<button class='button updateBtn'>Update</button>" +
                                    "<button class='button deleteBtn'>Delete</button>" +
                                    "</div>");
                                fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                            }


                            if (typeof (plants.type) != "undefined") {
                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + plants.name + "<br>" +
                                    "<label>Variety:</label>" + plants.variety + "<br>" +
                                    "<label>Age:</label>" + plants.age + "<br>" +
                                    "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                    "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                                } else {
                                    if (!plants.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                                $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                            }
                        } else {
                            var count = 0;
                            var index = 0;
                            for (var i = 0; i < plantType_arr.length; i++) {
                                if (plantType_arr[i] == plants.type) {
                                    count++;
                                    index = i;
                                }
                            }
                            if (count == 0) {
                                plantType_arr.push(plants.type);
                                var fieldset = $("<fieldset class='" + plants.type + "'>");
                                fieldset_arr.push(fieldset);
                                fieldset_arr[fieldset_arr.length - 1].append("<legend class='plantType'>" + plants.type.toUpperCase() + "</legend>");

                                if (userType == "Staff") {
                                    var addimgbox = $("<div class='imgbox'>");
                                    addimgbox.append("<img class='img imageAddBtn' src='../images/add.png' onclick=\"addItemFunc('plant')\">");
                                    addimgbox.append("<div class='imginfo'>" +
                                        "<label>Name:</label><br>" +
                                        "<label>Variety:</label><br>" +
                                        "<label>Age:</label><br>" +
                                        "<label>Status:</label><br>" +
                                        "<label>Room:</label><br>" +
                                        "</div>");
                                    addimgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn'>Update</button>" +
                                        "<button class='button deleteBtn'>Delete</button>" +
                                        "</div>");
                                    fieldset_arr[fieldset_arr.length - 1].append(addimgbox);
                                }

                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + plants.name + "<br>" +
                                    "<label>Variety:</label>" + plants.variety + "<br>" +
                                    "<label>Age:</label>" + plants.age + "<br>" +
                                    "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                    "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                                } else {
                                    if (!plants.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[fieldset_arr.length - 1].append(imgbox);
                                $(".content").append(fieldset_arr[fieldset_arr.length - 1]);
                            } else {
                                var imgbox = $("<div class='imgbox'>");
                                imgbox.append("<img class='img imageCheckBtn' src='../" + plants.photoUrl + "' onclick=\"checkItemFunc('plant', '" + plants._id + "')\">");
                                imgbox.append("<div class='imginfo'>" +
                                    "<label>Name:</label>" + plants.name + "<br>" +
                                    "<label>Variety:</label>" + plants.variety + "<br>" +
                                    "<label>Age:</label>" + plants.age + "<br>" +
                                    "<label>Status:</label>" + plants.healthStatus + "<br>" +
                                    "<label>Room:</label>" + plants.roomNumber + "<br>" +
                                    "</div>");

                                if (userType == "Staff") {
                                    imgbox.append("<div class='updateDeleteBox'>" +
                                        "<button class='button updateBtn' onclick=\"updateFunc('plant', '" + plants._id + "')\">Update</button>" +
                                        "<form class='deleteForm' id='" + plants._id + "DeleteForm' action='/plantDelete' method='post'>" +
                                        "<input type='hidden' name='id' value='" + plants._id + "'>" +
                                        "</form>" +
                                        "<button class='button deleteBtn' onclick=\"deleteFunc('" + plants.name + "', '" + plants._id + "')\">Delete</button></div>");
                                } else {
                                    if (!plants.isAdopted) {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adopteBtn' plantId='" + plants._id + "' plantPrice='" + plants.price + "'>I want it</button></div>");
                                    } else {
                                        imgbox.append("<div class='adoptionBox'>" +
                                            "<button class='button adoptedBtn'>Adopted</button></div>");
                                    }
                                }

                                fieldset_arr[index].append(imgbox);
                            }
                        }
                    });
                })
        }
    });

    $(document).delegate(".adopteBtn", "click", function () {
        var curBiology = getUrlParameter('biology');
        $.ajax({
                url: '/getUserById',
                method: 'post',
                data: {
                    userId: sessionStorage['userId']
                }
            })
            .done((data) => {
                var balance = data.balance;

                if (curBiology == "animal") {
                    var animalId = $(this).attr("animalId");
                    var animalPrice = $(this).attr("animalPrice");
                    if (balance >= animalPrice) {
                        $.ajax({
                                url: '/animalAdopte',
                                method: 'post',
                                data: {
                                    id: animalId
                                }
                            })
                            .done((data) => {
                                var newBalance = balance - animalPrice;
                                $.ajax({
                                        url: '/adopte',
                                        method: 'post',
                                        data: {
                                            userId: sessionStorage['userId'],
                                            newBalance: newBalance
                                        }
                                    })
                                    .done((data) => {
                                        alert("Adopted successfully!");
                                        window.location.href = "/index/animal";
                                    })
                            })
                    } else {
                        alert("Your balance is not enough");
                    }
                } else {
                    var plantId = $(this).attr("plantId");
                    var plantPrice = $(this).attr("plantPrice");
                    if (balance >= plantPrice) {
                        $.ajax({
                                url: '/plantAdopte',
                                method: 'post',
                                data: {
                                    id: plantId
                                }
                            })
                            .done((data) => {
                                var newBalance = balance - plantPrice;
                                $.ajax({
                                        url: '/adopte',
                                        method: 'post',
                                        data: {
                                            userId: sessionStorage['userId'],
                                            newBalance: newBalance
                                        }
                                    })
                                    .done((data) => {
                                        alert("Adopted successfully!");
                                        window.location.href = "/index/plant";
                                    })
                            })
                    } else {
                        alert("Your balance is not enough");
                    }
                }
            });
    });
});

function addItemFunc(biology) {
    window.location.href = "/itemAdd/" + biology;
}

function checkItemFunc(biology, id) {
    window.location.href = "/itemCheck/" + biology + "/" + id;
}

function updateFunc(biology, id) {
    window.location.href = "/itemUpdate/" + biology + "/" + id;
}

function deleteFunc(name, id) {
    var r = confirm("Are you sure to delete " + name + "?");
    if (r === true) {
        console.log(id + "DeleteForm");
        document.getElementById(id + "DeleteForm").submit();
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

function changeURL(biology) {
    window.history.pushState({}, 0, 'http://' + window.location.host + '/index?biology=' + biology);
}