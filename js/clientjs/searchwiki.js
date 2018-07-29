$(document).ready(function () {
    
    var biology = getUrlParameter('biology');
    var id = getUrlParameter('id');
    var variety = getUrlParameter('variety');

    $(".search-img-a").css("display", "none");
    $(".search-text").fadeIn(400);
    $(".search-title").focus();
    $(".clear-ico").fadeIn(150);
    $(".search-title").val(variety);

    var getFromWiki = function (keyword) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
            dataType: "jsonp",
            success: function (response) {
                //console.log(response);
                showResults(response, keyword);
            },
            error: function () {
                alert("Sorry,there's something wrong within the search,please refresh this page and try again!");
            }
        });
    }

    var showResults = function (response, keyword) {
        console.log(response);
        //console.log(response.query.search.length);
        $(".search-ul").html("");

        if (response.query.search.length == 0) {
            //没搜到
            var str = '<a class="search-link" href="#">';
            str += '<li class="search-li"><h3 class="search-h3">^_^</h3>';
            str += '<p class="search-abs">Sorry,the word "' + keyword + '" is not existed in wiki\'s database</p>';
            //str+='<p class="search-time">'+response.query.search[i].timestamp+'</p></li></a>';
            var dot = $(str);
            $(".search-ul").append(dot);
            return;
        }

        for (var i = 0; i < response.query.search.length; i++) {
            var str = '<a class="search-link" href="https://en.wikipedia.org/wiki/' + response.query.search[i].title + '" target="_blank">';
            str += '<li class="search-li"><h3 class="search-h3">' + response.query.search[i].title + '</h3>';
            str += '<p class="search-abs">' + response.query.search[i].snippet + '</p>';
            str += '<p class="search-time">' + response.query.search[i].timestamp + '</p></li></a>';
            var dot = $(str);
            $(".search-ul").append(dot);
        }
    }

    var keyword = $(".search-title").val();

    $(".title").css("position", "relative");
    $(".title").animate({
        left: '-40%'
    }, 500);

    $(".search-before").animate({
        top: "-40px"
    }, 500, function () {
        $(".searching").fadeIn(200);
    });
    $(".itro").css("display", "none");
    isSearch = true;

    //开始从wiki获取搜索到的东西了
    getFromWiki(keyword);
    
    //监听输入框回车事件
	$(".searchBtn").on('click', ()=>{
        var keyword = $(".search-title").val();

        $(".title").css("position", "relative");
        $(".title").animate({
            left: '-40%'
        }, 500);

        $(".search-before").animate({
            top: "-40px"
        }, 500, function () {
            $(".searching").fadeIn(200);
        });
        
        $(".itro").css("display", "none");
        isSearch = true;

        //开始从wiki获取搜索到的东西了
        getFromWiki(keyword);
    });
    
    $(".backBtn").on('click', ()=>{
        if(biology == "animal") {
            window.location.href = "/itemCheck/" + biology + "/" + id;
        }
        else {
            window.location.href = "/itemCheck/" + biology + "/" + id;
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
