var APIKey = "04a910d3dcce5f3a689d56a30faedf19"; 

$("#find-city").on("click", function(event) {
    event.preventDefault();
    var cityEl = $(".city").val().trim(); 
    //otherwise var will be the whole input
    getCityWeather(cityEl);

    var now = moment().format("l");
    $("#city-name").text(cityEl+"("+now+")");
    //renderButtons();
});

function getCityWeather(city){
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?"+"q="+city+ 
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
    $("#high-temperature").text("Highest Temperature: " + response.main.temp_max + " °F");
    $("#low-temperature").text("Lowest Temperature: " + response.main.temp_min + " °F");
    $("#humidity").text("Humidity: " + response.main.humidity + " %");
    $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");

    //add icons!
    updateFutureWeather(response);
}
    
function getUVIndex(lat,lon){
    var QueryURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
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

function updateFutureWeather(response){
    $(".five-day-container").empty();

    for (var i=0; i<5 ;i++){
        var date = moment().add(i+1,"days").format("M/D/YYYY");
        var futureWeather = $("<div class='five-box'>");
        var futureDate = $("<h4>");
        futureDate.html(date);

        var futureTemp = $("<div>");
        futureTemp.text("Temp: " + response.main.temp + " °F");
        var futureHumidity = $("<div>");
        futureHumidity.text("Humidity: " + response.main.humidity + " %");

        futureWeather.append(futureDate, futureTemp, futureHumidity);
        $(".five-day-container").append(futureWeather);
    }
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

