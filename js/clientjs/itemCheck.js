$(document).ready(() => {

    var userName;
    var biology = getUrlParameter('biology');
    var id = getUrlParameter('id');
    var variety;
    var roomNumber;

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
                userName = data.name;
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
                    variety = data.variety;
                    roomNumber = data.roomNumber;

                    $(".wikiBtn").html("Wiki - " + variety);
                    $(".insBtn1").html("Ins - #" + variety.replace(/\s+/g, ""));
                    $(".insBtn2").html("Ins - #" + variety.replace(/\s+/g, "") + "s");
                    $(".facebookBtn").html("Facebook - " + variety);
                    $(".facebookBtn").val(variety);
                    $(".findingLocation").html(data.findingLocation);
                    $(".allComments").empty();

                    $.each(data.comment, function (key, comments) {
                        var commentsBox = $("<div class='commentsBox'>");
                        commentsBox.append("<div class='commentName'>" + comments.userName + "</div>");
                        commentsBox.append("<div class='commentContent'>" + comments.userComment + "</div>");
                        commentsBox.append("<div class='commentTime'>" + timeStamp2String(comments.timeStamp) + "</div>");

                        $(".allComments").append(commentsBox);
                    })

                    // Temperature and Humidity
                    $.ajax({
                            url: '/getRoomByRoomNumber',
                            method: 'post',
                            data: {
                                roomNumber: roomNumber
                            }
                        })
                        .done((data) => {
                            $(".currentLocation").html(data[0].currentLocation);
                            var categories_array = new Array();
                            var temperature_array = new Array();
                            var humidity_array = new Array();

                            for (var i = 0; i < data[0].temperature.length; i++) {
                                var xAxis = 0.25 * (i + 1) + "h";
                                categories_array.push(xAxis);
                                temperature_array.push(data[0].temperature[i]);
                            }
                            for (var i = 0; i < data[0].humidity.length; i++) {
                                humidity_array.push(data[0].humidity[i]);
                            }

                            console.log(categories_array);
                            console.log(temperature_array);
                            console.log(humidity_array);

                            Highcharts.chart('temperature_humidity', {
                                chart: {
                                    zoomType: 'xy'
                                },
                                title: {
                                    text: 'Temperature and Humidity in one day'
                                },
                                subtitle: {
                                    text: 'Source: IOT Smart Shelter'
                                },
                                xAxis: [{
                                    categories: categories_array,
                                    crosshair: true
                                        }],
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value}°C',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Temperature',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    }
                                        }, { // Secondary yAxis
                                    title: {
                                        text: 'Humidity',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    labels: {
                                        format: '{value}%',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    opposite: true
                                        }],
                                tooltip: {
                                    shared: true
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    x: 120,
                                    verticalAlign: 'top',
                                    y: 50,
                                    floating: true,
                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                                },
                                series: [{
                                    name: 'Humidity',
                                    type: 'column',
                                    yAxis: 1,
                                    data: humidity_array,
                                    tooltip: {
                                        valueSuffix: '%'
                                    }

                                        }, {
                                    name: 'Temperature',
                                    type: 'spline',
                                    data: temperature_array,
                                    tooltip: {
                                        valueSuffix: '°C'
                                    }
                                        }]
                            });
                        });
                    // ============================================================================= //
                    var gaugeOptions = {

                        chart: {
                            type: 'solidgauge'
                        },

                        title: null,

                        pane: {
                            center: ['50%', '85%'],
                            size: '140%',
                            startAngle: -90,
                            endAngle: 90,
                            background: {
                                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                                innerRadius: '60%',
                                outerRadius: '100%',
                                shape: 'arc'
                            }
                        },

                        tooltip: {
                            enabled: false
                        },

                        // the value axis
                        yAxis: {
                            stops: [
                                        [0.1, '#DF5353'], // red
                                        [0.3, '#DDDF0D'], // yellow
                                        [0.5, '#55BF3B'], // green
                                        [0.7, '#DDDF0D'], // yellow
                                        [0.9, '#DF5353'] // red
                                    ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickAmount: 2,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            }
                        },

                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        }
                    };

                    // The speed gauge
                    var chartTemperature = Highcharts.chart('container-temperature', Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 15,
                            max: 35,
                            title: {
                                text: 'Temperature'
                            }
                        },

                        credits: {
                            enabled: false
                        },

                        series: [{
                            name: 'Temperature',
                            data: [25],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                    '<span style="font-size:12px;color:silver">°C</span></div>'
                            },
                            tooltip: {
                                valueSuffix: '°C'
                            }
                                }]

                    }));

                    // The RPM gauge
                    var chartHumidity = Highcharts.chart('container-humidity', Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 0,
                            max: 100,
                            title: {
                                text: 'Humidity'
                            }
                        },

                        series: [{
                            name: 'Humidity',
                            data: [50],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                                    '<span style="font-size:12px;color:silver">%</span></div>'
                            },
                            tooltip: {
                                valueSuffix: '%'
                            }
                                }]

                    }));
                    // Bring life to the dials
//                    setInterval(function () {
//                        $.ajax({
//                                url: '/getRealTimeTemperatureAndHumidity',
//                                method: 'post',
//                                data: {
//                                    roomNumber: roomNumber
//                                }
//                            })
//                            .done((data) => {
//                                var point,
//                                    newVal,
//                                    inc;
//
//                                if (chartTemperature) {
//                                    point = chartTemperature.series[0].points[0];
//                                    point.update(data.temperature);
//                                }
//
//                                // RPM
//                                if (chartHumidity) {
//                                    point = chartHumidity.series[0].points[0];
//                                    point.update(data.humidity);
//                                }
//                            });
//                    }, 1000);
                    // ============================================================================= //
                    Highcharts.chart('container-h2s', {

                        chart: {
                            type: 'gauge',
                            plotBackgroundColor: null,
                            plotBackgroundImage: null,
                            plotBorderWidth: 0,
                            plotShadow: false
                        },

                        title: {
                            text: 'Real-time H2S Monitoring'
                        },

                        pane: {
                            startAngle: -150,
                            endAngle: 150,
                            background: [{
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#FFF'],
                                        [1, '#333']
                                    ]
                                },
                                borderWidth: 0,
                                outerRadius: '109%'
                            }, {
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#333'],
                                        [1, '#FFF']
                                    ]
                                },
                                borderWidth: 1,
                                outerRadius: '107%'
                            }, {
                                // default background
                            }, {
                                backgroundColor: '#DDD',
                                borderWidth: 0,
                                outerRadius: '105%',
                                innerRadius: '103%'
                            }]
                        },

                        // the value axis
                        yAxis: {
                            min: 0,
                            max: 200,

                            minorTickInterval: 'auto',
                            minorTickWidth: 1,
                            minorTickLength: 10,
                            minorTickPosition: 'inside',
                            minorTickColor: '#666',

                            tickPixelInterval: 30,
                            tickWidth: 2,
                            tickPosition: 'inside',
                            tickLength: 10,
                            tickColor: '#666',
                            labels: {
                                step: 2,
                                rotation: 'auto'
                            },
                            title: {
                                text: 'mg/m3'
                            },
                            plotBands: [{
                                from: 0,
                                to: 120,
                                color: '#55BF3B' // green
                            }, {
                                from: 120,
                                to: 160,
                                color: '#DDDF0D' // yellow
                            }, {
                                from: 160,
                                to: 200,
                                color: '#DF5353' // red
                            }]
                        },

                        series: [{
                            name: 'Concentration',
                            data: [80],
                            tooltip: {
                                valueSuffix: ' mg/m3'
                            }
                        }]

                    },
                    // Add some life
//                    function (chart) {
//                        if (!chart.renderer.forExport) {
//                            setInterval(function () {
//                                $.ajax({
//                                        url: '/getRealTimeH2S',
//                                        method: 'post',
//                                        data: {
//                                            roomNumber: roomNumber
//                                        }
//                                    })
//                                    .done((data) => {
//                                        var point = chart.series[0].points[0];
//                                        point.update(data.h2s);
//                                    });
//                            }, 1000);
//                        }
//                    }
                );
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
                    variety = data.variety;
                    roomNumber = data.roomNumber;

                    $(".wikiBtn").html("Wiki - " + variety);
                    $(".insBtn1").html("Ins - #" + variety.replace(/\s+/g, ""));
                    $(".insBtn2").html("Ins - #" + variety.replace(/\s+/g, "") + "s");
                    $(".facebookBtn").html("Facebook - " + variety);
                    $(".facebookBtn").val(variety);
                    $(".findingLocation").html(data.findingLocation);
                    $(".allComments").empty();

                    $.each(data.comment, function (key, comments) {
                        var commentsBox = $("<div class='commentsBox'>");
                        commentsBox.append("<div class='commentName'>" + comments.userName + "</div>");
                        commentsBox.append("<div class='commentContent'>" + comments.userComment + "</div>");
                        commentsBox.append("<div class='commentTime'>" + timeStamp2String(comments.timeStamp) + "</div>");

                        $(".allComments").append(commentsBox);
                    });

                    // Temperature and Humidity
                    $.ajax({
                            url: '/getRoomByRoomNumber',
                            method: 'post',
                            data: {
                                roomNumber: roomNumber
                            }
                        })
                        .done((data) => {
                            $(".currentLocation").html(data[0].currentLocation);
                            var categories_array = new Array();
                            var temperature_array = new Array();
                            var humidity_array = new Array();

                            for (var i = 0; i < data[0].temperature.length; i++) {
                                var xAxis = 0.25 * (i + 1) + "h";
                                categories_array.push(xAxis);
                                temperature_array.push(data[0].temperature[i]);
                            }
                            for (var i = 0; i < data[0].humidity.length; i++) {
                                humidity_array.push(data[0].humidity[i]);
                            }

                            console.log(categories_array);
                            console.log(temperature_array);
                            console.log(humidity_array);

                            Highcharts.chart('temperature_humidity', {
                                chart: {
                                    zoomType: 'xy'
                                },
                                title: {
                                    text: 'Temperature and Humidity in one day'
                                },
                                subtitle: {
                                    text: 'Source: IOT Smart Shelter'
                                },
                                xAxis: [{
                                    categories: categories_array,
                                    crosshair: true
                                        }],
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value}°C',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Temperature',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    }
                                        }, { // Secondary yAxis
                                    title: {
                                        text: 'Humidity',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    labels: {
                                        format: '{value}%',
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    opposite: true
                                        }],
                                tooltip: {
                                    shared: true
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'left',
                                    x: 120,
                                    verticalAlign: 'top',
                                    y: 50,
                                    floating: true,
                                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                                },
                                series: [{
                                    name: 'Humidity',
                                    type: 'column',
                                    yAxis: 1,
                                    data: humidity_array,
                                    tooltip: {
                                        valueSuffix: '%'
                                    }

                                        }, {
                                    name: 'Temperature',
                                    type: 'spline',
                                    data: temperature_array,
                                    tooltip: {
                                        valueSuffix: '°C'
                                    }
                                        }]
                            });
                        });
                    // =============================================================================== //
                    var gaugeOptions = {

                        chart: {
                            type: 'solidgauge'
                        },

                        title: null,

                        pane: {
                            center: ['50%', '85%'],
                            size: '140%',
                            startAngle: -90,
                            endAngle: 90,
                            background: {
                                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                                innerRadius: '60%',
                                outerRadius: '100%',
                                shape: 'arc'
                            }
                        },

                        tooltip: {
                            enabled: false
                        },

                        // the value axis
                        yAxis: {
                            stops: [
                                        [0.1, '#DF5353'], // red
                                        [0.3, '#DDDF0D'], // yellow
                                        [0.5, '#55BF3B'], // green
                                        [0.7, '#DDDF0D'], // yellow
                                        [0.9, '#DF5353'] // red
                                    ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickAmount: 2,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            }
                        },

                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        }
                    };

                    // The speed gauge
                    var chartTemperature = Highcharts.chart('container-temperature', Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 5,
                            max: 35,
                            title: {
                                text: 'Temperature'
                            }
                        },

                        credits: {
                            enabled: false
                        },

                        series: [{
                            name: 'Temperature',
                            data: [20],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                    '<span style="font-size:12px;color:silver">°C</span></div>'
                            },
                            tooltip: {
                                valueSuffix: '°C'
                            }
                                }]

                    }));

                    // The RPM gauge
                    var chartHumidity = Highcharts.chart('container-humidity', Highcharts.merge(gaugeOptions, {
                        yAxis: {
                            min: 0,
                            max: 100,
                            title: {
                                text: 'Humidity'
                            }
                        },

                        series: [{
                            name: 'Humidity',
                            data: [50],
                            dataLabels: {
                                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                                    '<span style="font-size:12px;color:silver">%</span></div>'
                            },
                            tooltip: {
                                valueSuffix: '%'
                            }
                                }]

                    }));

                    // Bring life to the dials
//                    setInterval(function () {
//                        $.ajax({
//                                url: '/getRealTimeTemperatureAndHumidity',
//                                method: 'post',
//                                data: {
//                                    roomNumber: roomNumber
//                                }
//                            })
//                            .done((data) => {
//                                var point,
//                                    newVal,
//                                    inc;
//
//                                if (chartTemperature) {
//                                    point = chartTemperature.series[0].points[0];
//                                    point.update(data.temperature);
//                                }
//
//                                // RPM
//                                if (chartHumidity) {
//                                    point = chartHumidity.series[0].points[0];
//                                    point.update(data.humidity);
//                                }
//                            });
//                    }, 1000);
                
                    // =============================================================================== //
                    Highcharts.chart('container-h2s', {
                        chart: {
                            type: 'gauge',
                            plotBackgroundColor: null,
                            plotBackgroundImage: null,
                            plotBorderWidth: 0,
                            plotShadow: false
                        },

                        title: {
                            text: 'Real-time H2S Monitoring'
                        },

                        pane: {
                            startAngle: -150,
                            endAngle: 150,
                            background: [{
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#FFF'],
                                        [1, '#333']
                                    ]
                                },
                                borderWidth: 0,
                                outerRadius: '109%'
                            }, {
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#333'],
                                        [1, '#FFF']
                                    ]
                                },
                                borderWidth: 1,
                                outerRadius: '107%'
                            }, {
                                // default background
                            }, {
                                backgroundColor: '#DDD',
                                borderWidth: 0,
                                outerRadius: '105%',
                                innerRadius: '103%'
                            }]
                        },

                        // the value axis
                        yAxis: {
                            min: 0,
                            max: 200,

                            minorTickInterval: 'auto',
                            minorTickWidth: 1,
                            minorTickLength: 10,
                            minorTickPosition: 'inside',
                            minorTickColor: '#666',

                            tickPixelInterval: 30,
                            tickWidth: 2,
                            tickPosition: 'inside',
                            tickLength: 10,
                            tickColor: '#666',
                            labels: {
                                step: 2,
                                rotation: 'auto'
                            },
                            title: {
                                text: 'mg/m3'
                            },
                            plotBands: [{
                                from: 0,
                                to: 120,
                                color: '#55BF3B' // green
                            }, {
                                from: 120,
                                to: 160,
                                color: '#DDDF0D' // yellow
                            }, {
                                from: 160,
                                to: 200,
                                color: '#DF5353' // red
                            }]
                        },

                        series: [{
                            name: 'Concentration',
                            data: [80],
                            tooltip: {
                                valueSuffix: ' mg/m3'
                            }
                        }]

                    },
                    // Add some life
//                    function (chart) {
//                        if (!chart.renderer.forExport) {
//                            setInterval(function () {
//                                $.ajax({
//                                        url: '/getRealTimeH2S',
//                                        method: 'post',
//                                        data: {
//                                            roomNumber: roomNumber
//                                        }
//                                    })
//                                    .done((data) => {
//                                        var point = chart.series[0].points[0];
//                                        point.update(data.h2s);
//                                    });
//                            }, 1000);
//                        }
//                    }
                    );
                });
        }
    }

    $(".sendBtn").on('click', () => {
        if (biology == "animal") {
            $.ajax({
                    url: '/animalCommentAdd',
                    method: 'post',
                    data: {
                        id: id,
                        userId: sessionStorage['userId'],
                        userName: userName,
                        userComment: $("#myComment").val()
                    }
                })
                .done((data) => {
                    $.ajax({
                            url: '/getAnimalById',
                            method: 'post',
                            data: {
                                animalId: id
                            }
                        })
                        .done((data) => {
                            $(".myComment").val("");
                            $(".allComments").empty();

                            $.each(data.comment, function (key, comments) {
                                var commentsBox = $("<div class='commentsBox'>");
                                commentsBox.append("<div class='commentName'>" + comments.userName + "</div>");
                                commentsBox.append("<div class='commentContent'>" + comments.userComment + "</div>");
                                commentsBox.append("<div class='commentTime'>" + timeStamp2String(comments.timeStamp) + "</div>");

                                $(".allComments").append(commentsBox);
                            })
                        })
                })
        } else {
            $.ajax({
                    url: '/plantCommentAdd',
                    method: 'post',
                    data: {
                        id: id,
                        userId: sessionStorage['userId'],
                        userName: userName,
                        userComment: $("#myComment").val()
                    }
                })
                .done((data) => {
                    $.ajax({
                            url: '/getPlantById',
                            method: 'post',
                            data: {
                                plantId: id
                            }
                        })
                        .done((data) => {
                            $(".myComment").val("");
                            $(".allComments").empty();

                            $.each(data.comment, function (key, comments) {
                                var commentsBox = $("<div class='commentsBox'>");
                                commentsBox.append("<div class='commentName'>" + comments.userName + "</div>");
                                commentsBox.append("<div class='commentContent'>" + comments.userComment + "</div>");
                                commentsBox.append("<div class='commentTime'>" + timeStamp2String(comments.timeStamp) + "</div>");

                                $(".allComments").append(commentsBox);
                            })
                        })
                })
        }
    });

    $(".wikiBtn").on('click', () => {
        if (biology == "animal") {
            $.ajax({
                    url: '/getAnimalById',
                    method: 'post',
                    data: {
                        animalId: id
                    }
                })
                .done((data) => {
                    window.location.href = "/searchwiki/" + biology + "/" + id + "/" + data.variety;
                })
        } else {
            $.ajax({
                    url: '/getPlantById',
                    method: 'post',
                    data: {
                        plantId: id
                    }
                })
                .done((data) => {
                    window.location.href = "/searchwiki/" + biology + "/" + id + "/" + data.variety;
                })
        }
    });

    $(".insBtn1").on('click', () => {
        window.open("https://www.instagram.com/explore/tags/" + variety.replace(/\s+/g, ""));
    });

    $(".insBtn2").on('click', () => {
        window.open("https://www.instagram.com/explore/tags/" + variety.replace(/\s+/g, "") + "s");
    });

    $(".facebookBtn").on('click', () => {
        window.location.href = "https://www.facebook.com/search/top/?q=" + variety;
    });

    $(".backBtn").on('click', () => {
        if (biology == "animal") {
            window.location.href = "/index/animal";
        } else {
            window.location.href = "/index/plant";
        }
    });

    $("#upBtn1").on('click', () => {
        $.ajax({
                url: '/setServo1Up',
                method: 'post'
            })
            .done((data) => {
                if (data == "up") {
                    $('#upBtn1').attr('disabled',"true");
                    $('#downBtn1').attr('disabled',"true");
                    setInterval(function () {
                        $('#downBtn1').removeAttr("disabled");
                    }, 1000);
                }
            });
    });

    $("#downBtn1").on('click', () => {
        $.ajax({
                url: '/setServo1Down',
                method: 'post'
            })
            .done((data) => {
                if (data == "down") {
                    $('#upBtn1').attr('disabled',"true");
                    $('#downBtn1').attr('disabled',"true");
                    setInterval(function () {
                        $('#upBtn1').removeAttr("disabled");
                    }, 1000);
                }
            });
    });
    
    $("#upBtn2").on('click', () => {
        $.ajax({
                url: '/setServo2Up',
                method: 'post'
            })
            .done((data) => {
                if (data == "up") {
                    $('#upBtn2').attr('disabled',"true");
                    $('#downBtn2').attr('disabled',"true");
                    setInterval(function () {
                        $('#downBtn2').removeAttr("disabled");
                    }, 1000);
                }
            });
    });

    $("#downBtn2").on('click', () => {
        $.ajax({
                url: '/setServo2Down',
                method: 'post'
            })
            .done((data) => {
                if (data == "down") {
                    $('#upBtn2').attr('disabled',"true");
                    $('#downBtn2').attr('disabled',"true");
                    setInterval(function () {
                        $('#upBtn2').removeAttr("disabled");
                    }, 1000);
                }
            });
    });
    
    $("#upBtn3").on('click', () => {
        $.ajax({
                url: '/setServo3Up',
                method: 'post'
            })
            .done((data) => {
                if (data == "up") {
                    $('#upBtn3').attr('disabled',"true");
                    $('#downBtn3').attr('disabled',"true");
                    setInterval(function () {
                        $('#downBtn3').removeAttr("disabled");
                    }, 1000);
                }
            });
    });

    $("#downBtn3").on('click', () => {
        $.ajax({
                url: '/setServo3Down',
                method: 'post'
            })
            .done((data) => {
                if (data == "down") {
                    $('#upBtn3').attr('disabled',"true");
                    $('#downBtn3').attr('disabled',"true");
                    setInterval(function () {
                        $('#upBtn3').removeAttr("disabled");
                    }, 1000);
                }
            });
    });

    $("#upBtn4").on('click', () => {
        $.ajax({
                url: '/setServo4Up',
                method: 'post'
            })
            .done((data) => {
                if (data == "up") {
                    $('#upBtn4').attr('disabled',"true");
                    $('#downBtn4').attr('disabled',"true");
                    setInterval(function () {
                        $('#downBtn4').removeAttr("disabled");
                    }, 1000);
                }
            });
    });

    $("#downBtn4").on('click', () => {
        $.ajax({
                url: '/setServo4Down',
                method: 'post'
            })
            .done((data) => {
                if (data == "down") {
                    $('#upBtn4').attr('disabled',"true");
                    $('#downBtn4').attr('disabled',"true");
                    setInterval(function () {
                        $('#upBtn4').removeAttr("disabled");
                    }, 1000);
                }
            });
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