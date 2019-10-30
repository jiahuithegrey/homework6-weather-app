var APIKey = "04a910d3dcce5f3a689d56a30faedf19"; 

$("#find-city").on("click", function(event) {
    event.preventDefault();
    var cityEl = $(".city").val().trim(); 
    //otherwise var will be the whole input
    getCityWeather(cityEl);

    $("#city-name").text(cityEl);
    var now = moment().format("l");
    $("#current-date").text(now);

    getFutureWeather();
    renderButtons();
});

function getCityWeather(city){
    var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?"+"q="+city+ 
    "&units=imperial&appid="+APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        updateCityWeather(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        getUVIndex(lat,lon);
    });
}

function updateCityWeather(response) {
    $("#high-temperature").text("Highest Temperature: " + response.main.temp_max);
    $("#low-temperature").text("Lowest Temperature: " + response.main.temp_min);
    $("#humidity").text("Humidity: " + response.main.humidity);
    $("#wind-speed").text("Wind Speed: " + response.wind.speed);
    //add icon
    // var icon = $("<img>");
    // var weatherIcon = response.weather[0].main;
}
    
function getUVIndex(lat,lon){
    var QueryURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url: QueryURL,
        method: "GET"
    }).then(function(response) {
        updateUVIndex(response);
    });
}

function updateUVIndex(response) {
    $("#uv-index").text("UV Index: " + response.value); 
}
//not working now
function renderButtons() {
    var searchHistory = [];
    for (var i=0; i<searchHistory.length; i++){
        var cityBtn = $("<button>");
        cityBtn.addClass("search-history");
        cityBtn.attr("data-letter", searchHistory[i]);
        cityBtn.text(searchHistory[i]);
        $("<button>").prepend(cityBtn);
        $(".search-history").append(cityBtn);
    }
}

function getFutureWeather(){
    for (var j=0; j<5 ;j++){
        var date = moment().add(1,"days").format("M/D/YYYY");

        var futureWeather = $("<div class='future-weather'>");
        var futureDate = $("<h3>");
        futureDate.html(date);
        var futureTemp = $("<span>");
        futureTemp.text("Temp: " + response.list[j].main.temp+"<br>");
        var futureHumidity = $("<span>");
        futureHumidity.text("Humidity: " + response.list[j].main.humidity+"<br>");

        futureWeather.append(futureDate, futureTemp, futureHumidity);
        $("#future-cards").append(futureWeather);



        var QueryURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
        $.ajax({
            url: QueryURL,
            method: "GET"
        }).then(function(response) {
            updateUVIndex(response);
        });

        


    }
}


